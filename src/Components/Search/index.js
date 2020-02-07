import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import noprofile from '../../assets/noprofile.png';

import './styles.css';

export default function Search() {
  const [word, setWord] = useState('');
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    async function loadApi() {
      const token = JSON.parse(localStorage.getItem('token'));

      if (word.length >= 4) {
        let response = await fetch(`https://api.spotify.com/v1/search?q=${word}&type=artist`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        response = await response.json();
        setArtist(response.artists.items);
      }
    }

    loadApi();
  }, [word]);

  function handleChange(e) {
    setWord(e.target.value);
  }

  return (
    <div>
      <div className="menu-search">
        <input
          value={word}
          onChange={handleChange}
          className="input-search"
          placeholder="Busque por artistas"
        />
        <Link className="history" to="/history">
          Histórico
        </Link>
      </div>
      <div className="product-info">
        {artist.map(artists => (
          <article key={artists.id}>
            <img
              alt="avatar"
              src={(artists && artists.images[0] && artists.images[0].url) || `${noprofile}`}
            />
            <Link
              onClick={() => {
                let history = JSON.parse(localStorage.getItem('history'));
                Array.isArray(history)
                  ? history.push({ id: artists.id, name: artists.name })
                  : (history = [{ id: artists.id, name: artists.name }]);
                localStorage.setItem('history', JSON.stringify(history));
              }}
              className="artist-name"
              to={`/artist/${artists.id}`}
            >
              {artists.name.slice(0, 18)}
            </Link>
            <h4>{artists.type}</h4>
          </article>
        ))}
      </div>
      </div>
  );
}
