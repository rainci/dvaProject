import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';

const ProductList = ({ onDeleteFn, data }) => {
  const columns = [
    {
      'title': 'Name',
      'dataIndex': 'name'
    },
    {
      'title': 'Actions',
      render: (text, record) => {
        return(
          <Popconfirm title='delete?' onConfirm={()=> onDeleteFn(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        )
      }
    }
  ];
  return(
    <Table
      dataSource={data}
      columns={columns}
    />
  )
}
ProductList.propTypes = {
  onDeleteFn: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
};
export default ProductList;
