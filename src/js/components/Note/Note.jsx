import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';

function Note({
    title,
    content,
    setTitle,
    setContent,
}) {
    return (
        <div className="Note">
            <div>
                <input
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}

                />
            </div>
            <div>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="add your note"
                />
            </div>
        </div>
    );
}

Note.propTypes = {
    title: PropTypes.string,
    setTitle: PropTypes.func,
    content: PropTypes.string,
    setContent: PropTypes.func,
};

Note.defaultProps = {
    title: '',
    setTitle: null,
    content: '',
    setContent: null,
};

export default Note;
