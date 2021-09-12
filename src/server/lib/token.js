import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const AUTH0_TENANT = process.env.AUTH0_TENANT;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

const client = jwksClient({
	cache: true,
	cacheMaxAge: 36000000, // Default value is 10h
	jwksUri: `${AUTH0_TENANT}/.well-known/jwks.json`,
});

function getKey(header, cb) {
	client.getSigningKey(header.kid, function(err, key) {
		var signingKey = key.publicKey || key.rsaPublicKey;
		cb(null, signingKey);
	});
}

const options = {
	audience: AUTH0_AUDIENCE,
	issuer: `${AUTH0_TENANT}/`,
	algorithms: ['RS256'],
};

const validate = async token => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, getKey, options, (err, decoded) => {
			if (err) {
				return reject(err);
			}
			resolve(decoded);
		});
	});
};
const getUser = async (claims, context) => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await context.Users.findOne({ auth0Id: claims });
			resolve(user);
		} catch (e) {
			reject(e);
		}
	});
};

export { validate, getUser };
