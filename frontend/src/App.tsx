import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { ChatAssistant } from './pages/ChatAssistant';
import { ImageAnalysis } from './pages/ImageAnalysis';
import { Features } from './pages/Features';
import { About } from './pages/About';
import { Doctors } from './pages/Doctors';
import { MapPrediction } from './pages/MapPrediction';
import { AuthProvider } from './contexts/AuthContext';
import './styles/globals.css';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="chat" element={<ChatAssistant />} />
            <Route path="analysis" element={<ImageAnalysis />} />
            <Route path="features" element={<Features />} />
            <Route path="about" element={<About />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="map-prediction" element={<MapPrediction />} />
            <Route path="signup" element={<SignUp />} />
            {/* Add 404 page */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">404</h1>
                  <p className="text-lg">Page not found</p>
                </div>
              </div>
            } />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;