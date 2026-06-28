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

Your task is ONLY to insert citation markers into the report.

Rules:

1. Use ONLY the retrieved context.
2. Never invent books, journals, websites or authors.
3. Insert citation markers like [1], [2], [3] wherever appropriate.
4. Reuse the same citation number whenever information comes from the same source.
5. Preserve all headings and formatting.
6. Do NOT rewrite the report unless absolutely necessary.
7. Do NOT generate a References section.
8. The References section will be generated automatically.

Retrieved Context:

{context}

Report:

{report}
"""

        response = llm.invoke(prompt)

        report_with_citations = response.content

        # ---------------------------------------------------
        # Remove any References section the LLM generated
        # ---------------------------------------------------

        for heading in [
            "### References",
            "## References",
            "# References",
            "References",
        ]:
            if heading in report_with_citations:
                report_with_citations = report_with_citations.split(heading)[0]
                break

        # ---------------------------------------------------
        # Collect unique document sources
        # ---------------------------------------------------

        unique_sources = []

        for meta in metadatas:
            source = meta["source"]

            if source not in unique_sources:
                unique_sources.append(source)

        # ---------------------------------------------------
        # Append our own clean References section
        # ---------------------------------------------------

        report_with_citations += "\n\n### References\n\n"

        for index, source in enumerate(unique_sources, start=1):
            report_with_citations += f"[{index}] {source}\n"

        return report_with_citations

    except Exception as e:
        print("Citation Agent Error:", str(e))
        return f"Citation generation failed: {str(e)}"