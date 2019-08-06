const fs = require('fs');
const path = require('path');

let mock = {
    // ['/login'](req, res) {
    //     res.json({data:{ userName: 'admin', password: '111111', token: '123abc' }, code: 200 });
    // },
};

fs.readdirSync(path.join(__dirname, './mock')).forEach(file => {
    console.log(123,file[0])
  if (file[0] !== '_') {
    Object.assign(mock, require('./mock/' + file));
  }
})

module.exports = mock;
