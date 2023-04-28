import React from "react";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import Logout from "../../img/logout.png"
import { Link } from "react-router-dom";
import { logout } from "../../actions/AuthActions";
import { useDispatch} from "react-redux";


const NavIcons = () => {

  const dispatch = useDispatch()
  const handleLogOut = ()=> {
    dispatch(logout())
  }

  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <button style={{background : "transparent", border:"none", cursor:"pointer"}} onClick={handleLogOut}><img style={{width:"23px"}} src={Logout} alt="" /></button>
      <img src={Noti} alt="" />
    </div>
  );
};

export default NavIcons;
