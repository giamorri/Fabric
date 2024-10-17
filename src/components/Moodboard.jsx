import React, { useState } from "react";
import Draggable from "react-draggable"; 
import mannequin from './images/masc-mannequinn.jpeg';


const Moodboard = () => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(500); 
  const [closet, setCloset] = useState([]); 
  const [outfits, setOutfits] = useState([]); 

  //background removal api can be added here later
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file); 
    setCloset([...closet, imageUrl]); 
  };

  //save the current layout as an outfit
  const saveOutfit = () => {
    setOutfits([...outfits, closet]); 
  };

  //discard the current layout
  const discardOutfit = () => {
    setCloset([]); 
  };

  return (
    <div className="moodboard">
      <div className="controls">
        <h2>Closet</h2>

        
        <label>Width:</label>
        <input
          type="range"
          min="200"
          max="600"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
        <label>Height:</label>
        <input
          type="range"
          min="300"
          max="700"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        
        <input type="file" accept="image/*" onChange={handleImageUpload} />

       
        <button onClick={saveOutfit}>Save Outfit</button>
        <button onClick={discardOutfit}>Discard Outfit</button>
      </div>

     
      <div
        className="mannequin-area"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="mannequin" style={{ width: `${width}px`, height: `${height}px` }}>
          <img
            src={mannequin}
            alt="Mannequin"
            className="mannequin-image"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
          {closet.map((item, index) => (
            <Draggable key={index}>
              <img src={item} alt="Clothing item" className="clothing-item" />
            </Draggable>
          ))}
        </div>
      </div>

      <div className="closet">
        <h3>Closet</h3>
        {closet.map((item, index) => (
          <img key={index} src={item} alt="Clothing item" className="closet-item" />
        ))}
      </div>
    </div>
  );
};

export default Moodboard;
