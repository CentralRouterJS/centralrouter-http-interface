const extensionPattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi;

module.exports = {
    /**
     * Check if request is contains any file extensions.
     * @param {String} req
     * 
     * @returns {Boolean} patternMatch
     */
    check: (req) => {
        return (req.match(extensionPattern)[0]) != null ? true : false;
    }
}