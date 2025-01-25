import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Handle file selection
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Upload image to Cloudinary
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image to upload");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Replace with your upload preset

    try {
      // Make POST request to Cloudinary's image upload API
      const response = await axios.post('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', formData);

      // Get the image URL from the response
      const imageUrl = response.data.secure_url;
      setImageUrl(imageUrl); // Set image URL to state

      alert("Image uploaded successfully!");

      // Handle your logic with the image URL (e.g., save it to user profile)
    } catch (error) {
      console.error('Error uploading image:', error);
      alert("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="User uploaded" style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
