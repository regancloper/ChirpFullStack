import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { IChirp } from '../utils/types';

const Details: React.FC<IDetailsProps> = props => {
    const { chirpid } = useParams();

    const [chirp, setChirp] = React.useState<IChirp>(null);

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`/api/chirps/${chirpid}`);
            if (res.ok) {
                const chirp = await res.json();
                setChirp(chirp);
            }
        })();
    }, []);

    return (
        <main className="container-fluid">
            <section className="row my-2 justify-content-center">
                <div className="col-md-12">
                    <div className="card mb-2">
                        <div className="card-body">
                            <h4 className="card-title d-inline font-weight-bold">
                                @{chirp?.username}
                            </h4>
                            <small className="font-italic m-2">{chirp?.location}</small>
                            <p className="card-text mt-2">
                                {chirp?.text}
                            </p>
                        </div>
                        <div className="card-footer">
                            <span className="text-muted">
                                {chirp?._created}
                            </span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link to="/" className="btn btn-outline-secondary">Go Back</Link>
                        <Link to={`/admin/${chirpid}`} className="btn btn-outline-info">Admin</Link>
                    </div>
                </div>
            </section>
        </main>

    );
}

interface IDetailsProps { }

export default Details;