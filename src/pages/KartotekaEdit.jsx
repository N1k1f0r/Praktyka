import React, { useState } from 'react';
import '../styles/KartotekaEdit.css';
import { useNavigate, useParams } from 'react-router-dom';
import { data } from '../data/daneKartotek.js';

function KartotekaEdit() {
  const { regon } = useParams();
  const navigate = useNavigate();
  const [aktywnaZakladka, setAktywnaZakladka] = useState('wysylka');

  const firma = data.find((item) => item.regon === regon);
  const [formData, setFormData] = useState(firma || {});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const index = data.findIndex(item => item.regon === formData.regon);

    if (index !== -1) {
      let zaktualizowanaFirma = { ...data[index], ...formData };

      Object.keys(formData).forEach(klucz => {
        if (klucz.endsWith('_akt')) {
          const wartoscAkt = formData[klucz];
          if (wartoscAkt && wartoscAkt.trim() !== '') {
            const kluczBazowy = klucz.replace('_akt', '');
            zaktualizowanaFirma[kluczBazowy] = wartoscAkt;
          }
          zaktualizowanaFirma[klucz] = "";
        }
      });

      data[index] = zaktualizowanaFirma;

      alert("Zmiany zapisane pomyślnie!");
      navigate(`/kartoteka/${formData.regon}`);
    }
  };

  if (!firma) {
    return (
      <div className='formWrapper' style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Nie znaleziono firmy do edycji.</h2>
        <button type="button" onClick={() => navigate('/')}>Powrót do listy</button>
      </div>
    );
  }

  return (
    <div className='formWrapper'>
      <form onSubmit={handleSubmit}>
        <h3>Szczegóły jednostki</h3>
        <fieldset disabled style={{ border: 'none' }}>
          <div className="form-group">
            <label>Regon</label><br />
            <input type="text" name="regon" id="regon" value={formData.regon || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Nazwa(nk)</label><br />
            <input type="text" name="nazwa_nk" id="nazwa_nk" value={formData.nazwa_nk || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Nazwa(nsk):</label><br />
            <input type="text" name="nazwa_nsk" id="nazwa_nsk" value={formData.nazwa_nsk || ''} onChange={handleChange} />
          </div>
        </fieldset>

        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0' }}>
          <fieldset disabled style={{ border: 'none' }}>
            <h4>Dane teleadresowe</h4>
            <div className="form-group">
              <label>Miasto</label><br />
              <input type="text" name="miasto" id="miasto" value={formData.miasto || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Ulica</label><br />
              <input type="text" name="ulica" id="ulica" value={formData.ulica || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>MiastoS</label><br />
              <input type="text" name="miasto_s" id="miasto_s" value={formData.miasto_s || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>UlicaS</label><br />
              <input type="text" name="ulica_s" id="ulica_s" value={formData.ulica_s || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Telefon</label><br />
              <input type="text" name="telefon" id="telefon" value={formData.telefon || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Fax</label><br />
              <input type="text" name="fax" id="fax" value={formData.fax || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email org.</label><br />
              <input type="text" name="email_org" id="email_org" value={formData.email_org || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email OZS</label><br />
              <input type="text" name="email_ozs" id="email_ozs" value={formData.email_ozs || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email spr.</label><br />
              <input type="text" name="email_spr" id="email_spr" value={formData.email_spr || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>www</label><br />
              <input type="text" name="www" id="www" value={formData.www || ''} onChange={handleChange} />
            </div>
          </fieldset>
          
          <fieldset style={{ border: 'none' }}>
            <h4>Dane teleadresowe (aktualizacja danych)</h4>
            <div className="form-group">
              <label>Miasto</label><br />
              <input type="text" name="miasto_akt" id="miasto_akt" value={formData.miasto_akt || ''} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Ulica</label><br />
              <input type="text" name="ulica_akt" id="ulica_akt" value={formData.ulica_akt || ''} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>MiastoS</label><br />
              <input type="text" name="miasto_s_akt" id="miasto_s_akt" value={formData.miasto_s_akt || ''} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>UlicaS</label><br />
              <input type="text" name="ulica_s_akt" id="ulica_s_akt" value={formData.ulica_s_akt || ''} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Telefon</label><br />
              <input type="text" name="telefon_akt" id="telefon_akt" value={formData.telefon_akt || ''} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Fax</label><br />
              <input type="text" name="fax_akt" id="fax_akt" value={formData.fax_akt || ''} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Email org.</label><br />
              <input type="text" name="email_org_akt" id="email_org_akt" value={formData.email_org_akt || ''} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Email OZS</label><br />
              <input type="text" name="email_ozs_akt" id="email_ozs_akt" value={formData.email_ozs_akt || ''} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>Email spr.</label><br />
              <input type="text" name="email_spr_akt" id="email_spr_akt" value={formData.email_spr_akt || ''} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>www</label><br />
              <input type="text" name="www_akt" id="www_akt" value={formData.www_akt || ''} onChange={handleChange}/>
            </div>
          </fieldset>
          <fieldset style={{ border: 'none' }}>
            <h4>Dane jednostki (pozostałe)</h4>
            <div className="form-group">
              <label>won</label><br />
              <input type="text" name="won" id="won" value={formData.won || ''} onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label>test</label><br />
              <input type="text" name="test" id="test" value={formData.test || ''} onChange={handleChange}/>
            </div>
          </fieldset>
        </div>

        <div className='form-div-2' style={{ display: 'flex', justifyContent: 'space-between', margin: '30px 0' }}>
          <div>
            <label>Status </label>
            <select name="status" id="status" value={formData.status || ''} onChange={handleChange}>
              <option value="01">01 - Sprawozdanie zatwierdzone</option>
              <option value="02">02 - Sprawozdanie niezatwierdzone</option>
            </select>
          </div>
          <div>
            <label>RA: </label>
            <select name="ra" id="ra" value={formData.ra || ''} onChange={handleChange}>
              <option value="01">01 - Sprawozdanie zatwierdzone</option>
              <option value="02">02 - Sprawozdanie niezatwierdzone</option>
            </select>
          </div>
          <div>
            <label>ZRDA: </label>
            <select name="zrda" id="zrda" value={formData.zrda || ''} onChange={handleChange}>
              <option value="PS">PS</option>
            </select>
          </div>
        </div>

        <div className="form-div-3" style={{ display: 'flex' }}>
          <fieldset className="form-div-3a" style={{ border: 'none', width: '50%' }}>
            <div>
              <label>Szablon uwag:</label><br />
              <select name="szablon_uwag" id="szablon_uwag">
                <option>brak</option>
              </select>
              <button type="button" style={{ marginLeft: "5px" }}>+</button>
              <button type="button">Zarządzaj uwagami</button>
            </div>
            <div>
              <label>Uwagi:</label><br />
              <textarea name="uwagi" id="uwagi" value={formData.uwagi || ''} onChange={handleChange}></textarea>
            </div>
            <div>
              <label>Notatki:</label><br />
              <textarea name="notatki" id="notatki" value={formData.notatki || ''} onChange={handleChange}></textarea>
            </div>
          </fieldset>
          
          <fieldset className="form-div-3b" style={{ border: 'none', width: '50%' }}>
            <div style={{ display: 'flex', borderBottom: 'solid #22549655 1px' }}>
              <label className="zakladka" style={{
                borderBottom: aktywnaZakladka === 'wysylka' ? 'none' : 'solid #22549655 1px',
                backgroundColor: aktywnaZakladka === 'wysylka' ? '#fff' : '#eee'
              }}>
                <input
                  type="radio" name="zakladki" value="wysylka"
                  checked={aktywnaZakladka === 'wysylka'}
                  onChange={(e) => setAktywnaZakladka(e.target.value)}
                  style={{ display: 'none' }}
                />
                wysyłka pism
              </label>

              <label className="zakladka" style={{
                borderBottom: aktywnaZakladka === 'zrodla' ? 'none' : 'solid #22549655 1px',
                backgroundColor: aktywnaZakladka === 'zrodla' ? '#fff' : '#eee'
              }}>
                <input
                  type="radio" name="zakladki" value="zrodla"
                  checked={aktywnaZakladka === 'zrodla'}
                  onChange={(e) => setAktywnaZakladka(e.target.value)}
                  style={{ display: 'none' }}
                />
                źródła zewnętrzne
              </label>

              <label className="zakladka" style={{
                borderBottom: aktywnaZakladka === 'historia' ? 'none' : 'solid #22549655 1px',
                backgroundColor: aktywnaZakladka === 'historia' ? '#fff' : '#eee'
              }}>
                <input
                  type="radio" name="zakladki" value="historia"
                  checked={aktywnaZakladka === 'historia'}
                  onChange={(e) => setAktywnaZakladka(e.target.value)}
                  style={{ display: 'none' }}
                />
                historia zmian
              </label>
            </div>

            <div style={{ border: 'solid #22549655 1px', borderTop: 'none', padding: '15px', minHeight: '100px', backgroundColor: '#fff' }}>
              <div hidden={aktywnaZakladka !== 'wysylka'}>
                <select name="szablon_pism" id="szablon_pism">
                  <option> </option>
                </select><br />
                <input type="checkbox" name="wyslij_doc" id="wyslij_doc" /> <label>wyślij jako (.doc)</label><br />
                <input type="checkbox" name="wyslij_pdf" id="wyslij_pdf" /> <label>wyślij jako (.pdf)</label><br />
                <button type="button" style={{ marginTop: '10px' }}>Wyślij wiadomość email</button>
              </div>

              <div hidden={aktywnaZakladka !== 'zrodla'}>
                <p>Tu będą źródła zewnętrzne...</p>
              </div>

              <div hidden={aktywnaZakladka !== 'historia'}>
                <p>Tu będzie tabela z historią zmian...</p>
              </div>
            </div>
          </fieldset>
        </div>
        
        <div className="form-div-4">
          <p>data ostantniej modyfikacji: 21.07.2026 13:18</p>
          <div>
            <button type="button">Ustaw przypomnienie</button>
            <button type="button" onClick={() => navigate(-1)}>Anuluj zmiany</button>
            <button type="submit">Zapisz zmiany</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default KartotekaEdit;