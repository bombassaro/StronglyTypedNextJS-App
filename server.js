const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const http = require('http');
const next = require('next');

const routes = require('./service/routes');
const rewrite = require('./service/rewrite');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

const bff_port = process.env["MIDDLEWARE_PORT"]

app.prepare().then(() => {
	server.use(cors())
  server.use(bodyParser.json())
	server.use(bodyParser.urlencoded({extended: true}))
  // routes
  server.use('/api', routes)
	server.get('/_next/*', handle)
	server.get('/preview/*', handle)
	server.get('*', (req, res) => rewrite(req, res, handle))

	http.createServer(server).listen(bff_port, () => 
		console.log(`- Ready ${dev} on http://localhost:${bff_port}`))
})