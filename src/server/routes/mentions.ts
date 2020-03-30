import * as express from 'express';

import db from '../db';

const router = express.Router();

router.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        res.json(await db.Mentions.getMentions(id));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});



export default router;