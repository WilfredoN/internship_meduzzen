import React from 'react';

interface changeInfo {
  change: () => void;
}

const InfoChangeButton = (props: changeInfo) => {
  return (
    <button
      className="ml-2 mb-3 bg-blue-500 text-white px-4 py-1 rounded-full
       text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 duration-150"
      onClick={props.change}
    >
      Change
    </button>
  );
};

export default InfoChangeButton;
