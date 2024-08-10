import React, { useState } from 'react';

const SelectPhoto = ({ onPhotoSelected }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPhoto(URL.createObjectURL(file));
      if (onPhotoSelected) {
        onPhotoSelected(file);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
      />
      {selectedPhoto && <img src={selectedPhoto} alt="Selected" style={{ width: '100px', height: '100px' }} />}
    </div>
  );
};

export default SelectPhoto;
