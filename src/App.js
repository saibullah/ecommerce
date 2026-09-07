
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';

import Admindashbord from './pages/Admindashbord';
import Home from './pages/Home';
import Createproduct from './pages/Createproduct';
import Editproduct from './pages/Editproduct';
import AdminRoute from './components/Adminroute';
import ProtectedRoute from './components/ProtectedRoute';
import AddtoCart from './pages/AddToCart';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}/>  
      <Route path='/Login' element={<Login/>}/>  
      <Route path='/' element={<Home/>}/>  
      <Route path='/addtocart' element={<ProtectedRoute><AddtoCart/></ProtectedRoute>}/>  
      <Route path='/admindasbord' element={<AdminRoute><Admindashbord/></AdminRoute>}/>  
      <Route path='/createproduct' element={<AdminRoute><Createproduct/></AdminRoute>}/>
      <Route path='/editproduct/:id' element={<AdminRoute><Editproduct/></AdminRoute>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
