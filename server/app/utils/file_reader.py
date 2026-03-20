from pypdf import PdfReader

def read_text(content: bytes) -> str:
    return content.decode("utf-8")

def read_pdf(file) -> str:
    reader = PdfReader(file)
    text = ""

    for page in reader.pages:
        extracted = page.extract_text()
        if (extracted):
            text = extracted
        
    return text