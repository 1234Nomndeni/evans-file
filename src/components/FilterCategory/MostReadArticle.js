import ReactTimeago from "react-timeago";
import { HeartIcon } from "@heroicons/react/outline";
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
          <section className="flex space-x-2 mt-3">
            <article>
              <span className="bg-yellow-300 font-mono px-2 py-1 text-lg font-bold uppercase  text-gray-800 border-2 border-yellow-300 rounded-full">
                {displayName?.[0]}
              </span>
            </article>

            <article>
              <p className=" hover:text-purple-800 cursor-pointer font-bold concat">
                {blogHeader}
              </p>
              <p className=" text-gray-900 mt-1 font-semibold">{displayName}</p>
              <span className="flex space-x-5 text-xs">
                <p className="text-gray-600">
                  <ReactTimeago
                    date={new Date(timestamp?.toDate()).toUTCString()}
                  />
                </p>
                <span className="flex space-x-1">
                  <HeartIcon className="w-4 text-gray-600 cursor-pointer " />
                  <p className="font-bold text-gray-900 ">{likes?.length}</p>
                  <p className="text-gray-600 text-xs"> Likes</p>
                </span>
              </span>
            </article>
          </section>
        </article>
      </Link>
    </div>
  );
};

export default MostReadArticle;
