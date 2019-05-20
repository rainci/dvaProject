import React from 'react';
import { Table, Pagination } from 'antd';

function Users({dataSource, loading=false, total, page: current, columns }) {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
      />
      {/* <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        // pageSize={PAGE_SIZE}
        // onChange={pageChangeHandler}
      /> */}
    </div>
  )
}
export default Users

