import React from "react";

import { Link } from "react-router-dom";

const UserListItem = ({ user }) => {
  // user_id, user_name, online
  return (
    <div>
      <h5>
        {/* TODO: Wyświetl nazwe użytkownika, jego ID oraz czy jest online */}
        <p>
          <Link to={`/chat/${user.user_id}`}>Przejdź do chatu</Link>
        </p>
      </h5>
      <hr />
    </div>
  );
};

export default UserListItem;
