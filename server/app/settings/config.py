from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    OPEN_API_KEY: str = os.getenv('OPEN_API_KEY')
    MODEL: str = "gpt-4.1-mini"
    MAX_INPUT_SIZE: int = 2000

settings = Settings()