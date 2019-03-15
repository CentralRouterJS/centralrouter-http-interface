const queryHandler = require('../lib/queryHandler');

describe('Pass GET route query: ', () => {
    it('Should get the Object: ', (done) => {
        queryHandler.passGetRequest('localhost', '8080', '/testroute', (response) => {
            if (response)
                done();
        });
    });
});