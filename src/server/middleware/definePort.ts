'use strict';

// Production port is process.env.PORT.
// Development port is 3000.
// Test port is 5000.

export default function() {
	const env = process.env.NODE_ENV;
	const defaultPort = env !== 'test' ? '3000' : '5000';
	const port = process.env.PORT || defaultPort;

	return port;
}
