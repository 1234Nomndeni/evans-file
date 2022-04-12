import { HeartIcon } from '@heroicons/react/outline'
import React,{useState, useEffect} from 'react'
import { db } from '../../utils/firebase';

const LikeButton = (blog) => {
    const [isVoting, setVoting] = useState(false);
  const [votedPosts, setVotedPosts] = useState([]);

  useEffect(() => {
    const votesFromLocalStorage = localStorage.getItem("votes") || [];
    let previousVotes = [];

    try {
      previousVotes = JSON.parse(votesFromLocalStorage);
    } catch (error) {
      console.error(error);
    }

    setVotedPosts(previousVotes);
  }, []);

  const handleDisablingOfVoting = (postId) => {
    const previousVotes = votedPosts;
    previousVotes.push(postId);

    setVotedPosts(previousVotes);

    localStorage.setItem("votes", JSON.stringify(votedPosts));
  };

  const handleClick = async (type) => {
    setVoting(true);

    // Do calculation to save the vote.
    let upVotesCount = blog.upVotesCount;
    // let downVotesCount = post.downVotesCount;

    // const date = new Date();

    if (type === "upvote") {
      upVotesCount = upVotesCount + 1;
    } 
    // else {
    //   downVotesCount = downVotesCount + 1;
    // }

    await db.collection("posts").doc(blog.id).set({
      upVotesCount,
    //   createdAt: post.createdAt,
    //   updatedAt: date.toUTCString(),
    });

    // Disable the voting button once the voting is successful.
    handleDisablingOfVoting(blog.id);

    setVoting(false);
  };

  const checkIfPostIsAlreadyVoted = () => {
    if (votedPosts.indexOf(blog.id) > -1) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
        <span className="flex flex-col items-center">
        <HeartIcon onClick={() => handleClick("upvote")}
          isLoading={isVoting}
          isDisabled={checkIfPostIsAlreadyVoted()} className="h-8 cursor-pointer hover:bg-red-100 duration-150 rounded-full p-1 hover:text-red-600" />
        <p className="text-sm text-red-500 font-semibold"> {blog.upVotesCount}</p>
        <p>Likes</p>
        </span>
    </div>
  )
}

export default LikeButton