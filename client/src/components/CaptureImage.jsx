import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const CaptureImage = () => {
  const [image, setImage] = useState(null);
  const webcamRef = React.useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log(imageSrc);
    setImage(imageSrc);
  };

  const uploadImage = async () => {
    // console.log(image);
    try {
      await axios.post('http://localhost:5000/api/hospitals/upload', { image: image });
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture Image</button>
      {image && (
        <div>
          <img src={image} alt="Captured" />
          <button onClick={uploadImage}>Upload Image</button>
        </div>
      )}
    </div>
  );
};

export default CaptureImage;
