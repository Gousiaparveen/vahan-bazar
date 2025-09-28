import React from "react";

// Component for a clickable category card
const CategoryCard = ({ title, imageUrl, onClick }) => (
    <div
        onClick={onClick}
        style={{
            cursor: 'pointer',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
            width: '250px',
            height: '220px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}
        onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.2)';
        }}
        onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }}
    >
        <img 
            src={imageUrl} 
            alt={title} 
            style={{ width: '100%', height: '200px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #eee' }} 
        />
        <h3 style={{ marginTop: '15px', color: '#1e293b', fontWeight: 'bold' }}>
            {title}
        </h3>
    </div>
);

const ElectricalPage = ({ onNavigate }) => {
    
    // Function to navigate back to the main categories page (Items)
    const handleBackToCategories = () => {
        onNavigate('items'); 
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* Back Button */}
            <button
                onClick={handleBackToCategories}
                style={{
                    padding: '10px 15px',
                    backgroundColor: '#ff4500', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginBottom: '30px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                &larr; Back to Categories
            </button>

            <h2 style={{ textAlign: "center", color: "#00008B", marginBottom: "40px" }}>
                ⚡ Choose Your Electrical Vehicle Type ⚡
            </h2>
            
            <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
                {/* 1. Adult Electrical Category Card (Navigates to 'electricalAdult') */}
                <CategoryCard
                    title="Bikes & Scooties (Adult)"
                    // Placeholder image
                    imageUrl="https://images.timesdrive.in/thumb/msid-151303735,thumbsize-67814,width-1280,height-720,resizemode-75/151303735.jpg"
                    onClick={() => onNavigate('electricalAdult')} 
                />

                {/* 2. Children's Category Card (Navigates to 'electricalChildren') */}
                <CategoryCard
                    title="Children's Mini Vehicles"
                    // Placeholder image
                    imageUrl="https://www.zippielectric.com/cdn/shop/articles/IMG_2606_1400x.jpeg?v=1571798118"
                    onClick={() => onNavigate('electricalChildren')}
                />
            </div>
        </div>
    );
};

export default ElectricalPage;