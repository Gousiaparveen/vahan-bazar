import React from 'react';



const Navbar = ({ onNavigate }) => {

  const navContainerStyle = {

    display: 'flex',

    justifyContent: 'space-between',

    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#3b82f6', // Main blue color
  color: 'white',

    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',

  };



  const logoStyle = {

    fontSize: '28px',

    fontWeight: 'bold',

    display: 'flex',

    alignItems: 'center',

    cursor: 'pointer',

  };



  const navLinkStyle = {

    margin: '0 15px',

    cursor: 'pointer',

    textDecoration: 'none',

    color: 'white',

    fontWeight: '500',

    transition: 'color 0.3s ease',

  };



  const navLinkHoverStyle = {

    color: '#FFD700', // Gold on hover

  };



  const handleHover = (e, isHover) => {

    e.target.style.color = isHover ? navLinkHoverStyle.color : navLinkStyle.color;

  };



  return (

    <nav style={navContainerStyle}>

      {/* Logo Section */}

      <div style={logoStyle} onClick={() => onNavigate('home')}>

        <span style={{ marginRight: '10px', fontSize: '30px' }}>

          <span role="img" aria-label="motorcycle">🛵</span> Vaahan Bazar

        </span>

      </div>



      {/* Links Section */}

      <div style={{ display: 'flex' }}>

        {[

          { name: 'Home', page: 'home' },

          { name: 'Items', page: 'items' },

         

          { name: 'Contact', page: 'contact' },

          { name: 'Sign / Register', page: 'signup' },

          { name: 'About', page: 'about' },

        ].map((link, index) => (

          <span

            key={index}

            style={navLinkStyle}

            onClick={() => onNavigate(link.page)}

            onMouseOver={(e) => handleHover(e, true)}

            onMouseOut={(e) => handleHover(e, false)}

          >

            {link.name}

          </span>

        ))}

      </div>

    </nav>

  );

};



export default Navbar;