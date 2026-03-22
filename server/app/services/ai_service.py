from openai import OpenAI
from app.settings.config import settings
import json

client = OpenAI(api_key=settings.OPEN_API_KEY)

def build_prompt(email_text: str) -> str:
    return f"""
Você é um assistente de uma empresa do setor financeiro.

Sua tarefa:
1. Classificar o email como:
   - "Produtivo" (requer ação/resposta)
   - "Improdutivo" (não requer ação)

2. Gerar uma resposta profissional e educada.

Regras:
- Linguagem formal
- Respostas curtas e claras
- Sempre em português

Responda APENAS em JSON:
{{
  "category": "Produtivo ou Improdutivo",
  "message": "texto",
  "reason": "Motivo de ter sido classificada a categoria"
}}

Email:
\"\"\"
{email_text}
\"\"\"
"""

def analyze_email(email_text: str) -> dict:
    email_text = email_text[:settings.MAX_INPUT_SIZE]

    prompt = build_prompt(email_text)

    try:
        response = client.chat.completions.create(
            model=settings.MODEL,
            messages=[{ "role": "user", "content": prompt }],
            response_format={"type": "json_object"},
            temperature=0.2,
        )

        content = response.choices[0].message.content
        return json.loads(content)
    except Exception as e:
        return {
            "categoria": "Erro",
            "resposta": f"Erro ao processar email: {str(e)}"
        }