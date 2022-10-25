import axios from 'axios';

export const customFetch = async ( url, method, params = {}, data = {} ) => {
  const baseURL = process.env.REACT_APP_END_POINT || '';
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  };
  const res = await axios({ baseURL, url, method, headers, params, data })
  .catch(error => console.log(error));

  if(res)
    return res.data;
};

export const register = (email, password, user_name, gender, age) => 
  customFetch('/register', 'post', {}, { email, password, user_name, gender, age });

export const login = (account, password) => 
  customFetch('/verify', 'post', {}, { account, password });

export const getAllAttraction = () =>
  customFetch('/attrct_detail', 'post', {}, {});

export const getFlow = (start_time, end_time) =>
  customFetch('/flow_report', 'post', { }, { start_time, end_time });

export const getIcon = (method, email) =>
  customFetch('/icon', 'post', { }, { method, email });

export const setIcon = (method, email, attraction, icon) =>
  customFetch('/icon', 'post', { }, { method, email, attraction, icon });