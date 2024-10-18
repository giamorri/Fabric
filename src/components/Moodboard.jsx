import React, { useState } from "react";
import Draggable from "react-draggable"; 
import mannequinSmall from './images/mannequin-small.jpeg';
import mannequinMedium from './images/mannequin-medium.jpeg';
import mannequinLarge from './images/mannequin-large.jpeg';
import mannequinXLarge from './images/mannequin-xlarge.jpeg';

const Moodboard = () => {
  const [selectedMannequin, setSelectedMannequin] = useState(mannequinMedium); // default size
  const [closet, setCloset] = useState([]); 
  const [outfits, setOutfits] = useState([]); 

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file); 
    setCloset([...closet, imageUrl]); 
  };

  const saveOutfit = () => {
    setOutfits([...outfits, closet]); 
  };

  const discardOutfit = () => {
    setCloset([]); 
  };

  return (
    <div className="moodboard">
      <div className="mannequin-area">
        <div className="mannequin">
          <img
            src={selectedMannequin}
            alt="Mannequin"
            className="mannequin-image"
          />
          {closet.map((item, index) => (
            <Draggable key={index}>
              <img src={item} alt="Clothing item" className="clothing-item" />
            </Draggable>
          ))}
        </div>
      </div>

      <div className="controlsandcloset">
        <div className="controls">
          <h2>Mannequin Sizes</h2>
          <div className="mannequin-sizes" style={{ display: 'flex', gap: '10px' }}>
            <img
              src={mannequinSmall}
              alt="Small Mannequin"
              className="size-option"
              onClick={() => setSelectedMannequin(mannequinSmall)}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }} // Make it clear the images are clickable
            />
            <img
              src={mannequinMedium}
              alt="Medium Mannequin"
              className="size-option"
              onClick={() => setSelectedMannequin(mannequinMedium)}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }}
            />
            <img
              src={mannequinLarge}
              alt="Large Mannequin"
              className="size-option"
              onClick={() => setSelectedMannequin(mannequinLarge)}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }}
            />
            <img
              src={mannequinXLarge}
              alt="Extra Large Mannequin"
              className="size-option"
              onClick={() => setSelectedMannequin(mannequinXLarge)}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }}
            />
          </div>

          <input type="file" accept="image/*" onChange={handleImageUpload} />     
          <button onClick={saveOutfit}>Save Outfit</button>
          <button onClick={discardOutfit}>Discard Outfit</button>
        </div>

        <div className="closet">
          <h3>Closet</h3>
          {closet.map((item, index) => (
            <img key={index} src={item} alt="Clothing item" className="closet-item" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Moodboard;
