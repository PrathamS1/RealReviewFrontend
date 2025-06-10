const backendBaseURL = import.meta.env.VITE_BACKEND_URL_DEV;

const ImageAPIBaseURL = `${backendBaseURL}/api/images`;

const ImageAPI = {
  getAll: `${ImageAPIBaseURL}/`,
  getById: (id) => `${ImageAPIBaseURL}/${id}`,
  create: `${ImageAPIBaseURL}/`,
  delete: (id) => `${ImageAPIBaseURL}/${id}`,
};

const RatingAPI = {
  rate: (id) => `${ImageAPIBaseURL}/${id}/rate`,
  getRating: (id) => `${ImageAPIBaseURL}/${id}/ratings`,
};

const ImageStreamAPI = {
  getImageStream: (id) => `${ImageAPIBaseURL}/image/${id}`,
};

export { ImageAPI, RatingAPI, ImageStreamAPI };