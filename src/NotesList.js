import React from "react";
import Note from "./Note";

const NotesList = (props) => {
  //console.log(props); //Do this to see what props are being pulled in from App

  //Callback Function
  const searchFilter = (note) => note.doesMatchSearch === true;
  //accepts a note and only returns if it's doesMatchSearch property = true
  //shortented; const ssearchFilter = (note) => note.doesMatchSearch
  //evaluates to true or false; if true, will add note to array, if false, will not

  //Filter method - filter over array and apply condition set in Callback function
  const searchMatches = props.notes.filter(searchFilter);

  const writeNote = (note) => (
    <Note
      note={note}
      key={note.id}
      onType={props.onType}
      removeNote={props.removeNote}
    />
  );
  const NoteElements = searchMatches.map(writeNote); // map over just the notes that match the search
  return <ul className="notes-list">{NoteElements}</ul>;
};

export default NotesList;
