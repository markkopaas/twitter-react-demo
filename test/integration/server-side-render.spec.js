require('./../lib/spec-helper.js');

var test = require('supertest-as-promised');

var expressAppFactory     = require('../../express-app/express-app-factory');
var authFactory           = require('../../lib/auth/auth-factory.js');
var twitterAdapterFactory = require('../../lib/twitter-adapter-factory');

var authFakeStub       = require('../lib/stubs/auth-fake.stub');
var twitterAdapterStub = require('../lib/stubs/twitter-adapter-fake.stub');

var config = require('../../config');

describe('GET /', function () {
    var sandbox        = sinon.sandbox.create();
    var restoreSandbox = sandbox.restore.bind(sandbox);
    var testApp;

    beforeEach(function () {
        sandbox.stub(authFactory, "create", authFakeStub.create);
        sandbox.stub(twitterAdapterFactory, "create", twitterAdapterStub.create);

        testApp = expressAppFactory.create(config);
    });

    afterEach(restoreSandbox);

    it('responds with html that has react components rendered', function () {
        return test(testApp)
            .get('/')
            .expect(200)
            .expect(/Test Tweet Text/);
    })
});