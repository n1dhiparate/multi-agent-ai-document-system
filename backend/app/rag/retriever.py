from app.rag.vectorstore import search_documents


def retrieve_context(query):

    results = search_documents(query)

    documents = results["documents"][0]

    context = "\n\n".join(documents)

    return context