from app.services.llm_factory import get_llm

def write_report(
    topic,
    research,
    outline
):

    llm = get_llm()

    prompt = f"""
Topic:
{topic}

Research Notes:
{research}

Outline:
{outline}

Write a professional report.

Use the research notes as source material.
Use headings and detailed explanations.
"""

    response = llm.invoke(prompt)

    return response.content