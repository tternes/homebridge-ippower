# homebridge-ippower

[Homebridge](https://github.com/nfarina/homebridge) platform plugin for the IP Power 9258 4 Outlet Controller.

## Installation

1. Install homebridge: `npm install -g homebridge`
2. Install this plugin: `npm install -g homebridge-ippower`
3. Add accessories to your `config.json` for each port that should be made available to homebridge.

## Configuration

Sample:

```
	"accessories": [
		{
			"accessory": "IPPower",
			"name" : "Workbench Light",
			"ipaddress": "10.0.1.120",
			"username": "admin",
			"password": "12345678",
			"outlet": 1
		},
		{
			"accessory": "IPPower",
			"name" : "Workbench Radio",
			"ipaddress": "10.0.1.120",
			"username": "admin",
			"password": "12345678",
			"outlet": 2
		}
	]
```


### Fields

* **accessory**: must be `IPPower`
* **name**: name of the accessory
* **ipaddress**: IP of the IP Power device on your network
* **username**: username for accessing web UI
* **password**: password used for accessing web UI
* **outlet**: Number (1-4) corresponding to the outlet on the back of the device

# Device Support

This plugin has only been tested against a _very_ old version of the IP Power firmware (circa 2007). It's likely newer firmware versions are incompatible. PRs would be very welcome to improve support for modern versions.
