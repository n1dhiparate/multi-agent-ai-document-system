from app.services.llm_factory import get_llm


def add_citations(report):

    llm = get_llm()

    prompt = f"""
Report:

{report}

Add citation markers.

Example:

Artificial Intelligence is transforming healthcare [1].

At the end generate:

References

[1] Source Document
"""

    response = llm.invoke(prompt)

    return response.content