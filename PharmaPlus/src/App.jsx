import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Footer from './components/Footer/footer.jsx';
import Queue from './pages/queue/queue.jsx';
import Inventory from './pages/inventory/inventory.jsx';
import Appointments from './pages/appointments/appointments.jsx';
import Login from './pages/auth/login/login.jsx';
import Register from './pages/auth/register/register.jsx';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
      <Footer/>
      </>
  );
}

export default App; 