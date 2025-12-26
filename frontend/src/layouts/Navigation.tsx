import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../shared/Logo';
import { Button } from '../ui/Button';
import { 
  Menu, 
  X, 
  MessageSquare, 
  Home, 
  Users,
  Settings,
  UserCircle,
  Moon,
  Sun,
  AlertTriangle,
  Map,
  Info // Add this import
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
            {navigation.map((item) => {
              if (item.isExternal) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      if (item.name === 'Emergency') {
                        const confirmCall = window.confirm(
                          'This will call emergency services (911). Use only for real medical emergencies. Proceed?'
                        );
                        if (!confirmCall) {
                          e.preventDefault();
                        }
                      }
                    }}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                );
              }
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                        : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </NavLink>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
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

            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              leftIcon={<UserCircle className="w-4 h-4" />}
            >
              Sign In
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Get Started
            </Button>

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
              {navigation.map((item) => {
                if (item.isExternal) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        if (item.name === 'Emergency') {
                          const confirmCall = window.confirm(
                            'This will call emergency services (911). Use only for real medical emergencies. Proceed?'
                          );
                          if (!confirmCall) {
                            e.preventDefault();
                          } else {
                            setIsMenuOpen(false);
                          }
                        }
                      }}
                      className={`flex items-center px-3 py-2 rounded-lg text-base font-medium ${
                        item.name === 'Emergency'
                          ? 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300'
                          : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </a>
                  );
                }
                
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-lg text-base font-medium ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                          : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </NavLink>
                );
              })}
              
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
                
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  leftIcon={<UserCircle className="w-4 h-4" />}
                >
                  Sign In
                </Button>
                
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};