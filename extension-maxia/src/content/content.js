/**
 * Script de contenu pour l'extension Maxia
 * Injecté dans les pages correspondant au pattern dans le manifest
 * Permet d'interagir avec le site V-Mobility
 */

// Stocker les références aux observateurs et timers
const observers = {};
let notificationTimeout;

// Initialisation
(function() {
  console.log('Maxia Content Script chargé');
  
  // Vérifier si nous sommes sur une page V-Mobility
  if (window.location.href.includes('saas.v-mobility.fr/ireception')) {
    initializeContentScript();
  }
})();

/**
 * Initialiser le script de contenu
 */
function initializeContentScript() {
  // Créer le conteneur de notification
  createNotificationContainer();
  
  // Écouter les messages du background script ou du popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message reçu dans le content script:', message);
    
    if (message.action === 'RUN_WORKFLOW') {
      const workflowId = message.data.workflowId;
      executeWorkflow(workflowId)
        .then(result => {
          sendResponse({ success: true, result });
        })
        .catch(error => {
          console.error('Erreur lors de l\'exécution du flux:', error);
          sendResponse({ success: false, error: error.message });
          showNotification('error', `Erreur: ${error.message}`);
        });
      
      return true; // Indique que la réponse sera envoyée de manière asynchrone
    }
    
    if (message.action === 'SHOW_NOTIFICATION') {
      showNotification(message.data.type, message.data.message);
      sendResponse({ success: true });
      return false;
    }
  });
  
  // Injecter le CSS
  injectStyles();
}

/**
 * Exécuter un flux de travail spécifique
 * @param {string} workflowId - Identifiant du flux de travail
 * @returns {Promise<Object>} - Résultat de l'exécution
 */
async function executeWorkflow(workflowId) {
  // Mesurer le temps d'exécution
  const startTime = Date.now();
  
  try {
    showNotification('info', 'Lancement du flux de travail...');
    
    let result;
    
    // Exécuter le flux correspondant à l'ID
    switch(workflowId) {
      case 'workflow1':
        // Flux: Création de commande
        result = await executeOrderCreationWorkflow();
        break;
      case 'workflow2':
        // Flux: Recherche client
        result = await executeCustomerSearchWorkflow();
        break;
      default:
        throw new Error(`Flux de travail inconnu: ${workflowId}`);
    }
    
    // Calculer la durée
    const duration = Date.now() - startTime;
    
    // Enregistrer l'utilisation du flux
    chrome.runtime.sendMessage({
      action: 'TRACK_WORKFLOW',
      data: {
        workflowId,
        successful: true,
        duration,
        url: window.location.href
      }
    });
    
    showNotification('success', 'Flux de travail terminé avec succès!');
    
    return result;
  } catch (error) {
    // Calculer la durée même en cas d'erreur
    const duration = Date.now() - startTime;
    
    // Enregistrer l'échec
    chrome.runtime.sendMessage({
      action: 'TRACK_WORKFLOW',
      data: {
        workflowId,
        successful: false,
        duration,
        url: window.location.href,
        error: error.message
      }
    });
    
    throw error;
  }
}

/**
 * Exécuter le flux de création de commande
 * @returns {Promise<Object>} - Résultat de l'exécution
 */
