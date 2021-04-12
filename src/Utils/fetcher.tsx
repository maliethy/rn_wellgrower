import axios from 'axios';

const fetcherGet = (url: string) => axios.get(url).then((response) => response.data);
const fetcherPost = (url: string) => axios.post(url).then((response) => response.data);
const fetcherPut = (url: string) => axios.put(url).then((response) => response.data);

export default {
  fetcherGet,
  fetcherPost,
  fetcherPut,
};
