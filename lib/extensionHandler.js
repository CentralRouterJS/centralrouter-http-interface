const extensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;

module.exports = {
    /**
     * Check if request is contains any file extensions.
     * @param {String} req
     * 
     * @returns {Boolean} patternMatch
     */
    check: (req, callback) => {
        callback(extensionPattern.test(req) ? true : false);
    },

    /**
     * Return file extension for the given string.
     * @param {String} stringData
     * 
     * @returns {String} fileExtension
     */
    getExtension: (stringData) => {
        return (stringData.match(extensionPattern)[0]);
    }
}