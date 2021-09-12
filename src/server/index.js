import '@babel/polyfill';

import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';

import { validate, getUser } from 'server/lib/token';
import schema from 'server/schema/index.js';
import setupContext from 'server/context/index.js';
// import cacheWrap from 'server/lib/cacheWrap.js';

const PORT = process.env.SERVER_PORT || process.env.PORT || 4000;

async function StartServer() {
	const context = await setupContext();
	const app = express();

	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	const server = new ApolloServer({
		schema,
		introspection: true,
		playground: true,
		formatError: error => {
			Error.captureStackTrace(error);

			console.error(error);

			return error;
		},
		context: async ({ req }) => {
			let user;

			if (req.headers.authorization) {
				try {
					const token = req.headers.authorization;
					const claims = await validate(token);
					user = await getUser(claims.sub, context);
				} catch (e) {
					console.error(e);
				}
			}

			return {
				...context,
				user: user,
			};
		},
	});

	server.applyMiddleware({ app });

	app.use('/', express.static('dist/web'));

	function noCache(req, res, next) {
		res.header(
			'Cache-Control',
			'private, no-cache, no-store, must-revalidate'
		);
		res.header('Expires', '-1');
		res.header('Pragma', 'no-cache');
		next();
	}

	app.get('/env.js', noCache, async (req, res) => {
		let safeEnv = {};

		Object.keys(process.env).forEach(key => {
			if (key.indexOf('REACT_APP') !== 0) {
				return;
			}

			safeEnv[key] = process.env[key];
		});

		res.send(`
			window.env = ${JSON.stringify(safeEnv)};
		`);
	});

	app.get('*', (req, res) => {
		res.sendFile(path.resolve('dist/web', 'index.html'));
	});
	return await new Promise(resolve => app.listen(PORT, () => resolve(app)));
}

StartServer().then(app => {
	console.log(`Server started at http://localhost:${PORT}`);
	console.log(`GraphQL           http://localhost:${PORT}/graphql`);
});
