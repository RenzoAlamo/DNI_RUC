import { NextApiHandler } from "next";

const handler: NextApiHandler<Record<string, any>> = async (req, res) => {
	if (req.method !== "POST") {
		res.status(405).send({ message: "Only POST requests allowed" });
		return;
	}
	const json = JSON.parse(req.body);
	fetch(`https://api.apis.net.pe/v1/${json.tipo}?numero=${json.numero}`)
		.then(response => response.json())
		.catch(response => res.status(200).json(response))
		.then(response => res.status(200).json(response));
};

export default handler;
