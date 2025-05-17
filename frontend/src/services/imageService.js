// src/services/imageService.js
import axios from 'axios';
import ImageAPI from '../constants/apiRoutes';

export const uploadImage = async (formData) => {
  const response = await axios.post(ImageAPI.create, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAllImages = async () => {
  console.log("Trying to fetch images in service using url: ", ImageAPI.getAll);
  const response = await axios.get(ImageAPI.getAll);
  return response.data;
};

export const getImageById = async (id) => {
  const response = await axios.get(ImageAPI.getById(id));
  return response.data;
};

export const deleteImage = async (id) => {
  const response = await axios.delete(ImageAPI.delete(id));
  return response.data;
};
