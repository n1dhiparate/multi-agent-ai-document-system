import time
from app.agents.research_agent import research_topic
from app.agents.planner_agent import create_outline
from app.agents.writer_agent import write_report
from app.agents.reviewer_agent import review_report
from app.agents.citation_agent import add_citations


def run_workflow(topic):

    try:
        research = research_topic(topic)
        time.sleep(2)
        outline = create_outline(
            topic,
            research
        )
        time.sleep(2)
        report = write_report(
            topic,
            research,
            outline
        )
        time.sleep(2)

        review = review_report(report)
        time.sleep(2)

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
