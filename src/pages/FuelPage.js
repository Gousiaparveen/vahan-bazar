// FuelPage.jsx

import React from "react";

// Component now accepts onNavigate prop
const FuelPage = ({ onNavigate }) => {

    // Requested images for bikes and scooties
    const bikeImage = 'https://shop.yamaha-motor-india.com/cdn/shop/products/RACINGBLUE_840d4994-dab9-42d8-99a5-2dd7467a580c_1200x.webp?v=1757050434';
    const scooterImage = 'https://holeshotyamahaonline.com.au/cdn/shop/files/2024_LTS125_DRCE_AUS_STU_003_1024x1024.jpg?v=1754638693';

    // Base style for category buttons - Made larger for bigger images
    const buttonBaseStyle = {
        padding: "10px", // Padding around the image and text
        fontSize: "18px", // Slightly larger font for titles
        borderRadius: "15px", // Slightly more rounded corners
        border: "none",
        color: "#fff",
        cursor: "pointer",
        width: '300px', // INCREASED WIDTH for bigger images
        height: '250px', // INCREASED HEIGHT for bigger images
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end', // Keep text at the bottom
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', // Ensure image doesn't repeat
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)', // Larger, softer shadow
        fontWeight: '700',
        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.9)', // Stronger text shadow for readability
        position: 'relative', // Needed for potential overlay
        overflow: 'hidden', // Ensures image stays within bounds
    };
    
    // Style for the back button placement (Top Left)
    const backButtonStyle = {
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        zIndex: 10, 
        padding: '10px 20px',
        backgroundColor: '#FF4500', 
        color: 'white', 
        border: 'none', 
        borderRadius: '8px', 
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.2s',
    };

    const backButtonHoverStyle = {
         backgroundColor: '#CC3700',
    };

    // Styling the Bike button with the background image
    // Added a stronger gradient overlay for text readability
    const bikesButtonStyle = { 
        ...buttonBaseStyle, 
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 40%), url(${bikeImage})`,
    };

    // Styling the Scooties button with the background image
    // Added a stronger gradient overlay for text readability
    const scootiesButtonStyle = { 
        ...buttonBaseStyle, 
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 40%), url(${scooterImage})`,
    };

  return (
    <div style={{ 
        position: 'relative', 
        textAlign: "center", 
        padding: "40px", 
        minHeight: '100vh',
        // --- MULTI-COLOR GRADIENT BACKGROUND ---
        backgroundImage: `linear-gradient(to right top, 
                            #a57edb, 
                            #d95fef, 
                            #c26be8, 
                            #d1a0d8, 
                            #9fe2a3, 
                            #5bd3e2)`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
    }}>
      
      {/* Back Button (Top Left) */}
      <button 
        onClick={() => onNavigate('items')} 
        style={backButtonStyle}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, backButtonHoverStyle)}
        onMouseOut={(e) => Object.assign(e.currentTarget.style, backButtonStyle)}
      >
        &larr; Back to Categories
      </button>

      <div style={{ 
            // Moved title container upwards by adjusting top padding
            paddingTop: '60px', // Increased top padding to move title up from the very top
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 80px)', // Adjust based on navbar/footer if present
        }}>
          <h2 style={{ 
                color: '#fff', // White text for better contrast on gradient
                marginBottom: '60px', // Increased margin below title
                fontSize: '2.5em', // Larger title
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)', // Shadow for title readability
            }}>
                ⛽ Choose Your Fuel Vehicle Type
            </h2>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}> {/* Increased gap */}
              
              {/* Button to Bikes Page */}
              <button
                  style={bikesButtonStyle}
                  onClick={() => onNavigate('bikes')} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                  Bikes
              </button>

              {/* Button to Scooties Page */}
              <button
                  style={scootiesButtonStyle}
                  onClick={() => onNavigate('scooties')} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                  Scooties
              </button>
          </div>
      </div>
    </div>
  );
};

export default FuelPage;