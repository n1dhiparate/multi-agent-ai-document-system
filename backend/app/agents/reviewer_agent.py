from app.services.llm_factory import get_llm

def review_report(report):

    try:

        llm = get_llm()

        prompt = f"""
You are an expert Reviewer Agent.

Review the report for:

- factual consistency
- clarity
- grammar
- completeness
- logical flow
- professional writing quality

Provide:

1. Strengths
2. Issues Found
3. Suggested Improvements
4. Overall Quality Score (1-10)

For the Overall Quality Score:
- Evaluate clarity
- Technical accuracy
- Completeness
- Structure
- Professional writing quality

Explain briefly why the score was assigned.

Report:

{report}
"""
        response = llm.invoke(prompt)

        return response.content

    except Exception as e:

        print("Reviewer Agent Error:", str(e))

        return f"Review generation failed: {str(e)}"