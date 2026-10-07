// routes/entries.routes.js

const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const Entry = require('../models/Entry')


router.get('/new', isSignedIn, (req, res) => {
    res.render('./auth/sign-in')
})


router.get('/create', isSignedIn, (req, res) => {
    res.render('Create-entries.ejs')
})


router.post('/create', isSignedIn, async (req, res) => {
    try {
        const createdEntry = await Entry.create({
            title: req.body.title,
            entryBody: req.body.entryBody,
            isPublic: Boolean(req.body.isPublic),
            owner: req.session.user._id
        })

        console.log(createdEntry)

        res.redirect('/entries/All-entries')

    } catch (error) {
        console.log(error)
    }
})


router.get('/All-entries', isSignedIn, async (req, res) => {
    try {
        const foundEntries = await Entry.find({})

        res.render('All-entries.ejs', {
            Entry: foundEntries,
            user: req.session.user
        })

    } catch (error) {
        console.log(error)
    }
})


router.get('/my-entries', isSignedIn, async (req, res) => {
    try {
        const foundMyEntry = await Entry.find({
            owner: req.session.user._id
        })

        res.render('my-entries.ejs', {
            Entry: foundMyEntry,
            user: req.session.user
        })

    } catch (error) {
        console.log(error)
    }
})


router.get('/create-entries', isSignedIn, (req, res) => {
    res.render('Create-entries.ejs')
})


router.get('/:id/edit', isSignedIn, async (req, res) => {
    try {
        const foundEntry = await Entry.findById(req.params.id)

        res.render('update.ejs', {
            Entry: foundEntry,
            user: req.session.user
        })

    } catch (error) {
        console.log(error)
    }
})


router.put('/:id', isSignedIn, async (req, res) => {
    try {
        await Entry.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            entryBody: req.body.entryBody,
            isPublic: Boolean(req.body.isPublic)
        })

        res.redirect('/entries/All-entries')

    } catch (error) {
        console.log(error)
    }
})


router.delete('/:id', isSignedIn, async (req, res) => {
    try {
        const deletedEntries = await Entry.findByIdAndDelete(req.params.id)

        console.log(deletedEntries)

        res.redirect('/entries/All-entries')

    } catch (error) {
        console.log(error)
    }
})


module.exports = router