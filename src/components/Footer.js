import React from 'react';

function Footer() {
  const footerStyle = {
    padding: '20px',
    textAlign: 'left', // Aligned left as per your screenshot
    backgroundColor: '#3b82f6', // Matching navbar color
    color: 'white',
    fontSize: '0.9em',
    marginTop: 'auto', // Pushes footer to the bottom
  };

  return (
    <footer style={footerStyle}>
      <p>© 2025 Vahan Bazar. All rights reserved.</p>
    </footer>
  );
}

export default Footer;