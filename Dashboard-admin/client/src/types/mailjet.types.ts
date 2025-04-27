export interface MailjetConfig {
  senderEmail: string;
  senderName: string;
  apiKeyPublic: string;
  apiKeyPrivate: string;
}

export interface MailjetResponse {
  success: boolean;
  message: string;
  config?: Partial<MailjetConfig>;
  errors?: Array<{
    msg: string;
    param: string;
  }>;
} 