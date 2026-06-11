from typing import TypedDict, List


class WorkflowState(TypedDict):
    query: str

    retrieved_chunks: List[str]

    outline: str

    draft: str

    review: str

    citations: List[str]

    final_document: str