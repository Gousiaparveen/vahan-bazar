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
            height: '250px',
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


const BicyclePage = ({ onNavigate }) => {
    
    // Function to navigate back to the main items/categories page
    const handleBackToCategories = () => {
        onNavigate('items'); // Assuming 'items' is the main categories page
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* Back Button */}
            <button
                onClick={handleBackToCategories}
                style={{
                    padding: '10px 15px',
                    backgroundColor: '#FF6347', // Tomato red color
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

            <h2 style={{ textAlign: "center", color: "#228B22", marginBottom: "40px" }}>
                🚴 Choose Your Bicycle Type 🚴
            </h2>
            
            <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
                {/* 1. Sports Bicycle Category Card */}
                <CategoryCard
                    title="Sports & Racing Bicycles"
                    // Placeholder image - represents mountain/road bikes
                    imageUrl="https://img.freepik.com/free-photo/professional-cyclist-woman_23-2149703291.jpg?semt=ais_hybrid&w=740&q=80"
                    // Clicks should navigate to a new page component: 'sportsBicycle'
                    onClick={() => onNavigate('sportsBicycle')} 
                />

                {/* 2. Normal Cycle Category Card */}
                <CategoryCard
                    title="Normal & City Cycles"
                    // Placeholder image - represents hybrid/city/kids bikes
                    imageUrl="https://stryderbikes.com/cdn/shop/files/AeroJet26DDMSMilitaryGreen.jpg?v=1750142722&width=400"
                    // Clicks should navigate to a new page component: 'normalCycle'
                    onClick={() => onNavigate('normalCycle')}
                />
            </div>
        </div>
    );
};

export default BicyclePage;