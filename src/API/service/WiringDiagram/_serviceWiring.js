import AxiosConfig from '../../AxiosConfig';

export const getDataWiring = async () => {
  try {
    const response = await AxiosConfig.get('/wiring');
    return response.data;
  } catch (error) {
    throw error;
  }
};
