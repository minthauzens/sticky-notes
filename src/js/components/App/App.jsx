import React, { useState } from 'react';
import './style.scss';
import Menu from '../Menu/Menu';
import Note from '../Note/Note';

function App() {
    let noteId = 0;
    const [notes, setNotes] = useState([]);

    function addNote() {
        setNotes([...notes, noteId]);
        noteId += 1;
    }

    function deleteAllNotes() {
        setNotes([]);
    }

    return (
        <div className="App">
            <Menu onAddNote={addNote} onDeleteAllNotes={deleteAllNotes} />
            <div className="container note-container">
                {notes.map((id) => <Note key={id} />)}
            </div>
        </div>
    );
}

export default App;
