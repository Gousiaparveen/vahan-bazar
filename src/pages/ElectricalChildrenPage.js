import React, { useState, useMemo } from "react";

// --- 1. Vehicle Data (Expanded for filtering) ---
const allChildrenVehicles = [
    { id: 14, name: "Kids Electric Ride-On Car", type: "Cars", price: 25000, status: "New Models", image: "https://kidsroar.in/cdn/shop/files/kids-electric-jeep-1166-model-big-size-wholesale-buy-online-heavy-duty-thar-jeep-for-kids_1_800x.jpg?v=1708778318" },
    { id: 15, name: "Kids Electric Quad Bike", type: "Quads", price: 18000, status: "new Models", image: "https://www.patoys.in/cdn/shop/files/patoys-thunder-quad-ride-on-atv-dune-racer-battery-operated-bike-for-kids-patoys-patoys-367257.jpg?v=1742745122&width=1445" },
    { id: 16, name: "Kids Electric Mini-Scooter", type: "Scooters", price: 12000, status: "New Models", image: "https://image.made-in-china.com/2f0j00ydEVmWpIfAgf/2024-Mini-Electric-Skateboard-250W-E-Scooter-Foldable-Electric-Scooters-with-Seat-for-Children-with-Cheap-Price.webp" },
    { id: 17, name: "Kids Electric Bike Mini", type: "Bikes", price: 15000, status: "New Models", image: "https://samstoy.in/cdn/shop/files/battery-operated-bike-ahmedabad-gujarat-white-kid-riding-outdoor.png?v=1752299116&width=1445" },
     { id: 14, name: "Kids Electric Ride-On Car", type: "Cars", price: 25000, status: "New Models", image: "https://image.made-in-china.com/2f0j00yoYhNlMrgDUa/New-Multifunctional-Children-s-Toy-Car-4WD-Mini-Electric-Car-with-Early-Education-Function.webp" },
];

// --- 2. FilterSidebar Component (Embedded within the file) ---

// Reusable component for the filter sidebar logic (modified for Children)
const FilterSidebar = ({ onFilterChange, currentFilters }) => {
    
    // Updated type options for Children's vehicles
    const typeOptions = ['Cars', 'Quads', 'Scooters', 'Bikes'];
    
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
        backgroundColor: isSelected(filterName, value) ? '#DC143C' : 'transparent', // Use a shade of red/pink for kids' theme
        transition: 'color 0.2s, background-color 0.2s',
        borderRadius: '4px',
        borderLeft: isSelected(filterName, value) ? '3px solid #FF69B4' : 'none'
    });

    return (
        <div style={sidebarStyle}>
            <h3 style={{ color: '#FF1493', marginBottom: '20px' }}>
                Filter Kids' E-Vehicles
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
                <p style={sectionTitleStyle}>Mini Vehicle Type</p>
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
                <p style={sectionTitleStyle}>Status</p>
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
        <p style={{ fontWeight: 'bold', color: '#FF1493', margin: '5px 0' }}>₹ {vehicle.price.toLocaleString('en-IN')}</p>
        <div style={{ fontSize: '0.85em', color: vehicle.status === 'New Models' ? '#38a169' : '#f56565' }}>
            {vehicle.status}
        </div>
    </div>
);


// --- 4. Main ElectricalChildrenPage Component (Modified) ---

const ElectricalChildrenPage = ({ onNavigate }) => {
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
        let currentVehicles = [...allChildrenVehicles];

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
                        backgroundColor: '#FF69B4', // Pink color for back button
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        cursor: 'pointer' 
                    }}
                >
                    &larr; Back to Electrical Categories
                </button>
                
                <h2 style={{ color: "#FF1493", marginBottom: "20px" }}>
                    <span role="img" aria-label="toy car emoji">🚗</span> Children's Mini Electric Vehicles ({filteredVehicles.length})
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
                            No children's vehicles match your current filter selection.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ElectricalChildrenPage;