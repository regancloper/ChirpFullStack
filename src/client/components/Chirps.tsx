import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../scss/app';

export interface ChirpsProps { };

export interface Chirp {
    id: number,
    userid: string,
    text: string,
    location: string,
    name: string
};


const Chirps: React.FC<ChirpsProps> = (props) => {

    const [chirps, setChirps] = useState<Chirp[]>([]);
    const [newAuthor, setAuthor] = useState<string>('');
    const [newText, setText] = useState<string>('');
    const [newLocation, setLocation] = useState<string>('');


    const getChirps = useCallback(async () => {
        let r = await fetch('/api/chirps');
        let data = await r.json();
        setChirps(data);
    }, []);


    useEffect(() => {
        getChirps();
    }, []);


    const addNewChirp = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        fetch('/api/chirps', {
            method: 'POST',
            body: JSON.stringify({ author: newAuthor, text: newText, location: newLocation }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                getChirps();
                setAuthor('');
                setText('');
                setLocation('');
            });
    };



    return (
        <div className="container-fluid">
            <h1 className="m-3">Chirper</h1>

            <div className="list-group">
                {chirps.map(chirp => (
                    <div key={chirp.id} className="d-flex align-items-center justify-content-between list-group-item list-group-item-action">
                        <div>
                            <Link to={`/${chirp.userid}/mentions`} className="mb-1 author-text">{chirp.name}</Link>
                            <small className="mx-3 font-italic">{chirp.location}</small>
                            <p className="mb-1">{chirp.text}</p>
                        </div>
                        <div>
                            <Link to={`/${chirp.id}/admin`} className="btn-sm btn-info shadow-sm">Admin Options</Link>
                        </div>

                    </div>
                ))}
            </div>



            <div className="my-3 py-3 container-fluid bg-light border rounded">
                <form>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control" id="author" value={newAuthor}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                        />
                        <label htmlFor="location">Location</label>
                        <input type="text" className="form-control" id="location" value={newLocation}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                            
                        />

                        <label htmlFor="commentText">Insert comment here</label>
                        <textarea className="form-control" rows={3} id="commentText" value={newText}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                        ></textarea>
                    </div>
                    <button className="btn btn-outline-success" id="addButton"
                        onClick={addNewChirp}>
                        Add Comment!
                </button>
                </form>
            </div>
        </div>


    );
}

export default Chirps;