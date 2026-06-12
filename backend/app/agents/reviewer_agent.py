from app.services.llm_factory import get_llm

def review_report(report):

    llm = get_llm()

    prompt = f"""
Review this report.

Check:
- clarity
- grammar
- completeness
- structure

Give improvement suggestions.

Report:

{report}
"""

    response = llm.invoke(prompt)

    return response.content