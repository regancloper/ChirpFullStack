import * as React from 'react';
import type { IChirp } from '../utils/types';
import ChirpCard from '../components/ChirpCard';

const Home: React.FC<IHomeProps> = props => {

	const [chirps, setChirps] = React.useState<IChirp[]>([]);

	React.useEffect(() => {
		(async () => {
			const res = await fetch('/api/chirps');
			if (res.ok) {
				const chirps = await res.json();
				setChirps(chirps);
			}
		})();
	}, []);

	return (
		<main className="container">
			<section className="row my-2 justify-content-center">
				<div className="col-md-9">
					<ul className="list-group">
						{chirps.map(chirp => (
							<ChirpCard key={`chirp-card-${chirp.id}`} chirp={chirp} />
						))}
					</ul>
				</div>
			</section>
		</main>

	);
}

interface IHomeProps { }

export default Home;


