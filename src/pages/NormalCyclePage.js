// src/pages/NormalCyclePage.js

import React, { useState, useMemo } from "react";

// --- Configuration ---
const MIN_PRICE = 5000;
const MAX_PRICE = 45000;

// --- 1. Vehicle Data (Expanded for filtering) ---
const allNormalCycles = [
    { id: 3, name: "Kids Bicycle 16-inch", type: "Kids", price: 7000, status: "New Models", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg7h-ZaTgY-T1luguwb5nF1ZeeoMYiygwkfA&s" },
    { id: 4, name: "Hybrid City Cruiser", type: "City", price: 35000, status: "New Models", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_AgKnK6PEVJ9t9ZYqMcEfSjpIUIDH3Q458w&s" },
    { id: 8, name: "Comfort Commuter", type: "Commuter", price: 28000, status: "Old Models", image: "https://reidbikes.com/cdn/shop/files/ComfortST_3_5a95e8ce-b5d2-48fe-8641-89c53664488b.png?v=1730603340" },
    { id: 9, name: "Folding Bike Lite", type: "City", price: 42000, status: "New Models", image: "https://voltbikes.co.uk/images/gallery/updated/volt-lite-side-gallery.jpg" },
    { id: 10, name: "Standard Roadster", type: "Roadster", price: 9000, status: "Old Models", image: "https://m.media-amazon.com/images/I/51cIrywFDbL._UF894,1000_QL80_.jpg" },
    { id: 11, name: "Balance Bike", type: "Kids", price: 5500, status: "New Models", image: "https://www.sefiles.net/images/library/large/strider-sport-12-balance-bike-221970-11.jpg" },
    { id: 12, name: "Vintage City Bike", type: "City", price: 15000, status: "Old Models", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwTXPLstMolrvaIxl9XMy6FKdwLpIMHJ5i9Q&s" },
];


// --- 2. FilterSidebar Component (Embedded within the file) ---

const FilterSidebar = ({ onFilterChange, currentMinPrice, currentMaxPrice }) => {
    
    const sidebarStyle = {
        width: '250px',
        padding: '20px',
        borderRight: '1px solid #e0e0e0',
        backgroundColor: '#f9f9f9',
        minHeight: '80vh',
    };

    const sectionTitleStyle = {
        fontWeight: 'bold',
        marginTop: '20px',
        marginBottom: '10px',
        color: '#333',
        fontSize: '1.1em'
    };

    const inputGroupStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    };
    
    const inputStyle = {
        width: '45%',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        textAlign: 'center'
    };

    return (
        <div style={sidebarStyle}>
            <h3 style={{ color: '#1E90FF', marginBottom: '30px' }}>
                Filter Cycles
            </h3>
            
            {/* Cost Range Filter */}
            <div className="filter-section">
                <p style={sectionTitleStyle}>Cost Range (₹)</p>
                
                {/* Min/Max Input Fields */}
                <div style={inputGroupStyle}>
                    <input
                        type="number"
                        style={inputStyle}
                        placeholder="Min"
                        value={currentMinPrice}
                        onChange={(e) => onFilterChange('minPrice', e.target.value)}
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                    />
                    <input
                        type="number"
                        style={inputStyle}
                        placeholder="Max"
                        value={currentMaxPrice}
                        onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                    />
                </div>

                <div style={{ padding: '10px 0', fontSize: '0.9em', color: '#666', textAlign: 'center' }}>
                    *Inputs dynamically filter the list
                </div>

            </div>
        </div>
    );
};


// --- 3. Vehicle Card Component ---

const VehicleCard = ({ vehicle }) => (
    <div key={vehicle.id} style={{ 
        border: "1px solid #ddd", 
        padding: "10px", 
        textAlign: "center", 
        borderRadius: "8px", 
        background: "#fff", 
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)", 
        width: '100%', 
        maxWidth: '300px' 
    }}>
        <div style={{ backgroundColor: '#1E90FF', color: 'white', padding: '10px 0', marginBottom: '10px', borderRadius: '4px' }}>
             {vehicle.type}
        </div>
        <img src={vehicle.image} alt={vehicle.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />
        <h4 style={{ color: '#1e293b', marginTop: '10px' }}>{vehicle.name}</h4>
        <p style={{ fontWeight: 'bold', color: '#1E90FF', margin: '5px 0' }}>₹ {vehicle.price.toLocaleString('en-IN')}</p>
        <div style={{ fontSize: '0.85em', color: vehicle.status === 'New Models' ? '#38a169' : '#f56565' }}>
            {vehicle.status}
        </div>
    </div>
);


// --- 4. Main NormalCyclePage Component (Modified) ---

const NormalCyclePage = ({ onNavigate }) => {
    // State to hold the price range filters
    const [minPrice, setMinPrice] = useState(MIN_PRICE);
    const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

    // Function to update the filter state
    const handleFilterChange = (filterName, value) => {
        const numValue = parseInt(value, 10);
        
        if (filterName === 'minPrice' && !isNaN(numValue)) {
            // Ensure min price doesn't exceed max price
            setMinPrice(Math.min(numValue, maxPrice));
        } else if (filterName === 'maxPrice' && !isNaN(numValue)) {
             // Ensure max price doesn't go below min price
            setMaxPrice(Math.max(numValue, minPrice));
        }
    };

    // Memoized computation of filtered bicycles
    const filteredVehicles = useMemo(() => {
        let currentVehicles = [...allNormalCycles];

        // Apply Price Range Filter
        currentVehicles = currentVehicles.filter(v => 
            v.price >= minPrice && v.price <= maxPrice
        );

        // Sort by Price (Low to High by default)
        currentVehicles.sort((a, b) => a.price - b.price);
        
        return currentVehicles;
    }, [minPrice, maxPrice]);


    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            
            {/* 1. Filter Sidebar */}
            <FilterSidebar 
                onFilterChange={handleFilterChange} 
                currentMinPrice={minPrice}
                currentMaxPrice={maxPrice}
            />

            {/* 2. Main Content Area */}
            <div style={{ flexGrow: 1, padding: "20px" }}>
                <button 
                    onClick={() => onNavigate('bicycle')} 
                    style={{ 
                        marginBottom: '20px', 
                        padding: '10px 15px', 
                        backgroundColor: '#3CB371', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer' 
                    }}
                >
                    &larr; Back to Bicycle Categories
                </button>
                
                <h2 style={{ color: "#1E90FF", marginBottom: "20px" }}>
                    <span role="img" aria-label="city bike emoji">🚲</span> Normal & City Cycles ({filteredVehicles.length})
                </h2>
                
                {/* Vehicle Grid */}
                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
                    gap: "20px",
                    paddingRight: '20px'
                }}>
                    {filteredVehicles.length > 0 ? (
                        filteredVehicles.map((v) => (
                            <VehicleCard key={v.id} vehicle={v} />
                        ))
                    ) : (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2em', color: '#666' }}>
                            No normal or city cycles found in the price range (₹{minPrice.toLocaleString('en-IN')} - ₹{maxPrice.toLocaleString('en-IN')}).
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NormalCyclePage;