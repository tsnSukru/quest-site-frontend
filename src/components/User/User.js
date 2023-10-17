import React from "react";
import { useParams } from "react-router-dom";
import UserAvatar from "../UserAvatar/UserAvatar.js"
function User() {
    const { userId } = useParams();
    return (
        <div>
            User {userId}
            <UserAvatar avatarId={1} userId={userId} userNames={"user"}></UserAvatar>
        </div>
    )
}

export default User;