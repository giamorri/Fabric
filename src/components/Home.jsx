import React, { useEffect, useState } from 'react';
import './Header.css';

const Home = () => {
  const [images, setImages] = useState([]);


  useEffect(() => {
    // Example mock data
    const mockImages = [
      { url: 'https://via.placeholder.com/400', description: 'Placeholder Image 1' },
      { url: 'https://via.placeholder.com/400', description: 'Placeholder Image 2' },
      { url: 'https://via.placeholder.com/400', description: 'Placeholder Image 3' },
      { url: 'https://via.placeholder.com/400', description: 'Placeholder Image 4' },
      { url: 'https://via.placeholder.com/400', description: 'Placeholder Image 5' }
    ];
    setImages(mockImages);
  }, []);

  return (
    <div className="home">
      <h1 className="header">Welcome to the Home Page</h1>
      <div className="content-container">
        {images.map((image, index) => (
          <div key={index} className="item">
            <div className="square">
              <img src={image.url} alt={image.description} className="square-image" />
            </div>
            <div className="rectangle">
              <p className="caption">This is a placeholder caption area for a social media post.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
