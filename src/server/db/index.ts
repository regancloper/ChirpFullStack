import * as mysql from 'mysql';

import Chirps from './chirps';
import Mentions from './mentions';

export const Connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'chirprapp',
    password: 'password1',
    database: 'chirpr'
});

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, values, (err, results) => {
            if (err) reject(err);
            console.log(results);
            return resolve(results);
        });
    });

};

export default {
    Chirps,
    Mentions
}