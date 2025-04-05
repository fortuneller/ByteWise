import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateLesson() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [folderId, setFolderId] = useState("");
  const [folders, setFolders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/folders/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setFolders(data);
      } catch (err) {
        console.error("Failed to load folders");
      }
    };
    if (token) fetchFolders();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/lessons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          videoLink,
          folder: folderId || null, // allow optional folder
        }),
      });

      if (res.ok) {
        setMessage("✅ Lesson created");
        navigate("/profile");
      } else {
        const err = await res.json();
        setMessage("❌ Error: " + err.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Submission failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a New Lesson</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Lesson Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="YouTube Video Link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />

        <select value={folderId} onChange={(e) => setFolderId(e.target.value)}>
          <option value="">📂 No Folder (Standalone Lesson)</option>
          {folders.map((f) => (
            <option key={f._id} value={f._id}>
              {f.title}
            </option>
          ))}
        </select>

        <button type="submit">Submit Lesson</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
