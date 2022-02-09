const express = require('express')
const livereload = require('livereload')
const livereloadMiddleware = require('connect-livereload')
const fs = require('fs')
const fsPromise = fs.promises;
const cors = require('cors')

// 여기에 home 폴더의 경로를 설정해 주세요.
const dir = 'C:/xampp/htdocs/home'


const whitelist = ["http://localhost:3001"]
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed Origin!"));
      }
    },
};
const liveServer = livereload.createServer({
    exts: ['html', 'css', 'js'],
    debug: true
})
liveServer.watch(__dirname);
const app = express()
const port = 3001
app.use(livereloadMiddleware())
// app.use(cors(corsOptions))
app.use(cors());
app.get('/', async (req, res) => {
    let names;
    names = await fsPromise.readdir(dir);
    console.log(names);
    res.send(JSON.stringify(names));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})