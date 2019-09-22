import React, { useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

export default ({ onSave }) => {
	const userEl = useRef(null);

	const addUserHandler = async () => {
		const username = userEl.current.value;
		const data = { username };

		userEl.current.value = '';

		const response = await axios.post(
			`${BASE_URL}/api/exercise/new-user`,
			data,
		);

		onSave(response.data);
	};

	return (
		<>
			<input type="text" ref={userEl} />
			<button onClick={addUserHandler}>Add</button>
		</>
	);
};
