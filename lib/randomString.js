module.exports = {
    generate: (maxLength, callback) => {
        let randomString = '';
        let alphabetArr = [ 
            'a','b','c','d',
            'e','f','g','h',
            'i','j','k','l',
            'm','n','o','p',
            'q','r','s','t',
            'u','v','w','x',
            'y','z'];

        for ( let i = 0; i <= maxLength; i++ ) {
            randomString += alphabetArr[Math.floor(Math.random() * alphabetArr.length)];
        }

        callback(randomString);
    }
}