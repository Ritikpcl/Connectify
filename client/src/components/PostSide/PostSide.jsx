import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostSide = () => {

  const params = useParams(); 
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
        <div className="PostSide">
        {
          !params.id || user._id === params.id ? <PostShare/> : <></>
        }
        <Posts/>
      </div> 
  );
};

export default PostSide;
