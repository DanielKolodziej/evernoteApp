import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import debounce from '../helpers';

const useStyles = makeStyles({
  titleInput: {
    height: '50px',
    boxSizing: 'border-box',
    border: 'none',
    padding: '5px',
    fontSize: '24px',
    width: 'calc(100% - 300px)',
    backgroundColor: '#29487d',
    color: 'white',
    paddingLeft: '50px',
  },
  editIcon: {
    position: 'absolute',
    left: '310px',
    top: '12px',
    color: 'white',
    width: '10',
    height: '10',
  },
  editorContainer: {
    height: '100%',
    boxSizing: 'border-box',
  },
});

const Editor = ({ selectedNote, noteUpdate }) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');

  const update = debounce(() => {
    console.log('updating db');
    if (id) {
      noteUpdate(id, {
        title,
        body: text,
      });
    }
  }, 1500);

  const updateBody = async val => {
    await setText(val);
    update();
  };

  const updateTitle = async txt => {
    await setTitle(txt);
    update();
  };

  useEffect(() => {
    if (selectedNote.id !== id) {
      setText(selectedNote.body);
      setTitle(selectedNote.title);
      setId(selectedNote.id);
    }
  }, [id, selectedNote.body, selectedNote.id, selectedNote.title]);

  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon} />
      <input
        className={classes.titleInput}
        placeholder="Note tile..."
        value={title || ''}
        onChange={e => updateTitle(e.target.value)}
      />
      <ReactQuill value={text} onChange={updateBody} />
    </div>
  );
};

Editor.propTypes = {
  selectedNote: PropTypes.object.isRequired,
  noteUpdate: PropTypes.func.isRequired,
};

export default Editor;
