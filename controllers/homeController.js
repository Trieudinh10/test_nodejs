const getHomepage = (req, res) => {
res.send('dinh le quang trieu')
}

const getAbc = (req, res) => {
    res.send('getAbc thanh cong')
    }
    

module.exports = {
    getHomepage,
    getAbc
}