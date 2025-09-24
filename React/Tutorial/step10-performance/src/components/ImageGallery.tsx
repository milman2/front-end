import React, { useState } from 'react';

const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    'https://picsum.photos/300/200?random=11',
    'https://picsum.photos/300/200?random=12',
    'https://picsum.photos/300/200?random=13',
    'https://picsum.photos/300/200?random=14',
    'https://picsum.photos/300/200?random=15',
    'https://picsum.photos/300/200?random=16',
  ];

  return (
    <div className="image-gallery">
      <h3>이미지 갤러리</h3>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <div key={index} className="gallery-item" onClick={() => setSelectedImage(src)}>
            <img src={src} alt={`Gallery item ${index + 1}`} />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img src={selectedImage} alt="Selected" />
            <button onClick={() => setSelectedImage(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
