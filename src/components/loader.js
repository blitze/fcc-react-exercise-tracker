import React from 'react';

import './loader.css';

export default ({ isLoading }) => {
	return (
		isLoading && (
			<div className="spinner">
				<div className="bounce1" />
				<div className="bounce2" />
				<div className="bounce3" />
			</div>
		)
	);
};
