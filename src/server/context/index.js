import moment from 'moment';
import { v4 as uuid } from 'uuid';

import AWS from './aws.js';
import setupModels from './models.js';

async function setupContext() {
	const models = await setupModels();

	return {
		uuid: uuid,
		S3: new AWS.S3(),
		moment,
		AWS,
		...models,
	};
}

export default setupContext;
