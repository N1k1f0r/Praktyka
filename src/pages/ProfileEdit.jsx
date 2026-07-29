import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProfileEdit() {
    const { user, isLoggedIn, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [firstname, setFirstname] = useState(user?.firstname || '');
    const [lastname, setLastname] = useState(user?.lastname || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [position, setPosition] = useState(user?.position || '');

    useEffect(() => {
        if (!isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {
            firstname,
            lastname,
            phone,
            position
        };

        updateProfile(updatedData);

        navigate('/');
    };

    if (!user) return null;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', backgroundColor: '#eee', padding: '20px' }}>
            <div style={{ backgroundColor: '#fff', padding: '30px 40px', borderRadius: '10px', boxShadow: '5px 5px 15px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ color: '#225496', marginTop: 0, textAlign: 'center', borderBottom: '2px solid #22549633', paddingBottom: '15px' }}>
                    Edycja Profilu
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>


                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Imię:</label>
                        <input
                            type="text" required value={firstname} onChange={(e) => setFirstname(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Nazwisko:</label>
                        <input
                            type="text" required value={lastname} onChange={(e) => setLastname(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        />
                    </div>


                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Telefon:</label>
                        <input
                            type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Stanowisko:</label>
                        <input
                            type="text" value={position} onChange={(e) => setPosition(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            style={{ flex: 1, backgroundColor: '#fff', color: '#225496', border: '1px solid #225496', padding: '12px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            Anuluj
                        </button>
                        <button
                            type="submit"
                            style={{ flex: 1, backgroundColor: '#225496', color: '#fff', border: 'none', padding: '12px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            Zapisz zmiany
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ProfileEdit;