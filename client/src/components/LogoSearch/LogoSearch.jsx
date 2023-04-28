import React, { useEffect, useState } from "react";
import Logo from "../../img/logo.png";
import "./LogoSearch.css";
import { UilSearch } from "@iconscout/react-unicons";
import * as UserApi from "../../api/UserRequests.js";
import { Link } from "react-router-dom";

const LogoSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    if (!searchQuery) setSuggestedUsers([])
    if (searchQuery) getUsers()
  }, [searchQuery])

  const getUsers = async () => {
    const response = await UserApi.getSearchedUser(searchQuery);
    setSuggestedUsers(response.data);
  }

  const handleSearch = (event) => {
    event.preventDefault();
    getUsers();
    // Do something with the search query, e.g. send it to the server
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="LogoSearch">
      <div>
        <img src={Logo} alt="" />
        <form className="Search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="#Explore"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <div className="s-icon">
            <button type="submit">
              <UilSearch />
            </button>
          </div>
        </form>
      </div>
      <div className="suggested-users" style={suggestedUsers.length === 0 ? { display: "none" } : {}}>
        {suggestedUsers.length > 0 && (
          suggestedUsers.map((user,id) => (
            <div key={user._id} className={`user ${id % 2 === 0 ? "even" : "odd"}`}>
              <span><Link to={`/profile/${user._id}`} style={{color: "inherit", textDecoration:"none"}}>
          @{user.firstname}</Link></span>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default LogoSearch;
