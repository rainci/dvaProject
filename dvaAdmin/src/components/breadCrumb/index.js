import React from "react";
import {Link} from 'react-router-dom';
import { Breadcrumb } from 'antd';
const BreadCrumbs = ({cssStyle, goUrl, goName, rootName, name }={}) => {
    return (
        <div className="main-header" style={cssStyle}>
            <Link to={goUrl} style={{float:"right",color:"#1890ff"}}>{goName}</Link>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>{rootName || "组织管理"}</Breadcrumb.Item>
                <Breadcrumb.Item>{name}</Breadcrumb.Item>
            </Breadcrumb>
            
        </div>
    )
}
export default BreadCrumbs;