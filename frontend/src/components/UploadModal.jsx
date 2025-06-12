import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { uploadImage } from "../services/imageService";
import Toast from "./Toast";

function UploadModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    image: null,
    location: "",
    submitted_by: "",
    rating: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        image: null,
        location: "",
        submitted_by: "",
        rating: "",
      });
      setPreviewImage(null);
      setError(null);
      setSuccess(false);
    }
  }, [isOpen]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError("Please upload a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({ ...prev, image: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', formData.image);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('submitted_by', formData.submitted_by);
      if (formData.rating) {
        formDataToSend.append('rating', formData.rating);
      }

      const response = await uploadImage(formDataToSend);
      setSuccess(true);
      onSubmit(response);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1F2937]/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Upload Estate Image</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-2 border-dashed border-[#F3F4F6] rounded-lg p-8 text-center relative bg-[#F9FAFB]">
                {previewImage ? (
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="absolute top-2 right-2 bg-[#F43F5E] text-white p-1 rounded-full hover:bg-[#F43F5E]/90 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-[#6B7280]">Drag and drop your image here, or click to browse</p>
                    <p className="text-sm text-[#6B7280]">Max file size: 5MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-[#6B7280] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2 border border-[#F3F4F6] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] bg-white text-[#1F2937]"
                    placeholder="e.g., New York, USA"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="submitted_by" className="block text-sm font-medium text-[#6B7280] mb-1">
                    Submitted By
                  </label>
                  <input
                    type="text"
                    id="submitted_by"
                    value={formData.submitted_by}
                    onChange={(e) => setFormData(prev => ({ ...prev, submitted_by: e.target.value }))}
                    className="w-full px-4 py-2 border border-[#F3F4F6] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6] bg-white text-[#1F2937]"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-[#6B7280] mb-1">
                    Rating
                  </label>
                  <input
                    type="number"
                    id="rating"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                    className="w-full px-4 py-2 border border-[#F3F4F6] rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] bg-white text-[#1F2937]"
                    placeholder="0-5"
                    min="0"
                    max="5"
                    step="0.1"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-6 py-2 text-[#6B7280] hover:text-[#1F2937] font-medium transition-colors"
                  disabled={loading}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-[#3B82F6] text-white rounded-lg font-medium hover:bg-[#3B82F6]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    'Upload'
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
      {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
      {success && <Toast message="Image uploaded successfully!" type="success" onClose={() => setSuccess(false)} />}
    </AnimatePresence>
  );
}

export default UploadModal; 