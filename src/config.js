const config = module.exports = {}

// thrid api info
config.apiBase = 'https://api.the{prefer}api.com/v1/'
config.apiKeys = { // change to your keys
  cat: 'xxx-xxx-xxx',
  dog: 'xxx-xxx-xxx'
}

// local server
if (process.env.NODE_ENV === 'production') {
  config.serverBase = 'http://pets-server.xx.xx/' // replace with your pets-server address
} else {
  config.serverBase = 'http://localhost:7001/'
}
