import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const Pager = ({ match, page, perPage, total, onChange }) => {
	const numPages = Math.ceil(total / perPage);
	const nextPage = page + 1;
	const prevPage = page - 1;

	if (numPages < 2) {
		return null;
	}

	const clickHandler = page => onChange((page - 1) * perPage);

	let pager = [];
	for (let i = 1; i <= numPages; i++) {
		pager.push(
			<li key={i}>
				<Link
					className={page === i ? 'active' : ''}
					to={`${match.url}?page=${i}`}
					onClick={clickHandler.bind(this, i)}
				>
					{i}
				</Link>
			</li>,
		);
	}

	return (
		<>
			<ul className="pager">
				{page > 1 && (
					<li>
						<Link
							to={`${match.url}${
								prevPage > 1 ? `?page=${prevPage}` : ''
							}`}
							onClick={clickHandler.bind(this, prevPage)}
						>
							{'<'}
						</Link>
					</li>
				)}
				{pager}
				{page < numPages && (
					<li>
						<Link
							to={`${match.url}?page=${nextPage}`}
							onClick={clickHandler.bind(this, nextPage)}
						>
							{'>'}
						</Link>
					</li>
				)}
			</ul>
		</>
	);
};

export default withRouter(Pager);
