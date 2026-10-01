import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { getDishes } from '../services/api';

function Home() {
  const [stats, setStats] = useState({ total: 0, available: 0, unavailable: 0, categories: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        // Load the latest dishes once and derive the summary counts from that response.
        const dishes = await getDishes();
        const categories = new Set(dishes.map((dish) => dish.category)).size;

        setStats({
          total: dishes.length,
          available: dishes.filter((dish) => dish.is_available).length,
          unavailable: dishes.filter((dish) => !dish.is_available).length,
          categories,
        });
      } catch (err) {
        console.error('Dashboard load error:', err);
        setError(err.message || 'Unable to load the dashboard.');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) return <Loading message="Loading dashboard..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>eMobilis Dishes</h1>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Available dishes</span>
          <strong>{stats.available}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Unavailable dishes</span>
          <strong>{stats.unavailable}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Categories</span>
          <strong>{stats.categories}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total dishes</span>
          <strong>{stats.total}</strong>
        </div>
      </div>

      <div className="cta-row">
        <Link to="/dishes" className="primary-button">
          Browse dishes
        </Link>
        <Link to="/dishes/add" className="secondary-button">
          Add a dish
        </Link>
      </div>
    </section>
  );
}

export default Home;
