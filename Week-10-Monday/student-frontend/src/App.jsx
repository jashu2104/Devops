import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import StudentDetails from './components/StudentDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />

        <main className="main-content" id="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Dashboard />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="footer-container">
            <p className="footer-title">
              College Student Management System
            </p>
            <p className="footer-meta">
              Course: DEVOPS AND FULLSTACK | Course Code: <strong>23CS102PE405</strong> | Assignment: <strong>10.1.1</strong>
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
