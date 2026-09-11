const fs = require('fs'); // pull in the file system module
const { request } = require('http');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getCats = (request,response) => {
  const cat = {name: "Captain Peanut-Butter", age: 7};

  if (request.acceptedTypes[0] === 'application/xml') {
    let responseXML = '<response>';
    responseXML += `<name>${cat.name}</name>`;
    responseXML += `<age>${cat.age}</age>`;
    responseXML += '</response>';
    return respond(request, response, responseXML, 'application/xml');
  }

  respond(request, response, JSON.stringify(cat), 'application/json');
};

module.exports = {
  getCats,
  getIndex,
};
