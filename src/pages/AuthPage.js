import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for component validation

// --- Configuration and Helper Components ---

// Tailwind colors configured for the metallic/dark theme
const VAHAN_COLORS = {
    dark: '#1e293b', // Slate-800 equivalent
    accent: '#facc15', // Yellow-500 equivalent
    text: '#f1f5f9', // Slate-100 equivalent
};

// Custom Alert Modal Component (replaces browser alerts)
const AlertModal = ({ title, message, onClose, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300" aria-modal="true" role="dialog">
            <div className="bg-vahan-dark p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100">
                <h3 className="text-xl font-bold text-vahan-accent mb-3">{title}</h3>
                <p className="text-gray-300 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full px-4 py-2 bg-vahan-accent text-vahan-dark font-semibold rounded-lg hover:bg-yellow-400 transition duration-150"
                >
                    OK
                </button>
            </div>
        </div>
    );
};
AlertModal.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
};

// Custom Checkbox Component (for "Remember Me" / "T&C")
const CustomCheckbox = ({ id, label, checked, onChange }) => (
    <div className="flex items-center">
        <input
            id={id}
            name={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            // Retain the correct class for Tailwind
            className="opacity-0 w-0 h-0 absolute" 
        />
        <label htmlFor={id} className="inline-flex items-center cursor-pointer custom-checkbox-label">
            {/* FIX: Removed non-standard template literal string concatenation from className */}
            <span className={`w-5 h-5 border-2 ${checked ? 'bg-vahan-accent border-vahan-accent' : 'border-gray-500'} rounded-md mr-2 flex items-center justify-center transition-all duration-200`}>
                <svg className={`w-3 h-3 text-vahan-dark ${checked ? 'block' : 'hidden'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </span>
            {/* Render label as a React node to support the <a> tag in SignupComponent */}
            <span className="text-gray-400 text-sm hover:text-vahan-text">{label}</span>
        </label>
    </div>
);
CustomCheckbox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};


// Password Input with Visibility Toggle
const PasswordInput = ({ value, onChange, label, id = "password" }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const toggleVisibility = () => setPasswordVisible(prev => !prev);

    // SVG icons for eye open/closed
    const EyeIcon = passwordVisible ? (
        // Eye-slash icon (simulated)
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.057 10.057 0 0112 19c-4.478 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7 1.054 0 2.052.164 3 .477M17.828 17.828L7.172 7.172"></path>
    ) : (
        // Eye icon
        <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></>
    );

    return (
        <div className="relative">
            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <input
                type={passwordVisible ? 'text' : 'password'}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                required
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-vahan-text placeholder-gray-500 pr-10 focus:outline-none focus:border-vahan-accent focus:shadow-sm focus:shadow-vahan-accent/50 transition duration-150"
            />
            <button
                type="button"
                onClick={toggleVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 pt-5 text-gray-400 hover:text-vahan-accent focus:outline-none"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {EyeIcon}
                </svg>
            </button>
        </div>
    );
};
PasswordInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
};

// --- Form Components ---

// Login View
const LoginComponent = ({ onSwitchPage, onAlert }) => {
    const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock authentication logic
        if (formData.email === 'user@vahan.com' && formData.password === 'securepass') {
            onAlert("Success!", `Welcome back, ${formData.email}! Authentication successful.`);
            // NOTE: Add logic here to switch to 'home' page in the main App.jsx 
            // by calling a prop (e.g., props.onLoginSuccess()) if needed.
        } else {
            onAlert("Login Failed", "The email/phone or password you entered is incorrect. Please try again.");
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            {/* Email/Phone Input */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email or Phone Number</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-vahan-text placeholder-gray-500 focus:outline-none focus:border-vahan-accent focus:shadow-sm focus:shadow-vahan-accent/50 transition duration-150"
                />
            </div>

            {/* Password Input */}
            <PasswordInput
                value={formData.password}
                onChange={handleChange}
                label="Password"
                id="password"
            />

            {/* Forgot Password & Remember Me */}
            <div className="flex items-center justify-between text-sm">
                <CustomCheckbox
                    id="rememberMe"
                    label="Remember Me"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                />
                <a href="#" className="font-medium text-vahan-accent hover:text-yellow-400 transition duration-150">
                    Forgot Password?
                </a>
            </div>

            {/* Primary Login Button */}
            <button
                type="submit"
                className="w-full px-4 py-3 bg-vahan-accent text-vahan-dark font-bold rounded-lg shadow-lg transition duration-200 focus:ring-4 focus:ring-vahan-accent/50 focus:outline-none uppercase tracking-wider btn-primary hover:shadow-xl"
            >
                Log In
            </button>

            {/* Signup Link */}
            <p className="mt-6 text-center text-sm text-gray-400">
                Don't have an account?
                <button
                    type="button"
                    onClick={() => onSwitchPage('signup')}
                    className="font-medium text-vahan-accent hover:text-yellow-400 transition duration-150 ml-1 bg-transparent border-none p-0 cursor-pointer"
                >
                    Sign up here
                </button>
            </p>
        </form>
    );
};
LoginComponent.propTypes = {
    onSwitchPage: PropTypes.func.isRequired,
    onAlert: PropTypes.func.isRequired,
};

// Sign Up View
const SignupComponent = ({ onSwitchPage, onAlert }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        street: '', 
        city: '', 
        stateProvince: '', 
        pincode: '', 
        terms: false,
    });

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            onAlert("Error", "Passwords do not match. Please check them again.");
            return;
        }
        if (!formData.terms) {
            onAlert("Error", "You must accept the Terms & Conditions to sign up.");
            return;
        }

        // Mock signup success logic
        onAlert("Welcome to Vahan Bazar!", `Signup successful for ${formData.fullName}. You can now log in.`);
        // Switch back to login after success (2-second delay for user to read alert)
        setTimeout(() => onSwitchPage('login'), 2000);
    };

    return (
        <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name Input */}
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-vahan-text placeholder-gray-500 focus:outline-none focus:border-vahan-accent focus:shadow-sm focus:shadow-vahan-accent/50 transition duration-150"
                />
            </div>

            {/* Email Input */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email or Phone Number</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-vahan-text placeholder-gray-500 focus:outline-none focus:border-vahan-accent focus:shadow-sm focus:shadow-vahan-accent/50 transition duration-150"
                />
            </div>

            {/* Password Input */}
            <PasswordInput
                value={formData.password}
                onChange={handleChange}
                label="New Password"
                id="password"
            />
            {/* Confirm Password Input */}
             <PasswordInput
                value={formData.confirmPassword}
                onChange={handleChange}
                label="Confirm Password"
                id="confirmPassword"
            />

            {/* --- Structured Address Inputs (Key Requirement) --- */}
            <div className="pt-2">
                <label className="block text-sm font-bold text-vahan-accent mb-2">Address Information</label>
                {/* Street Address */}
                <div className="mb-4">
                    <label htmlFor="street" className="block text-xs font-medium text-gray-400 mb-1">Street Address</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-vahan-text placeholder-gray-500 focus:outline-none focus:border-vahan-accent transition duration-150"
                    />
                </div>

                {/* City and State/Province in a two-column grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="city" className="block text-xs font-medium text-gray-400 mb-1">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-vahan-text placeholder-gray-500 focus:outline-none focus:border-vahan-accent transition duration-150"
                        />
                    </div>
                    <div>
                        <label htmlFor="stateProvince" className="block text-xs font-medium text-gray-400 mb-1">State / Province</label>
                        <input
                            type="text"
                            id="stateProvince"
                            name="stateProvince"
                            value={formData.stateProvince}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-vahan-text placeholder-gray-500 focus:outline-none focus:border-vahan-accent transition duration-150"
                        />
                    </div>
                </div>

                {/* Pincode / Zipcode */}
                <div>
                    <label htmlFor="pincode" className="block text-xs font-medium text-gray-400 mb-1">Pincode / Zipcode</label>
                    <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        pattern="[A-Za-z0-9\s-]+" // Basic pattern for zip/pincodes
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-vahan-text placeholder-gray-500 focus:outline-none focus:border-vahan-accent transition duration-150"
                    />
                </div>
            </div>
            {/* --- End Structured Address Inputs --- */}

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-center pt-2">
                <CustomCheckbox
                    id="terms"
                    label={
                        <span className="text-gray-400 hover:text-vahan-text">
                            I agree to the <a href="#" className="text-vahan-accent hover:text-yellow-400">Terms & Conditions</a>
                        </span>
                    }
                    checked={formData.terms}
                    onChange={handleChange}
                />
            </div>


            {/* Primary Signup Button */}
            <button
                type="submit"
                className="w-full px-4 py-3 bg-vahan-accent text-vahan-dark font-bold rounded-lg shadow-lg transition duration-200 focus:ring-4 focus:ring-vahan-accent/50 focus:outline-none uppercase tracking-wider btn-primary hover:shadow-xl mt-6"
            >
                Create Account
            </button>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-gray-400">
                Already have an account?
                <button
                    type="button"
                    onClick={() => onSwitchPage('login')}
                    className="font-medium text-vahan-accent hover:text-yellow-400 transition duration-150 ml-1 bg-transparent border-none p-0 cursor-pointer"
                >
                    Log in here
                </button>
            </p>
        </form>
    );
};
SignupComponent.propTypes = {
    onSwitchPage: PropTypes.func.isRequired,
    onAlert: PropTypes.func.isRequired,
};


// --- Main Authentication Component (Renamed to AuthPage) ---
const AuthPage = () => {
    const [currentPage, setCurrentPage] = useState('login'); // 'login' or 'signup'
    const [alertState, setAlertState] = useState({ isVisible: false, title: '', message: '' });

    const handleAlert = (title, message) => {
        setAlertState({ isVisible: true, title, message });
    };

    const closeModal = () => {
        setAlertState({ isVisible: false, title: '', message: '' });
    };

    // Shared social login button structure
    const SocialLoginButtons = () => (
        <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-800 transition duration-150">
                {/* Google Icon SVG */}
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.5-.2-2.2H12v4.26h5.81c-.28 1.45-1.07 2.68-2.34 3.56v2.77h3.57c2.09-1.92 3.3-4.75 3.3-8.03z" fill="#4285F4"></path>
                    <path d="M12 23c3.22 0 5.92-1.09 7.9-2.98l-3.57-2.77c-.98.66-2.23 1.05-4.33 1.05-3.66 0-6.84-2.47-7.95-5.83H.34v2.85C2.46 20.83 7.02 23 12 23z" fill="#34A853"></path>
                    <path d="M4.05 13.75c-.11-.32-.18-.65-.18-.99s.07-.67.18-.99V9.91H.34c-.66 1.34-.96 2.87-.96 4.47s.3 3.13.96 4.47l3.71-2.84z" fill="#FBBC05"></path>
                    <path d="M12 4.78c1.77 0 3.32.61 4.56 1.71l3.1-3.1C18.17 1.83 15.34.78 12 .78 7.02.78 2.46 2.97.34 7.23l3.71 2.85c1.11-3.36 4.29-5.83 7.95-5.83z" fill="#EA4335"></path>
                </svg>
                {currentPage === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-800 transition duration-150">
                {/* Facebook Icon SVG */}
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.353c-.58 0-.647.228-.647.747v1.173h2l-.248 2h-1.752v6h-3v-6h-2v-2h2v-1.2c0-1.896 1.03-2.924 3.012-2.924h1.988v3z"/>
                </svg>
                {currentPage === 'login' ? 'Sign in with Facebook' : 'Sign up with Facebook'}
            </button>
        </div>
    );

    return (
        <div className="min-h-screen flex justify-center items-center p-4 bg-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Main Content Card */}
            <div className="w-full max-w-sm mx-auto p-6 md:p-8 bg-vahan-dark text-vahan-text rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-vahan-accent/50">

                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="text-vahan-accent text-4xl font-extrabold tracking-widest">
                        VB
                    </div>
                    <h1 className="text-3xl font-bold mt-2">Vahan Bazar</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {currentPage === 'login' ? 'Find your next ride instantly!' : 'Join the two-wheeler revolution!'}
                    </p>
                </div>

                {/* Social Login Section */}
                <SocialLoginButtons />

                <div className="relative flex justify-center text-xs mb-6">
                    <span className="px-2 bg-vahan-dark text-gray-400 z-10">
                        {currentPage === 'login' ? 'Or log in with email' : 'Or sign up with details'}
                    </span>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-700"></div>
                    </div>
                </div>

                {/* Conditional Form Rendering */}
                <div className="transition-opacity duration-500">
                    {currentPage === 'login' ? (
                        <LoginComponent
                            onSwitchPage={setCurrentPage}
                            onAlert={handleAlert}
                        />
                    ) : (
                        <SignupComponent
                            onSwitchPage={setCurrentPage}
                            onAlert={handleAlert}
                        />
                    )}
                </div>
            </div>

            {/* Custom Alert Modal */}
            <AlertModal
                title={alertState.title}
                message={alertState.message}
                isVisible={alertState.isVisible}
                onClose={closeModal}
            />

            {/* Inline Style for Custom Classes (keep this until you move to a proper CSS file) */}
            <style>{`
                /* Custom utility classes not directly supported by Tailwind config */
                .bg-vahan-dark { background-color: ${VAHAN_COLORS.dark}; }
                .text-vahan-accent { color: ${VAHAN_COLORS.accent}; }
                .text-vahan-text { color: ${VAHAN_COLORS.text}; }
                .text-vahan-dark { color: ${VAHAN_COLORS.dark}; }
                .btn-primary:hover {
                    box-shadow: 0 4px 15px rgba(252, 204, 21, 0.4);
                    transform: translateY(-1px);
                }
            `}</style>
        </div>
    );
};

// --- Export the component as AuthPage ---
export default AuthPage;