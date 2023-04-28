import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";
const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
      setLoading(false)
    };
    fetchPersons();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    <hr></hr>
      <h3 className="listHeading">People you may know</h3>
      <div className="FollowersCard">
        {persons.map((person, id) => {
          if (person._id !== user._id) return <User person={person} key={id} />;
        })}
        
        {!location && persons.length > 3 ? (
          <span className="showMore" onClick={() => setModalOpened(true)}>Show more</span>
        ) : (
          ""
        )}

        <FollowersModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
        />
      </div>
    </div>
  );
};

export default FollowersCard;
