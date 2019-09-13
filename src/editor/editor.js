import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const EditorComponent = (props) => {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [id, setId] = useState('');

    const { classes } = props;

    const updateBody = async (val) => {
        await setText(val);
        update();
    }

    const update = debounce(() => {
        console.log('updating db')
        if (id){
            props.noteUpdate(id, {
                title: title,
                body: text
            })
        }
    }, 1500);

    useEffect(()=> {
        if (props.selectedNote.id !== id){
            setText(props.selectedNote.body);
            setTitle(props.selectedNote.title);
            setId(props.selectedNote.id);
        }
    }, [props.selectedNote])

    const updateTitle = async (txt) => {
        await setTitle(txt);
        update();
    }

    return(
        <div className={classes.editorContainer}>
            <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
            <input className={classes.titleInput}
                    placeholder='Note tile...'
                    value={title ? title : ''}
                    onChange={(e) => updateTitle(e.target.value)}></input>
            <ReactQuill 
                value={text}
                onChange={updateBody}
            />

        </div>
    );
}

export default withStyles(styles)(EditorComponent) 
//styles function from styles.js