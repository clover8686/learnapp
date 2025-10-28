import React from 'react';

const ProgressBar: React.FC<{value:number}> = ({value}) => {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
        <div style={{width: `${v}%`}} className="h-full bg-blue-600 transition-all"></div>
      </div>
      <div className="text-xs text-gray-500 mt-1">{v}%</div>
    </div>
  );
};

export default ProgressBar;
