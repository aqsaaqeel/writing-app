import React, { useState } from "react";
import { Editor, EditorState, RichUtils, Modifier, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import "./MyInput.css";

export const MyInput = ({ editorState, onChange }) => {
  const handleBeforeInput = (char) => {
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const currentBlock = content.getBlockForKey(selection.getStartKey());
    const blockText = currentBlock.getText();

    const styleMap = {
      'RED_LINE': {
        textDecoration: 'line-through', // Or any other style you prefer for red line
        color: 'red' // Optionally, you can specify a color for the red line
      },
      'UNDERLINE': {
        textDecoration: 'underline'
      }
    };
    
    if (char === " ") {
      if (blockText.startsWith("#")) {
        // Convert to heading
        const newContentState = Modifier.setBlockType(
          content,
          selection,
          "header-one"
        );
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "change-block-type"
        );
        onChange(
          EditorState.forceSelection(newEditorState, selection.merge({ anchorOffset: selection.getStartOffset() + 1 }))
        );
        return "handled";
      } else if (blockText.startsWith("*")) {
        // Convert to bold
        onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
        return "handled";
      } else if (blockText.startsWith("**")) {
        // Convert to red line
        const newEditorState = EditorState.push(
          editorState,
          Modifier.applyInlineStyle(content, selection, 'RED_LINE'),
          'change-inline-style'
        );
        onChange(newEditorState);
        return "handled";
      } else if (blockText.startsWith("***")) {
        // Convert to underline
        const newEditorState = EditorState.push(
          editorState,
          Modifier.applyInlineStyle(content, selection, 'UNDERLINE'),
          'change-inline-style'
        );
        onChange(newEditorState);
        return "handled";
      } 
      
    }
    return "not-handled";
  };

  return (
    <div className="editor-screen">
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleBeforeInput={handleBeforeInput}
      />
    </div>
  );
};
