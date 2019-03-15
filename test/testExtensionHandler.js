const extensionHandler = require('../lib/extensionHandler');

describe('Test valid extensions', () => {
    it('Should return True for "testfile.txt"', (done) => {
        extensionHandler.check('testfile.txt', (extensionReturn) => {
            if (extensionReturn)
                done();
        });
    });

    it('Should return True for "/teststatic/testfile.txt"', (done) => {
        extensionHandler.check('/teststatic/testfile.txt', (extensionReturn) => {
            if (extensionReturn)
                done();
        });
    });
});

describe('Test invalid extensions', () => {
    it('Should return False for "testdata"', (done) => {
        extensionHandler.check('testfile', (extensionReturn) => {
            if (!extensionReturn)
                done();
        });
    });
});