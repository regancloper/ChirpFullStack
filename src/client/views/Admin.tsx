import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';

const Admin: React.FC<IAdminProps> = props => {
    const { chirpid } = useParams();
    const history = useHistory();

    const [text, setText] = React.useState<string>('');
    const [location, setLocation] = React.useState<string>('');

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/chirps/${chirpid}`);
            if (res.ok) {
                const chirp = await res.json();
                setText(chirp.text);
                setLocation(chirp.location);
            }
        })();
    }, []);

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => { 
        e.preventDefault();
        const res = await fetch(`/api/chirps/${chirpid}`, {
            method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ text, location })
        });
        if (res.ok) {
            history.push(`/details/${chirpid}`);
        }
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const res = await fetch(`/api/chirps/${chirpid}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            history.push('/');
        }
    };

    return (
        <main className="container">
            <section className="row my-2 justify-content-center">
                <div className="col-md-8">
                    <form className="form-group p-3 border border-primary rounded">
                        {/* <label htmlFor="username">Username</label>
						<input type="text" className="form-control"/> */}
                        <label htmlFor="text">Edit Text</label>
                        <textarea
                            value={text}
                            onChange={e => setText(e.target.value)}
                            rows={8}
                            className="form-control"
                        />
                        <button
                            onClick={handleSave}
                            className="btn btn-info btn-block mx-auto w-50 mt-3">
                            Save It!
                        </button>
                        <button
                            onClick={handleDelete}
                            className="btn btn-danger btn-block mx-auto w-50 mt-3">
                            Delete It!
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
}

interface IAdminProps { }

export default Admin;


