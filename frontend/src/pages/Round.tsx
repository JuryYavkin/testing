import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Round() {
  const { id } = useParams<{ id: string }>();
  const [info, setInfo] = useState<any>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`/api/rounds/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setInfo);
  }, [id]);

  async function tap() {
    await fetch(`/api/rounds/${id}/tap`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    const data = await fetch(`/api/rounds/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json());
    setInfo(data);
  }

  if (!info) return <div>Loading...</div>;

  return (
    <div>
      <div>Round: {info.id}</div>
      <div>Start: {info.start}</div>
      <div>End: {info.end}</div>
      <div>Total: {info.totalScore}</div>
      <div>My points: {info.myPoints}</div>
      {info.winner && <div>Winner: {info.winner.username} {info.winner.points}</div>}
      <button onClick={tap}>Tap goose</button>
    </div>
  );
}
