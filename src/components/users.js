import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import UserInput from './userInput';
import Loader from './loader';
import { BASE_URL } from '../constants';

const userSorting = (a, b) => {
	const aName = a.username.toLowerCase();
	const bName = b.username.toLowerCase();
	return aName < bName ? -1 : 1;
};

export default () => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchUsers() {
			const { data } = await axios.get(`${BASE_URL}/api/exercise/users`);

			setUsers(data);
			setIsLoading(false);
		}

		setIsLoading(true);
		fetchUsers();
	}, []);

	const onSaveUser = newUser => {
		setUsers(prevState => [...prevState, newUser]);
	};

	const deleteHandler = userId => async () => {
		const { data } = await axios.delete(
			`${BASE_URL}/api/exercise/delete-user?userId=${userId}`,
		);

		if (data._id) {
			setUsers(prevState =>
				prevState.filter(user => user._id !== data._id),
			);
		}
	};

	return (
		<>
			<UserInput onSave={onSaveUser} />
			<Loader isLoading={isLoading} />
			{users.length ? (
				<ul className="user-list">
					{users.sort(userSorting).map(user => (
						<li key={user._id}>
							<Link to={`/exercises/${user._id}`}>
								{user.username}
							</Link>
							<button onClick={deleteHandler(user._id)}>x</button>
						</li>
					))}
				</ul>
			) : (
				<p>There are no users to display</p>
			)}
		</>
	);
};
