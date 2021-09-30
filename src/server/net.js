const crypto = require('crypto');
const http = require('http');
const { TodoApplication } = require('./todo');
const fs = require('./fs');

const serverSecret = 'jpham005';
const salt = 'jphamSaltySalt';

const cors = {
  'content-type': 'application/json',
  'accept': '*/*',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': '*, Authorization',
};

class Server {
  constructor(server) {
    const options = {};
    
    // request: http.IncomingMessage
    // response: http.ServerResponse
    const listener = (req, res) => {
      const { url, username, password, headers } = req;

      switch (url) {
        case '/user/login':
          this.handleRequest(req, res, this.handleLogin.bind(this));
          break;
        case '/user/gettodolist':
          this.handleRequest(req, res, this.handleGetTodoListByUser.bind(this));
          break;
        case '/user/create':
          this.handleRequest(req, res, this.handleCreateUser.bind(this));
          break;
        case '/user/remove':
          this.handleRequest(req, res, this.handleRemoveUser.bind(this));
          break;
        case '/list/create':
          this.handleRequest(req, res, this.handleCreateList.bind(this));
          break;
        case '/list/remove':
          this.handleRequest(req, res, this.handleRemoveList.bind(this));
          break;
        case '/item/create':
          this.handleRequest(req, res, this.handleCreateItem.bind(this));
          break;
        case '/item/toggle':
          this.handleRequest(req, res, this.handleToggleItem.bind(this));
          break;
        case '/item/remove':
          this.handleRequest(req, res, this.handleRemoveItem.bind(this));
          break;
        default:
          res.write('Not found error');
          res.end();
      }
    };

    this.server = http.createServer(listener);

    if (TodoApplication.check() === true) {
      TodoApplication.load()
      .then((app) => {
        this.app = app;
      });
    } else {
      this.app = TodoApplication.create();
    }
  }

  handleRequest(request, response, cb) {
    response.writeHead(200, cors);
    
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

    const user = this.app.findUser(username);

    if (user === undefined) {
      response.writeHead(400, cors);
      return response.write('user is not exist');
    }
    
    if (user.password !== password) {
      response.writeHead(400, cors);
      return response.write('password is wrong');
    }
    
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

    return this.app.users[userId] || null;
  }

  handleGetTodoListByUser(request, response, data, user) {
    const newTodoList = this.app.getTodoListByOwnerId(user.id);
    this.writeJson(response, newTodoList);
  }

  handleCreateUser(request, response, data) {
    const { username, password, image } = data;
    
    if (typeof username !== 'string') {
      response.writeHead(400, cors);
      return response.write('username is not present');
    }

    if (typeof password !== 'string') {
      response.writeHead(400, cors);
      return response.write('password is not present');
    }
      
    if (typeof image !== 'string') {
      response.writeHead(400, cors);
      return response.write('image is not present');
    }

    if (username === this.app.findUser(username)) {
      response.writeHead(400, cors);
      return response.write('username is already occupied');
    }

    if (username.length < 1 || username.length > 20) {
      response.writeHead(400, cors);
      return response.write('username must be between 1 ~ 20');
    }

    if (password.length < 4) {
      response.writeHead(400, cors);
      return response.write('password is too short');
    }
      
    const newUser = this.app.createUser(username, password, image);

    this.writeJson(response, newUser);
    this.app.save();
  }

  handleRemoveUser(requset, response, data, user) {
    this.app.removeUser(user.id);
    response.write('done');
    this.app.save();
  }
  
  handleCreateList(request, response, data, user) {
    const { name } = data;
    
    if (typeof name !== 'string') {
      response.writeHead(400, cors);
      return response.write('name is not present');
    }

    if (user === null) {
      response.writeHead(400, cors);
      return response.write('Error: user is null');
    }

    const userList = this.app.getListsByOwnerId(user.id);

    if (userList.filter(list => list.name === name).length !== 0) {
      response.writeHead(400, cors);
      return response.write('name is already occupied');
    }

    const newList = this.app.createList(name, user);

    this.writeJson(response, newList);
    this.app.save();
  }

  handleRemoveList(request, response, data, user) {
    const { listId } = data;
    this.app.removeList(listId);
    const newTodoList = this.app.getTodoListByOwnerId(user.id);

    this.writeJson(response, newTodoList);
    this.app.save();
  }

  handleCreateItem(request, response, data, user) {
    const { listId, text, image ,done } = data;
    
    if (!listId) {
      response.writeHead(400, cors);
      return response.write('listId is not present');
    }
  
    if (typeof text !== "string") {
      response.writeHead(400, cors);
      return response.write('text is not present');
    }
      
    if (typeof image !== "string") {
      response.writeHead(400, cors);
      return response.write('image is not present');
    }

    const list = this.app.lists[listId]

    if (list === undefined) {
      response.writeHead(400, cors);
      return response.write('list does not exist');
    }

    const newItem = this.app.createItem(list, text, image, done);

    this.writeJson(response, newItem);
    this.app.save();
  }

  handleToggleItem(request, response, data, user)  {
    const { itemId } = data;
    this.app.items[itemId].done = !(this.app.items[itemId].done)
    const newItem = this.app.items[itemId];

    this.writeJson(response, newItem);
    this.app.save();
  }

  handleRemoveItem(request, response, data, user) {
    const { itemId } = data;
    this.app.removeItem(itemId);
    const newTodoList = this.app.getTodoListByOwnerId(user.id);
    
    this.writeJson(response, newTodoList);
    this.app.save();
  }
}

module.exports = Server;