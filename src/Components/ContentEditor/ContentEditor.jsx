import React, { useState } from "react";

function ContentEditor() {
  const [elementType, setElementType] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the user's input here (e.g., store it in state or send it to a backend).
  };

  return (
    <div>
      <h2>Content Editor</h2>
      <div>
        <label>Select Element Type:</label>
        <button onClick={() => setElementType("h3")}>H3</button>
        <button onClick={() => setElementType("p")}>P</button>
        <button onClick={() => setElementType("img")}>IMG</button>
      </div>
      <form onSubmit={handleSubmit}>
        {elementType === "h3" && (
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        )}
        {elementType === "p" && (
          <div>
            <label>Text:</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>
        )}
        {elementType === "img" && (
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContentEditor;
