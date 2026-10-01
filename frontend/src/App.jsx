import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dishes from './pages/Dishes';
import AddDish from './pages/AddDish';

function App() {
  // Keep the route list small so the CRUD flow stays easy to follow.
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="app-shell">
        <Navbar />

        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/dishes/add" element={<AddDish />} />
            <Route path="/dishes/:id/edit" element={<AddDish isEdit />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
