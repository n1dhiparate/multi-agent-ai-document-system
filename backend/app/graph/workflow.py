from app.agents.research_agent import research_topic
from app.agents.planner_agent import create_outline
from app.agents.writer_agent import write_report
from app.agents.reviewer_agent import review_report
from app.agents.citation_agent import add_citations


def run_workflow(topic):

    try:
        research = research_topic(topic)

        outline = create_outline(
            topic,
            research
        )

        report = write_report(
            topic,
            research,
            outline
        )

        review = review_report(report)

        final_report = add_citations(report)

        return {
            "research": research,
            "outline": outline,
            "report": report,
            "review": review,
            "final_report": final_report
        }

    except Exception as e:
        return {
            "error": str(e)
        }
