import React, { useRef } from "react";

export default ({ filter, onFilter }) => {
	const fromFilterEl = useRef(null);
	const toFilterEl = useRef(null);

	const handleClick = () => {
		onFilter({
			from: fromFilterEl.current.value,
			to: toFilterEl.current.value
		});
	};

	return (
		<div className="exercises-filter">
			<input
				type="text"
				placeholder="From (yyyy-mm-dd)"
				defaultValue={filter.from}
				ref={fromFilterEl}
			/>
			<input
				type="text"
				placeholder="To (yyyy-mm-dd)"
				defaultValue={filter.to}
				ref={toFilterEl}
			/>
			<button className="btn" onClick={handleClick}>
				Apply
			</button>
		</div>
	);
};
