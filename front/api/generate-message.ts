'use server'

import { api } from "./api-client";

export type ResponseError = {
  success: boolean;
  message: string;
}

type Response = {
  reason: string | null;
  message: string;
  category: string | null;
}

type GenerateMessage = {
  type: 'text' | 'file';
  content: any;
};

export async function generateMessage(params: GenerateMessage): Promise<Response & ResponseError> {
  try {
    if (params.type === 'text') {
      return await api.post('/analyze-text', { text: params.content })
        .then(({ data, status }) => ({ ...data, status }))
        .catch(err => ({ status: err?.status, success: false, message: err.message }))
    }

    if (params.type === 'file') {
      const formData = new FormData();
      formData.append('file', params.content);

      return await api.post('/analyze-file', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
        .then(({ data, status }) => ({ ...data, status }))
        .catch(err => ({ status: err?.status, success: false, message: err.message }))
    }

    throw new Error('Tipo de mensagem inválido');
  } catch (err: any) {
    return {
      category: null,
      success: false,
      message: err?.response?.data?.detail || err.message,
      reason: null,
    } as Response & ResponseError;
  }
}
