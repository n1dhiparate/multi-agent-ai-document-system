from app.rag.retriever import retrieve_context
from app.services.llm_factory import get_llm
from app.rag.vectorstore import search_documents


def answer_question(question):

    try:
        context = retrieve_context(question)
        

        prompt = f"""
You are a document research assistant.

Use ONLY the provided context.

Answer the question directly.

If the context contains partial information,
provide the best answer possible using that information.

Only say "I could not find that information in the document"
if absolutely no relevant information exists.

Context:
{context}

Question:
{question}
"""

        llm = get_llm()
        

        response = llm.invoke(
    f"Context:\n{context}\n\nQuestion:\n{question}\n\nAnswer:"
)

        

        return response.content

    except Exception as e:

        print("Question Answering Error:", str(e))

        return f"Failed to answer question: {str(e)}"

def research_topic(topic):

    try:
        docs = search_documents(topic)

        context = "\n".join(
            docs["documents"][0]
        )

        llm = get_llm()

        prompt = f"""
You are an expert Research Agent.

Analyze the provided context and create a detailed research summary.

Include:

- Key concepts
- Important findings
- Technical details
- Relevant facts
- Important conclusions

Topic:
{topic}

Context:
{context}
"""

        response = llm.invoke(prompt)

        return response.content

    except Exception as e:

        print("Research Agent Error:", str(e))

        return f"Research generation failed: {str(e)}"