"use client";
import { useState } from 'react';

export default function TestLogin() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    setResult('Début du test...');
    
    try {
      // Test 1: Appel API de connexion
      setResult('Test 1: Appel API de connexion...');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: 'freelance@gmail.com', 
          password: '123456' 
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(`✅ API OK - Token reçu: ${data.data.token.substring(0, 20)}...`);
        
        // Test 2: Stockage localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        setResult(prev => prev + '\n✅ LocalStorage OK');
        
        // Test 3: Cookie
        document.cookie = `token=${data.data.token}; path=/; max-age=604800`;
        setResult(prev => prev + '\n✅ Cookie défini');
        
        // Test 4: Redirection
        setResult(prev => prev + '\n🔄 Redirection vers dashboard...');
        
        setTimeout(() => {
          window.location.href = '/dashboard/freelance';
        }, 2000);
        
      } else {
        setResult(`❌ Erreur API: ${data.error || data.message}`);
      }
    } catch (error) {
      setResult(`❌ Erreur: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Test de Connexion</h1>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg mb-4"
        >
          {loading ? 'Test en cours...' : 'Tester la connexion'}
        </button>
        
        <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
          <h3 className="font-semibold mb-2">Résultats:</h3>
          <pre className="text-sm whitespace-pre-wrap">{result}</pre>
        </div>
        
        <div className="mt-4 text-center">
          <a href="/auth/login" className="text-blue-600 hover:underline">
            ← Retour à la connexion normale
          </a>
        </div>
      </div>
    </div>
  );
}
