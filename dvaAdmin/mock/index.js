const { defaultResult, Mock } = require('./_common')

function getTenantList(count = 10) {
  return Mock.mock({
    ...defaultResult,
    [`data|${count}`]: [
      {
        'tenantId|+1': 1,
        'name': '@name',
        'userCount|+1': 0,
        'updateTime': '2019-07-31 11:28:11'
      }
    ]
  });
}

module.exports = {
  ['/tenantList'](req, res) {
    const query = req.query;
    let count = 10;
    if (query && query.count) {
      count = query.count;
    }
    setTimeout(() => {
      res.json(getTenantList(count))
    }, 400);
  },
}