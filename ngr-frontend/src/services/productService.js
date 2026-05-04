import BASE_URL from './api';

export const getProductsByBrand = async (marcaId) => {
  const response = await fetch(`${BASE_URL}/productos/marca/${marcaId}`);
  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }
  return response.json();
};

export const getAllProducts = async () => {
  const response = await fetch(`${BASE_URL}/productos`);
  if (!response.ok) {
    throw new Error('Error al obtener los productos');
  }
  return response.json();
};