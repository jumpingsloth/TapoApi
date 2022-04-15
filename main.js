import { callTapoDevice } from "./tapo.js";

import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
	if (
		req.url === "/" &&
		req.method === "POST" &&
		req.headers["content-type"] === "application/json"
	) {
		const body = [];
		req.on("data", (chunk) => {
			body.push(chunk);
		});

		req.on("end", async () => {
			const parsedBody = Buffer.concat(body).toString();
			console.log(parsedBody);
			const json_data = JSON.parse(parsedBody);
			const tapo_state = await callTapoDevice(
				json_data.state,
				json_data.email,
				json_data.password,
				json_data.devicename
			);

			res.setHeader("Content-Type", "application/json");
			res.write(JSON.stringify(tapo_state));
			res.end();
		});
	}
});

server.listen(3000);
