import React, { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils, Modifier, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "./MyEditor.css";
import { MyInput } from '../input/MyInput';

export const MyEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    return savedContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      : EditorState.createEmpty();
  });

  useEffect(() => {
    localStorage.setItem(
      "editorContent",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
  }, [editorState]);

  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    localStorage.setItem(
      "editorContent",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    alert("Content saved!");
  };

  return (
    <div className="main-container">
      <h1 className="main-heading">Demo Editor by Aqsa</h1>
      <button className="save-button" onClick={handleSave}>Save</button>
      <MyInput editorState={editorState} onChange={onChange} />
    </div>
  );
};
