import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { PhotoUpload } from './pages/Onboarding/PhotoUpload';
import { Measurements } from './pages/Onboarding/Measurements';
import { StylePreferences } from './pages/Onboarding/StylePreferences';
import { Dashboard } from './pages/Main/Dashboard';
import { VirtualTryOn } from './pages/Main/VirtualTryOn';
import { Stylist } from './pages/Main/Stylist';
import { Wardrobe } from './pages/Main/Wardrobe';
import { UserProfile, WardrobeItem } from './types';

// --- State Management ---
interface AppState {
  user: UserProfile | null;
  wardrobe: WardrobeItem[];
  setUser: (user: UserProfile | null) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  addToWardrobe: (item: WardrobeItem) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppStore must be used within AppProvider");
  return context;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([
    { id: '1', type: 'Top', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', tags: ['casual', 'white', 't-shirt'] },
    { id: '2', type: 'Bottom', imageUrl: 'https://images.unsplash.com/photo-1542272617-08f086302542?w=400', tags: ['jeans', 'denim', 'blue'] },
    { id: '3', type: 'Dress', imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400', tags: ['floral', 'summer', 'dress'] },
  ]);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const addToWardrobe = (item: WardrobeItem) => {
    setWardrobe(prev => [item, ...prev]);
  };

  return (
    <AppContext.Provider value={{ user, wardrobe, setUser, updateUser, addToWardrobe }}>
      {children}
    </AppContext.Provider>
  );
};

// --- Layouts ---

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: 'fa-home', label: 'Home', path: '/home' },
    { icon: 'fa-tshirt', label: 'Try-On', path: '/try-on' },
    { icon: 'fa-layer-group', label: 'Wardrobe', path: '/wardrobe' },
    { icon: 'fa-wand-magic-sparkles', label: 'Stylist', path: '/stylist' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {children}
      </div>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center space-y-1 ${
              location.pathname === item.path ? 'text-brand-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <i className={`fas ${item.icon} text-lg`}></i>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAppStore();
  if (!user) return <Navigate to="/" replace />;
  return <MainLayout>{children}</MainLayout>;
};

// --- Main App ---

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          
          {/* Onboarding Routes */}
          <Route path="/onboarding/upload" element={<PhotoUpload />} />
          <Route path="/onboarding/measurements" element={<Measurements />} />
          <Route path="/onboarding/style" element={<StylePreferences />} />
          
          {/* Main App Routes */}
          <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/try-on" element={<ProtectedRoute><VirtualTryOn /></ProtectedRoute>} />
          <Route path="/wardrobe" element={<ProtectedRoute><Wardrobe /></ProtectedRoute>} />
          <Route path="/stylist" element={<ProtectedRoute><Stylist /></ProtectedRoute>} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
