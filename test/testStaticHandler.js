const staticHandler = require('../lib/staticHandler');

describe('Pass GET static query: ', () => {
    it('Should get the file: ', (done) => {
        staticHandler.passGetRequest('localhost', '8080', '/teststatic/testfile.txt', (response) => {
            if (response)
                done();
        });
    });
});