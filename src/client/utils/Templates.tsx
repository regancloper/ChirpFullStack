import * as React from 'react';

const Template: React.FC<ITemplateProps> = props => {
	return (
		<main className="container">
			<section className="row my-2 justify-content-center">
				<div className="col-md-6">
					<h1 className="text-center">Template View</h1>
				</div>
			</section>
		</main>

	);
}

interface ITemplateProps { }

export default Template;


