import React from "react";
import { useSelector } from "react-redux";
import { selectOpenBlog } from "../features/blogSlice";

const SelectedBlog = () => {

    const selectedBlog = useSelector(selectOpenBlog)

  return (
    <main className="pt-24">

      <p className="truncate text-red-700 pt-2 text-3xl">{selectedBlog?.blogHeader}</p>
      <p className="text-red-700 pt-2 text-3xl">{selectedBlog?.blogBody}</p>
    </main>
  );
};
export default SelectedBlog;
