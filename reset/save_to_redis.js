
const redis = requier('redis')
client = redis.createClient()

client.on("error", function (err) {
    console.log("Error " + err)
})

module.exports = client

