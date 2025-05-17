const backendBaseURL = import.meta.env.VITE_BACKEND_URL_DEV;

const ImageAPIBaseURL = `${backendBaseURL}/api/images`;
const ImageAPI = {
  getAll: `${ImageAPIBaseURL}/`,
  getById: (id) => `${ImageAPIBaseURL}/${id}`,
  create: `${ImageAPIBaseURL}/`,
  delete: (id) => `${ImageAPIBaseURL}/${id}`,
};

export default ImageAPI;