import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE } from '../config/apiBase.js';


export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  tagTypes: ['Product', 'Products'],
  endpoints: (builder) => ({
    // GET /products/by-barcode/:code
    getProductByBarcode: builder.query({
      query: (code) => `/products/by-barcode/${encodeURIComponent(code)}?soft=1`,
      transformResponse: (response) => (
        response && response.found === false ? null : response
      ),
    }),



    // POST /products
    createProduct: builder.mutation({
      query: (body) => ({ url: '/products', method: 'POST', body }),
      invalidatesTags: (res) =>
        res ? [{ type: 'Products' }, { type: 'Product', id: res.id }] : [{ type: 'Products' }],
    }),

    // (opcional) GET /products (lista)
    listProducts: builder.query({
      query: ({ q = '', limit = 60, page = 1 } = {}) =>
        `/products?q=${encodeURIComponent(q)}&limit=${limit}&page=${page}`,
      providesTags: ['Products'],
    }),

    // (opcional) PUT /products/:id/image
    updateProductImage: builder.mutation({
      query: ({ id, imageDataUrl }) => ({
        url: `/products/${id}/image`,
        method: 'PUT',
        body: { imageDataUrl },
      }),
      invalidatesTags: (_res, _err, arg) => [{ type: 'Product', id: arg.id }],
    }),
  }),
});

export const {
  useLazyGetProductByBarcodeQuery,
  useCreateProductMutation,
  useListProductsQuery,
  useUpdateProductImageMutation,
} = productsApi;


