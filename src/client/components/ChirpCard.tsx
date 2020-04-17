import * as React from 'react';
import { useHistory } from 'react-router-dom';
import type { IChirp } from '../utils/types';

const ChirpCard: React.FC<IChirpCardProps> = ({ chirp }) => {
    const history = useHistory();
    const handleListClick = () => history.push(`details/${chirp.id}`);

    return (
        <li onClick={handleListClick} className="d-flex align-items-center justify-content-between list-group-item list-group-item-action">
            <div>
                <span className="mb-1 font-weight-bold">@{chirp.username}</span>
                <small className="mx-3 font-italic">{chirp.location}</small>
                <p className="mb-1">{chirp.text}</p>
            </div>
            <small className="text-muted">{chirp._created}</small>
        </li>
    );
}

interface IChirpCardProps {
    chirp: IChirp
}

export default ChirpCard;


