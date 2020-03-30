import { Connection } from './index';


const getMentions = async (id: number) => {
    return new Promise<Array<any>>((resolve, reject) => {
        let qstring = ('SELECT m.chirpid, c.text, c.location, c._created, u.name FROM mentions m JOIN chirps c on m.chirpid = c.id JOIN users u on c.userid = u.id WHERE m.userid = ?');
        Connection.query(qstring, id, (err, results) => {
            if (err) reject(err);
            console.log(results);
            return resolve(results);
        });
    });
}


export default { getMentions };
