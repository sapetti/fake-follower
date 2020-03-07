const express = require('express');
const { getIp } = require('./utils');

const app = express();

app.use(express.static('dist'));
app.get('/api/info', 
        (req, res) =>{
                console.log(`/api/info ${getIp()}`);
                return res.send({ 
                        ip: getIp() 
                });
        })

const port = process.env.PORT || 8081;
app.listen(port, 
          () => console.log(`Listening on port ${port}!`));
