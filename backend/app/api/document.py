from fastapi import APIRouter, UploadFile, File,HTTPException
import threading
import tempfile
import os


from app.rag.embeddings import create_embeddings
from app.rag.vectorstore import (
    store_chunks,
    collection,
    search_documents
)

from app.rag.loader import extract_text_from_pdf
from app.rag.chunker import chunk_text

from app.agents.research_agent import (
    answer_question,
    research_topic
)

from app.agents.planner_agent import create_outline
from app.agents.writer_agent import write_report
from app.agents.reviewer_agent import review_report
from app.agents.citation_agent import add_citations
from app.graph.workflow import run_workflow, workflow_progress

router = APIRouter()


@router.get("/vector-count")
def vector_count():
    return {
        "documents_stored": collection.count()
    }


@router.get("/search")
def search(query: str):

    results = search_documents(query)

    return results


@router.get("/ask")
def ask(question: str):

    answer = answer_question(question)

    return {
        "question": question,
        "answer": answer
    }


@router.get("/plan")
def plan(topic: str):

    research = research_topic(topic)

    outline = create_outline(
        topic,
        research
    )

    return {
        "topic": topic,
        "outline": outline
    }


@router.get("/report")
def report(topic: str):

    research = research_topic(topic)

    outline = create_outline(
        topic,
        research
    )

    report_text = write_report(
        topic,
        research,
        outline
    )

    return {
        "topic": topic,
        "report": report_text
    }


@router.get("/review")
def review(topic: str):

    research = research_topic(topic)

    outline = create_outline(
        topic,
        research
    )

    report = write_report(
        topic,
        research,
        outline
    )

    feedback = review_report(report)

    return {
        "report": report,
        "review": feedback
    }


@router.get("/research")
def research(topic: str):

    notes = research_topic(topic)

    return {
        "topic": topic,
        "research": notes
    }


from fastapi import HTTPException

@router.get("/progress")
def progress():
    return workflow_progress

@router.get("/generate")
def generate(topic: str):

    try:
        thread = threading.Thread(
            target=run_workflow,
            args=(topic,),
            daemon=True,
        )

        thread.start()

        return {
            "message": "Generation started"
        }

    except Exception as e:
        print("ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail="Failed to start generation"
        )


@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp_file:

        content = await file.read()

        temp_file.write(content)

        temp_path = temp_file.name

    try:
        text = extract_text_from_pdf(temp_path)

        chunks = chunk_text(text)

        embeddings = create_embeddings(chunks)

        

        store_chunks(
            chunks,
            embeddings,
            file.filename
        )

        return {
            "filename": file.filename,
            "total_characters": len(text),
            "total_chunks": len(chunks),
            "preview_chunk": chunks[0] if chunks else ""
        }

    except Exception as e:

        print("ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail="PDF processing failed"
       )

    finally:
        os.remove(temp_path)