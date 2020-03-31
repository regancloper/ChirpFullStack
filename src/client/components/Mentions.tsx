import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export interface MentionsProps { }

const Mentions: React.FC<MentionsProps> = (props) => {

    const { id } = useParams();

    interface Mention {
        chirpid: number,
        text: string,
        location: string,
        date: string,
        name: string
    };

    const [mentions, setMentions] = useState<Mention[]>([]);


    const getMentions = async () => {
        let r = await fetch(`/api/mentions/${id}`);
        let data = await r.json();
        setMentions(data);
    };


    useEffect(() => {
        getMentions();
    }, []);



    return (
        <div className="container-fluid">
            <h1 className="m-3">Mentions </h1>

            <div className="list-group">
                {mentions.map(mention => (
                    <div key={mention.chirpid} className="d-flex align-items-center justify-content-between list-group-item list-group-item-action">
                        <div>
                            <span className="mb-1 author-text">{mention.name}</span>
                            <small className="mx-3 font-italic">{mention.location}</small>
                            <p className="mb-1">{mention.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Mentions;