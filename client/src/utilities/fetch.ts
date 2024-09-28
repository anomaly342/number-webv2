import {
	CramerResult,
	Data,
	ErrorObject,
	GaussResult,
	RootResult,
} from "./types";

const fetch_server = async ({
	endpoint,
	data,
}: {
	endpoint: string;
	data: Data;
}): Promise<RootResult | CramerResult | GaussResult | Error> => {
	const url = process.env.NEXT_PUBLIC_SERVER_URL as string;
	const response = await fetch(`${url}${endpoint}`, {
		mode: "cors",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		const result = await response.json();
		return result;
	} else {
		const error = (await response.json()) as ErrorObject;
		throw new Error(error.message);
	}
};

export default fetch_server;
