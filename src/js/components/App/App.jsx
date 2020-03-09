/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './style.scss';
import Menu from '../Menu/Menu';
import Note, { LOCAL_STORAGE_NOTE_BASE } from '../Note/Note';
import useStateWithLocalStorage from '../../utils/reactHooks';

const App = () => {
    const [notes, setNotes] = useStateWithLocalStorage('stickyNotesApp-notes', []);
    const [activeNote, setActiveNote] = useState(null);
    const [color, setColor] = useState('yellow');
    let noteId = notes.length;

    useEffect(() => {
        setNotes(() => notes.map((note) => {
            const result = note;
            if (note.id === activeNote) {
                result.color = color;
            }
            return result;
        }));
    }, [color]);

    function setValidNoteId() {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (!notes.includes(noteId)) {
                return noteId;
            }
            noteId += 1;
        }
    }

    function addNote() {
        setValidNoteId();
        const note = {
            id: noteId,
            color,
        };
        setNotes([...notes, note]);
        noteId += 1;
    }

    function deleteAllNotes() {
        localStorage.removeItem('stickyNotesApp-notes');
        notes.forEach((note) => {
            const name = LOCAL_STORAGE_NOTE_BASE + note;
            return localStorage.removeItem(name);
        });
        setNotes([]);
    }

    return (
        <div className="App">
            <Menu
                onAddNote={addNote}
                onDeleteAllNotes={deleteAllNotes}
                noteCount={notes.length}
                onColorChange={setColor}
            />
            <div className="container note-container">
                {notes.map((note) => {
                    const noteColor = (note.color) ? note.color : color;
                    return (
                        <Note
                            key={note.id}
                            id={note.id}
                            onClick={setActiveNote}
                            color={noteColor}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
