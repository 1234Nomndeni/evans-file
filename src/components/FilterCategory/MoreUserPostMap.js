import React from "react";
import { Link } from "react-router-dom";

const MoreUserPostMap = ({ id, name_slug, blogHeader }) => {
  return (
    <div className="mt-6 bg-white w-64 border-b">
      <Link to={`/${name_slug}/${id}`}>
        <div className="mb-2">
          <span className="hover:text-purple-900 cursor-pointer">
            {blogHeader}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default MoreUserPostMap;
