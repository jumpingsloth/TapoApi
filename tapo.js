import * as tapo from "tp-link-tapo-connect";
import fs from "fs";

// function get_credentials() {
// 	let data = fs.readFileSync("./credentials.json");
// 	let json_data = JSON.parse(data);
// 	let email = json_data.email;
// 	let password = json_data.password;

// 	return [email, password];
// }

export async function callTapoDevice(on_off, email, password, devicename) {
	// const [email, password] = get_credentials();

	const cloudToken = await tapo.cloudLogin(email, password);
	const devices = await tapo.listDevices(cloudToken);
	let studio_device = devices.find((device) => {
		return device.alias === devicename;
	});

	const deviceToken = await tapo.loginDevice(email, password, studio_device);
	const getDeviceInfoResponse = await tapo.getDeviceInfo(deviceToken);
	console.log(getDeviceInfoResponse);

	if (on_off === true) {
		await tapo.turnOn(deviceToken);
	} else if (on_off === false) {
		await tapo.turnOff(deviceToken);
	}

	return tapo.getDeviceInfo(deviceToken);
}

// await callTapoDevice(true);
