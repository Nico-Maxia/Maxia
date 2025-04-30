document.addEventListener('DOMContentLoaded', async () => {
  // Initialisation des modules
  const authModule = new AuthModule();
  const workflowsModule = new WorkflowsModule();
  
  // Éléments du DOM
  const loginForm = document.getElementById('loginFormElement');
  const loginMessage = document.getElementById('loginMessage');
  const authSection = document.getElementById('authSection');
  const mainSection = document.getElementById('mainSection');
  const userName = document.getElementById('userName');
  const licenseInfo = document.getElementById('licenseInfo');
  const workflowsList = document.getElementById('workflowsList');
  const logoutBtn = document.getElementById('logoutBtn');
  
  // Vérifier si l'utilisateur est déjà connecté
  const checkAuthStatus = async () => {
    try {
      const user = await authModule.getCurrentUser();
      if (user) {
        // Utilisateur connecté, afficher l'interface principale
        showMainInterface(user);
      } else {
        // Utilisateur non connecté, afficher le formulaire de connexion
        showLoginForm();
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut d\'authentification:', error);
      showLoginForm();
    }
  };
  
  // Afficher l'interface principale
  const showMainInterface = async (user) => {
    authSection.classList.add('hidden');
    mainSection.classList.remove('hidden');
    
    // Afficher les informations de l'utilisateur
    userName.textContent = user.name || user.email;
    licenseInfo.textContent = user.license || 'Non disponible';
    
    // Charger les flux de travail disponibles
    const workflows = await workflowsModule.getAvailableWorkflows();
    renderWorkflows(workflows);
  };
  
  // Afficher le formulaire de connexion
  const showLoginForm = () => {
    authSection.classList.remove('hidden');
    mainSection.classList.add('hidden');
    loginForm.reset();
    loginMessage.textContent = '';
  };
  
  // Afficher les flux de travail disponibles
  const renderWorkflows = (workflows) => {
    workflowsList.innerHTML = '';
    if (workflows && workflows.length > 0) {
      workflows.forEach(workflow => {
        const li = document.createElement('li');
        li.classList.add('workflow-item');
        li.innerHTML = `
          <div class="workflow-info">
            <h3>${workflow.name}</h3>
            <p>${workflow.description}</p>
          </div>
          <button class="btn btn-primary launch-workflow" data-id="${workflow.id}">Lancer</button>
        `;
        workflowsList.appendChild(li);
      });
      
      // Ajouter des écouteurs d'événements pour les boutons de lancement de flux
      document.querySelectorAll('.launch-workflow').forEach(button => {
        button.addEventListener('click', (e) => {
          const workflowId = e.target.getAttribute('data-id');
          workflowsModule.launchWorkflow(workflowId);
        });
      });
    } else {
      workflowsList.innerHTML = '<li class="no-workflows">Aucun flux disponible</li>';
    }
  };
  
  // Gestionnaire d'événements pour le formulaire de connexion
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      loginMessage.textContent = 'Connexion en cours...';
      const user = await authModule.login(email, password);
      showMainInterface(user);
    } catch (error) {
      loginMessage.textContent = error.message || 'Erreur de connexion';
      console.error('Erreur de connexion:', error);
    }
  });
  
  // Gestionnaire d'événements pour la déconnexion
  logoutBtn.addEventListener('click', async () => {
    try {
      await authModule.logout();
      showLoginForm();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  });
  
  // Vérifier le statut d'authentification au chargement
  checkAuthStatus();
}); 