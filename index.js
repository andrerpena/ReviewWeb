require('babel/register')({});

// The node-jsx package can will enable us to load JSX components 
// directly in Node with require('some-component.jsx')
require('node-jsx').install({ extension: '.jsx', harmony: true});

module.exports = require('./server/index.js');