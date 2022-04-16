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
				console.log("Received request : " + json_data.email + "/" + json_data.devicename + "=" + json_data.state)
				const tapo_state = await callTapoDevice(
					json_data.state,
					json_data.email,
					json_data.password,
					json_data.devicename
				);
				let response = JSON.stringify(tapo_state);
				console.log("Tapo response: " + response)
				res.setHeader("Content-Type", "application/json");
				res.write(reponse);
				res.end();
			} catch (error) {
				console.log(error.toString());
			}
		});
	}
});

console.log("Running server on port 3000")
server.listen(3000);
