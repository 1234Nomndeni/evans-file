import React from "react";
import ReactTimeago from "react-timeago";
import { Link } from "react-router-dom";

const MostReadArticle = ({
  id,
  timestamp,
  blogHeader,
  backgroundImage,
  name_slug,
  likes,
  displayName,
}) => {
  return (
    <div>
      <Link to={`/${name_slug}/${id}`}>
        <article className="flex space-x-3  p-4 pt-1 mt-3 bg-white border border-gray-300 rounded-lg hover:border-purple-800 cursor-pointer">
          {/* <img
            className="rounded-lg h-20 w-24"
            src="https://melbite.com/static/media/melbite.2d4c3139.jpg"
            alt=""
          /> */}
          {/* <p
            className="rounded-lg important"
            dangerouslySetInnerHTML={{ __html: backgroundImage }}
          /> */}
          <section className="">
            <span className="flex space-x-3 text-xs mb-2 mt-1">
              <p className="font-bold text-gray-900 bg-yellow-400 pl-1 pr-1">
                {displayName}
              </p>
              <p className="text-gray-600">
                <ReactTimeago
                  date={new Date(timestamp?.toDate()).toUTCString()}
                />
              </p>
              <span className="flex space-x-1">
                <p className="font-bold text-gray-900 ">{likes?.length}</p>
                <p className="text-gray-600 text-xs">Likes</p>
              </span>
            </span>
            <p className="text-sm hover:text-purple-800 cursor-pointer font-bold concat">
              {blogHeader}
            </p>
          </section>
        </article>
      </Link>
    </div>
  );
};

export default MostReadArticle;
