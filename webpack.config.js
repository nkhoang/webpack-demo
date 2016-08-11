// BUILD_ENV is introduced in package.json
switch (process.env.BUILD_ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./config/webpack.prod');
        break;
    case 'test':
    case 'testing':
        module.exports = require('./config/webpack.test');
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require('./config/webpack.dev');
}
