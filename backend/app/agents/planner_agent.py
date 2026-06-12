from app.services.llm_factory import get_llm

def create_outline(topic, research):

    llm = get_llm()

    prompt = f"""
Topic:
{topic}

Research:
{research}

Create a detailed professional report outline.

Include:
1. Introduction
2. Main Concepts
3. Analysis
4. Conclusion

Use the research when deciding sections.
"""

    response = llm.invoke(prompt)

    return response.content