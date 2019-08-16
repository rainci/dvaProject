/**
 * 
 * @param {Array} resourceData 数据源 
 * @param {Array} columnsUser 表头 
 * @param {Array} selectedRowKeys 选中的key
 * @param {String} rowKeyName 决定每条key值用哪个字段
 * @param {null} isRowSelection 是否展示select框，默认不展示，传turn表示展示
 * @param {Function} onCheckFn 回调  
 * @return {component} TableList 
 * @author rainci(刘雨熙)
 */

/* eslint-disable  */
import React from "react";
import { Table} from 'antd'; 
import './css/index.less';
class TableList extends React.Component{
    onPaginationChange = (current) => { //page更改时
        const { pageChangeFn } = this.props;
        pageChangeFn && pageChangeFn(current);
    }
    onSelectChange = (selectedRowKeys,selectedRows) => { //select更改时
        this.props.onCheckFn && this.props.onCheckFn(selectedRowKeys,selectedRows)
    }
    render(){
        // console.log(this.props)
        const { resourceData = [], columnsUser, selectedRowKeys = [], scrollY = 600, emptyText='暂无信息',isRowSelection, total, current, pageSizes, rowKeyName } = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const finalRowSelection = isRowSelection === true ? rowSelection : null;//当父组件传递过来isRowSelection=true时，代表table的row有selection
        return (
            resourceData ?
                <Table 
                    columns={columnsUser}
                    dataSource={resourceData} 
                    rowKey={(record) => `${record[rowKeyName] || record.taskId || record.tagId || record.id }`}
                    rowSelection={finalRowSelection}
                    size={"small"}
                    // pagination = {false}
                    scroll={{ y: scrollY }}
                    locale={{emptyText}}
                    pagination={{  //分页
                        total, //数据总数量
                        defaultPageSize: pageSizes || 10, //默认显示几条一页
                        current,
                        onShowSizeChange(current, pageSize) {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                            console.log(current, pageSize)
                        },
                        onChange:this.onPaginationChange,                                 
                        showTotal: function () {  //设置显示一共几条数据
                            return '共 ' + this.total + ' 条数据'; 
                        }
                    }}
                /> 
                : null 
        )
    }
}

export default TableList;