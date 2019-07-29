module.exports = {
    ['/login'](req, res) {
        // console.log(1111,req)
        res.json({ data: { username: 'xixi', password: '11111111' }, code: 200 });
    },
}