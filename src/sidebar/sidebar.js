import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button, DialogTitle } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';
import { tsConstructSignatureDeclaration } from '@babel/types';

const SidebarComponent = (props) => {

    const [addingNote, setAddingNote] = useState(false);
    const [title, setTitle] = useState(null);

    const { notes, classes, selectedNoteIndex } = props;

    const newNoteBtnClick = () => {
        console.log('new btn clicked')
        setAddingNote(!addingNote);
        setTitle(null);
    }

    const updateTitle = (txt) => {
        setTitle(txt);
    }

    const newNote = () => {
        props.newNote(title)
        setTitle(null);
        setAddingNote(false);
    }
    const selectNote = (n, i) => {
        console.log('select note');
        props.selectNote(n, i);
    }
    const deleteNote = (note) => {
        console.log('delete note');
        props.deleteNote(note);
    }

    if(notes){
        return(
            <div className={classes.sidebarContainer}>
                <Button
                    onClick={newNoteBtnClick}
                    className={classes.newNoteBtn}> 
                    {
                        addingNote ? 'Cancel' : 'New Note'
                    }
                    </Button>
                {
                    addingNote ?
                    <div>
                        <input 
                            type="text"
                            className={classes.newNoteInput}
                            placeholder='Enter note title'
                            onKeyUp={(e) => updateTitle(e.target.value)}/>
                        <Button 
                            className={classes.newNoteSubmitBtn}
                            onClick={newNote}> Submit Note </Button>
                    </div> :
                    null
                }
                <List>
                    {
                        notes.map((_note, _index) => {
                            return(
                                <div key={_index}>
                                    <SidebarItemComponent
                                        _note={_note}
                                        _index={_index}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote={selectNote}
                                        deleteNote={deleteNote}>
                                    </SidebarItemComponent>
                                    <Divider/>
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        ); 
    } else{
        return(
            <div>
                Add a note!
            </div>
        )
    }
}

export default withStyles(styles)(SidebarComponent);