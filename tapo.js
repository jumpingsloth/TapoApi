import { login } from "tplink-cloud-api";

export async function callTapoDevice(on_off, email, password, devicename) {
	const tplink = await login(email, password);
	let devices = await tplink.getDeviceList();
	console.log(devices);
	devices.forEach(d => {
		d.aliasDecoded = atob(d.alias)
	});
	console.log(devices)

	let device = devices.find((device) => {
		return device.aliasDecoded === devicename;
	});
	console.log(device)
	// let plug = tplink.getHS100(device.deviceId);

	// if (on_off === true) {
	// 	await plug.powerOn();
	// } else if (on_off === false) {
	// 	await plug.powerOff();
	// }

	return device;
}
