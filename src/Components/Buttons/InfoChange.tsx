import React from 'react';

interface changeInfo {
  change: () => void;
}

const InfoChangeButton = (props: changeInfo) => {
  return (
    <button
      className="ml-2 mb-3 bg-blue-500 text-white px-4 py-1 rounded text-lg"
      onClick={props.change}
    >
      Change
    </button>
  );
};

export default InfoChangeButton;
