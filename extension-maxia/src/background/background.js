/**
 * Script de fond (service_worker) pour l'extension Maxia
 * Gère les événements en arrière-plan et les communications avec le serveur
 */

// Écouter l'installation de l'extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Actions à effectuer lors de l'installation initiale
    console.log('Extension Maxia installée');
    
    // Rediriger vers la page de bienvenue/configuration
    // chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') });
  } else if (details.reason === 'update') {
    // Actions à effectuer lors de la mise à jour
    console.log(`Extension Maxia mise à jour vers la version ${chrome.runtime.getManifest().version}`);
  }
});

// Écouter les messages provenant des scripts de contenu ou du popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'CHECK_AUTH') {
    // Vérifier l'authentification de l'utilisateur
    checkAuthentication()
      .then(isAuthenticated => {
        sendResponse({ isAuthenticated });
      })
      .catch(error => {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        sendResponse({ isAuthenticated: false, error: error.message });
      });
    
    return true; // Indique que la réponse sera envoyée de manière asynchrone
  }
  
  if (message.action === 'TRACK_WORKFLOW') {
    // Enregistrer l'utilisation d'un flux de travail
    trackWorkflowUsage(message.data)
      .then(result => {
        sendResponse({ success: true });
      })
      .catch(error => {
        console.error('Erreur lors de l\'enregistrement de l\'utilisation du flux:', error);
        sendResponse({ success: false, error: error.message });
      });
    
    return true; // Indique que la réponse sera envoyée de manière asynchrone
  }
});

/**
 * Vérifier l'authentification de l'utilisateur
 * @returns {Promise<boolean>} - Indique si l'utilisateur est authentifié
 */
async function checkAuthentication() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['maxia_auth_token', 'maxia_user_data'], (result) => {
      resolve(!!result.maxia_auth_token && !!result.maxia_user_data);
    });
  });
}

/**
 * Enregistrer l'utilisation d'un flux de travail
 * @param {Object} data - Données d'utilisation du flux
 * @returns {Promise<Object>} - Résultat de l'opération
 */
async function trackWorkflowUsage(data) {
  try {
    // Dans un environnement de production, cette requête serait envoyée au serveur
    // Pour cette structure de base, nous simulons une réponse
    
    // Exemple de code pour une vraie API:
    /*
    const token = await getAuthToken();
    
    if (!token) {
      throw new Error('Non authentifié');
    }
    
    const response = await fetch('https://api.maxia.com/api/v1/workflows/track', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur lors de l\'enregistrement');
    }
    
    return await response.json();
    */
    
    // Simulation d'enregistrement pour la structure de base
    console.log('Utilisation du flux enregistrée:', data);
    
    // Enregistrer localement pour le développement
    const usageData = {
      timestamp: new Date().toISOString(),
      workflowId: data.workflowId,
      successful: data.successful,
      duration: data.duration,
      url: data.url
    };
    
    return new Promise((resolve) => {
      chrome.storage.local.get(['maxia_workflow_usage'], (result) => {
        const usage = result.maxia_workflow_usage || [];
        usage.push(usageData);
        
        chrome.storage.local.set({ 'maxia_workflow_usage': usage }, () => {
          resolve({ success: true });
        });
      });
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisation:', error);
    throw error;
  }
}

/**
 * Récupérer le token d'authentification
 * @returns {Promise<string|null>} - Token d'authentification ou null
 */
async function getAuthToken() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['maxia_auth_token'], (result) => {
      resolve(result.maxia_auth_token || null);
    });
  });
} 