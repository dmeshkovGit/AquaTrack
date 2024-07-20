import instance from './axiosInstance';

export const getMonthInfo = async date => {
  try {
    const { data } = await instance.get(`api/water/month/${date}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
