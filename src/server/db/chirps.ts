import { Query } from './index';

const all = async () => Query('SELECT c.id, c.userid, c.text, c.location, u.name from chirps c join users u on u.id = c.userid order by id');

const one = async (id: string) => Query('SELECT c.id, c.userid, c.text, c.location, u.name from chirps c join users u on u.id = c.userid WHERE c.id = ?', [id]);

// adds a chirp to the chirp database
const addChirp = async (author: string, text: string, location: string, mention?: string) => {
    Query('SELECT id FROM users WHERE name = ?', [author])
        .then(userid => {
            Query('CALL spInsertAndGetId(?, ?, ?)', [userid[0].id, text, location])
                .then(res => {
                    if (mention) {
                        addMention(mention, res[0][0].insertid);
                    }
                });
        });
};

// checks if a given user exists, and if not adds that user name to the user database
const addUser = async (author: string) => {
    Query('SELECT id FROM users WHERE name = ?', [author])
        .then(authorId => {
            if (!(authorId[0])) {
                Query('INSERT INTO users (name) VALUES (?)', [author]);
            }
        });
};

// pulls userid for a given chirp, and updates that chirp in the database
const edit = async (id: string, author: string, text: string, location: string) => {
    Query('SELECT id FROM users WHERE name = ?', [author])
        .then(userid => {
            Query('UPDATE chirps SET userid = ?, text = ?, location = ? WHERE id = ?', [userid[0].id, text, location, id]);
        });
};

// removes chirp from chirps database and mentions database
const remove = async (id: string) => {
    Query('DELETE FROM chirps WHERE id = ?', [id]);
    Query('DELETE FROM mentions WHERE chirpid = ?', [id]);
}

// adds a mention to the mention database
const addMention = async (mention: string, insertId: number) => {
    Query('CALL spAddMention(?, ?)', [mention, insertId]);
}


export default {
    all,
    one,
    addChirp,
    addUser,
    edit,
    remove,
    addMention
}