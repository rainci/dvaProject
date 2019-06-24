module.exports = {
    ['/login'](req, res) {
        res.json({ data: { username: 'admin', password: '11111111' }, code: 200 });
    },
}