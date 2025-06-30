import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Round {
  id: string;
  start: string;
  end: string;
}

export default function RoundList() {
  const [rounds, setRounds] = useState<Round[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/rounds').then(r => r.json()).then(setRounds);
  }, []);

  async function create() {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/rounds', { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    navigate(`/rounds/${data.id}`);
  }

  return (
    <div>
      <button onClick={create}>Create round</button>
      <ul>
        {rounds.map(r => (
          <li key={r.id}>
            <Link to={`/rounds/${r.id}`}>{r.id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
