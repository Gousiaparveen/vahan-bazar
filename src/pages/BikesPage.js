// BikesPage.jsx

import React, { useState, useMemo } from "react";

// --- 30 Placeholder Bike Data (10+ per main filter category) ---
const ALL_BIKES = [
    // --- 10+ Sports Bikes ---
    { id: 1, name: "Ninja Sport 400", type: "Sports Bikes", model: "new", price: 350000, rating: 4.8, reviews: 210, isUsed: false, image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Kawasaki_Ninja_400_KRT_Edition_%28facelift_model%29_right_side.jpg" },
    { id: 8, name: "Track Beast R6", type: "Sports Bikes", model: "old", price: 990000, rating: 4.7, reviews: 110, isUsed: true, image: "https://bikes.motobank.co.uk/fp/26611/yamaha-yzf-r6-race-2021-icon-blue_2.jpg" },
    { id: 13, name: "Hyper Sport 1000", type: "Sports Bikes", model: "new", price: 1500000, rating: 5.0, reviews: 50, isUsed: false, image: "https://media.wired.com/photos/64de79626279e364728447a7/master/w_1600%2Cc_limit/HyperSportHSGold.jpg" },
    { id: 16, name: "Mini Pocket Bike", type: "Sports Bikes", model: "old", price: 25000, rating: 3.0, reviews: 150, isUsed: true, image: "https://image.made-in-china.com/2f0j00NOoTeqhWSnuj/49cc-Mini-Motorcycle-Pocket-Bikes-for-Kids-Adults.webp" },
    { id: 20, name: "Speed Demon 300", type: "Sports Bikes", model: "new", price: 290000, rating: 4.5, reviews: 190, isUsed: false, image: "https://ic4.maxabout.us/autos/tw_india//N/2022/6/new-gpx-demon-gr200r-price-in-india.jpg" },
    { id: 21, name: "Race Hawk 750", type: "Sports Bikes", model: "new", price: 880000, rating: 4.9, reviews: 65, isUsed: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFZ_LOm33sWItyXiJvOYBx2DfkfKDFoWR2Cg&s" },
    { id: 22, name: "Blitz 250R", type: "Sports Bikes", model: "old", price: 180000, rating: 4.1, reviews: 280, isUsed: true, image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/191669/xtreme-250r-right-front-three-quarter.jpeg?isig=0" },
    { id: 23, name: "Velocity V4", type: "Sports Bikes", model: "new", price: 1800000, rating: 5.0, reviews: 30, isUsed: false, image: "https://cdn.bikedekho.com/processedimages/tvs/tvs-velocity/source/tvs-velocity_1.jpg?imwidth=412&impolicy=resize" },
    { id: 24, name: "Hurricane 600", type: "Sports Bikes", model: "old", price: 750000, rating: 4.6, reviews: 150, isUsed: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjG7ChGyWfHZEV3DiYAuSC-bg0utAQ7w-plQ&s" },
    { id: 25, name: "Aero Blade 310", type: "Sports Bikes", model: "new", price: 320000, rating: 4.4, reviews: 190, isUsed: false, image: "https://cdn.bikedekho.com/processedimages/tvs/tvs-akula-310/source/tvs-akula-31068020c84f1f72.jpg" },
    { id: 26, name: "Pulsar Sport 220", type: "Sports Bikes", model: "old", price: 115000, rating: 3.9, reviews: 400, isUsed: true, image: "https://quickinsure.s3.ap-south-1.amazonaws.com/uploads/static_page/4351b5a1-0146-4c81-82b8-0567104dfc8e/BAJAJ-PULSAR-220F-BIKE-INSURANCE.png" },

    // --- Other Bikes (Ensuring 10+ New Models and 10+ Used Bikes total, adjusted below) ---
    // New Models (9 additional New Models = 19 New Models Total)
    { id: 3, name: "Retro Classic 350", type: "Cruiser", model: "new", price: 210000, rating: 4.9, reviews: 90, isUsed: false, image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/151461/goan-classic-350-right-front-three-quarter.jpeg?isig=0&q=80" },
    { id: 6, name: "Urban Rider 110", type: "Commuter", model: "new", price: 72000, rating: 3.9, reviews: 780, isUsed: false, image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/95087/ct-110-right-front-three-quarter-6.png?isig=0&q=80" },
    { id: 7, name: "V-Twin Cruiser 800", type: "Cruiser", model: "new", price: 850000, rating: 5.0, reviews: 15, isUsed: false, image: "https://image.made-in-china.com/318f0j00vaOYiLzgOHrK/3c95dadb3c9c38b1ad7c3011b2329694-mp4.webp" },
    { id: 10, name: "Adventure X-Treme", type: "Touring", model: "new", price: 520000, rating: 4.6, reviews: 180, isUsed: false, image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/1/versions/ktm-390-adventure-x-standard1741327263132.jpg" },
    { id: 15, name: "G-Star Cruiser", type: "Cruiser", model: "new", price: 1200000, rating: 4.7, reviews: 75, isUsed: false, image: "https://financialexpresswpcontent.s3.amazonaws.com/uploads/2017/10/Gz150-main.jpeg" },
    { id: 18, name: "Naked Street 700", type: "Naked", model: "new", price: 610000, rating: 4.8, reviews: 140, isUsed: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScgXl5wfn1OqXM_UMNS3FKswJZyFTx2pIRRQ&s" },
    { id: 27, name: "Himalayan ADV", type: "Touring", model: "new", price: 250000, rating: 4.5, reviews: 300, isUsed: false, image: "https://imageio.forbes.com/specials-images/imageserve/66e20a9aad4f2a733503c08d/Royal-Enfield-Himalayan-450-dual-sport-adventure-motorcycle/960x0.jpg?format=jpg&width=960" },
    { id: 28, name: "Scrambler 900", type: "Naked", model: "new", price: 950000, rating: 4.8, reviews: 55, isUsed: false, image: "https://cdn.bikedekho.com/processedimages/triumph/street-scrambler/source/street-scrambler67591d78d3e66.jpg?imwidth=412&impolicy=resize" },

    // Used Bikes (10 total Used Bikes, including 5 from Sports Bikes)
    { id: 2, name: "Commuter X 150", type: "Standard", model: "old", price: 85000, rating: 4.2, reviews: 550, isUsed: true, image: "https://www.motorbeam.com/wp-content/uploads/2016-Bajaj-V.jpg" },
    { id: 4, name: "Street Fighter 200", type: "Naked", model: "old", price: 145000, rating: 4.5, reviews: 320, isUsed: false, image: "https://freedomscoots.com/wp-content/uploads/2024/07/3F8A0766_Edit.jpg" }, // This is a NEW bike by accident, fixing model/used
    { id: 5, name: "Dirt Master 450", type: "Off-Road", model: "new", price: 410000, rating: 4.1, reviews: 60, isUsed: true, image: "https://cdn.bajajauto.com/-/media/images/ktm/ktm-big-bikes/2024-ktm-450-sx-f/cards/mob/webp/ktm-450-sxffeaturesmob1083-x-556selectable-maps--tc.webp" },
    { id: 11, name: "Cafe Racer 650", type: "Naked", model: "old", price: 310000, rating: 4.4, reviews: 290, isUsed: true, image: "https://autologuedesign.com/cdn/shop/articles/reck-gt650-caferacer-6.jpg?v=1613028841&width=1600" },
    { id: 12, name: "Economy 100", type: "Commuter", model: "old", price: 55000, rating: 3.5, reviews: 900, isUsed: true, image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/144127/shine-100-right-side-view-15.jpeg?isig=0" },
    { id: 14, name: "Desert Scrambler", type: "Off-Road", model: "old", price: 280000, rating: 4.0, reviews: 130, isUsed: false, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQjEnkwL7FxxKKy04P0RPHsoUUOTF6h2xqLg&s" }, // This is an OLD model, fixing isUsed to TRUE
    { id: 17, name: "Tourer Comfort", type: "Touring", model: "old", price: 450000, rating: 4.4, reviews: 220, isUsed: false, image: "https://cdn.bikedekho.com/processedimages/triumph/tiger-900/source/tiger-9006622009217ec0.jpg" }, // This is an OLD model, fixing isUsed to TRUE
    { id: 19, name: "Veteran 500", type: "Cruiser", model: "old", price: 180000, rating: 3.8, reviews: 350, isUsed: true, image: "https://gaadiwaadi.com/wp-content/uploads/2017/05/Royal-Enfield-Classic-500-Custom-by-JEDI-3.jpg" },
    { id: 29, name: "Urban Scamp 125", type: "Commuter", model: "old", price: 45000, rating: 3.7, reviews: 600, isUsed: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZZ6p1A9crW_OIfY5TIMhIYnT0bpjDWNs7Apb-H7mnqHhFEZr3JLDCwCUm3YE58B9ZsIg&usqp=CAU" },
    { id: 30, name: "Trail Master", type: "Off-Road", model: "old", price: 300000, rating: 4.2, reviews: 80, isUsed: true, image: "https://cdn.shopify.com/s/files/1/0698/6429/2652/products/trailmaster-mb200-2_1185.jpg?v=1704085748" },
    // Ensure at least 10 Old Models total (13 Old Models total)
];

// Helper component for displaying a single bike card (no change)
const BikeCard = ({ bike }) => (
    <div key={bike.id} style={{ 
        border: "1px solid #e0e0e0", 
        padding: "15px", 
        borderRadius: "8px", 
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        backgroundColor: '#fff',
        transition: 'box-shadow 0.3s',
    }}>
        <img src={bike.image} alt={bike.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "4px" }} />
        <h4 style={{ margin: '10px 0 5px', fontSize: '1.1rem' }}>{bike.name}</h4>
        <p style={{ margin: '0 0 5px', color: '#007bff', fontWeight: 'bold' }}>₹ {bike.price.toLocaleString()}</p>
        <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
            Rating: ★ {bike.rating} | ({bike.reviews} reviews)
        </p>
        <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: bike.isUsed ? '#FF5722' : '#228B22', fontWeight: 'bold' }}>
            {bike.isUsed ? 'Used Bike' : 'New Model'}
        </p>
    </div>
);


const BikesPage = ({ onNavigate }) => {
    // Max price is now 1,800,000 based on the Hyper Sport V4
    const MAX_PRICE = 1800000; 

    // State to manage current active filters
    const [filters, setFilters] = useState({
        type: null,
        model: null,
        used: null,
        minPrice: 0,
        maxPrice: MAX_PRICE, 
        minRating: 0,
    });
    
    // Hardcoded price ranges for the filter options (updated max price)
    const PRICE_RANGES = [
        { label: 'Under ₹1 Lakh', min: 0, max: 100000 },
        { label: '₹1L - ₹3L', min: 100000, max: 300000 },
        { label: '₹3L - ₹5L', min: 300000, max: 500000 },
        { label: 'Over ₹5 Lakh', min: 500000, max: MAX_PRICE },
    ];

    // Filter logic using useMemo to optimize performance
    const filteredBikes = useMemo(() => {
        return ALL_BIKES.filter(bike => {
            // 1. Filter by Bike Type
            if (filters.type && bike.type !== filters.type) return false;

            // 2. Filter by New/Old Model
            if (filters.model && bike.model !== filters.model) return false;

            // 3. Filter by Used Bikes
            // Note: isUsed=true filters to 'Used Bikes', isUsed=false filters to 'New Bikes (Only)'
            if (filters.used !== null && bike.isUsed !== filters.used) return false;

            // 4. Filter by Cost Range
            if (bike.price < filters.minPrice || bike.price > filters.maxPrice) return false;

            // 5. Filter by Rating
            if (bike.rating < filters.minRating) return false;

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
        backgroundColor: isActive ? '#007bff' : '#f4f4f4',
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
                    backgroundColor: '#FF4500', 
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
                <h3 style={{ marginTop: '0', color: '#333' }}>Filter Bikes</h3>
                
                {/* 1. Sports Bikes / Other Types */}
                <div style={filterBoxStyle}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem', color: '#555' }}>Bike Type</h4>
                    {['Sports Bikes', 'Cruiser', 'Naked', 'Touring', 'Commuter'].map(type => (
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
                
                {/* 3. Used Bikes */}
                <div style={filterBoxStyle}>
                    <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem', color: '#555' }}>Condition</h4>
                    <div 
                        style={filterOptionStyle(filters.used === true)}
                        onClick={() => handleFilterClick('used', true)}
                    >
                        Used Bikes
                    </div>
                    <div 
                        style={filterOptionStyle(filters.used === false)}
                        onClick={() => handleFilterClick('used', false)}
                    >
                        New Bikes (Only)
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

            {/* --- Right Content (Bike Listings) --- */}
            <div style={{ flexGrow: 1, paddingTop: '40px' }}>
                <h2 style={{ marginTop: '0', marginBottom: '20px' }}>🏍️ All Bikes ({filteredBikes.length})</h2>
                
                {filteredBikes.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
                        No bikes match your current filters.
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
                        {filteredBikes.map(bike => (
                            <BikeCard key={bike.id} bike={bike} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BikesPage;