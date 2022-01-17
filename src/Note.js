import React from "react";

export default function Note(props) {
  //console.log(props);
  const titleUpdate = (e) => {
    const valueOfEdited = e.target.value; //what user typed is the new value
    const idOfEdited = props.note.id; //grab the id of the note being edited
    props.onType(idOfEdited, "title", valueOfEdited); //call onType method and pass it these properties
  };

  const descriptionUpdate = (e) => {
    const valueOfEdited = e.target.value; //what user typed is the new value
    const idOfEdited = props.note.id; //grab the id of the note being edited
    props.onType(idOfEdited, "description", valueOfEdited); //call onType method and pass it these properties
  };

  const clickDelete = () => props.removeNote(props.note.id);
  // console.log(props);
  // console.log(props.note.id);

  return (
    <li className="note">
      <input
        className="note__title"
        type="text"
        placeholder="Title"
        value={props.note.title}
        onChange={titleUpdate} //call the function to update the title
      />
      <textarea
        className="note__description"
        placeholder="Description..."
        value={props.note.description}
        onChange={descriptionUpdate} //call the function to update the description.
      />
      <span className="note__delete" onClick={clickDelete}>
        X
      </span>
    </li>
  );
}

/*NotesList is sending entire note object via props; 
value can grab object property for title and description;
need props.note so it plugs in value for each note in the array*/

/*onChange events call functions that will grab the value that was typed into the field and feed that, 
plus other data back to the onType method */
