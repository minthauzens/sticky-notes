import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                        <div className="nav-link">
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
                            Color
                        </button>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <button
                                type="button"
                                className="dropdown-item"
                                onClick={() => setColor('black')}
                            >
                                Black
                            </button>
                            <button
                                type="button"
                                className="dropdown-item"
                                onClick={() => setColor('blue')}
                            >
                                Blue
                            </button>
                            <button
                                type="button"
                                className="dropdown-item"
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
