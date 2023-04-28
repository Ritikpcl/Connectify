import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { Link } from "react-router-dom";
const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
    
  const handleFollow = async () => {
    following
    ? dispatch(unfollowUser(person._id, user))
    : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };

  console.log(person.profilePicture)

  return (
    <div className="follower">
      <div>
        <img src={
            person?.profilePicture
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span><Link to={`/profile/${person._id}`} style={{color: "inherit", textDecoration:"none",fontWeight:"bold"}}>
          {person.firstname}</Link></span>
          <span>{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
