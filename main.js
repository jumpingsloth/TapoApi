import { callTapoDevice } from "./tapo.js";

import http from "http";

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
			try {
				const parsedBody = Buffer.concat(body).toString();

				const json_data = JSON.parse(parsedBody);
				const tapo_state = await callTapoDevice(
					json_data.state,
					json_data.email,
					json_data.password,
					json_data.devicename
				);

				delete parsedBody.password;
				console.log(parsedBody);

				res.setHeader("Content-Type", "application/json");
				res.write(JSON.stringify(tapo_state));
				res.end();
			} catch (error) {
				console.log(error.message());
			}
		});
	}
});

server.listen(3000);
