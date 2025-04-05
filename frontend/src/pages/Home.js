import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { token, isLoggedIn } = useContext(AuthContext);
  const [lessons, setLessons] = useState([]);
  const [message, setMessage] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoLink, setVideoLink] = useState("");

  // Fetch all lessons
  useEffect(() => {
    if (!token) return;

    const fetchLessons = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/lessons", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLessons(res.data);
      } catch (err) {
        setMessage("Failed to fetch lessons");
      }
    };

    fetchLessons();
  }, [token]);

  // Handle lesson submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/lessons",
        { title, content, videoLink },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLessons([...lessons, res.data]);
      setTitle("");
      setContent("");
      setVideoLink("");
      setMessage("Lesson created!");
    } catch (err) {
      setMessage("Failed to create lesson");
    }
  };

  return (
    <div>
      <h2>📚 Welcome to ByteWise</h2>
      <p>Your personal micro-learning dashboard.</p>

      {!isLoggedIn ? (
        <p>Please <Link to="/login">Login</Link> to view or create lessons.</p>
      ) : (
        <>
          {/* Create Lesson Form */}
          <form onSubmit={handleSubmit}>
            <h3>Create a 5-Minute Lesson</h3>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            /><br />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              required
            /><br />
            <input
              type="url"
              placeholder="YouTube Link"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              required
            /><br />
            <button type="submit">Submit Lesson</button>
          </form>

          <hr />

          {/* Lesson List */}
          {lessons.length === 0 ? (
            <p>No lessons yet.</p>
          ) : (
            <ul>
              {lessons.map((lesson) => (
                <li key={lesson._id}>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.content}</p>
                  <a href={lesson.videoLink} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}
