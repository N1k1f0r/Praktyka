import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Zapobiega przeładowaniu strony
    setError('');

    // Wywołujemy funkcję logującą z AuthContext
    const success = login(email, password);

    if (success) {
      navigate('/'); // Sukces! Wracamy na główny dashboard
    } else {
      setError('Nieprawidłowy adres e-mail lub hasło!');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      backgroundColor: '#eee'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '30px 40px',
        borderRadius: '10px',
        boxShadow: '5px 5px 15px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '380px'
      }}>
        <h2 style={{ color: '#225496', marginTop: 0, textAlign: 'center', borderBottom: '2px solid #22549633', paddingBottom: '15px' }}>
          Logowanie do SPD+
        </h2>

        {error && (
          <div style={{ backgroundColor: '#ff6b6b', color: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
              Adres e-mail:
            </label>
            <input 
              type="email"
              placeholder="np. a.kowal@spd.pl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
              Hasło:
            </label>
            <input 
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit"
            style={{
              backgroundColor: '#225496',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'background 0.2s'
            }}
          >
            Zaloguj się
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
          <p>Tymczasowe dane do testów:</p>
          <p><strong>Admin:</strong> a.kowal@spd.pl / admin</p>
          <p><strong>User:</strong> a.kowalska@spd.pl / user</p>
        </div>
      </div>
    </div>
  );
}

export default Login;