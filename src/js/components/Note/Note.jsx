import React, { useState, useEffect } from 'react';
import './style.scss';
import PropTypes from 'prop-types';

export const LOCAL_STORAGE_NOTE_BASE = 'stickyNotesApp-note-';

function Note({ id, color, onClick }) {
    const localStorageName = LOCAL_STORAGE_NOTE_BASE + id;
    const note = JSON.parse(localStorage.getItem(localStorageName)) || {
        title: '',
        content: '',
    };
    const [title, setTitle] = useState(() => note.title);
    const [content, setContent] = useState(() => note.content);

    useEffect(() => {
        note.title = title;
        localStorage.setItem(localStorageName, JSON.stringify(note));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title]);
    useEffect(() => {
        note.content = content;
        localStorage.setItem(localStorageName, JSON.stringify(note));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);

    let bootstrapClass;
    switch (color) {
    case 'blue':
        bootstrapClass = 'bg-primary';
        break;
    case 'yellow':
        bootstrapClass = 'bg-warning';
        break;
    case 'black':
        bootstrapClass = 'bg-dark';
        break;
    default:
        bootstrapClass = 'bg-warning';
    }
    bootstrapClass += ' text-white';

    const noteClass = `Note ${bootstrapClass} card mb-3`;

    return (
        <div
            className={noteClass}
            onFocus={() => onClick(id)}
            role="button"
            tabIndex="0"
        >
            <div className="card-body">
                <h5 className="card-title">
                    <input
                        className={bootstrapClass}
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </h5>
                <p className="card-text">
                    <textarea
                        className={bootstrapClass}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="add your note"
                    />
                </p>
            </div>
        </div>
    );
}

Note.propTypes = {
    id: PropTypes.number,
    color: PropTypes.string,
    onClick: PropTypes.func,
};

Note.defaultProps = {
    id: 0,
    color: 'yellow',
    onClick: null,
};

export default Note;
