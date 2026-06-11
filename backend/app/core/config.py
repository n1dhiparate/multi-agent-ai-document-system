from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    OPENAI_API_KEY: str = ""

    GOOGLE_API_KEY: str = ""

    MODEL_PROVIDER: str = "openai"

    MODEL_NAME: str = "gpt-4.1-mini"

    class Config:
        env_file = ".env"


settings = Settings()