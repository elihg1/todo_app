import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ObjetivosPage from './pages/ObjetivosPage';
import ObjetivoDetail from './pages/ObjetivoDetail';
import './App.css'; 

function App() {
    return (
        <Router>
            <nav className="navbar">
                <Link to="/"><h1>Todo App</h1></Link>
                <Link to="/">Objetivos</Link>
            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<ObjetivosPage />} />
                    <Route path="/objetivo/:id" element={<ObjetivoDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;