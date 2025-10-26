// draggableNode.js

export const DraggableNode = ({ type, label, onClick }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'move';
      event.target.style.opacity = '0.8';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const handleClick = () => {
      if (onClick) {
        onClick(type);
      }
    };
  
    return (
      <div
        className={`${type} cursor-pointer min-w-[70px] h-10 flex items-center justify-center flex-col rounded-md bg-[#1C2536] border-2 border-blue-400 transition-all duration-200 px-2.5 py-1`}
        onClick={handleClick}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => {
          event.target.style.cursor = 'grab';
          event.target.style.opacity = '1';
        }}
        draggable
        title={`Click to add or drag to position ${label} node`}
      >
          <span className="text-white font-semibold text-xs">{label}</span>
      </div>
    );
  };
  