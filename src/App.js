import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import './App.css';

const App = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = async (acceptedFiles) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      acceptedFiles.forEach((file, index) => {
        formData.append(`images`, file);
      });

      const response = await axios.post('http://localhost:3001/upload-images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploadedImages(response.data.uploadedImages);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <Dropzone onDrop={handleDrop} accept="image/*" multiple>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={`dropzone ${isLoading ? 'loading' : ''}`}
            style={{ border: isLoading ? 'none' : '2px dashed #ccc' }}
          >
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <input {...getInputProps()} />
                <p>Drag and drop some images here, or click to select images</p>
              </>
            )}
          </div>
        )}
      </Dropzone>
      {uploadedImages.length > 0 && (
        <div className="image-container">
          <h2>Uploaded Images</h2>
          <ul>
            {uploadedImages.map((imageUrl, index) => (
              <li key={index}>
                <img src={imageUrl} alt={`Image ${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
