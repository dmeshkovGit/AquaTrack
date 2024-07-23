import instance from './axiosInstance';

export const getMonthInfo = async date => {
  try {
    const { data } = await instance.get(`api/water/month/${date}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const { data } = await instance.get('/api/users');
    return data.result;
  } catch (error) {
    const response = {
      message: error.response.data.message,
      statusCode: error.response.status,
    };
    console.log(response.message);
  }
};
