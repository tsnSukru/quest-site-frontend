import React, { useState, useEffect, useRef } from "react";
import Comment from "../Comment/Comment.js";
import CommentForm from "../Comment/CommentForm.js";
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { Card, Container, styled } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import { Link } from "react-router-dom";
let disabled = localStorage.getItem("currentUser") == null ? true : false;

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Post(props) {
    const { postId, userId, userName, title, text, postLikes } = props;
    const [pl, setPl] = useState(postLikes);
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(pl.length);
    const [like, setLike] = useState(null);
    const isInitialMount = useRef(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
    };

    const checkLikes = (value) => {
        var like = value.find((postLike) => postLike.userId == localStorage.getItem("currentUser"));
        if (!like) {
            setIsLiked(false);
        } else {
            setIsLiked(true);
            setLike(like);
        }
    };

    const refreshLike = () => {
        return fetch("/postLikeApi/postLikes/" + postId)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPl(result);
                    checkLikes(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    };

    const refreshComments = () => {
        fetch("/commentApi/comments/" + postId)
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCommentList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    };

    const saveLike = async () => {
        await fetch("/postLikeApi/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                userId: localStorage.getItem("currentUser"),
                postId: postId,
            }),
        }).catch((err) => console.log("like save error: " + err));
    };

    const deleteLike = async () => {
        if (like) {
            await fetch("/postLikeApi/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("tokenKey"),
                },
                body: JSON.stringify({
                    id: like.id,
                }),
            }).catch((err) => console.log("like delete error: " + err));
        }
    };

    const handleLike = async () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            await saveLike();
            await refreshLike();
            setLikeCount(likeCount + 1);
        } else {
            await deleteLike();
            await refreshLike();
            setLikeCount(likeCount - 1);
        }
    };

    useEffect(() => {
        refreshLike();
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            refreshComments();
        }
    }, [postId]);

    return (
        <div>
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
                    title={title}
                    subheader="September 14, 2016"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" textAlign={"left"}>
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {disabled ?
                        <IconButton
                            disabled
                            onClick={handleLike}
                            aria-label="add to favorites"
                        >
                            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                        </IconButton> :
                        <IconButton
                            onClick={handleLike}
                            aria-label="add to favorites"
                        >
                            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                        </IconButton>
                    }
                    {likeCount}
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more">
                        <CommentIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed>
                        {error ? "Error" :
                            isLoaded ? commentList.map(comment => (
                                <Comment userId={2} userName={"USER"} text={comment.text}></Comment>
                            )) : "Loading"
                        }
                        {disabled ? "" :
                            <CommentForm
                                userId={localStorage.getItem("currentUser")} 
                                postId={postId}
                                userName={localStorage.getItem("username")}>
                            </CommentForm>}
                    </Container>
                </Collapse>
            </Card>
        </div>
    );
}

export default Post;
