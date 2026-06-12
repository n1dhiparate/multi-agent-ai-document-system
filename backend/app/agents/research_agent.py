from app.rag.retriever import retrieve_context
from app.services.llm_factory import get_llm
from app.rag.vectorstore import search_documents


def answer_question(question):

    context = retrieve_context(question)

    prompt = f"""
You are a document research assistant.

Answer ONLY using the provided context.

If the answer is not present in the context,
say:

I could not find that information in the document.

Context:
{context}

Question:
{question}
"""

    llm = get_llm()

    response = llm.invoke(prompt)

    return response.content

def research_topic(topic):

    docs = search_documents(topic)

    context = "\n".join(
        docs["documents"][0]
    )

    llm = get_llm()

    prompt = f"""
Topic:
{topic}

Context:
{context}

Create a research summary.
"""

    response = llm.invoke(prompt)

    return response.content