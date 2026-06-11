from fastapi import APIRouter

from app.services.llm_factory import get_llm

router = APIRouter()


@router.get("/test-llm")
async def test_llm():
    llm = get_llm()

    response = llm.invoke(
        "Reply with exactly: LLM connection successful"
    )

    return {
        "response": response.content
    }