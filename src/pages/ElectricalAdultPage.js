import React, { useState, useMemo } from "react";

// --- 1. Vehicle Data (Expanded for filtering) ---
const allAdultVehicles = [
    { id: 1, name: "Electric Scooter Model X", type: "Scooters", price: 350000, status: "New Models", image: "https://m.media-amazon.com/images/I/51ag+svetuL._UF1000,1000_QL80_.jpg" },
    { id: 2, name: "Electric Motorcycle Z", type: "Bikes", price: 85000, status: "Old Models", image: "https://cdn.olaelectric.com/sites/evdp/pages/bike/mrx_roadster_home_web_image_v6.webp" },
    { id: 3, name: "Electric Scooter S", type: "Scooters", price: 210000, status: "New Models", image: "https://www.elesco.co.in/images/products/best-electric-bike.jpg" },
    { id: 4, name: "Electric Cruiser M", type: "Cruisers", price: 490000, status: "New Models", image: "https://image.made-in-china.com/365f3j00JWvcAkbtwwqp/2000W-City-Cruise-Adult-Electric-Motorcycle-with-High-Endurance-55km-H.webp" },
    { id: 5, name: "City E-Bike", type: "Bikes", price: 120000, status: "Old Models", image: "https://electrek.co/wp-content/uploads/sites/3/2024/01/segway-xyber-header.jpg" },
    { id: 6, name: "High-Speed Scooter", type: "Scooters", price: 310000, status: "New Models", image: "https://m.media-amazon.com/images/I/516D1kCkSGL.jpg" },
];

// --- 2. FilterSidebar Component (Embedded within the file) ---

const FilterSidebar = ({ onFilterChange, currentFilters }) => {
    
    const typeOptions = ['Scooters', 'Bikes', 'Cruisers'];
    const priceSortOptions = ['Low to High', 'High to Low'];
    const modelAgeOptions = ['New Models', 'Old Models'];

    const handleFilterClick = (filterName, value) => {
        onFilterChange(filterName, value);
    };

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

    const isSelected = (filterName, value) => currentFilters[filterName] === value;

    const getFilterItemStyle = (filterName, value) => ({
        padding: '8px 5px',
        cursor: 'pointer',
        color: isSelected(filterName, value) ? '#fff' : '#555',
        backgroundColor: isSelected(filterName, value) ? '#007bff' : 'transparent',
        transition: 'color 0.2s, background-color 0.2s',
        borderRadius: '4px',
        borderLeft: isSelected(filterName, value) ? '3px solid #ff4500' : 'none'
    });

    return (
        <div style={sidebarStyle}>
            <h3 style={{ color: '#ff4500', marginBottom: '20px' }}>
                Filter E-Vehicles
            </h3>
            
            {/* Sort by Price */}
            <div className="filter-section">
                <p style={sectionTitleStyle}>Sort By Price</p>
                {priceSortOptions.map(option => (
                    <div 
                        key={option} 
                        style={getFilterItemStyle('priceSort', option)}
                        onClick={() => handleFilterClick('priceSort', isSelected('priceSort', option) ? null : option)} // Toggle
                    >
                        {option}
                    </div>
                ))}
            </div>

            {/* Vehicle Type Filter */}
            <div className="filter-section">
                <p style={sectionTitleStyle}>E-Vehicle Type</p>
                {typeOptions.map(option => (
                    <div 
                        key={option} 
                        style={getFilterItemStyle('vehicleType', option)}
                        onClick={() => handleFilterClick('vehicleType', isSelected('vehicleType', option) ? null : option)}
                    >
                        {option}
                    </div>
                ))}
            </div>

            {/* Model Age Filter */}
            <div className="filter-section">
                <p style={sectionTitleStyle}>Model Age</p>
                {modelAgeOptions.map(option => (
                    <div 
                        key={option} 
                        style={getFilterItemStyle('modelAge', option)}
                        onClick={() => handleFilterClick('modelAge', isSelected('modelAge', option) ? null : option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
            
        </div>
    );
};


// --- 3. Vehicle Card Component ---

const VehicleCard = ({ vehicle }) => (
    <div key={vehicle.id} style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center", borderRadius: "8px", background: "#fff", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", width: '100%', maxWidth: '300px' }}>
        <img src={vehicle.image} alt={vehicle.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />
        <h4 style={{ color: '#1e293b', marginTop: '10px' }}>{vehicle.name}</h4>
        <p style={{ fontWeight: 'bold', color: '#007bff', margin: '5px 0' }}>₹ {vehicle.price.toLocaleString('en-IN')}</p>
        <div style={{ fontSize: '0.85em', color: vehicle.status === 'New Models' ? '#38a169' : '#f56565' }}>
            {vehicle.status}
        </div>
    </div>
);


// --- 4. Main ElectricalAdultPage Component (Modified) ---

const ElectricalAdultPage = ({ onNavigate }) => {
    // State to hold the currently selected filters
    const [filters, setFilters] = useState({
        priceSort: null, // 'Low to High' or 'High to Low'
        vehicleType: null,
        modelAge: null,
    });

    // Function to update the filter state
    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    // Memoized computation of filtered and sorted vehicles
    const filteredVehicles = useMemo(() => {
        let currentVehicles = [...allAdultVehicles];

        // 1. Apply Type Filter
        if (filters.vehicleType) {
            currentVehicles = currentVehicles.filter(v => v.type === filters.vehicleType);
        }

        // 2. Apply Model Age Filter
        if (filters.modelAge) {
            currentVehicles = currentVehicles.filter(v => v.status === filters.modelAge);
        }

        // 3. Apply Price Sort
        if (filters.priceSort) {
            currentVehicles.sort((a, b) => {
                if (filters.priceSort === 'Low to High') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
        }

        return currentVehicles;
    }, [filters]);


    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            
            {/* 1. Filter Sidebar */}
            <FilterSidebar 
                onFilterChange={handleFilterChange} 
                currentFilters={filters}
            />

            {/* 2. Main Content Area */}
            <div style={{ flexGrow: 1, padding: "20px" }}>
                <button 
                    onClick={() => onNavigate('electrical')} 
                    style={{ 
                        marginBottom: '20px', 
                        padding: '10px 15px', 
                        backgroundColor: '#ff4500', // Changed button color for visibility
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer' 
                    }}
                >
                    &larr; Back to Electrical Categories
                </button>
                
                <h2 style={{ color: "#4169E1", marginBottom: "20px" }}>
                    <span role="img" aria-label="electric bike emoji">🏍️</span> All Electric Bikes & Scooties ({filteredVehicles.length})
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
                            No electric vehicles match your current filter selection.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ElectricalAdultPage;