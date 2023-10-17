import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

function CommentForm(props) {
    const { postId, userId, userName } = props;
    const [text, setText] = useState("");

    const handleSubmit = () => {
        saveComment();
        setText("");
    };

    const handleChange = (value) => {
        setText(value);
    }

    const saveComment = () => {
        fetch("/commentApi/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("tokenKey"),
                },
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                    text: text,
                })
            })
            .then((res) => res.json())
            .catch((err) => console.log("post save error"))
    }

    return (
        <CardContent>
            <OutlinedInput
                id="outlined-adorment-amount"
                multiline
                inputProps={{ maxLength: 700 }}
                fullWidth
                onChange={(i) => handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link sx={{ textDecoration: "none", boxShadow: "none" }} to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            variant="contained"
                            style={{
                                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                                color: 'white'
                            }}
                            onClick={handleSubmit}
                        >
                            Gönder
                        </Button>
                    </InputAdornment>
                }
                value={text}
                style={{ color: "black", backgroundColor: "white" }}
            >
            </OutlinedInput>
        </CardContent>
    )
}

export default CommentForm;