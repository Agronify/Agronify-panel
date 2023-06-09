import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { setUploadProgress } from "../slices/global";
import {
  Crop,
  Knowledge,
  CropDisease,
  Model,
  ModelClass,
  UploadResp,
  User,
} from "./types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Knowledge", "Crop", "CropDisease", "Model", "ModelClass"],
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

    getDiseases: builder.query<CropDisease[], number>({
      query: (id) => `/crops/${id}/diseases`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "CropDisease", id } as const)),
              {
                type: "CropDisease",
                id: "LIST",
              },
            ]
          : [{ type: "CropDisease", id: "LIST" }],
    }),

    getDisease: builder.query<
      CropDisease,
      { cropId: number; diseaseId: number }
    >({
      query: ({ cropId, diseaseId }) =>
        `/crops/${cropId}/diseases/${diseaseId}`,
      providesTags: (result, error, { cropId, diseaseId }) => [
        { type: "CropDisease", id: diseaseId },
      ],
    }),

    createDisease: builder.mutation<
      CropDisease,
      { cropId: number; disease: CropDisease }
    >({
      query: (params) => ({
        url: `/crops/${params.cropId}/diseases`,
        method: "POST",
        body: params.disease,
      }),
      invalidatesTags: (result, error, params) => [
        { type: "CropDisease", id: params.disease.id },
        { type: "CropDisease", id: "LIST" },
      ],
    }),

    updateDisease: builder.mutation<
      CropDisease,
      { cropId: number; diseases: CropDisease }
    >({
      query: ({ cropId, diseases: cropdisease }) => ({
        url: `/crops/${cropId}/diseases/${cropdisease.id}`,
        method: "PUT",
        body: cropdisease,
      }),
      invalidatesTags: (result, error) => [{ type: "CropDisease", id: "LIST" }],
    }),

    deleteDisease: builder.mutation<
      void,
      { cropId: number; diseaseId: number }
    >({
      query: ({ cropId, diseaseId }) => ({
        url: `/crops/${cropId}/diseases/${diseaseId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, params) => [
        { type: "CropDisease", id: params.diseaseId },
      ],
    }),

    getModels: builder.query<Model[], void>({
      query: () => "/models",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Model", id } as const)),
              {
                type: "Model",
                id: "LIST",
              },
            ]
          : [{ type: "Model", id: "LIST" }],
    }),

    getModel: builder.query<Model, number>({
      query: (id) => `/models/${id}`,
      providesTags: (result, error, id) => [{ type: "Model", id }],
    }),

    createModel: builder.mutation<Model, Model>({
      query: (model) => ({
        url: `/models`,
        method: "POST",
        body: model,
      }),
      invalidatesTags: [{ type: "Model", id: "LIST" }],
    }),

    updateModel: builder.mutation<Model, Model>({
      query: (model) => ({
        url: `/models/${model.id}`,
        method: "PUT",
        body: model,
      }),
      invalidatesTags: (result, error, model) => [
        { type: "Model", id: model.id },
        { type: "Model", id: "LIST" },
      ],
    }),

    deleteModel: builder.mutation<void, number>({
      query: (id) => ({
        url: `/models/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Model", id }],
    }),

    getModelClasses: builder.query<ModelClass[], number>({
      query: (id) => `/models/${id}/classes`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "ModelClass", id } as const)),
              {
                type: "Model",
                id: "LIST",
              },
            ]
          : [{ type: "ModelClass", id: "LIST" }],
    }),

    getModelClass: builder.query<
      ModelClass,
      { modelId: number; classId: number }
    >({
      query: ({ modelId, classId }) => `/models/${modelId}/classes/${classId}`,
      providesTags: (result, error, { modelId, classId }) => [
        { type: "ModelClass", id: classId },
      ],
    }),

    updateModelClass: builder.mutation<
      ModelClass,
      { modelId: number; class: ModelClass }
    >({
      query: ({ modelId, class: modelClass }) => ({
        url: `/models/${modelId}/classes/${modelClass.id}`,
        method: "PUT",
        body: modelClass,
      }),
      invalidatesTags: (result, error, params) => [
        { type: "ModelClass", id: params.class.id },
        { type: "ModelClass", id: "LIST" },
      ],
    }),

    deleteModelClass: builder.mutation<
      void,
      { modelId: number; classId: number }
    >({
      query: ({ modelId, classId }) => ({
        url: `/models/${modelId}/classes/${classId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, params) => [
        { type: "ModelClass", id: params.classId },
      ],
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
  useGetKnowledgesQuery,
  useGetKnowledgeQuery,
  useCreateKnowledgeMutation,
  useUpdateKnowledgeMutation,
  useDeleteKnowledgeMutation,
  useGetCropsQuery,
  useGetModelsQuery,
  useLazyGetModelQuery,
  useCreateModelMutation,
  useUpdateModelMutation,
  useDeleteModelMutation,
  useLazyGetModelClassesQuery,
  useLazyGetDiseasesQuery,
  useUpdateModelClassMutation,
  useGetCropQuery,
  useCreateCropMutation,
  useUpdateCropMutation,
  useDeleteCropMutation,
  useGetDiseasesQuery,
  useGetDiseaseQuery,
  useCreateDiseaseMutation,
  useUpdateDiseaseMutation,
  useDeleteDiseaseMutation,
} = api;
