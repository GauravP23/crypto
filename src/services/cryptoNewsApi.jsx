import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': '66987213c3mshf5c214a83060ff9p1d40bcjsn30e13fc83eff',
  'X-RapidAPI-Host': 'bloomberg-market-and-financial-news.p.rapidapi.com',
};

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: async (args, api, extraOptions) => {
    const { method = 'GET', url, params, data } = args;

    try {
      const response = await axios.request({
        method,
        url,
        params,
        data,
        headers: cryptoNewsHeaders,
      });
      return { data: response.data };
    } catch (error) {
      return { error: error.response.data };
    }
  },
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (queryTerm, count) => ({
        url: 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/auto-complete',
        params: {
          query: queryTerm,
        },
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
