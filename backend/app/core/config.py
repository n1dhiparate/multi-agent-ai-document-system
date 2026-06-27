from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    OPENAI_API_KEY: str = ""

    GOOGLE_API_KEY: str = ""

    MODEL_PROVIDER: str = "openai"

    MODEL_NAME: str = "gpt-4.1-mini"

    GROQ_API_KEY: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
print("MODEL_PROVIDER:", settings.MODEL_PROVIDER)
print("GROQ:", settings.GROQ_API_KEY)