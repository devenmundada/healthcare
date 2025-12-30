import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../shared/Logo';
import { Button } from '../ui/Button';
import {
    Menu,
    X,
    MessageSquare,
    Image,
    Home,
    Users,
    Settings,
    UserCircle,
    Moon,
    Sun,
    Bell,
    BellRing,
    Info,
    AlertTriangle,
    Map
} from 'lucide-react';

const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Features', href: '/features', icon: Settings },
    { name: 'Doctors', href: '/doctors', icon: Users },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Emergency', href: 'tel:911', icon: AlertTriangle, isExternal: true },
    { name: 'Map Prediction', href: '/map-prediction', icon: Map },
];

export const Navigation: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [emergencyAlerts, setEmergencyAlerts] = useState(0);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <nav className="sticky top-0 z-50 glass-panel border-b border-white/10">
            <div className="container-wide">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <NavLink to="/" className="flex items-center">
                            <Logo size="md" />
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                                        : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800'
                                    }`
                                }
                            >
                                <item.icon className="w-4 h-4 mr-2" />
                                {item.name}
                            </NavLink>
                        ))}

                        {/* Real-time status indicator */}
                        <div className="hidden lg:flex items-center px-3 py-1 bg-green-50 dark:bg-green-900/30 rounded-full ml-4">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                            <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                AI Systems: Operational
                            </span>
                        </div>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-3">
                        {/* Emergency alerts button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden sm:inline-flex relative"
                            aria-label={`${emergencyAlerts} emergency alerts`}
                        >
                            {emergencyAlerts > 0 ? (
                                <BellRing className="w-4 h-4 text-red-500" />
                            ) : (
                                <Bell className="w-4 h-4" />
                            )}
                            {emergencyAlerts > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    {emergencyAlerts}
                                </span>
                            )}
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleDarkMode}
                            className="hidden sm:inline-flex"
                            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? (
                                <Sun className="w-4 h-4" />
                            ) : (
                                <Moon className="w-4 h-4" />
                            )}
                        </Button>

                        {/* Sign In Link */}
                        <NavLink
                            to="/login"
                            className="hidden sm:inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
                        >
                            <UserCircle className="w-4 h-4 mr-2" />
                            Sign In
                        </NavLink>

                        {/* Sign Up Link */}
                        <NavLink
                            to="/signup"
                            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                        >
                            Sign Up
                        </NavLink>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 mt-2 pt-2 pb-3">
                        <div className="px-2 space-y-1">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 rounded-lg text-base font-medium ${isActive
                                            ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                                            : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800'
                                        }`
                                    }
                                >
                                    <item.icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </NavLink>
                            ))}

                            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    fullWidth
                                    onClick={toggleDarkMode}
                                    leftIcon={darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                >
                                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                                </Button>

                                {/* Mobile Sign In Link */}
                                <NavLink
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors w-full"
                                >
                                    <UserCircle className="w-4 h-4 mr-2" />
                                    Sign In
                                </NavLink>

                                {/* Mobile Sign Up Link */}
                                <NavLink
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors w-full"
                                >
                                    Sign Up
                                </NavLink>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    fullWidth
                                    leftIcon={<AlertTriangle className="w-4 h-4" />}
                                    onClick={() => window.location.href = 'tel:911'}
                                >
                                    Emergency Call
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};