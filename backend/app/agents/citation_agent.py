from app.services.llm_factory import get_llm
from app.rag.vectorstore import search_documents


def add_citations(report):
    try:
        llm = get_llm()

        # Retrieve the most relevant chunks from ChromaDB
        results = search_documents(report[:500])

        documents = results["documents"][0]
        metadatas = results["metadatas"][0]

        # Build context for the LLM
        context = ""

        for doc, meta in zip(documents, metadatas):
            context += f"""
Source:
{meta["source"]}

Content:
{doc}

----------------------------------------
"""

        prompt = f"""
You are an expert citation assistant for a Retrieval-Augmented Generation (RAG) system.

Your job is to add citation markers to the report using ONLY the retrieved context below.

Rules:

1. Use ONLY the retrieved context.
2. Never invent books, journals, authors or websites.
3. Insert citation markers such as [1], [2], [3] wherever appropriate.
4. Multiple statements from the same source should reuse the same citation number.
5. At the end create a References section.
6. The References section must use ONLY the Source values provided in the Retrieved Context.
Do not invent any additional references.
7. Do not change the wording of the report unless absolutely necessary.
8. Preserve all headings and formatting.

Retrieved Context:

{context}

Report:

{report}
"""

        response = llm.invoke(prompt)

        return response.content

    except Exception as e:
        print("Citation Agent Error:", str(e))
        return f"Citation generation failed: {str(e)}"