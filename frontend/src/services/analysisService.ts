import { api } from './api';
import { AnalysisResult } from '../types/medical.types';

export const analysisService = {
  async uploadImage(file: File, patientInfo?: any) {
    const formData = new FormData();
    formData.append('image', file);
    if (patientInfo) {
      formData.append('patientInfo', JSON.stringify(patientInfo));
    }
    
    const response = await api.post('/analysis/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getResults(analysisId: string) {
    const response = await api.get(`/analysis/results/${analysisId}`);
    return response.data;
  },

  async getHistory(limit = 10, offset = 0) {
    const response = await api.get('/analysis/history', {
      params: { limit, offset },
    });
    return response.data;
  },
};