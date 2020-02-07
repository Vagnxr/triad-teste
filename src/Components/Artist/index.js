import React, { useEffect, useState } from 'react';
import noprofile from '../../assets/noprofile.png';
import moment from 'moment';

import './styles.css';

export default function Artist({ match }) {
  const [artist, setArtist] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    const { id } = match.params;

    async function loadApi() {
      let response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      response = await response.json();
      setArtist(response);

      let album = await fetch(`https://api.spotify.com/v1/artists/${id}/albums?limit=10`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      album = await album.json();
      setAlbums(album.items);
    }
    loadApi();
  }, []);

  return (
    <div>
      <div className="menu-artist">
        <img
          src={(artist && artist.images && artist.images[0].url) || `${noprofile}`}
          alt="artist"
        />
        <div className="data-artist">
          <h1>{artist.name}</h1>
          <p>Gêneros: {artist && artist.genres && artist.genres.join(', ')}</p>
          <p>Popularidade: {artist.popularity}</p>
        </div>
      </div>
      <strong className="text-album">Álbuns</strong>
      {albums.map(album => (
        <div key={album.id} className="album-artist">
          <div className="album-block">
            <img
              src={(album && album.images[0] && album.images[0].url) || `${noprofile}`}
              alt="album"
            />
            <strong>{album.name}</strong>
            <p>{moment(album.release_date).format('DD/MM/YYYY')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
