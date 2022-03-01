import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContex from '../context/notes/notesContext'
import AddNote from './AddNote'
import { useNavigate} from "react-router-dom";


import NoteItem from './NoteItem'
const Notes = () => {
    let navigate = useNavigate();
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })
    const context = useContext(noteContex)
    const { notes, getNotes,editNote} = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate("/login")
        }
        //eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click();
        // console.log("hello worrdl")
        setNote({id:currentNote._id,etitle: currentNote.title,edescription: currentNote.description,etag:currentNote.tag})
    }
    const handleClick = (e) => {
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
       
       
    }
    const onChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote />
            {/* this is the model start header */}


            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit model</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* This is the form of edit model */}
                            <form>
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="email" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  type="button" onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* // Model of bootstrap ends here */}
            <div className="row">
                <h1>Your Notes:</h1>
                {notes.length===0 && <h1>No notes to display </h1>}
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })
                }
            </div>
        </>
    )
}

export default Notes
