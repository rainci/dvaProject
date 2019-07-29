module.exports = {
    ['/login'](req, res) {
        res.json({data:{ userName: 'admin', password: '111111', token: '123abc' }, code: 200 });
    },
}