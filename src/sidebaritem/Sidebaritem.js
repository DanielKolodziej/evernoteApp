import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { removeHTMLTags } from '../helpers';

const useStyles = makeStyles({
  listItem: {
    cursor: 'pointer',
  },
  textSection: {
    maxWidth: '85%',
  },
  deleteIcon: {
    position: 'absolute',
    right: '5px',
    top: 'calc(50% - 15px)',
    '&:hover': {
      color: 'red',
    },
  },
});

const SideBarItem = ({
  _index,
  _note,
  selectedNoteIndex,
  selectNote,
  deleteNote,
}) => {
  const classes = useStyles();

  return (
    <div key={_index}>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === _index}
        alignItems="flex-start"
        onClick={() => selectNote(_note, _index)}
      >
        <div className={classes.textSection}>
          <ListItemText
            primary={_note.title}
            secondary={`${removeHTMLTags(_note.body.substring(0, 30))}...`}
          />
        </div>
        <DeleteIcon
          onClick={() => {
            deleteNote(_note);
          }}
          className={classes.deleteIcon}
        />
      </ListItem>
    </div>
  );
};

SideBarItem.propTypes = {
  _index: PropTypes.number.isRequired,
  _note: PropTypes.object.isRequired,
  selectedNoteIndex: PropTypes.number,
  selectNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default SideBarItem;
