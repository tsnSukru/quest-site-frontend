import React, { useState } from "react";
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Card, OutlinedInput, Box, Snackbar, Alert } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import { Link } from "react-router-dom";
import { PostWithAuth } from "../../Services/HttpServices";

function PostForm(props) {
    const { userId, userName, refreshPost } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [isSent, setIsSent] = useState(false);

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    };
    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    };
    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPost();
    };
    const handleClose = (event, reason) => {
        setIsSent(false);
    };

    const savePost = () => {
        PostWithAuth("/postApi/add", {
            userId: userId,
            title: title,
            text: text,
        })
            .then((res) => res.json())
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <Snackbar open={isSent} autoHideDuration={1500} onClose={handleClose}>
                <Alert severity="success">
                    Post Gönderildi!
                </Alert>
            </Snackbar>
            <Card sx={{ width: 800, margin: 1 }}>
                <CardHeader
                    avatar={
                        <Link sx={{ textDecoration: "none", boxShadow: "none" }} to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    titleTypographyProps={{ textAlign: 'left' }}
                    subheaderTypographyProps={{ textAlign: 'left' }}
                    title={
                        <OutlinedInput id="outLined-adornment-amount"
                            multiline placeholder="Title"
                            inputProps={{ maxLength: 30 }}
                            fullWidth
                            value={title}
                            onChange={(i) => handleTitle(i.target.value)}>
                        </OutlinedInput>
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" textAlign={"left"}>
                        {
                            <OutlinedInput id="outLined-adornment-amount"
                                multiline placeholder="Text"
                                inputProps={{ maxLength: 500 }}
                                fullWidth
                                value={text} onChange={(i) => handleText(i.target.value)}>
                            </OutlinedInput>
                        }
                    </Typography>
                </CardContent>
                <Box display="flex" justifyContent="flex-end" style={{ paddingRight: '5px', paddingBottom: '5px' }}>
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
                </Box>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    </CardContent>
                </Collapse>
            </Card>

        </div>
    )
}

export default PostForm;