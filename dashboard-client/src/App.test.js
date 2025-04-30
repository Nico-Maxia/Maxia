import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('Affiche le titre du dashboard client', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { level: 1, name: /Dashboard Client Maxia/i });
  expect(titleElement).toBeInTheDocument();
});

test('Affiche les éléments de la page d\'accueil', () => {
  render(<App />);
  const welcomeElement = screen.getByRole('heading', { level: 2, name: /Bienvenue sur le Dashboard Client Maxia/i });
  expect(welcomeElement).toBeInTheDocument();
}); 