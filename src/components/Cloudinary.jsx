import React, { useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';

const UploadImage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Set your upload preset here
      formData.append('api_key', 'YOUR_CLOUDINARY_API_KEY');
      formData.append('timestamp', (Date.now() / 1000) | 0);

      const response = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setImage(data.secure_url);  // Store the image URL
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && (
        <CloudinaryContext cloudName="YOUR_CLOUD_NAME">
          <Image publicId={image} />
        </CloudinaryContext>
      )}
    </div>
  );
};

export default UploadImage;
// https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/sample.jpg
