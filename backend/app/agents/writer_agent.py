from app.services.llm_factory import get_llm


def write_report(
    topic,
    research,
    outline
):

    try:

        llm = get_llm()

        prompt = f"""
You are an expert Technical Writer Agent.

Topic:
{topic}

Research Notes:
{research}

Outline:
{outline}

Write a comprehensive professional report of at least 800-1200 words.

Requirements:
- Follow the outline exactly
- Use clear section headings
- Use information from the research notes
- Provide detailed explanations
- Maintain professional tone
- Use markdown formatting

Generate the complete report.
"""

        response = llm.invoke(prompt)

        return response.content

    except Exception as e:

        print("Writer Agent Error:", str(e))

        return f"Report generation failed: {str(e)}"