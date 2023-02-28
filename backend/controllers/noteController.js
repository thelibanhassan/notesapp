const mongoose = require("mongoose")
const Note = require("../model/noteModel")
const User = require("../model/userModel")

//create a note
const createNote = async (req, res) => {
    const { title, body } = req.body
    try {

        const user = await User.findOne({ id: req.user.id })
        //check if there is a user 
        if (!user) {
            res.status(404).json({
                mssg: ""
            })
        }
        const note = await Note.create({
            title,
            body,
            user: req.user.id
        })
        res.send(note)
    } catch (err) {
        res.status(404).json({
            msg: "failed to register"
        })
    }

    // User.notes.push(user)

}
//get notes

const getNotes = async (req, res) => {
    try {

        const notes = await Note.find({ user: req.user.id })
        res.send(notes)
    } catch (err) {
        console.log(err)
        res.status(404).json({ msg: "Error from notes" })

    }
}

//update note
const updateNote = async (req, res) => {
    const noteId = req.params.id

    const { title, body } = req.body

    try {
        //check if ID exist in the DB
        const checkId = await Note.findById(noteId)
        //if not exist
        if (!checkId) {
            res.status(404).json({
                msg: `No note with id :${noteId}`
            });
        }

        // if exists update the note with the new note
        else {

            const updateNote = await Note.findByIdAndUpdate({ _id: noteId }, { title, body })
            res.send(updateNote)
        }

    } catch (err) {
        res.status(404).json({
            msg: "Failed to Update"
        })
    }

}

//delete note
const deleteNote = async (req, res) => {
    const noteId = req.params.id
    try {

        //check if Id exists
        const checkId = await Note.findById(noteId)

        if (!checkId) {
            res.status(404).json({
                msg: `No note with id :${noteId}`
            });
        }
        //if ID exists, find and delete that note
        else {
            await Note.findByIdAndDelete({ _id: noteId })
            res.send({
                msg: "you deleted"
            })
        }
    } catch (err) {
        res.status(404).json({
            msg: "failed to delete"
        })
    }

}

module.exports = { createNote, getNotes, updateNote, deleteNote }