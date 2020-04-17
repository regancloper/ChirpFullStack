import * as React from 'react';
import { useHistory } from 'react-router-dom';

const Compose: React.FC<IComposeProps> = props => {
	const history = useHistory();

	const [text, setText] = React.useState<string>('');

	const submitChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		console.log({ text, userid: 1 });
		const res = await fetch('/api/chirps', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ text, location: 'Birmingham, AL', userid: 1 })
		});
		if (res.ok) {
			const result = await res.json();
			console.log(result);
			history.push(`details/${result.chirpid}`);
		}
	}

	return (
		<main className="container">
			<section className="row my-2 justify-content-center">
				<div className="col-md-8">
					<form className="form-group p-3 border border-primary rounded">
						{/* <label htmlFor="username">Username</label>
						<input type="text" className="form-control"/> */}
						<label htmlFor="text">Chirp</label>
						<textarea
							value={text}
							onChange={e => setText(e.target.value)}
							rows={8}
							className="form-control"
						/>
						<button
							onClick={submitChirp}
							className="btn btn-success btn-block mx-auto w-50 mt-3">
							Chirp It!
						</button>
					</form>
				</div>
			</section>
		</main>

	);
}

interface IComposeProps { }

export default Compose;


