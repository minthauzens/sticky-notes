import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ onAddNote, onDeleteAllNotes }) => (
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
                        Note count
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
                        <button type="button" className="dropdown-item">Black</button>
                        <button type="button" className="dropdown-item">Blue</button>
                        <button type="button" className="dropdown-item">Yellow</button>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
);

Menu.propTypes = {
    onAddNote: PropTypes.func,
    onDeleteAllNotes: PropTypes.func,
};
Menu.defaultProps = {
    onAddNote: null,
    onDeleteAllNotes: null,
};

export default Menu;
