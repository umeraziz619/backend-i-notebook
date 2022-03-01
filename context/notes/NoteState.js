// import react from "react";
import { useState } from "react";
import NoteContext from "./notesContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const Initialnotes = []
  const [notes, setNotes] = useState(Initialnotes)
  //Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json)
  }





  
  // Add a Note
  const addNote = async (title, description, tag) => {

    // ToDO: api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    // const json = response.json();
    setNotes(notes.concat(note))
  

    // const note = {
    //   "_id": "12345676744",
    //   "user": "61d4856b3d4338d14eb2334b",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2022-01-14T11:25:44.195Z",
    //   "__v": 0
    // };
  }





  // Delete a Note
  const deleteNote = async (id) => {
    // APi call for deleting note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json)
    //  console.log("You are deleting the following note with id: "+id)
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes)

  }



  // Edit the Note
  const editNote = async (id, title, description, tag) => {
    // Api Calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

   let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in Client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      }
      break;
    }
    console.log(newNotes)
    setNotes(newNotes)
 
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;
