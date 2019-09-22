import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ExerciseInput from './exerciseInput';
import ExerciseFilter from './exerciseFilter';
import Pager from './pager';
import Loader from './loader';
import { BASE_URL, PER_PAGE } from '../constants';

const getPageFromQueryString = location => {
	const queryString = new URLSearchParams(location.search);
	return +queryString.get('page') || 1;
};

export default ({ match, location, history }) => {
	const { userId } = match.params;
	const page = getPageFromQueryString(location);

	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [offset, setOffset] = useState((page - 1) * PER_PAGE);
	const [showForm, setShowForm] = useState(false);
	const [filter, setFilter] = useState({ from: '', to: '' });

	useEffect(() => {
		async function fetchUserLogs() {
			const { from, to } = filter;
			const start = offset || 0;
			const { data } = await axios.get(
				`${BASE_URL}/api/exercise/log?userId=${userId}&from=${from}&to=${to}&limit=${PER_PAGE}&offset=${start}`,
			);
			setUser(data);
			setIsLoading(false);
		}

		setIsLoading(true);
		fetchUserLogs();
	}, [userId, filter, offset]);

	// listen back/forward button clicks
	useEffect(() => {
		const unlisten = history.listen(location => {
			const page = getPageFromQueryString(location);
			setOffset((page - 1) * PER_PAGE);
		});
		return () => unlisten();
	});

	const onSave = () => {
		setOffset(null);
	};

	const applyFilter = filter => setFilter(filter);
	const toggleForm = () => setShowForm(!showForm);

	if (showForm) {
		return (
			<ExerciseInput
				userId={userId}
				onSave={onSave}
				onCancel={toggleForm}
			/>
		);
	} else {
		return (
			<>
				{user && (
					<>
						<h2>{`${user.username}'s Log`}</h2>
						<button
							className="add-log"
							onClick={toggleForm}
							title="Add Log"
						>
							+
						</button>
						<ExerciseFilter
							filter={filter}
							onFilter={applyFilter}
						/>
					</>
				)}
				<Loader isLoading={isLoading} />
				{user && user.log.length ? (
					<>
						<ul className="exercises">
							{user.log.map(log => (
								<li key={log._id}>
									<h2 className="exercise-desc">
										{log.description}
									</h2>
									<h3 className="exercise-info">
										<span>
											{new Date(
												log.date,
											).toLocaleDateString()}
										</span>
										<span>{log.duration}</span>
									</h3>
								</li>
							))}
						</ul>
						<Pager
							page={page}
							perPage={PER_PAGE}
							total={user.count}
							onChange={setOffset}
						/>
					</>
				) : (
					<p>User has not posted any exercises</p>
				)}
			</>
		);
	}
};
