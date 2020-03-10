/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt, faBan } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-autosize-textarea';
import './style.scss';
import PropTypes from 'prop-types';

export const LOCAL_STORAGE_NOTE_BASE = 'stickyNotesApp-note-';

function Note(props) {
    const {
        id,
        color,
        onClick,
        deleteNote,
        coords,
        setCoords,
    } = props;
    const localStorageName = LOCAL_STORAGE_NOTE_BASE + id;
    const note = JSON.parse(localStorage.getItem(localStorageName)) || {
        title: '',
        content: '',
    };
    const [title, setTitle] = useState(() => note.title);
    const [content, setContent] = useState(() => note.content);
    const [position, setPosition] = useState(() => coords);

    useEffect(() => {
        note.title = title;
        localStorage.setItem(localStorageName, JSON.stringify(note));
    }, [title]);
    useEffect(() => {
        note.content = content;
        localStorage.setItem(localStorageName, JSON.stringify(note));
    }, [content]);
    useEffect(() => {
        setCoords(id, position);
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

    function autosize() {
        const el = this;
        setTimeout(() => {
            el.style.cssText = 'height:auto; padding:0';
            // for box-sizing other than "content-box" use:
            // el.style.cssText = '-moz-box-sizing:content-box';
            el.style.cssText = `height:${el.scrollHeight}px`;
        }, 0);
    }

    useEffect(() => {
        const textarea = document.querySelector('textarea');
        textarea.addEventListener('keydown', autosize);
    }, []);

    const noteClass = `Note ${color} card mb-3`;

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
            <div className="card-header">
                <FontAwesomeIcon
                    icon={faBan}
                    onClick={() => {
                        deleteNote(id);
                    }}
                />
                <h5>
                    <input
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </h5>
                <FontAwesomeIcon
                    icon={faArrowsAlt}
                    className="faMove"
                    id={`anchor${id}`}
                />
            </div>
            <div className="note-content">
                <TextareaAutosize
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
    coords: PropTypes.exact({
        top: PropTypes.string,
        left: PropTypes.string,
    }),
    setCoords: PropTypes.func,
};

Note.defaultProps = {
    id: 0,
    color: 'yellow',
    onClick: null,
    deleteNote: null,
    coords: {
        top: '50px',
        left: '50px',
    },
    setCoords: null,
};

export default Note;
