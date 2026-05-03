import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Home 
        selectedBrand={selectedBrand} 
        onSelectBrand={setSelectedBrand} 
      />
    </div>
  );
}

export default App;