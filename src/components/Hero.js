import React, { useState } from 'react';

const Hero = () => {
  const heroSectionStyle = {
    minHeight: 'calc(100vh - 150px)', // Space for navbar and footer
    backgroundColor: 'white', // Clean white background
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    color: '#333',
  };

  const headingStyle = {
    fontSize: '2.8em',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#2c3e50',
  };

  const subHeadingStyle = {
    fontSize: '1.2em',
    marginBottom: '40px',
    color: '#555',
  };

  const cardContainerStyle = {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '1000px',
    width: '100%',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '350px',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    border: '1px solid #eee',
  };

  const cardHoverStyle = {
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
  };

  const imageStyle = {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
  };

  const cardTitleStyle = {
    fontSize: '1.5em',
    margin: '20px 0 10px 0',
    color: '#2c3e50',
  };

  const buttonStyle = {
    padding: '12px 25px',
    backgroundColor: '#3b82f6', // Blue button
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#2563eb', // Darker blue on hover
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section style={heroSectionStyle}>
      <h1 style={headingStyle}>Welcome to Vahan Bazar!</h1>
      <p style={subHeadingStyle}>
        Find your nearest showroom or book a ride easily.
      </p>

      <div style={cardContainerStyle}>
        {/* Card 1: Nearby Showrooms */}
        <div 
          style={hoveredCard === 'showroom' ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
          onMouseEnter={() => setHoveredCard('showroom')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Using a placeholder URL for the motorcycle image */}
          <img 
            src="https://www.indiacarnews.com/wp-content/uploads/2021/04/Hero-Virtual-Showroom.jpg" 
            alt="Motorcycles in Showroom" 
            style={imageStyle} 
          />
          <h3 style={cardTitleStyle}>Nearby Showrooms</h3>
          <button 
            style={hoveredCard === 'showroom' ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          >
            Nearby Showrooms
          </button>
        </div>

        {/* Card 2: Book for Ride */}
        <div 
          style={hoveredCard === 'ride' ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
          onMouseEnter={() => setHoveredCard('ride')}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Using a placeholder URL for the rider image */}
          <img 
            src="https://s3.drivex.dev/cms/Best_Bikes_for_Long_Rides_How_to_Choose_the_Right_Motorcycle_for_Endurance_01_3103e852d2.jpg" 
            alt="Person riding motorcycle" 
            style={imageStyle} 
          />
          <h3 style={cardTitleStyle}>Book for Ride</h3>
          <button 
            style={hoveredCard === 'ride' ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          >
            Book for Ride
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;