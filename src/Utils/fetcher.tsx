import axios, { AxiosResponse } from 'axios';

const fetcherGet = (url: string) =>
  axios.get(url).then((response: AxiosResponse<unknown>) => response.data);
export const fetcherPost = (url: string) =>
  axios.post(url).then((response: AxiosResponse<unknown>) => response.data);
export const fetcherPut = (url: string) =>
  axios.put(url).then((response: AxiosResponse<unknown>) => response.data);

export default fetcherGet;
