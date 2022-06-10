const LatestUpdates = () => {
  return (
    <div className="">
      <div className="bg-green-100 px-3 py-2">
        <p className="font-bold text-purple-600 text-sm">
          Latest Updates & Upgrades{" "}
        </p>
      </div>

      <div className="px-3 mt-2">
        {/* <h2></h2> */}
        <p className="mb-2 text-xs text-gray-600">
          Working on making the search bar more effective
        </p>
        <button className="items-center bg-yellow-200 p-1 rounded-md text-xs px-2">
          New Features{" "}
        </button>
        <p className="mt-2 text-sm text-gray-600">
          We've released Reply Comment Feature.
        </p>
        <p className="mb-2 text-sm text-gray-600">
          You can now like a post on melbite.
        </p>
        <button className="items-center bg-red-200 text-red-500 p-1 rounded-md text-xs px-2">
          Bug Fixes{" "}
        </button>
        <p className="mb-2 mt-2 text-sm text-gray-600">
          We've fixed the create post inputs.
        </p>
        <button className="items-center bg-purple-300 text-purple-700 p-1 rounded-md text-xs px-2">
          Upcoming Features{" "}
        </button>
        <p className="mt-2 text-sm text-gray-600">
          Save to draft feature as you edit post
        </p>
        <p className="mb-2 text-sm text-gray-600">Follow a melbite creator</p>
      </div>
    </div>
  );
};

export default LatestUpdates;
