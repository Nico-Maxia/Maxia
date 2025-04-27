import axios from 'axios';
import { MailjetConfig, MailjetResponse } from '../types/mailjet.types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

export const mailjetService = {
  async testConfig(config: MailjetConfig): Promise<MailjetResponse> {
    const response = await axios.post(`${API_URL}/mailjet/test-config`, config);
    return response.data;
  },

  async saveConfig(config: MailjetConfig): Promise<MailjetResponse> {
    const response = await axios.post(`${API_URL}/mailjet/save-config`, config);
    return response.data;
  },

  async getConfig(): Promise<MailjetResponse> {
    const response = await axios.get(`${API_URL}/mailjet/config`);
    return response.data;
  }
}; 