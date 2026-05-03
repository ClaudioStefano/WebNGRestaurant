import { ShoppingCart } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-orange-600">NGR</h1>
            <span className="ml-2 text-gray-600">Marketplace</span>
          </div>
          
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;