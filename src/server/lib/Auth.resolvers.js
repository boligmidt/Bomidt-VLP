import request from 'request';

const CLIENT_ID = process.env.AUTH0_M2M_CLIENT_ID;
const CLIENT_SECRET = process.env.AUTH0_M2M_CLIENT_SECRET;
const AUDIENCE = process.env.AUTH0_M2M_AUDIENCE;
const CONNECTION = process.env.AUTH0_CONNECTION;
const AUTH0_TENANT = process.env.AUTH0_TENANT;
/*
Content-Type: application/json" -d '{"email":"john.doe@gmail.com","connection":"Initial-Connection","password":"secret","verify_email":false,"username":"johndoe"}' "https://smart-test.eu.auth0.com/api/v2/users"

*/
class AuthModel {
	static async getApiToken() {
		return new Promise((resolve, reject) => {
			try {
				let options = {
					method: 'POST',
					url: `${AUTH0_TENANT}/oauth/token`,
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({
						client_id: CLIENT_ID,
						client_secret: CLIENT_SECRET,
						audience: AUDIENCE,
						grant_type: 'client_credentials',
					}),
				};

				request(options, (error, response, body) => {
					if (error) throw new Error(error);
					resolve(JSON.parse(body));
				});
			} catch (e) {
				reject(e);
			}
		});
	}

	static async createAuth0LoginAccount(apiToken, email, password) {
		return new Promise((resolve, reject) => {
			try {
				// check if user exists
				let options = {
					method: 'GET',
					url: `${AUTH0_TENANT}/api/v2/users-by-email`,
					qs: { email: email },
					headers: {
						'content-type': 'application/json',
						authorization: 'Bearer ' + apiToken,
					},
				};

				request(options, function(error, response, body) {
					if (error) reject(error);
					const users = JSON.parse(body);
					if (users && users.length === 1 && users[0].user_id) {
						resolve(users[0]);
					}
				});
			} catch (error) {
				console.log(error);
				reject(error);
			}

			try {
				// create new user
				let options = {
					method: 'POST',
					url: `${AUTH0_TENANT}/api/v2/users`,
					headers: {
						'content-type': 'application/json',
						authorization: 'Bearer ' + apiToken,
					},
					body: JSON.stringify({
						email: email,
						connection: CONNECTION,
						password: password,
						verify_email: false,
					}),
				};
				request(options, function(error, response, body) {
					if (error) reject(error);
					resolve(JSON.parse(body));
				});
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}

	static createUser() {
		return async (_, doc, context) => {
			if (doc.auth0Id) throw new Error('User already has auth0Id');

			try {
				const _id = context.uuid();
				const { access_token } = await this.getApiToken();
				doc.createdAt = new Date();
				doc.isDeleted = false;

				doc.password = '#';
				const keyString =
					'u0YD64Tmr!IKsdgbubQrKM7R*00eP5k^XFauiJySmae@!2hB$k#p$eGFgTmUSZasyn9xLnUeF4NMwulZq#MJv0ziQ337T$W%!T$';
				for (var i = 0; i < 20; i++) {
					doc.password += keyString[Math.floor(Math.random() * 100)];
				}
				let createResponse = await this.createAuth0LoginAccount(
					access_token,
					doc.email,
					doc.password
				);
				doc.auth0Id = createResponse.user_id;
				delete doc.password;
				const dbResponse = await context.Users.insertOne({
					_id,
					...doc,
				});
				return dbResponse.ops[0];
			} catch (e) {
				throw new Error(e);
			}
		};
	}

	static deleteUser() {
		return async (_, doc, context) => {
			try {
				await context.Users.deleteOne(doc);

				return true;
			} catch (e) {
				throw new Error(e);
			}
		};
	}

	// needs to be removed at a later date.
	static migrateUser() {
		return async (_, doc, context) => {
			try {
				// randomize new password
				const keyString =
					'u0YD64Tmr!IKsdgbubQrKM7R*00eP5k^XFauiJySmae@!2hB$k#p$eGFgTmUSZasyn9xLnUeF4NMwulZq#MJv0ziQ337T$W%!T$';
				let password = '#1';
				for (var i = 0; i < 20; i++) {
					password += keyString[Math.floor(Math.random() * 100)];
				}

				const { Users } = context;
				const { access_token } = await this.getApiToken();
				let userData = await Users.findOne({
					_id: doc._id,
				});
				if (userData.auth0Id) {
					throw new Error('User already migrated to new login.');
				}
				let createResponse = await this.createAuth0LoginAccount(
					access_token,
					userData.email,
					password
				);
				await Users.updateOne(
					{ _id: doc._id },
					{ $set: { auth0Id: createResponse.user_id } }
				);
				return true;
			} catch (error) {
				throw new Error(error);
			}
		};
	}
}

export default AuthModel;
