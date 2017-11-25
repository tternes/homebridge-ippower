var http = require('http')

function IPPowerConnection() {  
  this.user = 'admin'
  this.password = '12345678'
  this.host = '10.0.1.120'
  this.outlet = 1
	
	this.get = function(pin, callback) {
    pin = pin - 1
    var request = http.request({
      hostname: this.host,
      auth: `${this.user}:${this.password}`,
      path:'/Set.cmd?CMD=GetPower'
    }, (response) => {
      var body = ''
      response.setEncoding('utf8')
      response.on('data', function (chunk) {
        body += chunk
      })
      
      response.on('error', (err) => {
        console.log(`error: ${error}`)
        callback(err)        
      })
      
      response.on('end', () => {
        if(response.statusCode == 200) {
          var pinState = parsePinState(body, pin)
          callback(null, pinState)
        }
        else {
          callback(new Error('invalid response'))
        }
      })
    })
    
    request.on('error', (err) => {
      console.log(`error: ${err}`)
      callback(err)
    })
    
    request.end()
	}
  
  this.set = function(pin, state, callback) {
    pin = pin - 1
    state = (state == false || state == 0) ? 0 : 1
    var request = http.request({
      hostname: this.host,
      auth: `${this.user}:${this.password}`,
      path: `/Set.cmd?CMD=SetPower+P6${pin}=${state}`
    }, (response) => {
      
      var body = ''
      response.setEncoding('utf8')
      response.on('data', function (chunk) {
        body += chunk
      })
      
      response.on('end', () => {
        if(response.statusCode == 200) {
          callback(null, state)
        }
        else {
          callback(new Error('invalid response'))
        }
      })
    })
    
    request.on('error', (err) => {
      console.log(`error: ${err}`)
      callback(err)
    })
    
    request.end()
  }
}

function parsePinState(body, pin) {
  // <html>P60=1,P61=0,P62=0,P63=0,P64=0,P65=0,P66=0,P67=0</html>
  // brute-force parse
  var pins = body
    .trim()
    .replace("<html>","")
    .replace("</html>","")
    .split(",")
    .map((data) => {
      return data.split("=")[1]
  })

  return (pins[pin] == "1") ? true : false
}

module.exports = IPPowerConnection