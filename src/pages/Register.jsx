import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const newUser = {
      firstname,
      lastname,
      email,
      password
    };

    const success = register(newUser);

    if (success) {
      navigate('/'); 
    } else {
      setError('Ten adres e-mail jest już zajęty!');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '70vh',
      backgroundColor: '#eee',
      padding: '20px'
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
          Rejestracja w SPD+
        </h2>

        {error && (
          <div style={{ backgroundColor: '#ff6b6b', color: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Imię:</label>
              <input 
                type="text" 
                required 
                value={firstname} 
                onChange={(e) => setFirstname(e.target.value)} 
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Nazwisko:</label>
              <input 
                type="text" 
                required 
                value={lastname} 
                onChange={(e) => setLastname(e.target.value)} 
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>
          

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Adres e-mail:</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Hasło:</label>
            <input 
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit"
            style={{
              backgroundColor: '#225496', color: '#fff', border: 'none', padding: '12px',
              borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px',
              transition: 'background 0.2s'
            }}
          >
            Utwórz konto
          </button>
        </form>
        
        <div style={{ marginTop: '20px', fontSize: '13px', textAlign: 'center' }}>
          Masz już konto? <Link to="/login" style={{ color: '#225496', fontWeight: 'bold' }}>Zaloguj się</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;