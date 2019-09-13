import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebaritem/Sidebaritem';

const useStyles = makeStyles({
  newNoteBtn: {
    width: '100%',
    height: '35px',
    borderBottom: '1px solid black',
    borderRadius: '0px',
    backgroundColor: '#29487d',
    color: 'white',
    '&:hover': {
      backgroundColor: '#88a2ce',
    },
  },
  sidebarContainer: {
    marginTop: '0px',
    width: '300px',
    height: '100%',
    boxSizing: 'border-box',
    float: 'left',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  newNoteInput: {
    width: '100%',
    margin: '0px',
    height: '35px',
    outline: 'none',
    border: 'none',
    paddingLeft: '5px',
    '&:focus': {
      outline: '2px solid rgba(81, 203, 238, 1)',
    },
  },
  newNoteSubmitBtn: {
    width: '100%',
    backgroundColor: '#28787c',
    borderRadius: '0px',
    color: 'white',
  },
});

const Sidebar = ({
  notes,
  selectedNoteIndex,
  newNote,
  selectNote,
  deleteNote,
}) => {
  const classes = useStyles();
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState(null);

  const newNoteBtnClick = () => {
    console.log('new btn clicked');
    setAddingNote(!addingNote);
    setTitle(null);
  };

  const updateTitle = txt => {
    setTitle(txt);
  };

  const createNote = () => {
    newNote(title);
    setTitle(null);
    setAddingNote(false);
  };

  if (notes) {
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
          {addingNote ? 'Cancel' : 'New Note'}
        </Button>
        {addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter note title"
              onKeyUp={e => updateTitle(e.target.value)}
            />
            <Button className={classes.newNoteSubmitBtn} onClick={createNote}>
              Submit Note
            </Button>
          </div>
        ) : null}
        <List>
          {notes.map((_note, _index) => (
            <div key={_index}>
              <SidebarItem
                _note={_note}
                _index={_index}
                selectedNoteIndex={selectedNoteIndex}
                selectNote={selectNote}
                deleteNote={deleteNote}
              />
              <Divider />
            </div>
          ))}
        </List>
      </div>
    );
  }
  return <div>Add a note!</div>;
};

Sidebar.propTypes = {
  notes: PropTypes.array,
  selectedNoteIndex: PropTypes.number,
  selectNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  newNote: PropTypes.func.isRequired,
};
export default Sidebar;
