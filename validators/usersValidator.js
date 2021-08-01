module.exports = {
    validateNames: (v) => {
        if(v) {
            return /^[A-Za-z]+$/.test(v)
        } else {
            return true
        }
    }
}