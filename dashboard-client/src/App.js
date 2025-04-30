import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Dashboard Client Maxia</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Bienvenue sur le Dashboard Client Maxia</h2>
      <p>Ce tableau de bord vous permet de gérer vos licences et de suivre l'activité de l'extension.</p>
    </div>
  );
}

function Login() {
  return (
    <div>
      <h2>Connexion</h2>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default App; 