from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI

from app.core.config import settings


def get_llm():
    provider = settings.MODEL_PROVIDER.lower()

    if provider == "openai":
        return ChatOpenAI(
            model=settings.MODEL_NAME,
            api_key=settings.OPENAI_API_KEY,
            temperature=0
        )

    if provider == "google":
        return ChatGoogleGenerativeAI(
            model=settings.MODEL_NAME,
            google_api_key=settings.GOOGLE_API_KEY,
            temperature=0
        )

    raise ValueError(
        f"Unsupported provider: {provider}"
    )