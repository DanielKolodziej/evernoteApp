import React, { useState, useEffect } from 'react';

import SideBar from './sidebar/Sidebar';
import Editor from './editor/editor';

import './App.css';

const firebase = require('firebase');

export default function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        // docs is a property of the serverUpdate object
        const noteList = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data.id = _doc.id;
          return data;
        });
        console.log(noteList);
        setNotes(noteList);
      }); // auto call when "notes" collection is updated
  }, []);

  const selectNote = (note, index) => {
    setSelectedNoteIndex(index);
    setSelectedNote(note);
  };
  const deleteNote = async note => {
    const noteIndex = notes.indexOf(note);
    await setNotes(notes.filter(_note => _note !== note));
    if (selectedNoteIndex === noteIndex) {
      setSelectedNoteIndex(null);
      setSelectedNote(null);
    } else {
      notes.length > 1
        ? selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1)
        : setSelectedNoteIndex(null);
      setSelectedNote(null);
    }
    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  };

  const newNote = async title => {
    const note = {
      title,
      body: '',
    };

    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    const newID = newFromDB.id;
    await setNotes([...notes, note]);

    const newNoteIndex = notes.indexOf(
      notes.filter(_note => _note.id === newID)[0]
    );

    setSelectedNote(notes[newNoteIndex]);
    setSelectedNoteIndex(newNoteIndex);
  };

  const noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <div className="app-container">
      <SideBar
        selectedNoteIndex={selectedNoteIndex}
        notes={notes}
        deleteNote={deleteNote}
        selectNote={selectNote}
        newNote={newNote}
      />
      {selectedNote ? (
        <Editor
          selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}
        />
      ) : (
        <h1>Please select a note</h1>
      )}
    </div>
  );
}
