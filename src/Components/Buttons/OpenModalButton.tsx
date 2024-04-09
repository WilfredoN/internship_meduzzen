interface OpenModalButtonProps {
  bgColor: string;
  content: string;
  textColor: string;
  onClick: () => void;
}

const OpenModalButton: React.FC<OpenModalButtonProps> = ({
  bgColor,
  content,
  textColor,
  onClick,
}) => {
  return (
    <button
      className={`rounded-3xl bg-${bgColor}-500 text-${textColor}
       w-20 h-10 flex text-center
        justify-center items-center hover:bg-${bgColor}-700 
        transition-colors duration-300 ease-in-out`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default OpenModalButton;
