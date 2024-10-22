import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './MannequinCloset.css';

import mannequinSmallMale from './images/m-mannequin-small.JPG';
import mannequinMediumMale from './images/m-mannequin-medium.JPG';
import mannequinLargeMale from './images/m-mannequin-large.JPG';
import mannequinXLargeMale from './images/m-mannequin-xlarge.JPG';
import mannequinSmallFemale from './images/f-mannequin-small.JPG';
import mannequinMediumFemale from './images/f-mannequin-medium.JPG';
import mannequinLargeFemale from './images/f-mannequin-large.JPG';
import mannequinXLargeFemale from './images/f-mannequin-xlarge.JPG';

const MannequinCloset = () => {
  const [selectedMannequin, setSelectedMannequin] = useState(mannequinMediumMale); // default size
  const [closet, setCloset] = useState([]); 
  const [outfits, setOutfits] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file); 
    setCloset([...closet, imageUrl]); 
  };

  const saveOutfit = () => {
    if (closet.length > 0) {
      setOutfits([...outfits, closet]);
      alert('Outfit saved successfully!');
    } else {
      alert('No outfit to save.');
    }
  };

  const discardOutfit = () => {
    setCloset([]); 
    alert('Outfit discarded.');
  };

  return (
    <div className="moodboard">
       <div className="coming-soon-message">
        <h2>Coming Soon!</h2>
        <p>This feature is under development and will be available soon.</p>
      </div>
      
      <div className="mannequin-area">
        <div className="mannequin">
          <img
            src={selectedMannequin}
            alt="Mannequin"
            className="mannequin-image"
          />
          {closet.map((item, index) => (
            <Draggable key={index}>
              <ResizableBox
                width={100}
                height={100}
                minConstraints={[50, 50]}
                maxConstraints={[300, 300]}
                resizeHandles={['se']}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={item}
                    alt="Clothing item"
                    className="clothing-item"
                    style={{ width: '100%', height: '100%', position: 'absolute' }}
                  />
                </div>
              </ResizableBox>
            </Draggable>
          ))}
        </div>
      </div>

      <div className="controlsandcloset">
        <div className="controls">
          <h2>Mannequin Sizes</h2>
          <div className="mannequin-sizes" style={{ display: 'flex', gap: '10px'}}>
            {/* Male Mannequins */}
            <img
              src={mannequinSmallMale}
              alt="Small Male Mannequin"
              className="size-option"
              onClick={() => setSelectedMannequin(mannequinSmallMale)}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }}
            />
            <img
              src={mannequinMediumMale}
              alt="Medium Male Mannequin"
              className="size-option"
              onClick={() => setSelectedMannequin(mannequinMediumMale)}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }}
            />
            <img
              src={mannequinLargeMale}
              alt="Large Male Mannequin"
              className="size-option"
              onClick={() => setSelectedMannequin(mannequinLargeMale)}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }}
            />
            <img
              src={mannequinXLargeMale}
              alt="Extra Large Male Mannequin"
              className="size-option"
              onClick={() => setSelectedMannequin(mannequinXLargeMale)}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }}
            />

            {/* Female Mannequins */}
            <img
              src={mannequinSmallFemale}
              alt="Small Female Mannequin"
              className="size-option"
              onClick={() => setSelectedMannequin(mannequinSmallFemale)}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }}
            />
            <img
              src={mannequinMediumFemale}
              alt="Medium Female Mannequin"
              className="size-option"
              onClick={() => setSelectedMannequin(mannequinMediumFemale)}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }}
            />
            <img
              src={mannequinLargeFemale}
              alt="Large Female Mannequin"
              className="size-option"
              onClick={() => setSelectedMannequin(mannequinLargeFemale)}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }}
            />
            <img
              src={mannequinXLargeFemale}
              alt="Extra Large Female Mannequin"
              className="size-option"
              onClick={() => setSelectedMannequin(mannequinXLargeFemale)}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }}
            />
          </div>

          <h2>Upload Custom Clothing Item</h2>
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

export default MannequinCloset;

