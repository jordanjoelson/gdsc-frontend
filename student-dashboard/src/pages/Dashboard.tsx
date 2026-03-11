export default function Dashboard() {
  const navigate = require('react-router-dom').useNavigate();
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        style={{
          background: 'black', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontSize: '16px', marginTop: '24px', cursor: 'pointer'
        }}
        onClick={() => navigate('/settings')}
      >
        Go to Settings
      </button>
    </div>
  );
}
