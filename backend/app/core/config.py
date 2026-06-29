from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    OPENAI_API_KEY: str = ""

    GOOGLE_API_KEY: str = ""

    GROQ_API_KEY: str = ""

    MODEL_PROVIDER: str = "groq"

    MODEL_NAME: str = "llama-3.3-70b-versatile"

    class Config:
        env_file = ".env"


settings = Settings()