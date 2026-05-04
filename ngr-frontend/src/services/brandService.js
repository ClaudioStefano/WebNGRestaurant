import BASE_URL from './api';

export const getAllBrands = async () => {
  const response = await fetch(`${BASE_URL}/marcas`);
  if (!response.ok) {
    throw new Error('Error al obtener las marcas');
  }
  return response.json();
};