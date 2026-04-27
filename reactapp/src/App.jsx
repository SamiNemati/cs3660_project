import {Routes, Route, Navigate} from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import Professionals from './pages/Professionals.jsx'
import Services from './pages/Services.jsx'
import Admin from './pages/Admin.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AccessRequired from './containers/AccessRequired.jsx'
import Profile from './pages/Profile'
import AdminUsers from './pages/AdminUsers'
import Billing from './pages/Billing'
import Payment from './containers/Payment.jsx'

function App() 
{
  return (
    <Routes>
      <Route element=<Layout user={"client"}/>>
        <Route path="/home" element=<Home /> />
        <Route path="/professionals" element=<Professionals /> />
        <Route path="/services" element=<Services /> />
        <Route path="/contact" element=<Contact /> />
        <Route path="/login" element=<Login /> />
        <Route path="/register" element=<Register/> />
        <Route path="/admin" element=<Admin /> />
        <Route path="/profile" element= <Profile /> />
        <Route path="/users" element=
          <AccessRequired minLevel= "3" redirect="/home">
            <AdminUsers />
          </AccessRequired>
        />
        <Route path="/billing" element=
          <AccessRequired minLevel= "1" redirect="/home">
            <Billing />
          </AccessRequired>
        />
        <Route path="/payment" element=
          <AccessRequired minLevel= "1" redirect="/home">
            <Payment />
          </AccessRequired>
        />
        <Route path="*" element=<Navigate to="/home"/> />
      </Route>
    </Routes>
  );
}
export default App; 