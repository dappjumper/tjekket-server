const axios = require('axios')

var vars = {}

var tests = [
    function(){
      vars.email = "tobias@dappjump.io"
      vars.password = "1234"
      vars.username = "dappjumper"

      console.log("Putting user "+vars.username)

      axios.put('/user/', {
        email: vars.email,
        password: vars.password,
        username: vars.username
      })
        .then((result)=>{
            console.log(result.data)
        })
        .catch((e)=>{
            console.log(e)
        })
    },
    function(){
        console.log("How are you?")
        throw "Hehe"
    }
]

var endpoint = ""

const runtests = function() {
    let step = tests.shift().bind({
        next: (tests.length > 0 ? runtests : function(){
            console.log("Tests completed successfully!")
        }),
        failed: function(msg) {
            throw "E2E Tests failed: "+msg
        }
    })
    try {
        step()
    } catch(error) {
        console.log("Tests failed", error)
    }
}

const test = {
    start: function(server) {
        let host = server.address()
        endpoint = 'http://' + (host.address === '::' ? 'localhost' : host.address) + ':' + host.port
        console.log('Tests starting...')
        runtests()
    }
}

module.exports = test