import React, { useRef } from 'react';
import axios from 'axios';

import { BASE_URL } from '../constants';

export default ({ userId, onSave, onCancel }) => {
	const descEl = useRef(null);
	const durationEl = useRef(null);
	const dateEl = useRef(null);

	const submitHandler = async () => {
		const description = descEl.current.value.trim();
		const duration = durationEl.current.value;
		const date = dateEl.current.value.trim();

		if (description && duration > 0) {
			onCancel();

			const data = { userId, description, duration, date };
			const response = await axios.post(
				`${BASE_URL}/api/exercise/add`,
				data,
			);
			onSave(response.data);
		}
	};

	return (
		<>
			<div className="form-control">
				<label htmlFor="description">Description*:</label>
				<input type="text" id="description" ref={descEl} />
			</div>
			<div className="form-control">
				<label htmlFor="duration">Duration*:</label>
				<input type="text" id="duration" ref={durationEl} />
			</div>
			<div className="form-control">
				<label htmlFor="date">Date:</label>
				<input
					type="text"
					id="date"
					ref={dateEl}
					placeholder="yyyy-mm-dd"
				/>
			</div>
			<div className="form-control">
				<button className="btn" onClick={onCancel}>
					Cancel
				</button>
				<button className="btn" onClick={submitHandler}>
					Save
				</button>
			</div>
		</>
	);
};
