import React, { useState, useMemo } from "react";

// --- 1. Vehicle Data (Expanded for filtering) ---
const allSportsBicycles = [
    { id: 1, name: "Mountain Bike Pro", type: "MTB", price: 65000, status: "New Models", image: "https://c02.purpledshub.com/uploads/sites/39/2023/07/AM9A8836-Edit-285f332.jpg?w=1029&webp=1" },
    { id: 2, name: "Road Racing Carbon", type: "Road", price: 150000, status: "New Models", image: "https://images-cdn.ubuy.co.in/63aee2199cc21340b30ca6e2-kabon-carbon-road-bike-700c-carbon.jpg" },
    { id: 5, name: "Cyclocross Racer", type: "Road", price: 80000, status: "Old Models", image: "https://img.redbull.com/images/c_crop,x_31,y_175,h_2362,w_3542/c_fill,w_450,h_300/q_auto,f_auto/redbullcom/2021/11/4/ypa58josihawkwuz1he8/ellen-noble-cyclocross" },
    { id: 6, name: "Time Trial Aero", type: "Road", price: 210000, status: "New Models", image: "https://img1.wsimg.com/isteam/ip/fe9d954d-a5c5-474f-8df6-6c1101aa38f6/Dean%20TT%209-15-16-23%20Pos%201-6775%20-%20newsletter.jpg/:/rs=w:1280" },
    { id: 7, name: "Gravel Explorer", type: "Gravel", price: 95000, status: "Old Models", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUQNGe-YFmSzszqyWJvO3EhT443rmSttIdsg&s" },
    { id: 8, name: "Downhill Destroyer", type: "MTB", price: 180000, status: "New Models", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgu1OCFe3z6Qm1pejKS4JgoypGoQnbEITszA&s" },
];

const MIN_PRICE = 50000;
const MAX_PRICE = 250000;


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
            <h3 style={{ color: '#228B22', marginBottom: '30px' }}>
                Filter Bicycles
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

                {/* Optional: Slider (More complex to implement purely with inline styles) */}
                {/* We'll use a placeholder message for simplicity, as a full slider requires specific styling */}
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
        <div style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 0', marginBottom: '10px', borderRadius: '4px' }}>
             {vehicle.type}
        </div>
        <img src={vehicle.image} alt={vehicle.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />
        <h4 style={{ color: '#1e293b', marginTop: '10px' }}>{vehicle.name}</h4>
        <p style={{ fontWeight: 'bold', color: '#228B22', margin: '5px 0' }}>₹ {vehicle.price.toLocaleString('en-IN')}</p>
        <div style={{ fontSize: '0.85em', color: vehicle.status === 'New Models' ? '#38a169' : '#f56565' }}>
            {vehicle.status}
        </div>
    </div>
);


// --- 4. Main SportsBicyclePage Component (Modified) ---

const SportsBicyclePage = ({ onNavigate }) => {
    // State to hold the price range filters
    const [minPrice, setMinPrice] = useState(MIN_PRICE);
    const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

    // Function to update the filter state
    const handleFilterChange = (filterName, value) => {
        const numValue = parseInt(value, 10);
        
        if (filterName === 'minPrice' && !isNaN(numValue)) {
            setMinPrice(numValue);
        } else if (filterName === 'maxPrice' && !isNaN(numValue)) {
            setMaxPrice(numValue);
        }
    };

    // Memoized computation of filtered bicycles
    const filteredVehicles = useMemo(() => {
        let currentVehicles = [...allSportsBicycles];

        // Apply Price Range Filter
        currentVehicles = currentVehicles.filter(v => 
            v.price >= minPrice && v.price <= maxPrice
        );

        // Sort by ID or Name (optional, added for consistent view)
        currentVehicles.sort((a, b) => a.id - b.id);
        
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
                        backgroundColor: '#FF6347', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer' 
                    }}
                >
                    &larr; Back to Bicycle Categories
                </button>
                
                <h2 style={{ color: "#228B22", marginBottom: "20px" }}>
                    <span role="img" aria-label="bike emoji">🚴</span> Sports & Racing Bicycles ({filteredVehicles.length})
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
                            No sports bicycles found in the price range (₹{minPrice.toLocaleString('en-IN')} - ₹{maxPrice.toLocaleString('en-IN')}).
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SportsBicyclePage;