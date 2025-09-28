import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}> {/* Main content grows to fill space */}
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Home;