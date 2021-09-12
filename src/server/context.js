import winston from 'winston';

/**
 * @type {{log: function, error: function}}
 */
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: {},
	transports: [
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
	],
});


export default async function GetStaticContext() {
	return {
		logger,
	};
}
