const express = require("express")
const app = express();
const http = require("http")
const path = require("path")
const dotenv = require("dotenv").config()
const os = require("os")
const coockieParser = require("cookie-parser")
const { connectDatabase } = require("./db")
const { apiRouter } = require("./routes/api")
const { requireAuth } = require("./middleware/requireAuth")
const server = http.createServer(app)
const port = process.env.PORT
const colorReset = "\x1b[0m"


app.use(express.static(path.join(__dirname + '/public'), { extensions: ["html"] }
))


getPublicIp().then((publicIP) => {
    connectDatabase().then(() => {
        server.listen(port, () => { console.log(`Server reachable on local machine: localhost:${port} or local network: ${getPrivateIp()}:${port} or elsewhere ${publicIP}:${port}`) })
        http.get({
            hostname: 'ipconfig.io',
            path: `/port/${port}`
        }, (res) => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            })
            res.on('end', () => {
                data = JSON.parse(data)
                if (data.reachable) {
                    console.log(`\x1b[32mPort ${port} checked and found reachable from the outside!${colorReset}`)
                } else {
                    console.error(`\x1b[31mPort ${port} not reachable from the outside, please check port-forwarding, and firewall rules${colorReset}`)
                }
            })
        })
    })
})

app.use(express.json());
app.use(coockieParser());
app.use("/api", apiRouter);

app.use("/protected",
    requireAuth,
    express.static(path.join(__dirname + '/protected'), { extensions: ["html"] })
)

app.get("/admin", requireAuth, (req, res) => {
    res.sendFile(
        path.join(__dirname, "protected", "index.html")
    )
})


//helper functions:
function getPrivateIp() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            // Skip over internal (i.e. 127.0.0.1) and non-IPv4 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'No private IP found';
}
async function getPublicIp() {
    return new Promise((resolve, reject) => {
        http.get({
            hostname: 'ipconfig.io',
            path: '/json',
            family: 4
        }, (res) => {
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    const ip = json.ip.trim();
                    resolve(ip);
                } catch (err) {
                    reject(err);
                }
            });
        }).on('error', err => {
            reject(err);
        });
    });
}



module.exports = {
    app
}

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});