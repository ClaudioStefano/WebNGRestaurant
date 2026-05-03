import BrandSelector from '../components/BrandSelector';

function Home({ selectedBrand, onSelectBrand }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bienvenido a NGR Marketplace</h1>
          <p className="mt-2 text-gray-600">Elige tu marca favorita y ordena ahora</p>
        </div>

        <BrandSelector 
          selectedBrand={selectedBrand} 
          onSelectBrand={onSelectBrand} 
        />

        {selectedBrand && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-center">
              Aquí se mostrarán los productos de la marca seleccionada.
              <br />
              <span className="text-sm text-gray-400">(Próximamente: integración con API)</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;