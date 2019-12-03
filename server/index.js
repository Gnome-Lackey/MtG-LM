const http = require('http');
const mockserver = require('mockserver');

mockserver.headers = ['Authorization', 'X-Access-Token', 'X-Id-Token'];

http.createServer(mockserver('./mocks')).listen(9001);
