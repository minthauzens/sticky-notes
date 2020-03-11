/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './style.scss';
import Menu from '../Menu/Menu';
import Note, { LOCAL_STORAGE_NOTE_BASE } from '../Note/Note';

const App = () => {
    const LOCAL_STORAGE_KEY = 'stickyNotesApp';
    const STARTING_COORDS = {
        x: 50,
        y: 65,
    };
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
    const [activeNote, setActiveNote] = useState(null);
    const [color, setColor] = useState('yellow');
    let noteId = notes.length;

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    }, [notes]);

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
        const matchedNotes = notes.filter((i) => i.id === noteId).length;
        if (matchedNotes !== 0) {
            noteId += 1;
            setValidNoteId();
        }
    }

    function addNote() {
        setValidNoteId();
        const position = {
            x: STARTING_COORDS.x + notes.length * 35,
            y: STARTING_COORDS.y + notes.length * 35,
        };
        const note = {
            id: noteId,
            color,
            coords: {
                left: `${position.x}px`,
                top: `${position.y}px`,
            },
        };
        setNotes([...notes, note]);
        noteId += 1;
    }

    function deleteAll() {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        notes.forEach((note) => {
            const name = LOCAL_STORAGE_NOTE_BASE + note.id;
            localStorage.removeItem(name);
        });
        setNotes([]);
    }

    function deleteNote(id) {
        setNotes(() => notes.filter((note) => note.id !== id));
        const name = LOCAL_STORAGE_NOTE_BASE + id;
        localStorage.removeItem(name);
    }

    function setCoords(id, coords) {
        setNotes(() => notes.map((note) => {
            const result = note;
            if (note.id === id) {
                result.coords = coords;
            }
            return result;
        }));
    }

    return (
        <div className="App">
            <Menu
                onAddNote={addNote}
                onDeleteAll={deleteAll}
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
                            deleteNote={deleteNote}
                            color={noteColor}
                            setCoords={setCoords}
                            coords={note.coords}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
