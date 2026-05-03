const brands = [
  { id: 1, name: 'Bembos', color: 'bg-red-600', text: 'text-white' },
  { id: 2, name: 'ChinaWok', color: 'bg-yellow-500', text: 'text-white' },
  { id: 3, name: 'Don Belisario', color: 'bg-orange-500', text: 'text-white' },
  { id: 4, name: 'Dunkin', color: 'bg-pink-500', text: 'text-white' },
  { id: 5, name: 'Papa Johns', color: 'bg-green-600', text: 'text-white' },
  { id: 6, name: 'Popeyes', color: 'bg-orange-600', text: 'text-white' },
];

function BrandSelector({ selectedBrand, onSelectBrand }) {
  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecciona una marca</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => onSelectBrand(brand.id)}
            className={`
              ${brand.color} ${brand.text}
              rounded-lg p-4 font-semibold text-sm
              transform transition-all duration-200 hover:scale-105 hover:shadow-lg
              ${selectedBrand === brand.id ? 'ring-4 ring-white ring-offset-2' : ''}
            `}
          >
            {brand.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BrandSelector;