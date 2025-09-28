import React from 'react';

// --- Separate Card Component for better modularity ---
const CategoryCard = ({ name, image, onClick }) => {
    const cardStyle = {
        // INCREASED WIDTH for bigger card
        width: '280px', 
        border: '1px solid #ddd',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 6px 12px rgba(0,0,0,0.15)', // Slightly stronger shadow
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        overflow: 'hidden',
        backgroundColor: '#fff',
        // INCREASED HEIGHT for bigger card
        height: '300px', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', 
    };

    const imageStyle = {
        width: '100%',
        // INCREASED HEIGHT for bigger image
        height: '220px', 
        objectFit: 'cover',
        display: 'block',
    };

    const titleStyle = {
        padding: '18px', // Slightly more padding
        fontSize: '20px', // Slightly larger font
        fontWeight: '700', // Bold font
        color: '#333',
        borderTop: '1px solid #eee',
        flexShrink: 0, 
    };

    return (
        <div
            style={cardStyle}
            onClick={onClick}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
            <img src={image} alt={name} style={imageStyle} />
            <div style={titleStyle}>{name}</div>
        </div>
    );
};

// --- Main Component (VehiclesList / Items) ---
const VehiclesList = ({ onNavigate }) => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        // Increased gap slightly to separate the bigger cards
        gap: '40px', 
        flexWrap: 'wrap',
        padding: '60px 20px', // Increased overall padding
        minHeight: '80vh', 
        // Multi-color gradient background
        backgroundImage: `linear-gradient(to right top, 
                            #a57edb, 
                            #d95fef, 
                            #c26be8, 
                            #d1a0d8, 
                            #9fe2a3, 
                            #5bd3e2)`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed', 
    };

    const categories = [
        { 
            name: 'Fuel Vehicles', 
            page: 'fuel', 
            image: 'https://static.toiimg.com/thumb/msid-124043699,width-1280,height-720,resizemode-4/124043699.jpg' 
        },
        { 
            name: 'Electrical Vehicles', 
            page: 'electrical', 
            image: 'https://img.autocarindia.com/ExtraImages/20220909010320_Electric%20bike%20and%20scooter_Collage08_09_22_001.jpg?w=700&c=1' 
        },
        { 
            name: 'Bicycles', 
            page: 'bicycle', 
            image: 'https://hercules.in/wp-content/uploads/2025/07/fugitive.png' 
        },
    ];

    return (
        <div style={containerStyle}>
            {categories.map((cat, index) => (
                <CategoryCard
                    key={index}
                    name={cat.name}
                    image={cat.image}
                    onClick={() => onNavigate(cat.page)}
                />
            ))}
        </div>
    );
};

export default VehiclesList;