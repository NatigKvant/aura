import React from 'react';
import "./FriendsPage.css";
import {Avatar} from "@material-ui/core";
import {styled} from "@mui/material/styles";
import Badge from "@mui/material/Badge";

export const StyledBadge = styled(Badge)(({theme, status}) => ({
    "& .MuiBadge-badge": status === 'Online' ? {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
    } : {
        backgroundColor: "grey",
        color: "#44b700",
        boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
    }

}));

const FriendsPage = ({users}) => {
    return (
        <div className='friendsPage'>
            <div className='friendsPage_content'>
                {users.map((user) =>
                    <div className='user'
                         key={user.userId}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                            variant="dot"
                            status={user.status}
                        >
                            <Avatar src={user.photoUrl}/>
                        </StyledBadge>
                        <div>
                            {user.name}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FriendsPage;
