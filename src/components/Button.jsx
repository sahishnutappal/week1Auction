import React, { useState } from 'react';
import Card from './Card';
import '../App.css';

function AddButton() {
  const [isCardVisible, setIsCardVisible] = useState(false);

  return (
    <div>
      {!isCardVisible && (
        <button className="Add" onClick={() => setIsCardVisible(true)}>
          Add
        </button>
      )}

      {isCardVisible && <Card onClose={() => setIsCardVisible(false)} />}
    </div>
  );
}

export default AddButton;
