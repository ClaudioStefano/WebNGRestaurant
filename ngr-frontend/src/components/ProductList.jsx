import { useState, useEffect } from 'react';
import { getProductsByBrand } from '../services/productService';

function ProductList({ marcaId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!marcaId) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductsByBrand(marcaId);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [marcaId]);

  if (!marcaId) {
    return null;
  }

  if (loading) {
    return <div className="py-6 text-center text-gray-500">Cargando productos...</div>;
  }

  if (error) {
    return <div className="py-6 text-center text-red-500">Error: {error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-center">No hay productos disponibles para esta marca.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Productos disponibles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              {product.imagenUrl ? (
                <img src={product.imagenUrl} alt={product.nombre} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">Sin imagen</span>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900">{product.nombre}</h4>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.descripcion}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-orange-600">S/. {product.precio}</span>
                <span className={`text-xs px-2 py-1 rounded ${product.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.disponible ? 'Disponible' : 'No disponible'}
                </span>
              </div>
              <button className="mt-3 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;