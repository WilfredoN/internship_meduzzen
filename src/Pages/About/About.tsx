import React from 'react';

import './About.css';

const About = () => {
	return (
		<div className="about flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold">About</h1>
			<p className="text-lg mt-4">
				This is app is a example of how to use React, Tailwind CSS, and
				Redux to create a modern web app.
			</p>
		</div>
	);
};

export default About;
