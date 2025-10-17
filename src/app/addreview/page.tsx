// components/ReviewForm.tsx
"use client";
import { useState, useRef } from 'react';

interface ReviewFormData {
  foodId: string;
  userName: string;
  rating: number;
  comment: string;
  image: File | null;
}

interface ReviewFormProps {
  foodId: string;
  foodName: string;
  onSubmit?: (data: ReviewFormData) => void;
  onCancel?: () => void;
}

export default function ReviewForm({ foodId, foodName, onSubmit, onCancel }: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    foodId,
    userName: '',
    rating: 5,
    comment: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userName.trim() || !formData.comment.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('foodId', formData.foodId);
      submitData.append('userName', formData.userName);
      submitData.append('rating', formData.rating.toString());
      submitData.append('comment', formData.comment);
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      // Submit to API
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const result = await response.json();
      
      // Call onSubmit callback if provided
      if (onSubmit) {
        onSubmit(formData);
      }

      // Reset form
      setFormData({
        foodId,
        userName: '',
        rating: 5,
        comment: '',
        image: null,
      });
      setPreviewImage(null);
      
      alert('Review submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Review for {foodName}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant Name *
          </label>
          <input
            type="text"
            id="restaurant"
            name="restaurant"
            value={formData.userName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E52020] focus:border-transparent"
            placeholder="Enter name of the restaurant"
          />
        </div>

        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Food Name *
          </label>
          <input
            type="text"
            id="food"
            name="food"
            value={formData.userName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E52020] focus:border-transparent"
            placeholder="Enter name of the food"
          />
        </div>

        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Restaurant Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.userName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E52020] focus:border-transparent"
            placeholder="Where is the location at?"
          />
        </div>


        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating *
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                className="text-2xl focus:outline-none"
              >
                {star <= formData.rating ? (
                  <span className="text-yellow-500">★</span>
                ) : (
                  <span className="text-gray-300">★</span>
                )}
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">{formData.rating}/5</span>
          </div>
          <input
            type="range"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleInputChange}
            className="w-full mt-2"
          />
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review *
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E52020] focus:border-transparent"
            placeholder="Share your experience with this food..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Add Photo (Optional)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E52020] file:text-white hover:file:bg-[#c41a1a]"
          />
          
          {/* Image Preview */}
          {previewImage && (
            <div className="mt-2 relative">
              <img
                src={previewImage}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#E52020] text-white py-2 px-4 rounded-md hover:bg-[#c41a1a] focus:outline-none focus:ring-2 focus:ring-[#E52020] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}