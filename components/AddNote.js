import React,{useContext,useState} from 'react'
import noteContex from '../context/notes/notesContext'
const AddNote = () => {
    const context = useContext(noteContex)
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""});
    }
    const onChange = (e)=>{
        
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
        <h1>Your Notes</h1>
        <form>
            <div className="mb-3 my-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="email" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}  value={note.title}  minLength={5} required />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} value={note.description}  required />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}  value={note.tag} />
            </div>
            
            <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
    </div>
    )
}

export default AddNote
