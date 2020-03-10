import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import PropTypes from 'prop-types';

export const LOCAL_STORAGE_NOTE_BASE = 'stickyNotesApp-note-';

function Note(props) {
    const {
        id,
        color,
        onClick,
        deleteNote,
    } = props;
    const localStorageName = LOCAL_STORAGE_NOTE_BASE + id;
    const note = JSON.parse(localStorage.getItem(localStorageName)) || {
        title: '',
        content: '',
        coords: {
            left: '50px',
            top: '50px',
        },
    };
    const [title, setTitle] = useState(() => note.title);
    const [content, setContent] = useState(() => note.content);
    const [position, setPosition] = useState(() => note.coords);

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
    useEffect(() => {
        note.coords = position;
        localStorage.setItem(localStorageName, JSON.stringify(note));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

    useEffect(() => {
        let offset = [0, 0];
        const noteContainer = document.getElementById(id);
        const anchor = document.getElementById(`anchor${id}`);
        let isDown = false;

        anchor.addEventListener('mousedown', (e) => {
            isDown = true;
            offset = [
                noteContainer.offsetLeft - e.clientX,
                noteContainer.offsetTop - e.clientY,
            ];
        }, true);

        document.addEventListener('mouseup', () => {
            isDown = false;
        }, true);

        document.addEventListener('mousemove', (e) => {
            e.preventDefault();
            if (isDown) {
                setPosition({
                    left: `${e.clientX + offset[0]}px`,
                    top: `${e.clientY + offset[1]}px`,
                });
            }
        }, true);
    }, [id]);

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
            style={position}
            draggable="true"
            id={id}
        >
            <div className="note-header">
                <FontAwesomeIcon
                    icon={faArrowsAlt}
                    className="faMove"
                    id={`anchor${id}`}
                />
                <h5>
                    <input
                        className={bootstrapClass}
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </h5>
                <FontAwesomeIcon
                    icon={faBan}
                    onClick={() => { deleteNote(id); }}
                />
            </div>
            <div className="note-content">
                <textarea
                    className={bootstrapClass}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="add your note"
                />
            </div>
        </div>
    );
}

Note.propTypes = {
    id: PropTypes.number,
    color: PropTypes.string,
    onClick: PropTypes.func,
    deleteNote: PropTypes.func,
};

Note.defaultProps = {
    id: 0,
    color: 'yellow',
    onClick: null,
    deleteNote: null,
};

export default Note;
