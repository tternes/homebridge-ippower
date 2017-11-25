var http = require('http')
var IPPowerConnection = require('./ippower9258')
var Service, Characteristic

module.exports = function(homebridge) {
    Service = homebridge.hap.Service
    Characteristic = homebridge.hap.Characteristic
    homebridge.registerAccessory("homebridge-ippower", "IPPower", IPPowerAccessory)
}

function IPPowerAccessory(log, config) {
  this.log = log
  this.config = config
  this.name = config.name

	this.connection = new IPPowerConnection()
  this.connection.host = config.ipaddress
  this.connection.user = config.username
  this.connection.password = config.password
  this.connection.outlet = config.outlet
  
  this.infoService = new Service.AccessoryInformation()
  this.infoService
    .setCharacteristic(Characteristic.Manufacturer, "IPPower")
    .setCharacteristic(Characteristic.Model, "IP9258")

  this.outletService = new Service.Outlet(this.name)
  this.outletService.getCharacteristic(Characteristic.On)
    .on('get', this.getOn.bind(this))
    .on('set', this.setOn.bind(this))
  this.outletService.getCharacteristic(Characteristic.OutletInUse)
    .on('get', this.getInUse.bind(this))
}


IPPowerAccessory.prototype.getOn = function(callback) {
  this.connection.get(this.config.outlet, (err, state) => {
    callback(err, state)
  })
}

IPPowerAccessory.prototype.setOn = function(on, callback) {
  this.connection.set(this.config.outlet, on, (err, state) => {
    callback(err, state)
  })
}

IPPowerAccessory.prototype.getInUse = function(callback) {
  callback(null, true)
}

IPPowerAccessory.prototype.getServices = function() {
  return [
    this.outletService,
    this.infoService
  ]
}
