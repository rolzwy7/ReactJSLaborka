import React from "react";

import { Link } from "react-router-dom";

const UserListItem = ({ user }) => {
  // user_id, user_name, online
  return (
    <div>
      <h5>
        [ID={user.user_id}] {user.user_name}
        <p style={{ color: user.online ? "green" : "crimson" }}>
          {user.online ? "Online" : "Offline"}
        </p>
        <p>
          <Link to={`/chat/${user.user_id}`}>Przejdź do chatu</Link>
        </p>
      </h5>
      <hr />
    </div>
  );
};

export default UserListItem;
