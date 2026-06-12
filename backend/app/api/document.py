from fastapi import APIRouter, UploadFile, File
import tempfile
import os
from app.rag.embeddings import create_embeddings
from app.rag.vectorstore import store_chunks

from app.rag.loader import extract_text_from_pdf
from app.rag.chunker import chunk_text
from app.rag.vectorstore import collection
from app.rag.vectorstore import search_documents


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

        print("Current count:", collection.count())

        store_chunks(
            chunks,
            embeddings
        )

        return {
            "filename": file.filename,
            "total_characters": len(text),
            "total_chunks": len(chunks),
            "preview_chunk": chunks[0] if chunks else ""
        }
    
    except Exception as e:
        print("ERROR:", e)
        raise e

    finally:
        os.remove(temp_path)