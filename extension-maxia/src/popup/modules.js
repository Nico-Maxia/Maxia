/**
 * Ce fichier charge explicitement les modules nécessaires au fonctionnement du popup
 * et les expose globalement pour résoudre les problèmes de référence
 */

// Définition de la classe AuthModule
class AuthModule {
  constructor() {
    this.apiBaseUrl = 'https://api.maxia.com/api/v1';
    this.tokenKey = 'maxia_auth_token';
    this.userKey = 'maxia_user_data';
  }

  async login(email, password) {
    try {
      if (!email || !password) {
        throw new Error('Email et mot de passe requis');
      }
      
      // Simulation d'une réponse réussie
      const mockUser = {
        id: 'user123',
        email: email,
        name: 'Utilisateur Test',
        license: 'LIC-12345-ABCDE',
        token: 'mock-jwt-token-12345'
      };
      
      await this._saveAuthData(mockUser);
      return mockUser;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this._clearAuthData();
      return true;
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const userData = await this._getStoredUserData();
      const token = await this._getStoredToken();
      
      if (!userData || !token) {
        return null;
      }
      return userData;
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      return null;
    }
  }

  async isAuthenticated() {
    const user = await this.getCurrentUser();
    return !!user;
  }

  async _saveAuthData(userData) {
    const { token, ...userDataWithoutToken } = userData;
    
    await new Promise(resolve => {
      chrome.storage.local.set({ [this.tokenKey]: token }, resolve);
    });
    
    await new Promise(resolve => {
      chrome.storage.local.set({ [this.userKey]: userDataWithoutToken }, resolve);
    });
  }

  async _getStoredToken() {
    return new Promise(resolve => {
      chrome.storage.local.get([this.tokenKey], result => {
        resolve(result[this.tokenKey] || null);
      });
    });
  }

  async _getStoredUserData() {
    return new Promise(resolve => {
      chrome.storage.local.get([this.userKey], result => {
        resolve(result[this.userKey] || null);
      });
    });
  }

  async _clearAuthData() {
    await new Promise(resolve => {
      chrome.storage.local.remove([this.tokenKey, this.userKey], resolve);
    });
  }
}

// Définition de la classe WorkflowsModule
class WorkflowsModule {
  constructor() {
    this.apiBaseUrl = 'https://api.maxia.com/api/v1';
    this.workflowsKey = 'maxia_workflows';
  }

  async getAvailableWorkflows() {
    try {
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
      
      return mockWorkflows.filter(workflow => workflow.active);
    } catch (error) {
      console.error('Erreur lors de la récupération des flux de travail:', error);
      return [];
    }
  }

  async launchWorkflow(workflowId) {
    try {
      const currentTab = await this._getCurrentTab();
      if (!currentTab.url.includes('saas.v-mobility.fr/ireception')) {
        chrome.tabs.sendMessage(currentTab.id, { 
          action: 'SHOW_NOTIFICATION', 
          data: {
            type: 'error',
            message: 'Vous devez être sur le site V-Mobility pour lancer ce flux'
          }
        });
        return false;
      }

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

  async _getCurrentTab() {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs[0]);
      });
    });
  }

  async _storeWorkflows(workflows) {
    return new Promise(resolve => {
      chrome.storage.local.set({ [this.workflowsKey]: workflows }, resolve);
    });
  }

  async _getStoredWorkflows() {
    return new Promise(resolve => {
      chrome.storage.local.get([this.workflowsKey], result => {
        resolve(result[this.workflowsKey] || []);
      });
    });
  }
}

// Exporter les classes globalement
window.AuthModule = AuthModule;
window.WorkflowsModule = WorkflowsModule; 