import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CustomButtonProps {
  text: string;
  navigatePath: string;
  bgColor: string;
  hoverColor: string;
}
const HeaderButton: React.FC<CustomButtonProps> = ({
  text,
  navigatePath,
  bgColor,
  hoverColor,
}) => {
  const navigate = useNavigate();
  return (
    <button
      className={`px-6 py-4 ml-2 font-semibold text-sm ${bgColor} ${hoverColor} text-white rounded-full shadow-sm transition-colors duration-300`}
      onClick={() => navigate(navigatePath)}
    >
      {text}
    </button>
  );
};

export default HeaderButton;
