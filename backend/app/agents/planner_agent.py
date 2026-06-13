from app.services.llm_factory import get_llm


def create_outline(topic, research):

    try:
        llm = get_llm()

        prompt = f"""
You are an expert Planning Agent.

Your job is to convert research into a structured report outline.

Topic:
{topic}

Research:
{research}

Create a detailed outline with:

1. Executive Summary
2. Introduction
3. Key Concepts
4. Analysis and Findings
5. Recommendations
6. Conclusion

Return the outline in hierarchical markdown format.
"""

        response = llm.invoke(prompt)

        return response.content

    except Exception as e:

        print("Planner Agent Error:", str(e))

        return f"Planner failed: {str(e)}"