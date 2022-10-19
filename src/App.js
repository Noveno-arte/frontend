import './App.css';
import ListaRecetas from './pages/ListaRecetas';
import DetallesReceta from './pages/DetallesReceta';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
          <Route  path='/' element={<ListaRecetas/>}/> 
          <Route  path='/receta/:id' element={<DetallesReceta/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
