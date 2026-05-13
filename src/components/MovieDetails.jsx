import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Foooter from './Foooter';

const MovieDetails = () => {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [loading, setLoading] = useState("");

  const [error, setError] = useState("");

  // =========================
  // TMDB
  // =========================
  const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMGFkZGRkN2QwMTYwNjZhYzNjMzI3MWRhYmQzYzVhYiIsIm5iZiI6MTc3Nzk4OTUyMC45MjcsInN1YiI6IjY5ZjlmNzkwNDcxYmM1MDAxZjY0NjhlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gRuOFSJslvoXiYTEsjcthjx_o6WCBgdMIF12viRDA6Y";

  const headers = {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    accept: "application/json"
  };

  const IMAGE_URL =
    "https://image.tmdb.org/t/p/original";

  // =========================
  // FETCH DETAILS
  // =========================
  const fetchMovieDetails = async () => {

    try {

      setLoading("Loading movie details...");

      const response = await axios.get(

        `https://api.themoviedb.org/3/movie/${id}`,

        {
          headers
        }
      );

      setMovie(response.data);

      setLoading("");

    } catch (error) {

      console.log(error);

      setError("Failed to load movie");
    }
  };

  useEffect(() => {

    fetchMovieDetails();

  }, [id]);

  if (loading) {
    return <h1>{loading}</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (

    <div
      style={{
        background: "#000",
        color: "white",
        minHeight: "100vh"
      }}
    >

      {/* BACKDROP */}

      <div
        style={{
          height: "70vh",
          backgroundImage:
            `url(${IMAGE_URL}${movie?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >

        <div
          style={{
            background:
              "linear-gradient(to top, black, transparent)",
            position: "absolute",
            width: "100%",
            height: "100%"
          }}
        />

      </div>

      {/* CONTENT */}

      <div className="container mt-4">

        <div className="row">

          {/* POSTER */}

          <div className="col-md-4">

            <img
              src={`${IMAGE_URL}${movie?.poster_path}`}
              alt={movie?.title}
              className="img-fluid rounded shadow-lg"
            />

          </div>

          {/* DETAILS */}

          <div className="col-md-8">

            <h1>{movie?.title}</h1>

            <p className="text-warning">
              ⭐ {movie?.vote_average}
            </p>

            <p>
              {movie?.overview}
            </p>

            <h5>

              Release Date:

              <span className="text-info">
                {" "}
                {movie?.release_date}
              </span>

            </h5>

            <h5 className="mt-3">

              Genres:

            </h5>

            {movie?.genres?.map((genre) => (

              <span
                key={genre.id}
                className="badge bg-danger me-2"
              >
                {genre.name}
              </span>
            ))}

          </div>

        </div>

      </div>

      <Foooter />

    </div>
  );
};

export default MovieDetails;