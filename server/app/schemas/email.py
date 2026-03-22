from pydantic import BaseModel, field_validator

class EmailRequest(BaseModel):
    text: str

    @field_validator("text")
    def validate_text(cls, value):
        if not value or not value.strip():
            raise ValueError("O campo 'text' não pode ser vazio")
        return value

class EmailResponse(BaseModel):
    category: str
    message: str
    reason: str