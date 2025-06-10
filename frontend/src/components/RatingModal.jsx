import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { RatingAPI } from "../constants/apiRoutes";

function RatingModal({ isOpen, onClose, imageId, imageLocation }) {
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [review, setReview] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchRatings();
    }
  }, [isOpen, imageId]);

  const fetchRatings = async () => {
    try {
      const response = await fetch(RatingAPI.getRating(imageId));
      if (!response.ok) throw new Error("Failed to fetch ratings");
      const data = await response.json();
      setRatings(data.ratings);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRating || !submittedBy) return;

    try {
      const response = await fetch(RatingAPI.rate(imageId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: newRating,
          submitted_by: submittedBy,
          review: review,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit rating");
      await fetchRatings();
      setNewRating(0);
      setReview("");
      setSubmittedBy("");
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 10) {
      return `${diffDays}d ago`;
    }
    return date.toLocaleDateString("en-GB");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Rate {imageLocation}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-[calc(90vh-8rem)]">
          {/* Left side - Ratings List */}
          <div className="w-full md:w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Ratings</h3>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : ratings.length === 0 ? (
              <p className="text-gray-500 text-center">No ratings yet</p>
            ) : (
              <div className="space-y-4">
                {ratings.map((rating) => (
                  <div key={rating.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500 font-semibold">★ {rating.rating_value}</span>
                        <span className="text-gray-700 font-medium">{rating.submitted_by}</span>
                      </div>
                      <span className="text-sm text-gray-500">{formatDate(rating.created_at)}</span>
                    </div>
                    <p className="text-gray-600">{rating.review}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Rating Form */}
          <div className="w-full md:w-1/2 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Your Rating</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="text-2xl focus:outline-none"
                    >
                      <span className={star <= (hoveredStar || newRating) ? "text-yellow-500" : "text-gray-300"}>
                        ★
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={submittedBy}
                  onChange={(e) => setSubmittedBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Share your thoughts about this location..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!newRating || !submittedBy}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Submit Rating
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default RatingModal; 