const axios = require('axios')

var vars = {
    owner: {
        email: process.env.OWNER_EMAIL,
        username: "dappjumper",
        password: "admin"
    },
    user: {
        email: "someuser@somedomain.com",
        username: "johnny",
        password: "jindawg"
    }
}

const throwErr = (e)=>{
    try {
        return "("+e.response.data.status+"): "+e.response.data.error
    } catch(eee) {
        return e
    }
}

var catalogs = {}
var savedItems = []
var newName = "Mister Admin"

var tests = [
    function(){ // Register or login owner account
      axios.put('/user', vars.owner)
        .then((result)=>{
            if(result.data.user.password) throw "Password was incorrectly included"
            if(result.data.user.email !== vars.owner.email || result.data.user.username !== vars.owner.username) throw "User is different than ordered"
            if(!result.data.token) throw "No JWT Token received"
            vars.owner = result.data.user
            vars.owner.token = result.data.token
           
            this.next()
        })
        .catch((e)=>{
            throw throwErr(e)
        })
    },
    function(){ // Create unprivileged user
        axios.put('/user', vars.user)
          .then((result)=>{
              if(result.data.user.password) throw "Password was incorrectly included"
              if(result.data.user.email !== vars.user.email || result.data.user.username !== vars.user.username) throw "User is different than ordered"
              if(!result.data.token) throw "No JWT Token received"
              vars.user = result.data.user
              vars.user.token = result.data.token
              this.next()
          })
          .catch((e)=>{
              throw throwErr(e)
          })
    },
    function(){ // Get owner data
        axios.get('/user/'+vars.owner._id, {headers:{'Authorization': 'Bearer '+vars.owner.token}})
            .then((result)=>{
                if(vars.owner._id !== result.data.user._id) throw "Owner user is incorrect somehow"
                this.next() 
            })
            .catch((e)=>{
                throw throwErr(e)
            })
    },
    function() { // Try getting owner's data from user token
        axios.get('/user/'+vars.owner._id, {headers:{'Authorization': 'Bearer '+vars.user.token}})
            .then((result)=>{
                throw "Normal user stole owner data..."
            })
            .catch((e)=>{
                if(e.response.status == 403) return this.next()
                throw "Did not get told off by server"
            })
    },
    function(){ // Change owner name
        axios.post('/user',{name:newName}, {headers:{'Authorization': 'Bearer '+vars.owner.token}})
            .then((result)=>{
                if(result.status !== 200) throw "Failed to update name"
                this.next()
            })
            .catch((e)=>{
                throw throwErr(e)
            })
    },
    function(){ // Change user name
        axios.post('/user',{name:"I am not John Doe"}, {headers:{'Authorization': 'Bearer '+vars.user.token}})
            .then((result)=>{
                if(result.status !== 200) throw "Failed to update name for user"
                this.next()
            })
            .catch((e)=>{
                throw throwErr(e)
            })
    },
    function(){ // Verify user name change
        axios.get('/user/'+vars.user._id, {headers:{'Authorization': 'Bearer '+vars.user.token}})
            .then((result)=>{
                if(result.data.user.name !== "I am not John Doe") throw "User changed name not working"
                this.next()
            })
            .catch((e)=>{
                throw throwErr(e)
            })
    },
    function(){ // Verify owner name change
        axios.get('/user/'+vars.owner._id, {headers:{'Authorization': 'Bearer '+vars.owner.token}})
            .then((result)=>{
                if(newName !== result.data.user.name) throw "New name did not change"
                this.next() 
            })
            .catch((e)=>{
                throw throwErr(e)
            })
    },
    function(){
        axios.put('/item',{
            name: "Contraband",
            price: 100*Math.random(),
            catalogs: []
        }, {headers:{'Authorization': 'Bearer '+vars.user.token}}).then((result)=>{
            throw "Not supposed to be able to make categories"
        }).catch((e)=>{
            this.next()
        })
    },
    function(){ // Create two catalogs and a bunch of items, dirty waiting around
        axios.put('/catalog', {name: 'Netto Uge 1'}, {headers:{'Authorization': 'Bearer '+vars.owner.token}})
            .then((result)=>{
                if(result.status !== 201) throw "Did not receive confirmation"
                catalogs.netto = result.data.catalog
                axios.put('/catalog', {name: 'Bilka Uge 1'}, {headers:{'Authorization': 'Bearer '+vars.owner.token}})
                    .then((result)=>{
                        if(result.status !== 201) throw "Did not receive confirmation"
                        catalogs.bilka = result.data.catalog

                        for(let i = 0; i < 100; i++) {
                            axios.put('/item',{
                                name: "Item #"+i,
                                price: 100*Math.random(),
                                catalogs: [(Math.random() > 0.5 ? catalogs.bilka._id : catalogs.netto._id)]
                            }, {headers:{'Authorization': 'Bearer '+vars.owner.token}}).then((result)=>{savedItems.push(result.data.item)}).catch((e)=>{})
                        }
                        setTimeout(()=>{
                            this.next()
                        },2000)

                    }).catch((e)=>{throw "Failed creating catalog"})
            }).catch((e)=>{throw "Failed creating catalog"})
    },
    function() { // Grab Netto catalog and look at it's items
        axios.get('/catalog/'+catalogs.bilka._id, {headers:{'Authorization': 'Bearer '+vars.owner.token}})
            .then((result)=>{
                if(result.data.catalog.items.length==0) throw "Improbably empty catalogue, but can happen very rarely"
                this.next()
            })
            .catch((e)=>{
                throw "Couldn't grab catalog"
            })
    },
    function(){ // Delete everything
            axios.delete('/catalog/'+catalogs.netto._id, {headers:{'Authorization': 'Bearer '+vars.owner.token}}).then(()=>{
                axios.delete('/catalog/'+catalogs.bilka._id, {headers:{'Authorization': 'Bearer '+vars.owner.token}}).then(()=>{
                }).catch((e)=>{throw throwErr(e)})
            }).catch((e)=>{throw throwErr(e)})
            for(let item in savedItems) {
                axios.delete('/item/'+savedItems[item]._id, {headers:{'Authorization': 'Bearer '+vars.owner.token}}).then(()=>{}).catch((e)=>{throw throwErr(e)})
            }
            setTimeout(()=>{
                axios.delete('/user', {headers:{'Authorization': 'Bearer '+vars.owner.token}}).then(()=>{
                this.next()
                }).catch((e)=>{throw throwErr(e)})
            },2000)
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