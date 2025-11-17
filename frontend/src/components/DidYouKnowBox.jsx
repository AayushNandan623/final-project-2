import React from "react";

const DidYouKnowBox = ({ fact }) => {
  if (!fact) return null;
  return (
    <div className="did-you-know">
      <strong>Did you know?</strong>
      <p>{fact}</p>
    </div>
  );
};

export default DidYouKnowBox;
