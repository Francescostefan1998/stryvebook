import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { useState, useEffect, usePrevious } from "react";

const CommentArea = ({ asin }) => {
  console.log(asin);
  const [comments, setcomments] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const fetchit = async () => {
    try {
      let response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdmNWNmYWQ4MzkzNTAwMTVlOGM0YTUiLCJpYXQiOjE2NjkyOTEyNTksImV4cCI6MTY3MDUwMDg1OX0.R9fOcNdfbqF-E06umapRM0bFhO6l1qqyZMtvrBY5C4I",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        setcomments(comments);
        setisLoading(false);
        setisError(false);
      } else {
        console.log("error");
        setisLoading(false);
        setisError(true);
      }
    } catch (error) {
      console.log(error);
      setisLoading(false);
      setisError(true);
    }
  };
  useEffect(() => {
    console.log("use effect FIRED!");
    fetchit();
  }, [asin]);

  return (
    <div>
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
