import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

export interface DetailsProps { }

const Details: React.FC<DetailsProps> = () => {

    const { id } = useParams();
    const history = useHistory();


    const [author, setAuthor] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    const getChirp = useCallback(async () => {
        let r = await fetch(`../api/chirps/${id}`);
        let post = await r.json();
        setAuthor(post.name);
        setText(post.text);
        setLocation(post.location);
    }, []);

    useEffect(() => { getChirp(); }, [id]);

    const editChirp = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        fetch(`/api/chirps/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ author, text, location }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => history.push('/'));
    };

    const deleteChirp = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        fetch(`../api/chirps/${id}`, {
            method: 'DELETE'
        })
            .then(() => history.push('/'));
    };

    return (
        <div className="container my-5">
            <div className="mx-auto w-50 p-3 bg-light border shadow-lg rounded">
                <form>
                    <div className="form-group">
                        <h5>{author}</h5>
                        <label htmlFor="location">Location</label>
                        <input type="text" className="form-control" id="location" defaultValue={location}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                            
                        />
                        <label htmlFor="commentText">Insert comment here</label>
                        <textarea className="form-control" rows={3} defaultValue={text}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                        ></textarea>
                    </div>
                    <button className="btn btn-outline-info mr-1"
                        onClick={editChirp}>
                        Edit Chirp
                    </button>
                    <button className="btn btn-outline-danger"
                        onClick={deleteChirp}>
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Details;