import React from "react";
import { Link } from "react-router-dom";
import { CardContent, InputAdornment, OutlinedInput, makeStyles } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

function Comment(props) {
    const { userId, userName, text } = props;

    return (
        <CardContent>
            <OutlinedInput
                disabled
                id="outlined-adorment-amount"
                multiline
                inputProps={{ maxLength: 700 }}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Link sx={{ textDecoration: "none", boxShadow: "none" }} to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                style={{ color: "black", backgroundColor: "white" }}
            >
            </OutlinedInput>
        </CardContent>
    )
}

export default Comment;