const mailjet = require('node-mailjet');

/**
 * Service d'envoi d'emails avec Mailjet
 */
class MailService {
  constructor() {
    this.mailjet = mailjet.apiConnect(
      process.env.MAILJET_API_KEY,
      process.env.MAILJET_SECRET_KEY
    );
  }

  /**
   * Envoi d'un email avec Mailjet
   * @param {Object} options Options de l'email
   * @returns {Promise} Résultat de l'envoi
   */
  async sendEmail(options) {
    const { to, subject, text, html, templateId, variables } = options;

    try {
      const request = this.mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: process.env.EMAIL_FROM || 'noreply@maxia.fr',
              Name: process.env.EMAIL_FROM_NAME || 'Maxia'
            },
            To: [
              {
                Email: to,
                Name: options.name || ''
              }
            ],
            Subject: subject,
            TextPart: text,
            HTMLPart: html,
            TemplateID: templateId,
            TemplateLanguage: !!templateId,
            Variables: variables || {}
          }
        ]
      });

      const result = await request;
      return result.body;
    } catch (error) {
      console.error('Erreur d\'envoi d\'email:', error.message);
      throw new Error(`Erreur d'envoi d'email: ${error.message}`);
    }
  }

  /**
   * Envoi d'un email de réinitialisation de mot de passe
   * @param {string} to Adresse email du destinataire
   * @param {string} tempPassword Mot de passe temporaire
   * @returns {Promise} Résultat de l'envoi
   */
  async sendPasswordResetEmail(to, tempPassword) {
    return this.sendEmail({
      to,
      subject: 'Réinitialisation de mot de passe - Maxia',
      text: `Votre nouveau mot de passe temporaire est: ${tempPassword}. Veuillez le changer dès votre prochaine connexion.`,
      html: `
        <div>
          <h2>Réinitialisation de mot de passe</h2>
          <p>Votre nouveau mot de passe temporaire est: <strong>${tempPassword}</strong></p>
          <p>Veuillez le changer dès votre prochaine connexion.</p>
          <p>Si vous n'avez pas demandé cette réinitialisation, veuillez nous contacter immédiatement.</p>
        </div>
      `
    });
  }

  /**
   * Envoi d'un email de bienvenue avec les informations de connexion
   * @param {string} to Adresse email du destinataire
   * @param {string} name Nom du destinataire
   * @param {string} tempPassword Mot de passe temporaire
   * @returns {Promise} Résultat de l'envoi
   */
  async sendWelcomeEmail(to, name, tempPassword) {
    return this.sendEmail({
      to,
      name,
      subject: 'Bienvenue chez Maxia - Vos informations de connexion',
      text: `Bienvenue chez Maxia, ${name} ! Votre compte a été créé. Voici votre mot de passe provisoire: ${tempPassword}. Veuillez le changer dès votre première connexion.`,
      html: `
        <div>
          <h2>Bienvenue chez Maxia, ${name} !</h2>
          <p>Votre compte a été créé avec succès.</p>
          <p>Voici vos informations de connexion:</p>
          <ul>
            <li>Email: ${to}</li>
            <li>Mot de passe provisoire: <strong>${tempPassword}</strong></li>
          </ul>
          <p>Veuillez changer votre mot de passe dès votre première connexion.</p>
          <p><a href="${process.env.CLIENT_URL || 'https://dashboard-client.maxia.fr'}/login">Se connecter au tableau de bord</a></p>
        </div>
      `
    });
  }

  /**
   * Envoi d'un email de notification pour une nouvelle demande de compte
   * @param {string} to Adresse email admin
   * @param {Object} companyInfo Informations de l'entreprise
   * @param {number} requestId ID de la demande
   * @returns {Promise} Résultat de l'envoi
   */
  async sendNewAccountRequestNotification(to, companyInfo, requestId) {
    const validationUrl = `${process.env.ADMIN_URL || 'https://dashboard-admin.maxia.fr'}/account-requests/${requestId}/validate`;

    return this.sendEmail({
      to,
      subject: 'Nouvelle demande de compte - Maxia',
      text: `Une nouvelle demande de compte a été reçue. Entreprise: ${companyInfo.name}, Dirigeant: ${companyInfo.managerName}, Email: ${companyInfo.email}.`,
      html: `
        <div>
          <h2>Nouvelle demande de compte</h2>
          <p>Une nouvelle demande de compte a été reçue avec les informations suivantes:</p>
          <ul>
            <li>Entreprise: ${companyInfo.name}</li>
            <li>SIREN: ${companyInfo.siren}</li>
            <li>Dirigeant: ${companyInfo.managerName}</li>
            <li>Email: ${companyInfo.email}</li>
            <li>Téléphone: ${companyInfo.phone}</li>
            <li>Licences demandées: ${companyInfo.requestedLicenses}</li>
          </ul>
          <p>
            <a href="${validationUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
              Valider cette demande
            </a>
          </p>
        </div>
      `
    });
  }
}

module.exports = new MailService(); 