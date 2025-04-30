// Test du module d'authentification
describe('Module d\'authentification', () => {
  // Mock de l'API
  global.chrome = {
    storage: {
      local: {
        get: jest.fn(),
        set: jest.fn()
      }
    }
  };

  // Importer le module après avoir défini le mock
  const authModule = require('./auth');

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
  });

  test('Vérification de l\'existence des fonctions d\'authentification', () => {
    expect(typeof authModule.login).toBe('function');
    expect(typeof authModule.logout).toBe('function');
    expect(typeof authModule.isAuthenticated).toBe('function');
  });

  // Autres tests à implémenter lorsque les fonctions auront été développées
}); 