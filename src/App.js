import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CertificationPage from './pages/CertificationPage';
import CoursePage from './pages/CoursePage';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './components/AdminPanel';
import CertificateAdminPanel from './components/CertificateAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certifications/:id?" element={<CertificationPage />} />
        <Route path="/courses/:id?" element={<CoursePage />} />
        <Route path="/admin-board" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path='/certificate-admin-pannel-access' element={<CertificateAdminPanel/>}/>
      </Routes>
    </Router>
  );
}

export default App;