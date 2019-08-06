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

function getLogin() {
  return Mock.mock({
    ...defaultResult,
    data:{ 
      'userName': 'admin',
      'password': '111111',
      'token': /[A-Z][a-z]{1,5}\d{3,}/,
      'funcTreeVo': {
        'func': {
          funcId: 104,
          name: '分拣系统后台',
          parentId: 1,
          type: 'sys',
          url: '',
        },
        'children': [
          {
            'func': {
              'funcId': 10401,
              name: '帐号中心',
              parentId: 104,
              type: 'title',
              url: '',
            },
            'children': [
              {
                'func': {
                  funcId: 1040101,
                  name: '租户管理',
                  parentId: 10401,
                  rootId: 104,
                  type: 'menu',
                  url: '/main/tenantList',
                },
                children: [
                  {
                    'func': {
                      funcId: 104010101,
                      name: "添加租户",
                      parentId: 1040101,
                      rootId: 104,
                      type: "page",
                      url: "/main/addUser",
                    },
                    children: [
                      {
                        'func': {
                          funcId: 10401010101,
                          name: "添加租户",
                          parentId: 104010101,
                          rootId: 104,
                          type: "interface",
                          url: "/service/account/tenant/add",
                        },
                        children: [],
                      },
                      {
                        'func': {
                          funcId: 10401010102,
                          name: "更新租户",
                          parentId: 104010101,
                          rootId: 104,
                          type: "interface",
                          url: "/service/account/tenant/update",
                        },
                        children: [],
                      },
                      {
                        'func': {
                          funcId: 10401010103,
                          name: "查询租户详情",
                          parentId: 104010101,
                          rootId: 104,
                          type: "interface",
                          url: "/service/account/tenant/detail/{tenantId}",
                        },
                        children: [],
                      },
                    ]
                  },
                  {
                    'func': {
                      funcId: 104010103,
                      name: "删除租户",
                      parentId: 1040101,
                      rootId: 104,
                      type: "interface",
                      url: "/service/account/tenant/delete/{tenantId}",
                    },
                    children:[]
                  },
                  {
                    'func': {
                      funcId: 104010102,
                      name: "查询租户列表",
                      parentId: 1040101,
                      rootId: 104,
                      type: "interface",
                      url: "/service/account/tenant/list",
                    },
                    children:[],
                  },
                ],
              },
              {
                'func': {
                  funcId: 1040102,
                  name: '用户管理',
                  parentId: 10401,
                  rootId: 104,
                  type: 'menu',
                  url: '/main/user',
                },
                children: [
                  {
                    'func': {
                      funcId: 104010201,
                      name: "用户列表",
                      parentId: 1040102,
                      rootId: 104,
                      type: "interface",
                      url: "/service/account/user/list",
                    },
                    children:[],
                  },
                  {
                    'func': {
                      funcId: 104010203,
                      name: "删除用户",
                      parentId: 1040102,
                      rootId: 104,
                      type: "interface",
                      url: "/service/account/user/delete/{id}",
                    },
                    children:[],
                  },
                  {
                    'func': {
                      funcId: 104010204,
                      name: "添加用户",
                      parentId: 1040102,
                      rootId: 104,
                      type: "page",
                      url: "/main/addUser",
                    },
                    children:[
                      {
                        'func': {
                          funcId: 10401020401,
                          name: "添加用户",
                          parentId: 104010204,
                          rootId: 104,
                          type: "interface",
                          url: "/service/account/user/add",
                        },
                        children:[],
                      },
                      {
                        'func': {
                          funcId: 10401020402,
                          name: "用户详情",
                          parentId: 104010204,
                          rootId: 104,
                          type: "interface",
                          url: "/service/account/user/detail/{id}",
                        },
                        children:[],
                      },
                      {
                        'func': {
                          funcId: 10401020403,
                          name: "编辑用户",
                          parentId: 104010204,
                          rootId: 104,
                          type: "interface",
                          url: "/service/account/user/update",
                        },
                        children:[],
                      },
                    ],
                  },
                ]
              }
            ]
          },
        ]
      },

    }
  })
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
  ['/login'](req, res) {
    setTimeout(() => {
      res.json(getLogin())
    }, 400);
  },
}