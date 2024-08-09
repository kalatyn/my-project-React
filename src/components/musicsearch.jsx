import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";

const Musicsearch = () => {
  const [location, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem("searchTerm") || "";
  });
  const [results, setResults] = useState(
    () => JSON.parse(localStorage.getItem("results")) || []
  );
  const [error, setError] = useState(null);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // текущая страница
  const [hasMore, setHasMore] = useState(false); // флаг наличия еще данных
  const audioRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  const handleSearch = async (page = 0) => {
    if (searchTerm.trim() === "") {
      setResults([]);
      setHasMore(false);
      setError("Please enter a search term");
      return;
    }
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchTerm}&index=${
      page * 25
    }`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "38cf0b75a4msh907e4b0f1acbd23p13f145jsn66704f003e84",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (page === 0) {
        setResults(result.data);
      } else {
        setResults((prevResults) => [...prevResults, ...result.data]);
      }
      setHasMore(result.data.length > 0); // проверяем, есть ли еще данные
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Error fetching data");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(0); // сброс страницы при новом поиске
      handleSearch(0);
    }
  };

  const playPauseAudio = (previewUrl, index) => {
    if (audioRef.current) {
      if (currentPlaying === index) {
        audioRef.current.pause();
        setCurrentPlaying(null);
      } else {
        audioRef.current.src = previewUrl;
        audioRef.current.play();
        setCurrentPlaying(index);
      }
    }
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    handleSearch(nextPage);
  };

  return (
    <div>
      <h2>Musicsearch</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter search term"
        className="inputTask"
        required
      />
      <button
        onClick={() => {
          setCurrentPage(0);
          handleSearch(0);
        }}
        className="addTask"
      >
        Search
      </button>
      {error && <p>{error}</p>}
      <div className="app_icons">
        {results.map((result, index) => (
          <div key={index}>
            <h3>{result.title}</h3>
            <p>{result.artist.name}</p>
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={result.album.cover}
                alt={result.title}
                onClick={() => playPauseAudio(result.preview, index)}
                style={{ cursor: "pointer" }}
              />
              <div className="play-pause">
                {currentPlaying === index ? "⏸️" : "▶️"}
              </div>
            </div>
            <a href={result.link} target="_blank" rel="noopener noreferrer">
              Listen on Deezer
            </a>
          </div>
        ))}
        {hasMore && (
          <div
            onClick={loadMore}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <img src="img/load-more.png" style={{ width: "70px" }} alt="" />
          </div>
        )}
      </div>

      <audio ref={audioRef} onEnded={() => setCurrentPlaying(null)}></audio>
    </div>
  );
};

export default Musicsearch;
