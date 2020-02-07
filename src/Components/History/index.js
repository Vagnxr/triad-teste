import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function History() {
  const history = JSON.parse(localStorage.getItem('history'));

  function HistoryItem({ name, id }) {
    console.log(name, id);

    return (
      <li>
        <Link to={`/artist/${id}`}>{name}</Link>
      </li>
    );
  }

  return (
    <div className="history-menu">
      <h1>Pesquisas recentes:</h1>

      <ul>
        {history.map((item, i) => (
          <HistoryItem key={i} id={item.id} name={item.name} />
        ))}
      </ul>
    </div>
  );
}
