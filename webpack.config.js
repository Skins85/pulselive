const path = require('path');

module.exports = {
    entry: './public/src/',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public/dist/js'),
    }
};