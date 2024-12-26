import axios from "axios";

const api = axios.create({
  baseURL: "https://v6.exchangerate-api.com/v6/889a99f0361d959e3fa5ea98",
});

export const convertCurrency = async (from, to, amount) => {
  const res = await api.get(`/pair/${from}/${to}/${amount}`);
  return res.data.conversion_result;
};
