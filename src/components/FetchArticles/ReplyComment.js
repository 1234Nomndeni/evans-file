import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const ReplyComment = ({ show, cb, commentId }) => {
  const [replyComment, setReplyComment] = useState("");

  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const preventCommetIfUserDoesNotExist = () => {
    if (!user) {
      navigate("/signIn");
    }
  };

  return (
    <div>
      <div
        class={` items-center justify-center w-full ${
          show ? "flex" : "hidden"
        }`}
      >
        <form class="w-full bg-white rounded-lg px-4 pt-2">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                onChange={(e) => setReplyComment(e.target.value)}
                value={replyComment}
                onClick={preventCommetIfUserDoesNotExist}
                class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 text-sm placeholder-gray-700 focus:outline-none focus:bg-white"
                name="body"
                placeholder="Reply This Comment"
                required
              ></textarea>
            </div>
            <div class="w-full md:w-full flex items-start  px-3">
              <div class=" space-x-3">
                <input
                  onClick={(e) => {
                    e.preventDefault();
                    cb("reply", commentId, replyComment);
                  }}
                  disabled={!replyComment}
                  type="submit"
                  className="bg-c cursor-pointer text-white text-sm py-2 px-4 rounded-full tracking-wide mr-1 hover:bg-purple-800"
                  value="Reply Comment"
                />
                <input
                  onClick={() => cb("close")}
                  type="button"
                  class="bg-red-400 text-white cursor-pointer py-2 px-4 rounded-full tracking-wide mr-1 hover:bg-red-500"
                  value="Dismiss"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyComment;
