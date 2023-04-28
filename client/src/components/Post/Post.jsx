import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import Delete from "../../img/delete.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import * as UserApi from "../../api/UserRequests.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Post = ({ data, onDelete }) => {
  const imageUrl = data?.image
  
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    let isMounted = true; 
    const fetchData = async () => {
      if (data.userId !== user._id) {
        const user = await UserApi.getUser(data.userId);
        if (isMounted) { 
          setUserData(user.data);
          setLoading(false);
        }
      } else {
        setUserData(user);
        setLoading(false);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  };

  return (
    <div>
      {
        loading ? <p>Loading...</p> :
          <div className="Post">

            <div className="detail">
              <img src={
                userData?.profilePicture
              }
                alt="profile"
                className="userImage"
              />
              <div className="credentials">
                <span className="name">
                  <Link to={`/profile/${userData?._id}`} style={{ color: "inherit", textDecoration: "none", fontWeight: "bold" }}>
                    @{userData?.firstname}</Link>
                </span>
                <span className="username">{userData?.username}</span>
              </div>
              <div>
                {data.userId === user._id ?
                  <button className="deleteButton" onClick={() => onDelete(data._id)}><img style={{ width: "30px" }} src={Delete} ></img></button>
                  : <></>
                }
              </div>
            </div>
            <span className="desc"> {data.desc}</span>

            <img
              src={imageUrl ? imageUrl : ""}
              alt=""
            />
            

            <div className="postReact">
              <img
                src={liked ? Heart : NotLike}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={handleLike}
              />
              <img src={Comment} alt="" />
              <img src={Share} alt="" />
            </div>

            <span style={{ color: "var(--gray)", fontSize: "12px" }}>
              {likes} likes
            </span>
          </div>
      }
    </div>
  );
};

export default Post;





