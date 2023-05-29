import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Crop, Knowledge, UploadResp, User } from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Knowledge", "Crop"],
  endpoints: (builder) => ({
    authCheck: builder.query<User | null, void>({
      query: () => `/auth/check`,
    }),
    login: builder.mutation<User, { email: string; password: string }>({
      query: (params) => ({
        url: `/auth/signin`,
        method: "POST",
        body: params,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
    }),
    getKnowledges: builder.query<Knowledge[], void>({
      query: () => `/knowledges`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Knowledge", id } as const)),
              {
                type: "Knowledge",
                id: "LIST",
              },
            ]
          : [{ type: "Knowledge", id: "LIST" }],
    }),
    getKnowledge: builder.query<Knowledge, number>({
      query: (id) => `/knowledges/${id}`,
      providesTags: (result, error, id) => [{ type: "Knowledge", id }],
    }),
    createKnowledge: builder.mutation<Knowledge, Knowledge>({
      query: (knowledge) => ({
        url: `/knowledges`,
        method: "POST",
        body: knowledge,
      }),
      invalidatesTags: [{ type: "Knowledge", id: "LIST" }],
    }),
    updateKnowledge: builder.mutation<Knowledge, Knowledge>({
      query: (knowledge) => ({
        url: `/knowledges/${knowledge.id}`,
        method: "PUT",
        body: knowledge,
      }),
      invalidatesTags: (result, error, knowledge) => [
        { type: "Knowledge", id: knowledge.id },
        { type: "Knowledge", id: "LIST" },
      ],
    }),
    deleteKnowledge: builder.mutation<void, number>({
      query: (id) => ({
        url: `/knowledges/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Knowledge", id }],
    }),

    getCrops: builder.query<Crop[], void>({
      query: () => "/crops",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Crop", id } as const)),
              {
                type: "Crop",
                id: "LIST",
              },
            ]
          : [{ type: "Crop", id: "LIST" }],
    }),
    getCrop: builder.query<Crop, number>({
      query: (id) => `/crops/${id}`,
      providesTags: (result, error, id) => [{ type: "Crop", id }],
    }),
    createCrop: builder.mutation<Crop, Crop>({
      query: (crop) => ({
        url: `/crops`,
        method: "POST",
        body: crop,
      }),
      invalidatesTags: [{ type: "Crop", id: "LIST" }],
    }),
    updateCrop: builder.mutation<Crop, Crop>({
      query: (crop) => ({
        url: `/crops/${crop.id}`,
        method: "PUT",
        body: crop,
      }),
      invalidatesTags: (result, error, crop) => [
        { type: "Crop", id: crop.id },
        { type: "Crop", id: "LIST" },
      ],
    }),
    deleteCrop: builder.mutation<void, number>({
      query: (id) => ({
        url: `/crops/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Crop", id }],
    }),

    uploadFile: builder.mutation<UploadResp, { file: File; type: string }>({
      query: (params) => ({
        url: `/upload`,
        method: "POST",
        body: createMultipartFormData(params),
      }),
    }),
  }),
});

function createMultipartFormData(data: any) {
  const formData = new FormData();
  for (const key of Object.keys(data)) {
    formData.append(key, data[key]);
  }
  return formData;
}

export const {
  useLazyAuthCheckQuery,
  useLoginMutation,
  useLogoutMutation,
  useUploadFileMutation,
  useGetKnowledgesQuery,
  useGetKnowledgeQuery,
  useCreateKnowledgeMutation,
  useUpdateKnowledgeMutation,
  useDeleteKnowledgeMutation,
  useGetCropsQuery,
  useGetCropQuery,
  useCreateCropMutation,
  useUpdateCropMutation,
  useDeleteCropMutation,
} = api;
