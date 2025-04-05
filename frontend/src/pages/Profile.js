import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { token, user } = useContext(AuthContext);
  const [folders, setFolders] = useState([]);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const folderRes = await fetch("http://localhost:3000/api/folders/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const foldersData = await folderRes.json();
      setFolders(foldersData);

      const lessonRes = await fetch("http://localhost:3000/api/lessons", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const lessonsData = await lessonRes.json();
      setLessons(lessonsData);
    };

    if (token) fetchData();
  }, [token]);

  const getLessonsForFolder = (folderId) => {
    return lessons.filter((lesson) => lesson.folder === folderId);
  };

  const standaloneLessons = lessons.filter((lesson) => !lesson.folder);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 {user?.email}'s Profile</h2>

      <h3>📁 Your Lesson Folders</h3>
      {folders.length === 0 ? (
        <p>No folders yet.</p>
      ) : (
        folders.map((folder) => (
          <div key={folder._id} style={{ marginBottom: "20px" }}>
            <h4>{folder.title}</h4>
            <p>{folder.description}</p>
            <ul>
              {getLessonsForFolder(folder._id).map((lesson) => (
                <li key={lesson._id}>
                  <strong>{lesson.title}</strong> – {lesson.videoLink && <a href={lesson.videoLink} target="_blank" rel="noreferrer">Video</a>}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      <h3>🧩 Standalone Lessons</h3>
      {standaloneLessons.length === 0 ? (
        <p>No standalone lessons.</p>
      ) : (
        <ul>
          {standaloneLessons.map((lesson) => (
            <li key={lesson._id}>
              <strong>{lesson.title}</strong> – {lesson.videoLink && <a href={lesson.videoLink} target="_blank" rel="noreferrer">Video</a>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
