import {Routes, Route, Navigate} from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import Professionals from './pages/Professionals.jsx'
import Services from './pages/Services.jsx'
import Admin from './pages/Admin.jsx'
import ProfessionalsAdd from './pages/ProfessionalsAdd.jsx'
import ServicesAdd from './pages/ServicesAdd.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AccessRequired from './containers/AccessRequired.jsx'
function App() 
{
  return (
    <Routes>
      <Route element=<Layout user={"client"}/>>
        <Route path="/home" element=<Home /> />
        <Route path="/professionals" element=<Professionals /> />
        <Route path="/services" element=<Services /> />
        <Route path="/contact" element=<Contact /> />
        <Route path="*" element=<Navigate to="/home"/> />
        <Route path="/login" element=<Login /> />
        <Route path="/register" element=<Register/> />
      </Route>

      <Route element=
        <AccessRequired minLevel = "2" redirect ="/home">
          <Layout user={"admin"}/>
        </AccessRequired> 
      >
        <Route path="/admin" element=<Admin /> />
        <Route path="/professionals_add" element=<ProfessionalsAdd /> />
        <Route path="/services_add" element=<ServicesAdd /> />
      </Route>
    </Routes>
  );
}
export default App; 