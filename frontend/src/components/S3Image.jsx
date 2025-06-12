import React, { useState, useEffect } from 'react';
import { ImageStreamAPI } from "../constants/apiRoutes";

const S3Image = ({ imageKey, className, alt = 'Image from S3' }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const url = ImageStreamAPI.getImageStream(imageKey);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const blob = await response.blob();
        const localUrl = URL.createObjectURL(blob);
        setImageUrl(localUrl);
      } catch (error) {
        setError('Failed to load image');
        console.error('Error loading image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (imageKey) {
      fetchImage();
    }

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageKey]);

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full h-64 relative">
      <img 
        src={imageUrl} 
        alt={alt}
        className={`${className} w-full h-full object-cover`}
      />
    </div>
  );
};

export default S3Image; 