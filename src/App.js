import React, { Component } from "react";
import Header from "./Header";
import NotesList from "./NotesList";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  //Upon opening, check for any saved notes and open them
  componentDidMount() {
    const savedNotes = localStorage.getItem("savedNotes");
    if (savedNotes) {
      const savedState = JSON.parse(savedNotes);
      this.setState(savedState);
    }
  }

  //Upon updating, save notes to local storage
  componentDidUpdate() {
    const savedNotes = JSON.stringify(this.state);
    localStorage.setItem("savedNotes", savedNotes);
  }

  // Create method to add a note to the array
  //set up content for new note
  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    //update state to include the new note into the array
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
    // ALT:
    // this.setState({ notes: [newNote, ...this.state.notes] });
  };

  //method to edit a note after it's been created
  //copy notes array and update content of note that was edited
  //need to match id of note being edited to one in array
  //need to identify whether title or description was edited
  onType = (idOfEdited, keyOfEdited, valueOfEdited) => {
    const editedNotes = this.state.notes.map((note) => {
      if (note.id !== idOfEdited) {
        return note;
      } else {
        if (keyOfEdited === "title") {
          note.title = valueOfEdited;
          return note;
        } else {
          note.description = valueOfEdited;
          return note;
        }
      }
    });
    this.setState({ notes: editedNotes });
  };

  //method to search for a note
  //check for match of title or description text
  //if a match is found, update doesMatchSearch property to true
  //add onChange e.listener to Headers text input
  //props pass reference to onSearch method from App to onChange in Header

  onSearch = (text) => {
    const newSearchText = text.toLowerCase(); //convert all text typed into search to lower case
    //map over all notes; check for searchText - if none, set doesMatchSearch to true and return;
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note; //handles case where someone types, then deletes; makes sure all notes are showing
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText); //this will evaluate to true/false
        const descriptionMatch = description.includes(newSearchText); //same as above
        if (titleMatch) {
          note.doesMatchSearch = true;
        } else if (descriptionMatch) {
          note.doesMatchSearch = true;
        } else {
          note.doesMatchSearch = false;
        }
        return note;
      }
    });
    this.setState({ notes: updatedNotes, searchText: newSearchText });
  };

  // removeNote = (clickedId) => {
  //   /*filterCallback is using an index and removing the note at that index - returns all notes not at that index;
  //   "_" underscore is serving as a placeholder;
  //   filters through notes in array and returns a new array without those that have been clicked */
  //   const filterCallback = (_, this.note.id) => this.note.id !== clickedId;
  //   const revisedNotes = this.state.notes.filter(filterCallback);
  //   this.setState({ notes: revisedNotes });
  // };

  removeNote = (clickedId) => {
    // const revisedNotes = this.state.notes.filter(
    //   (note) => note.id !== clickedId
    // );
    //ABOVE IS ALTERNATE METHOD
    const revisedNotes = this.state.notes.filter((note) => {
      if (note.id !== clickedId) {
        return note;
      }
    });
    this.setState({ notes: revisedNotes });
  };

  render() {
    return (
      <div className="body">
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          removeNote={this.removeNote}
        />
      </div>
    );
  }
}

export default App;
