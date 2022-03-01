import React,{useContext} from 'react'
import noteContex from '../context/notes/notesContext'
const NoteItem = (props) => {
    const context = useContext(noteContex)
    const {deleteNote} = context
    const { note ,updateNote} = props;
    return (
        
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                        <i className="far fa-trash-alt" onClick={()=>{deleteNote(note._id)}}></i>
                   </div>
            </div>
        </div>
    )
}

export default NoteItem
