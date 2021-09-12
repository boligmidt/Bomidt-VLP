export default async (key, getData, { redis }, time = 60 * 10) => {
	let data = null;

	try {
		data = await redis.get(key);

		if (data) {
			data = JSON.parse(data);
		}
	} catch (error) {
		console.error(error);
	}

	if (data) {
		return data;
	}

	try {
		data = await getData();
	} catch (error) {
		console.error(error);
		throw new Error(error);
	}

	try {
		await redis.set(key, JSON.stringify(data), 'EX', time);
	} catch (error) {
		console.error(error);

		throw new Error(error);
	}

	return data;
};
