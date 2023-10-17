import Post from "../Post/Post.js"
import PostForm from "../Post/PostForm.js"
import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';

const StyledDiv = styled('div')({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cfe8fc"
});

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);


    const refreshPost = () => {
        fetch("/postApi/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refreshPost();
    }, [postList])

    if (error) {
        return <div> Home Error !!! </div>;
    }
    else if (!isLoaded) {
        return <div> Loading... </div>;
    }
    else {
        return (
            <StyledDiv>
                {localStorage.getItem("currentUser") == null ? "" :
                    <PostForm userId={localStorage.getItem("currentUser")}
                        userName={localStorage.getItem("username")} refreshPost={refreshPost}></PostForm>}
                {postList.map(post => (
                    <Post postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}
                        postLikes={post.postLikeResponses} />
                ))}
            </StyledDiv>
        );
    }
}

export default Home;