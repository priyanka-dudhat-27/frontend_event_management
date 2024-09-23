import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from './context/Authcontext';  
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './components/Header';
import EventForm from './components/EventForm';
import MyEvents from './components/MyEvents';
import EditEvent from './components/EditEvent';
import EventDetails from './components/EventDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/event/:eventId" element={<EventDetails/>} />
            <Route path="/edit-event/:eventId" element={<EditEvent/>} />
            <Route path="/create-event" element={<EventForm/>}/>
            <Route path="/my-events" element={<MyEvents/>}/>
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
          <ToastContainer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
