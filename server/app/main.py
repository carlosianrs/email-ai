from fastapi import FastAPI, UploadFile, File, HTTPException
from app.schemas.email import EmailRequest, EmailResponse
from app.services.ai_service import analyze_email
from app.utils.file_reader import read_pdf, read_text

app = FastAPI(title="Email AI API")

@app.get("/")
def health_check():
    return { "status": "ok" }

@app.post("/analyze-text", response_model=EmailResponse)
def analyze_text(data: EmailRequest):
    result = analyze_email(data.text)
    return result

@app.post("/analyze-file", response_model=EmailResponse)
async def analyze_file(file: UploadFile = File(...)):
    filename = file.filename.lower()

    try:
        if filename.endswith(".txt"):
            content = read_text(await file.read())
        
        elif filename.endswith(".pdf"):
            content = read_pdf(await file.file)
        
        else:
            raise HTTPException(
                status_code=400,
                detail="Formato não suportado. Use .txt ou .pdf"
            )
        
        if not content.strip():
            raise HTTPException(status_code=400, detail="Arquivo vazio")
        
        result = analyze_email(content)
        return result
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))