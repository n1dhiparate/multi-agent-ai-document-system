from fileinput import filename

import chromadb
from app.rag.embeddings import create_embeddings

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_or_create_collection(
    name="documents"
)

def store_chunks(
    chunks,
    embeddings,
    filename
):

    print(f"Adding {len(chunks)} chunks")

    collection.add(
    documents=chunks,
    embeddings=embeddings,
    ids=[str(i) for i in range(len(chunks))],
    metadatas=[
        {"source": filename}
        for _ in chunks
    ]
)
    print("Added successfully")


def search_documents(query):

    print("Searching for:", query)


    query_embedding = create_embeddings([query])

    print("Embedding created")

    results = collection.query(
        query_embeddings=query_embedding,
        n_results=3
    )

    print("Search complete")

    return results