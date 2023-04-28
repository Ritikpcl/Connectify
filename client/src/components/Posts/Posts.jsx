import React, { useEffect, useState } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";
import { deletePost} from "../../api/PostsRequests";

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const [updatePage, setUpdatePage] = useState(false)

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [updatePage, posts.length]);

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id,user._id);
      // Remove the deleted post from the state
      setUpdatePage(prev => !prev)
      posts = posts.filter((post) => post._id !== id);
      
    } catch (error) {
      console.error(error);
    }
  };

  if(params.id && params.id != user._id && !(user.following.includes(params.id))) return <p className="follow_user">Please follow to see posts</p>

  if(!posts) return 'No Posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} onDelete={handleDeletePost}/>;
          })}
    </div>
  );
};

export default Posts;
