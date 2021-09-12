const MongoClient = require('mongodb').MongoClient;
// import redis from 'async-redis';

const DATABASE_URL = process.env.MONGODB_URL;
const HOUSING_COOPERATIVES_DB_URL =
	process.env.SYSTEM_HOUSING_COOPERATIVES_DB_URL || process.env.MONGODB_URL;
const HELP_VIDEOS_DB_URL = process.env.SYSTEM_IS_MAIN
	? process.env.MONGODB_URL
	: process.env.SYSTEM_HELP_VIDEOS_DB_URL;

const connectMongoDB = async url => {
	const client = await MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client.db();
};

const setupModels = async () => {
	const db = await connectMongoDB(DATABASE_URL);
	const houseDB = await connectMongoDB(HOUSING_COOPERATIVES_DB_URL);
	const videoDB = await connectMongoDB(HELP_VIDEOS_DB_URL);

	// const Redis = redis.createClient({ url: process.env.REDIS_URL });

	return {
		// redis: Redis,
		Activities: db.collection('activities'),
		Assessments: db.collection('assessments'),
		Addresses: db.collection('addresses'),
		BuildingData: db.collection('buildingData'),
		Categories: db.collection('categories'),
		Files: db.collection('files'),
		HelpVideos: videoDB.collection('helpVideos'),
		HousingCooperatives: houseDB.collection('housingCooperatives'),
		Settings: db.collection('settings'),
		SinglePages: db.collection('singlePages'),
		Users: db.collection('users'),
	};
};

export default setupModels;
