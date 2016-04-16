require('./../lib/spec-helper.js');

var test = require('supertest-as-promised');

var testAppFactory = require('../../express-app/express-app-factory')
var authFactory    = require('../../lib/auth/auth-factory.js');

var authByPassStub = require('../lib/stubs/auth-bypass.stub')

describe('GET /', function () {
    var sandbox        = sinon.sandbox.create();
    var restoreSandbox = sandbox.restore.bind(sandbox);
    var testApp;

    beforeEach(function () {
        sandbox.stub(authFactory, "create", authByPassStub.create);

        testApp = testAppFactory.create({cookieEncryptionKey: 'x'});
    });

    afterEach(restoreSandbox);

    it('responds with html that has react components rendered', function () {
        return test(testApp)
            .get('/')
            .expect(200)
            .expect(/data-reactroot/); //test that react has rendered
    })
});