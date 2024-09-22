import AxiosConfig from '../../AxiosConfig';

export const getFaultCodes = async () => {
  try {
    const response = await AxiosConfig.get('/type');
    return response.data;
  } catch (error) {
    throw error;
  }
};
