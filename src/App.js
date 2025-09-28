import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero'; 
import VehiclesList from './pages/Items'; 
import Footer from './components/Footer';

// Category Pages
import BikesPage from './pages/BikesPage';
import ScootiesPage from './pages/ScootiesPage';
import ElectricalPage from './pages/ElectricalPage';
import BicyclePage from './pages/BicyclePage';
import FuelPage from './pages/FuelPage'; 
import ElectricalAdultPage from './pages/ElectricalAdultPage';
import ElectricalChildrenPage from './pages/ElectricalChildrenPage';
import SportsBicyclePage from './pages/SportsBicyclePage';
import NormalCyclePage from './pages/NormalCyclePage';

// --- 1. IMPORT THE AUTHENTICATION PAGE ---
// Assuming your combined Login/Signup component is saved as './pages/AuthPage.jsx'
import AuthPage from './pages/AuthPage'; 

// Placeholder pages (You can replace these with full components later)
const ContactPage = ({ onNavigate }) => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h2>Contact Us</h2>
    <button onClick={() => onNavigate('contact')}>Go Home</button>
  </div>
);

const AboutPage = ({ onNavigate }) => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h2>About Vaahan Bazar</h2>
    <button onClick={() => onNavigate('home')}>Go Home</button>
  </div>
);

// NOTE: The previous 'SignupPage' placeholder is completely removed, 
// and the AuthPage component handles the 'signup' state.

const App = () => {
  // State to manage which view/page is currently active
  const [currentPage, setCurrentPage] = useState('home');

  // Global navigation function passed to all components
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  let content;
  
  // --- 2. CONDITIONAL RENDERING LOGIC ---
  if (currentPage === 'home') {
    content = <Hero onNavigate={handleNavigate} />; 
  } else if (currentPage === 'items') {
    content = <VehiclesList onNavigate={handleNavigate} />; 
  } else if (currentPage === 'fuel') { 
    content = <FuelPage onNavigate={handleNavigate} />; 
  } else if (currentPage === 'bikes') {
    content = <BikesPage onNavigate={handleNavigate} />; 
  } else if (currentPage === 'scooties') {
    content = <ScootiesPage onNavigate={handleNavigate} />; 
  } else if (currentPage === 'electrical') {
    content = <ElectricalPage onNavigate={handleNavigate} />; 
  } else if (currentPage === 'bicycle') {
    content = <BicyclePage onNavigate={handleNavigate} />; 
  } else if (currentPage === 'contact') {
    content = <ContactPage onNavigate={handleNavigate} />;
  } else if (currentPage === 'about') {
    content = <AboutPage onNavigate={handleNavigate} />;
  } else if (currentPage === 'electrical') {
    content = <ElectricalPage onNavigate={handleNavigate} />; 
} else if (currentPage === 'electricalAdult') { // NEW ROUTE
    content = <ElectricalAdultPage onNavigate={handleNavigate} />;
} else if (currentPage === 'electricalChildren') { // NEW ROUTE
    content = <ElectricalChildrenPage onNavigate={handleNavigate} />;
}
else if (currentPage === 'sportsBicycle') {
        content = <SportsBicyclePage onNavigate={handleNavigate} />;
    } else if (currentPage === 'normalCycle') {
        content = <NormalCyclePage onNavigate={handleNavigate} />;
}
else if (currentPage === 'signup') { 
    // --- 3. RENDERING THE AUTHENTICATION COMPONENT ---
    // The AuthPage now handles both login and signup views internally.
    content = <AuthPage onNavigate={handleNavigate} />; 
}
else if(currentPage === 'contact'){
    content = <Contact onNavigate={handleNavigate} />;
}else {
    content = (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>404 Page Not Found</h1>
      </div>
    );
  }

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar with navigation handler */}
      <Navbar onNavigate={handleNavigate} />

      <main style={{ flexGrow: 1 }}>
        {content}
      </main>

      <Footer />
    </div>
  );
};

export default App;