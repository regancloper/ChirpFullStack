import * as express from 'express';

import db from '../db';
import { checkForMentions } from '../utils/checkmentions';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json(await db.Chirps.all());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        res.json((await db.Chirps.one(id))[0]);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.post('/', async (req, res) => {
    let author = req.body.author;
    let text = req.body.text;
    let location = req.body.location;
    let mention = checkForMentions(text);
    try {
        let result = await db.Chirps.addChirp(author, text, location, mention);
        await db.Chirps.addUser(author);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let author = req.body.author;
    let text = req.body.text;
    let location = req.body.location;
    try {
        res.json(await db.Chirps.edit(id, author, text, location));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        res.json(await db.Chirps.remove(id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;