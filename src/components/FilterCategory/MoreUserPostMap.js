import React from "react";

const MoreUserPostMap = ({ displayName, blogHeader, blogBody }) => {
  return (
    <div className="mt-6 bg-white">
      <h3 className="">Read more from {displayName}</h3>
      <div>
        <h2>{blogHeader}</h2>
      </div>
    </div>
  );
};

export default MoreUserPostMap;
