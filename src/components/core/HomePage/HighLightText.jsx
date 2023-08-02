import React from 'react';

const HighLightText = ({ text }) => {
  const words = text.split(' ');

  return (
    <span className="font-bold text-gradient">
      {" "}
      {words.map((word, index) => (
        <React.Fragment key={index}>
           
          <span className="text-highlight">{word}</span>
          &nbsp;
        </React.Fragment>
      ))}
    </span>
  );
};

export default HighLightText;
