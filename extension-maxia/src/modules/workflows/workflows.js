/**
 * Module de gestion des flux de travail pour l'extension Maxia
 * Gère la récupération et l'exécution des flux de travail
 */
class WorkflowsModule {
  constructor() {
    this.apiBaseUrl = 'https://api.maxia.com/api/v1'; // À remplacer par l'URL réelle de l'API
    this.workflowsKey = 'maxia_workflows';
  }

  /**
   * Récupérer les flux de travail disponibles pour l'utilisateur
   * @returns {Promise<Array>} - Liste des flux de travail disponibles
   */
  async getAvailableWorkflows() {
    try {
      // Dans un environnement de production, cette requête serait envoyée au serveur
      // Pour cette structure de base, nous simulons une réponse
      
      // Exemple de code pour une vraie API:
      /*
      const authModule = new AuthModule();
      const token = await authModule._getStoredToken();
      
      if (!token) {
        throw new Error('Non authentifié');
      }
      
      const response = await fetch(`${this.apiBaseUrl}/workflows`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la récupération des flux de travail');
      }
      
      const data = await response.json();
      return data.workflows || [];
      */
      
      // Simulation de réponse pour la structure de base
      const mockWorkflows = [
        {
          id: 'workflow1',
          name: 'Création de commande',
          description: 'Automatise la création de commandes dans V-Mobility',
          type: 'v-mobility',
          version: '1.0.0',
          active: true
        },
        {
          id: 'workflow2',
          name: 'Recherche client',
          description: 'Facilite la recherche de clients dans V-Mobility',
          type: 'v-mobility',
          version: '1.0.0',
          active: true
        },
        {
          id: 'workflow3',
          name: 'Génération de rapport',
          description: 'Automatise la génération de rapports dans V-Mobility',
          type: 'v-mobility',
          version: '1.0.0',
          active: false
        }
      ];
      
      // Filtrer les flux actifs uniquement
      return mockWorkflows.filter(workflow => workflow.active);
    } catch (error) {
      console.error('Erreur lors de la récupération des flux de travail:', error);
      return [];
    }
  }

  /**
   * Lancer un flux de travail spécifique
   * @param {string} workflowId - Identifiant du flux de travail à lancer
   * @returns {Promise<boolean>} - Succès de l'opération
   */
  async launchWorkflow(workflowId) {
    try {
      // Vérifier si nous sommes sur la page appropriée
      const currentTab = await this._getCurrentTab();
      if (!currentTab.url.includes('saas.v-mobility.fr/ireception')) {
        // Informer l'utilisateur qu'il doit être sur le site V-Mobility
        chrome.tabs.sendMessage(currentTab.id, { 
          action: 'SHOW_NOTIFICATION', 
          data: {
            type: 'error',
            message: 'Vous devez être sur le site V-Mobility pour lancer ce flux'
          }
        });
        return false;
      }

      // Envoyer un message au script content pour exécuter le flux
      chrome.tabs.sendMessage(currentTab.id, { 
        action: 'RUN_WORKFLOW', 
        data: { workflowId }
      });
      
      return true;
    } catch (error) {
      console.error('Erreur lors du lancement du flux de travail:', error);
      return false;
    }
  }

  /**
   * Récupérer l'onglet actif
   * @returns {Promise<chrome.tabs.Tab>} - Onglet actif
   * @private
   */
  async _getCurrentTab() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs[0]);
      });
    });
  }

  /**
   * Enregistrer les flux de travail dans le stockage local
   * @param {Array} workflows - Liste des flux de travail
   * @returns {Promise<void>}
   * @private
   */
  async _storeWorkflows(workflows) {
    return new Promise(resolve => {
      chrome.storage.local.set({ [this.workflowsKey]: workflows }, resolve);
    });
  }

  /**
   * Récupérer les flux de travail depuis le stockage local
   * @returns {Promise<Array>} - Liste des flux de travail
   * @private
   */
  async _getStoredWorkflows() {
    return new Promise(resolve => {
      chrome.storage.local.get([this.workflowsKey], result => {
        resolve(result[this.workflowsKey] || []);
      });
    });
  }
}

// Exporter la classe pour la rendre accessible globalement
window.WorkflowsModule = WorkflowsModule; 