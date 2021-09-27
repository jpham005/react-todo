const crypto = require('crypto');
const http = require('http');
const { TodoApplication } = require('./todo');

const serverSecret = 'jpham005';
const salt = 'jphamSaltySalt';

class Server {
  constructor(server) {
    const options = {};
    
    // request: http.IncomingMessage
    // response: http.ServerResponse
    const listener = (req, res) => {
      const { url, username, password, headers } = req;

      if (url === '/login')
        this.handleRequest(req, res, this.handleLogin.bind(this));
      else if (url === '/list')
        this.handleRequest(req, res, this.handleCreateList.bind(this));
      else if (url === '/item')
        this.handleRequest(req, res, this.handleCreateItem.bind(this));
      else {
        res.write('Not found error');
        res.end();
      }
    };

    this.server = http.createServer(listener);
    this.app = TodoApplication.create();
  }

  handleRequest(request, response, cb) {
    response.writeHead(200, {
      'content-type': 'application/json',
      'accept': '*/*',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*, Authorization',
    });
    
    if (request.method === 'OPTIONS') {
      response.end();
    } else {
      let data = '';
      request.on('data', (chunk) => {
        data += chunk;
      });
      
      request.on('end', () => {
        const user = this.getUserFromRequest(request);
        cb(request, response, JSON.parse(data), user);
        response.end();
      });
    }
  }

  static hashId(id) {
    return crypto.createHmac('sha256', serverSecret)
      .update(`${id}:${salt}`)
      .digest('hex');
  }

  listen(port) {
    this.server.listen(port);
  }

  writeJson(response, obj) {
    response.write(JSON.stringify(obj));
  }

  static createToken(userId) {
    const hash = Server.hashId(userId);
    return `${userId}:${hash}`;
  }

  handleLogin(request, response, data) {
    const {username, password} = data;

    console.log('username:', username);
    console.log('password:', password);

    const user = this.app.findUser(username);
    if (user === undefined) return response.end();
    if (user.password !== password) return response.end();
    
    const token = Server.createToken(user.id);

    response.write(token);
    response.end();
  }
  
  getUserFromRequest(request) {
    const { authorization } = request.headers;

    if (!authorization) return null;

    if (false === authorization.startsWith('Bearer ')) return null;
    
    const token = authorization.substr('Bearer '.length);
    const [userId, hash] = token.split(':');

    if (!userId || !hash) return null;

    if (hash !== Server.hashId(userId)) return null;

    return this.app.users[userId];
  }

  handleCreateUser(request, response, data) {
    const { username, password, image } = data;
    
    if (typeof username !== 'string') {
      response.writeHead(400, {
        'content-type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*, Authorization',
      });
      return response.write('username is not present');
    }

    if (typeof password !== 'string') {
      response.writeHead(400, {
        'content-type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*, Authorization',
      });
      return response.write('password is not present');
    }
      
    if (typeof image !== 'string') {
      response.writeHead(400, {
        'content-type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*, Authorization',
      });
      return response.write('image is not present');
    }
      
    const newUser = this.app.createUser(username, password, image);

    this.writeJson(response, newUser);
  }
  
  handleCreateList(request, response, data, user) {
    const { name } = data;

    if (typeof name !== 'string') {
      response.writeHead(400, {
        'content-type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*, Authorization',
      });
      return response.write('name is not present');
    }

    if (user === null) {
      response.writeHead(400, {
        'content-type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*, Authorization',
      });
      return response.write('Error: user is null');
    }

    if (this.app.getListsByName(name).length !== 0){
      response.writeHead(400, {
        'content-type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*, Authorization',
      });
      return response.write('name is already occupied')
    }

    const newList = this.app.createList(name, user);

    return this.writeJson(response, newList);
  }

  handleCreateItem(request, response, data, user) {
    const { listId, description, image } = data;
    
    if (!listId) {
      response.writeHead(400, {
        'content-type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*, Authorization',
      });
      return response.write('listId is not present');
    }
  
    if (typeof description !== "string") {
      response.writeHead(400, {
        'content-type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*, Authorization',
      });
      return response.write('description is not present');
    }
      
    if (typeof image !== "string") {
      response.writeHead(400, {
        'content-type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*, Authorization',
      });
      return response.write('image is not present');
    }

    const list = this.app.lists[listId]

    if (list === undefined) {
      response.writeHead(400, {
        'content-type': 'application/json',
        'accept': '*/*',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*, Authorization',
      });
      return response.write('list does not exist');
    }

    const newItem = this.app.createItem(list, description, image);
    return this.writeJson(response, newItem);
  }
}

module.exports = Server;