import './App.css';
import ListaRecetas from './pages/ListaRecetas';
import DetallesReceta from './pages/DetallesReceta';
import EditarReceta from './pages/EditarReceta';
import AgregarReceta from './pages/AgregarReceta';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
          <Route  path='/' element={<ListaRecetas/>}/> 
          <Route  path='/receta/:id' element={<DetallesReceta/>}/> 
          <Route  path='/editar/:id' element={<EditarReceta/>}/> 
          <Route  path='/agregar' element={<AgregarReceta/>}/> 
      </Routes>
    </Router>
  );
}

export default App;
