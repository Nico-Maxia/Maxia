import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Maxia - Optimisation de travail</title>
        <meta name="description" content="Solution d'optimisation pour v-mobility" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Bienvenue sur Maxia
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8 my-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Dashboard Admin</h2>
            <p className="text-gray-600 mb-6 text-center">
              Accès réservé aux administrateurs
            </p>
            <Link href="https://admin.maxia.fr" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
              Connexion Admin
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Dashboard Client</h2>
            <p className="text-gray-600 mb-6 text-center">
              Gérez votre entreprise et vos licences
            </p>
            <Link href="https://client.maxia.fr" className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition">
              Espace Client
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Extension Chrome</h2>
            <p className="text-gray-600 mb-6 text-center">
              Optimisez votre travail sur v-mobility
            </p>
            <a href="#" className="bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700 transition">
              Télécharger l'extension
            </a>
          </div>
        </div>

        <div className="w-full max-w-3xl mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">Demande de création de compte</h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input type="text" id="nom" name="nom" className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                <input type="text" id="prenom" name="prenom" className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              
              <div>
                <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
                <input type="text" id="entreprise" name="entreprise" className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              
              <div>
                <label htmlFor="siren" className="block text-sm font-medium text-gray-700 mb-1">Numéro SIREN</label>
                <input type="text" id="siren" name="siren" className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              
              <div>
                <label htmlFor="licences" className="block text-sm font-medium text-gray-700 mb-1">Nombre de licences</label>
                <input type="number" id="licences" name="licences" min="1" className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input type="tel" id="telephone" name="telephone" className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-1">Adresse de l'entreprise</label>
                <textarea id="adresse" name="adresse" rows="3" className="w-full p-2 border border-gray-300 rounded-md" required></textarea>
              </div>
              
              <div className="md:col-span-2 text-center">
                <button type="submit" className="bg-blue-600 text-white py-2 px-8 rounded-md hover:bg-blue-700 transition">
                  Envoyer la demande
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="mt-16 text-center text-gray-600 py-8">
        <p>© {new Date().getFullYear()} Maxia. Tous droits réservés.</p>
      </footer>
    </div>
  );
} 