async function executeOrderCreationWorkflow() {
  // Simulation du flux de création de commande pour la structure de base
  // À remplacer par la logique réelle d'interaction avec le site
  
  // Exemple d'implémentation réelle:
  /*
  // 1. Accéder à la page de création de commande
  if (!window.location.href.includes('/ireception/orders/new')) {
    // Naviguer vers la page de création de commande
    const menuButton = await waitForElement('.menu-orders');
    menuButton.click();
    
    const newOrderButton = await waitForElement('.new-order-button');
    newOrderButton.click();
    
    // Attendre le chargement de la page
    await waitForElement('#order-form');
  }
  
  // 2. Remplir le formulaire
  const customerField = document.querySelector('#customer-search');
  customerField.value = 'Client test';
  customerField.dispatchEvent(new Event('input', { bubbles: true }));
  
  // Attendre les résultats de recherche
  const customerResult = await waitForElement('.customer-result');
  customerResult.click();
  
  // Remplir les autres champs du formulaire
  document.querySelector('#order-type').value = 'Standard';
  document.querySelector('#order-notes').value = 'Commande créée via Maxia';
  
  // 3. Soumettre le formulaire
  const submitButton = document.querySelector('#submit-order');
  submitButton.click();
  
  // 4. Attendre la confirmation
  const confirmationMessage = await waitForElement('.order-confirmation');
  
  return {
    orderId: confirmationMessage.getAttribute('data-order-id'),
    status: 'created'
  };
  */
  
  // Simulation pour la structure de base
  return new Promise((resolve) => {
    // Simuler le temps de traitement
    setTimeout(() => {
      resolve({
        orderId: 'ORD-' + Math.floor(Math.random() * 10000),
        status: 'created'
      });
    }, 2000);
  });
}

/**
 * Exécuter le flux de recherche client
 * @returns {Promise<Object>} - Résultat de l'exécution
 */
async function executeCustomerSearchWorkflow() {
  // Simulation du flux de recherche client pour la structure de base
  // À remplacer par la logique réelle d'interaction avec le site
  
  // Simulation pour la structure de base
  return new Promise((resolve) => {
    // Simuler le temps de traitement
    setTimeout(() => {
      resolve({
        customersFound: 5,
        searchCompleted: true
      });
    }, 1500);
  });
}

/**
 * Créer un conteneur pour les notifications
 */
function createNotificationContainer() {
  const container = document.createElement('div');
  container.id = 'maxia-notification-container';
  container.style.display = 'none';
  
  document.body.appendChild(container);
}

/**
 * Afficher une notification
 * @param {string} type - Type de notification (info, success, error)
 * @param {string} message - Message à afficher
 */
function showNotification(type, message) {
  const container = document.getElementById('maxia-notification-container');
  
  if (!container) {
    console.error('Conteneur de notification non trouvé');
    return;
  }
  
  // Effacer le contenu précédent
  container.innerHTML = '';
  container.style.display = 'block';
  
  // Ajouter la classe de type
  container.className = `maxia-notification maxia-notification-${type}`;
  
  // Ajouter le message
  container.textContent = message;
  
  // Afficher pendant 3 secondes
  clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => {
    container.style.display = 'none';
  }, 3000);
}

/**
 * Injecter les styles CSS
 */
function injectStyles() {
  const styles = `
    #maxia-notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      max-width: 300px;
      padding: 10px 15px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      z-index: 9999;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 14px;
      transition: opacity 0.3s ease;
    }
    
    .maxia-notification-info {
      background-color: #e3f2fd;
      color: #0d47a1;
      border-left: 4px solid #2196f3;
    }
    
    .maxia-notification-success {
      background-color: #e8f5e9;
      color: #1b5e20;
      border-left: 4px solid #4caf50;
    }
    
    .maxia-notification-error {
      background-color: #ffebee;
      color: #b71c1c;
      border-left: 4px solid #f44336;
    }
  `;
  
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  
  document.head.appendChild(styleElement);
}

/**
 * Attendre qu'un élément soit disponible dans le DOM
 * @param {string} selector - Sélecteur CSS de l'élément
 * @param {number} timeout - Délai d'attente maximum en ms
 * @returns {Promise<Element>} - Élément trouvé
 */
function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    // Vérifier si l'élément existe déjà
    const element = document.querySelector(selector);
    if (element) {
      return resolve(element);
    }
    
    // Définir un timeout
    const timeoutId = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Élément non trouvé: ${selector}`));
    }, timeout);
    
    // Observer les changements du DOM
    const observer = new MutationObserver((mutations) => {
      const element = document.querySelector(selector);
      if (element) {
        clearTimeout(timeoutId);
        observer.disconnect();
        resolve(element);
      }
    });
    
    // Commencer l'observation
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Stocker l'observateur pour pouvoir le déconnecter plus tard
    observers[selector] = observer;
  });
} 