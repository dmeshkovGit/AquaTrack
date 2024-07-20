import instance from './axiosInstance';

export const getMonthInfo = async () => {
  try {
    const { data } = await instance.get(`/api/water/month/1720848000`); // 20.08.2024
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
