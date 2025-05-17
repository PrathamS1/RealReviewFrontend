// src/hooks/useImages.js
import { useEffect, useState } from 'react';
import { getAllImages, deleteImage } from '../services/imageService';

const normalizeData = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.images)) return data.images;
  return [];
};


const useImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      console.log("Trying to fetch images in hook...");
      const data = await getAllImages();
      console.log("Fetched images: ", data);
      // Ensure data is an array and transform if needed
      const imagesArray = normalizeData(data);

      setImages(imagesArray);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError(err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = async (id) => {
    try {
      await deleteImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error('Error deleting image:', err);
      setError(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return {
    images,
    loading,
    error,
    refresh: fetchImages,
    deleteImage: removeImage,
  };
};

export default useImages;