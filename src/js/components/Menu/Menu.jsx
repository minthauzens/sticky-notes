import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPaintBrush,
    faPlusSquare,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faStickyNote as faStickyNoteRegular } from '@fortawesome/free-regular-svg-icons';
import './style.scss';

const Menu = ({
    onAddNote,
    onDeleteAllNotes,
    noteCount,
    onColorChange,
}) => {
    const [color, setColor] = useState('yellow');

    useEffect(() => {
        onColorChange(color);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [color]);

    return (
        <nav className="Menu navbar navbar-expand-lg navbar-light bg-light">
            <div>LOGO</div>
            <div className="navbar-brand">Stickies app</div>
            <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <FontAwesomeIcon icon={faStickyNoteRegular} mask={['far']} className="fa-fw" />
                        <div className="nav-link" style={{ marginRight: '5px' }}>
                            {noteCount}
                        </div>
                    </li>
                    <li className="nav-item">
                        <button
                            type="button"
                            className="nav-link"
                            onClick={() => {
                                onAddNote();
                            }}
                        >
                            <FontAwesomeIcon icon={faPlusSquare} className="fa-fw" />
                            addNote
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            type="button"
                            className="nav-link"
                            onClick={() => {
                                onDeleteAllNotes();
                            }}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} className="fa-fw" />
                            Delete All notes
                        </button>
                    </li>
                    <li className="nav-item dropdown">
                        <button
                            type="button"
                            className="nav-link dropdown-toggle"
                            id="navbarDropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <FontAwesomeIcon icon={faPaintBrush} />
                            Color
                        </button>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <button
                                type="button"
                                className="dropdown-item black"
                                onClick={() => setColor('black')}
                            >
                                Black
                            </button>
                            <button
                                type="button"
                                className="dropdown-item blue"
                                onClick={() => setColor('blue')}
                            >
                                Blue
                            </button>
                            <button
                                type="button"
                                className="dropdown-item yellow"
                                onClick={() => setColor('yellow')}
                            >
                                Yellow
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

Menu.propTypes = {
    noteCount: PropTypes.number,
    onAddNote: PropTypes.func,
    onDeleteAllNotes: PropTypes.func,
    onColorChange: PropTypes.func,
};
Menu.defaultProps = {
    noteCount: 0,
    onAddNote: null,
    onDeleteAllNotes: null,
    onColorChange: null,
};

export default Menu;
