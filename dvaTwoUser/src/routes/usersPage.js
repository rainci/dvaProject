import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import Users from '../components/users'


function UsersPage ({dispatch,...userProps}){
  // console.log('sor',dataSource)
  const deleteHandler = id => {
    dispatch({
      type: 'users/remove',
      payload: id,
    })
  };
  const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="">{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
  },
  {
    title: 'Operation',
    key: 'operation',
    render: (text, record) => (
      <span>
        {/* <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
          <a>Edit</a>
        </UserModal> */}
        <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
          <a href="">Delete</a>
        </Popconfirm>
      </span>
    ),
  },
];
  return (
    <Users
      columns={columns}
      {...userProps}
    /> 
  )
}
const mapStateToProps = (state) => {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    dataSource:list,
    total,
    current:page,
  };
}
export default connect(mapStateToProps)(UsersPage);