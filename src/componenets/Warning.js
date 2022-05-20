import React from "react";

const Warning = ({ warning, removeWarning }) => {
  return (
    <div className="modal">
      <div>
        <h1>{warning}</h1>
        <button onClick={removeWarning}>Понятно!</button>
      </div>
    </div>
  );
};

export default Warning;
