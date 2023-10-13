import React, { useEffect, useState } from "react";
import "./RowPost.css";
import axios from "../../axios";
import { imageUrl, API_KEY } from "../../constants/constants";
import Youtube from "react-youtube";

const RowPost = (props) => {
  const [movies, setMovies] = useState([]);
  const [youtubeUrlId, setYoutubeUrlId] = useState("");

  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((err) => {
        alert("Network error");
      });
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(id);
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        console.log("response.data", response.data);
        if (response.data.results.length !== 0) {
          setYoutubeUrlId(response.data.results[0]);
        } else {
          console.log("array empty");
        }
      });
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? "smallPost" : "post"}
            alt="image"
            src={`${imageUrl + obj.backdrop_path}`}
          ></img>
        ))}
      </div>
      {youtubeUrlId && <Youtube opts={opts} videoId={youtubeUrlId.key} />}
    </div>
  );
};

export default RowPost;
