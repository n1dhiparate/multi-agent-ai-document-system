import time
from app.agents.research_agent import research_topic
from app.agents.planner_agent import create_outline
from app.agents.writer_agent import write_report
from app.agents.reviewer_agent import review_report
from app.agents.citation_agent import add_citations
workflow_progress = {
    "stage": 0,
    "status": "idle",
    "report": None,
}



def run_workflow(topic):

    try:

        workflow_progress["stage"] = 0
        workflow_progress["status"] = "running"
        workflow_progress["report"] = None

        research = research_topic(topic)
        workflow_progress["stage"] = 1
        time.sleep(2)
        outline = create_outline(
            topic,
            research
        )
        workflow_progress["stage"] = 2
        time.sleep(2)
        report = write_report(
            topic,
            research,
            outline
        )
        workflow_progress["stage"] = 3
        time.sleep(2)

        review = review_report(report)
        workflow_progress["stage"] = 4
        time.sleep(2)

        final_report = add_citations(report)
        workflow_progress["stage"] = 5
        time.sleep(1)
        workflow_progress["stage"] = 6
        workflow_progress["status"] = "completed"
        workflow_progress["report"] = final_report

        return {
            "research": research,
            "outline": outline,
            "report": report,
            "review": review,
            "final_report": final_report
        }

    except Exception as e:
        workflow_progress["status"] = "error"
        workflow_progress["report"] = None

        return {
            "error": str(e)
        }
