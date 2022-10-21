import './App.css';
import ListaRecetas from './pages/ListaRecetas';
import DetallesReceta from './pages/DetallesReceta';
import EditarReceta from './pages/EditarReceta';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RECETAS from './data/recetas.json';
import {UserContext} from "./components/UserContext";
import {useState} from 'react';


function App() {
  const [recetas, setRecetas] = useState(RECETAS);

  return (
    <UserContext.Provider value={{recetas, setRecetas}}>
    <Router>
      <Routes>
          <Route  path='/' element={<ListaRecetas/>}/> 
          <Route  path='/receta/:id' element={<DetallesReceta/>}/> 
          <Route  path='/editar/:id' element={<EditarReceta/>}/> 
      </Routes>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
