// ScootiesPage.jsx

import React, { useState, useMemo } from "react";

// --- 30 Placeholder Scootie Data (10+ per main filter category) ---
const ALL_SCOOTIES = [
    // --- 10+ New Models ---
    { id: 1, name: "City Scooter Z", type: "Standard", model: "new", price: 95000, rating: 4.5, reviews: 300, isUsed: false, image: "https://www.motorbeam.com/wp-content/uploads/Yamaha-Ray-Z-Review-1200x900.jpg" },
    { id: 3, name: "Retro Scooter Classic", type: "Classic", model: "new", price: 110000, rating: 4.8, reviews: 150, isUsed: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3P-kryuHa7KyD3ctspuvNJDnQ8b7SGvsrw&s" },
    { id: 5, name: "Electric Fun 1.0", type: "Electric", model: "new", price: 130000, rating: 4.9, reviews: 80, isUsed: false, image: "https://cdn.bikedekho.com/processedimages/avon/avon-e-scoot/source/avon-e-scoot664dbea7efd74.jpg" },
    { id: 7, name: "Sporty Dash 160", type: "Sports", model: "new", price: 145000, rating: 4.6, reviews: 220, isUsed: false, image: "https://cdn.bikedekho.com/processedimages/hero-motocorp/hero-motocorp-dash/source/m_dash_11572850422.jpg?imwidth=412&impolicy=resize" },
    { id: 9, name: "Urban Commute Pro", type: "Standard", model: "new", price: 89000, rating: 4.3, reviews: 410, isUsed: false, image: "https://www.motorbeam.com/wp-content/uploads/Hero-Dash-Scooter.jpg" },
    { id: 11, name: "Maxi Traveller 400", type: "Maxi", model: "new", price: 350000, rating: 4.7, reviews: 90, isUsed: false, image: "https://cdn.bikedekho.com/processedimages/ola-electric/2025-s1-pro/source/2025-s1-pro679ce0d5bd70a.jpg?imwidth=412&impolicy=resize" },
    { id: 13, name: "Campus Rider 125", type: "Standard", model: "new", price: 79000, rating: 4.0, reviews: 500, isUsed: false, image: "https://cdn.bikedekho.com/processedimages/bmw/c-400-gt/source/c-400-gt67cacccc47081.jpg" },
    { id: 15, name: "Executive Glide", type: "Standard", model: "new", price: 105000, rating: 4.4, reviews: 350, isUsed: false, image: "https://www.yamaha-motor-india.com/theme/v3/image/news/ray-zr-streetrally/color/street-racing-blue.png" },
    { id: 17, name: "Aero X 155", type: "Sports", model: "new", price: 155000, rating: 4.8, reviews: 120, isUsed: false, image: "https://cdn.bikedekho.com/processedimages/yamaha/aerox-155/source/aerox-155619b81e12487e.jpg" },
    { id: 19, name: "Vintage Starlet", type: "Classic", model: "new", price: 125000, rating: 4.9, reviews: 70, isUsed: false, image: "https://upload.wikimedia.org/wikipedia/en/f/fa/Stellafront.jpg" },
    { id: 21, name: "Power EV-2", type: "Electric", model: "new", price: 160000, rating: 4.6, reviews: 50, isUsed: false, image: "https://cdn.bikedekho.com/processedimages/power-ev/p-sport/source/p-sport65c5bb011ebf6.jpg" },
    
    // --- 10+ Used Models (8 Old Models + 1 New Model set to used) ---
    { id: 2, name: "Maxi Scooter 300", type: "Maxi", model: "old", price: 180000, rating: 4.2, reviews: 350, isUsed: true, image: "https://c.ndtvimg.com/2025-08/rjhcqmt_tvs-m1s-maxi-scooter_625x300_06_August_25.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=800" },
    { id: 4, name: "Budget Runner 110", type: "Standard", model: "old", price: 55000, rating: 3.5, reviews: 700, isUsed: true, image: "https://www.heromotocorp.com/en-in/blogs/is-hero-xoom-110-the-best-budget-friendly-scooter-in-india-features-to-prove-it/_jcr_content/root/container/container_671187912_/bootstraplayout/container-item0/container_751779825/image.coreimg.png/1695641531220/blog-web-2.png" },
    { id: 6, name: "Classic Vespa Style", type: "Classic", model: "old", price: 75000, rating: 3.9, reviews: 550, isUsed: true, image: "https://cdn.bikedekho.com/processedimages/vespa/vespa-125/source/vespa-12567b848c7c2700.jpg?tr=w-320" },
    { id: 8, name: "Off-Road Mover", type: "Adventure", model: "old", price: 165000, rating: 4.1, reviews: 180, isUsed: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpipdknTv-HvnWnMZZ5dxqsvAjd0p24mz8XQ&s" },
    { id: 10, name: "Low Rider 100", type: "Standard", model: "old", price: 40000, rating: 3.0, reviews: 900, isUsed: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYhsWvNls-jPj4yF99ycQe0D7z0zRLVARYHw&s" },
    { id: 12, name: "Old Workhorse", type: "Standard", model: "old", price: 60000, rating: 3.7, reviews: 650, isUsed: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjurQDj8LssI8-PArn9-fNq2jMsjLW5u8VAw&s" },
    { id: 14, name: "Speedster 150", type: "Sports", model: "old", price: 100000, rating: 4.0, reviews: 290, isUsed: true, image: "https://cdn.bikedekho.com/processedimages/aftek-motors/etwo/source/etwo667e4c1389e86.jpg?tr=w-320" },
    { id: 16, name: "City Light 125", type: "Standard", model: "old", price: 68000, rating: 3.8, reviews: 580, isUsed: true, image: "https://fliptoy.in/cdn/shop/files/Untitled-3.webp?v=1708029788&width=416" },
    { id: 18, name: "E-Moped Alpha", type: "Electric", model: "old", price: 80000, rating: 3.9, reviews: 200, isUsed: true, image: "https://5.imimg.com/data5/SELLER/Default/2023/3/KS/LH/VK/30098149/electric-moped-bike.png" },
    { id: 20, name: "Touring 250", type: "Maxi", model: "old", price: 210000, rating: 4.5, reviews: 150, isUsed: true, image: "https://imgd.aeplcdn.com/370x208/n/cw/ec/148731/right-side-view0.jpeg?isig=0&q=80" },
    
    // --- Additional models to hit 30 total (15 New, 15 Old/Used) ---
    { id: 22, name: "Scoot-A-Lot 110", type: "Standard", model: "new", price: 65000, rating: 3.8, reviews: 620, isUsed: false, image: "https://cdn.bikedekho.com/processedimages/honda/activa-electric/source/activa-electric68ce3ab3c7624.jpg?tr=w-371" },
    { id: 23, name: "Eco Commuter", type: "Electric", model: "new", price: 140000, rating: 4.3, reviews: 110, isUsed: false, image: "https://media.zigcdn.com/media/model/2025/Sep/tvs-jupiter-110-right-side-view_270x180.jpg" },
    { id: 24, name: "High Torque 175", type: "Sports", model: "new", price: 160000, rating: 4.7, reviews: 95, isUsed: false, image: "https://image.made-in-china.com/202f0j00TSrfJhVEVYcG/Exclusive-Model-Electric-Scooter-800W-1000W-High-Torque-Bright-Color-Patent-Model.webp" },
    { id: 25, name: "Adventure 150", type: "Adventure", model: "new", price: 185000, rating: 4.4, reviews: 130, isUsed: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtOsQg1V9pfKLktDGbf7z2FPXrpbsy23JRnw&s" },
    { id: 26, name: "Classic Deluxe", type: "Classic", model: "old", price: 90000, rating: 4.1, reviews: 400, isUsed: true, image: "https://centralization-images.s3.ap-south-1.amazonaws.com/4_Honda_Dio_8718d4c4f1.png" },
    { id: 27, name: "The Reliable 100", type: "Standard", model: "old", price: 50000, rating: 3.4, reviews: 850, isUsed: true, image: "https://cdn.bikedekho.com/processedimages/hero/destini/source/destini689d7a8d09dc8.jpg" },
    { id: 28, name: "Electric Fun 0.5", type: "Electric", model: "old", price: 70000, rating: 3.6, reviews: 300, isUsed: true, image: "https://5.imimg.com/data5/SELLER/Default/2024/5/419073653/TM/LF/TJ/125107375/whatsapp-image-2024-05-15-at-12-45-38-pm-250x250.jpeg" },
    { id: 29, name: "Sporty 125 Base", type: "Sports", model: "old", price: 85000, rating: 3.7, reviews: 450, isUsed: true, image: "https://cdn.bikedekho.com/processedimages/tvs/ntorq-125/source/ntorq-125667d4a983e2da.jpg" },
    { id: 30, name: "Maxi City 200", type: "Maxi", model: "old", price: 150000, rating: 4.3, reviews: 200, isUsed: true, image: "https://m.media-amazon.com/images/I/61zSUmpiWfL.jpg" },
];

// Helper component for displaying a single scootie card
const ScootieCard = ({ scootie }) => (
    <div key={scootie.id} style={{ 
        border: "1px solid #e0e0e0", 
        padding: "15px", 
        borderRadius: "8px", 
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        backgroundColor: '#fff',
        transition: 'box-shadow 0.3s',
    }}>
        <img src={scootie.image} alt={scootie.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "4px" }} />
        <h4 style={{ margin: '10px 0 5px', fontSize: '1.1rem' }}>{scootie.name}</h4>
        <p style={{ margin: '0 0 5px', color: '#FF8C00', fontWeight: 'bold' }}>₹ {scootie.price.toLocaleString()}</p>
        <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
            Rating: ★ {scootie.rating} | ({scootie.reviews} reviews)
        </p>
        <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: scootie.isUsed ? '#FF4500' : '#007bff', fontWeight: 'bold' }}>
            {scootie.isUsed ? 'Used Scootie' : 'New Model'}
        </p>
    </div>
);


const ScootiesPage = ({ onNavigate }) => {
    // Max price is 350,000 based on the Maxi Traveller 400
    const MAX_PRICE = 400000; 

    // State to manage current active filters
    const [filters, setFilters] = useState({
        type: null,
        model: null,
        used: null,
        minPrice: 0,
        maxPrice: MAX_PRICE, 
        minRating: 0,
    });
    
    // Hardcoded price ranges for the filter options 
    const PRICE_RANGES = [
        { label: 'Under ₹75K', min: 0, max: 75000 },
        { label: '₹75K - ₹1.5L', min: 75000, max: 150000 },
        { label: '₹1.5L - ₹2.5L', min: 150000, max: 250000 },
        { label: 'Over ₹2.5 Lakh', min: 250000, max: MAX_PRICE },
    ];

    // Filter logic using useMemo to optimize performance
    const filteredScooties = useMemo(() => {
        return ALL_SCOOTIES.filter(scootie => {
            // 1. Filter by Scootie Type
            if (filters.type && scootie.type !== filters.type) return false;

            // 2. Filter by New/Old Model
            if (filters.model && scootie.model !== filters.model) return false;

            // 3. Filter by Used Scooties
            if (filters.used !== null && scootie.isUsed !== filters.used) return false;

            // 4. Filter by Cost Range
            if (scootie.price < filters.minPrice || scootie.price > filters.maxPrice) return false;

            // 5. Filter by Rating
            if (scootie.rating < filters.minRating) return false;

            return true;
        }).sort((a, b) => {
            // Sort by Rating (descending) if rating filter is active
            if (filters.minRating > 0) {
                return b.rating - a.rating;
            }
            return a.id - b.id; // Default sort
        });
    }, [filters]);


    // Function to handle filter clicks
    const handleFilterClick = (key, value) => {
        let newValue = value;
        if (filters[key] === value) {
            newValue = null; // Unselects the filter if clicked again
        }

        setFilters(prev => ({
            ...prev,
            [key]: newValue,
            // Reset price and rating if a different primary filter is selected
            ...(key === 'type' || key === 'model' || key === 'used' ? { minPrice: 0, maxPrice: MAX_PRICE, minRating: 0 } : {})
        }));
    };
    
    // Function to handle price range clicks
    const handlePriceRangeClick = (min, max) => {
        setFilters(prev => ({
            ...prev,
            minPrice: min,
            maxPrice: max,
            type: null, // Reset other exclusive filters
            model: null,
            used: null,
        }));
    };

    // Function to handle rating filter
    const handleRatingClick = (minRating) => {
        setFilters(prev => ({
            ...prev,
            minRating: filters.minRating === minRating ? 0 : minRating, // Toggle
            type: null, // Reset other exclusive filters
            model: null,
            used: null,
        }));
    };

    // Style for the filter rectangle box
    const filterBoxStyle = {
        padding: '10px 15px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        marginBottom: '15px',
        backgroundColor: '#fff',
    };

    const filterOptionStyle = (isActive) => ({
        padding: '8px 12px',
        margin: '5px 0',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: isActive ? '#FF8C00' : '#f4f4f4', // Highlight color changed to Scooty orange
        color: isActive ? 'white' : '#333',
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'background-color 0.2s',
        fontSize: '0.95rem',
    });

    return (
        <div style={{ padding: "20px", display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            
            {/* Back Button (Top Left of this component) */}
            <button 
                onClick={() => onNavigate('fuel')} 
                style={{ 
                    position: 'absolute', 
                    top: '95px', 
                    left: '20px', 
                    zIndex: 10,
                    padding: '10px 20px', 
                    cursor: 'pointer', 
                    backgroundColor: '#FF8C00', // Scooty orange
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
            >
                &larr; Back to Fuel Categories
            </button>

            {/* --- Left Sidebar (Filters) --- */}
            <div style={{ width: '250px', paddingRight: '30px', paddingTop: '40px' }}>
                <h3 style={{ marginTop: '0', color: '#333' }}>Filter Scooties</h3>
                
                {/* 1. Scootie Type */}
                <div style={filterBoxStyle}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem', color: '#555' }}>Scootie Type</h4>
                    {['Standard', 'Classic', 'Sports', 'Maxi', 'Electric', 'Adventure'].map(type => (
                        <div 
                            key={type}
                            style={filterOptionStyle(filters.type === type)}
                            onClick={() => handleFilterClick('type', type)}
                        >
                            {type}
                        </div>
                    ))}
                </div>

                {/* 2. New Models / Old Models */}
                <div style={filterBoxStyle}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem', color: '#555' }}>Model Age</h4>
                    {['new', 'old'].map(model => (
                        <div 
                            key={model}
                            style={filterOptionStyle(filters.model === model)}
                            onClick={() => handleFilterClick('model', model)}
                        >
                            {model === 'new' ? 'New Models' : 'Old Models'}
                        </div>
                    ))}
                </div>
                
                {/* 3. Used Scooties */}
                <div style={filterBoxStyle}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem', color: '#555' }}>Condition</h4>
                    <div 
                        style={filterOptionStyle(filters.used === true)}
                        onClick={() => handleFilterClick('used', true)}
                    >
                        Used Scooties
                    </div>
                    <div 
                        style={filterOptionStyle(filters.used === false)}
                        onClick={() => handleFilterClick('used', false)}
                    >
                        New Scooties (Only)
                    </div>
                </div>

                {/* 4. Cost Range */}
                <div style={filterBoxStyle}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem', color: '#555' }}>Cost Range</h4>
                    {PRICE_RANGES.map((range, index) => (
                        <div 
                            key={index}
                            style={filterOptionStyle(filters.minPrice === range.min && filters.maxPrice === range.max)}
                            onClick={() => handlePriceRangeClick(range.min, range.max)}
                        >
                            {range.label}
                        </div>
                    ))}
                </div>

                {/* 5. Rating Wise */}
                <div style={filterBoxStyle}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem', color: '#555' }}>Rating Wise</h4>
                    {[4.5, 4.0, 3.5].map(rating => (
                        <div 
                            key={rating}
                            style={filterOptionStyle(filters.minRating === rating)}
                            onClick={() => handleRatingClick(rating)}
                        >
                            {rating}+ Stars
                        </div>
                    ))}
                </div>
                
                {/* Reset Button */}
                <button 
                    onClick={() => setFilters({ type: null, model: null, used: null, minPrice: 0, maxPrice: MAX_PRICE, minRating: 0 })}
                    style={{ 
                        padding: '10px', 
                        width: '100%', 
                        backgroundColor: '#ccc', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer' 
                    }}
                >
                    Clear Filters
                </button>
            </div>

            {/* --- Right Content (Scootie Listings) --- */}
            <div style={{ flexGrow: 1, paddingTop: '40px' }}>
                <h2 style={{ marginTop: '0', marginBottom: '20px', color: "#FF8C00" }}>🛵 Scooties Listings ({filteredScooties.length})</h2>
                
                {filteredScooties.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
                        No scooties match your current filters.
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
                        {filteredScooties.map(scootie => (
                            <ScootieCard key={scootie.id} scootie={scootie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScootiesPage;