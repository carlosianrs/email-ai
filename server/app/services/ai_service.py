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
- Use quebras de linha com \\n para melhor legibilidade
- Estrutura da resposta:
  * Saudação (ex: "Prezado,")
  * Linha em branco
  * Corpo da mensagem
  * Linha em branco
  * Fechamento (ex: "Atenciosamente")

Responda APENAS em JSON:
{{
  "category": "Produtivo ou Improdutivo",
  "message": "texto formatado com \\n",
  "reason": "Motivo da classificação"
}}

Email:
\"\"\"
{email_text}
\"\"\"
"""

def format_message(message: str) -> str:
    if "\n" not in message:
        message = message.replace(". ", ".\n\n")
    return message

def analyze_email(email_text: str) -> dict:
    email_text = email_text[:settings.MAX_INPUT_SIZE]

    prompt = build_prompt(email_text)

    try:
        response = client.chat.completions.create(
            model=settings.MODEL,
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.2,
        )

        content = response.choices[0].message.content
        result = json.loads(content)

        if "message" in result:
            result["message"] = format_message(result["message"])

        return result

    except Exception as e:
        return {
            "category": "Erro",
            "message": f"Erro ao processar email:\n\n{str(e)}",
            "reason": "Falha na chamada da API"
        }