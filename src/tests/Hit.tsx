import { Link } from "react-router-dom";

export function Hit({ hit, name_slug,id }: any) {
  return (
    <Link to={`/${name_slug}/${"g3lWIOhd795zH2DUKnPR"}`}>
      <div className="bg-white rounded-md mx-wd1 m-3 p-2 mx-auto top-0 overflow-auto hover:border-purple-600 border-2 border-white cursor-pointer">
        <section>
          <div className="flex gap-5 items-center mb-2">
            <h3 className="bg-yellow-300 py-[2rem] px-2">{hit.author_name}</h3>
            <p className="prose text-sm">1 month Ago</p>
            <p className="prose text-sm text-gray-900">15 likes</p>
          </div>
          <h3 className="text-gray-900 text-xl">{hit.post_title}</h3>
          <p className="truncate w-5/6">{hit.content}</p>
          <div className="mt-2 flex gap-5">
            <span className="bg-green-200 mt-3 rounded-sm py-1 px-2 text-gray-700 text-sm">#{hit.categories}</span>
            <span className="bg-green-200 mt-3 rounded-sm py-1 px-2 text-gray-700 text-sm">#{hit.categories}</span>
            <span className="bg-green-200 mt-3 rounded-sm py-1 px-2 text-gray-700 text-sm">#{hit.categories}</span>
          </div>
        </section>
      </div>
    </Link>
  );
}
