import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './styles.css';

export default function Home() {
  const location = useLocation();
  const fisrtParse = location.hash.split('=');
  const secondParse = fisrtParse[1].split('&token')[0];
  localStorage.setItem('token', JSON.stringify(secondParse));

  return (
    <div className="menu-home">
      <h1 className="h1-home">
        Bem vindo ao SpotArtist, onde você procura todos seus artistas preferidos!
      </h1>
      <h2 className="h2-home">Vamos lá?</h2>
      <Link to="/busca" className="link-home">
        Buscar meu artista
      </Link>
    </div>
  );
}
