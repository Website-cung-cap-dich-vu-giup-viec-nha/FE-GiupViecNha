import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from "./components/Header"
import DangNhapView from './pages/DangNhapView';
import Footer from './components/Footer';
import TrangChuView from './pages/TrangChuView';
import DangKyView from './pages/DangKyView';
function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<TrangChuView/>}/>
        <Route path='/dangnhap' element={<DangNhapView/>}/>
        <Route path='/dangky' element={<DangKyView/>}/>
      </Routes>
      
      <Footer/>
    </div>
  );
}

export default App;
