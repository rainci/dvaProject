import React from "react";
import {Link} from 'react-router-dom';
import { Breadcrumb } from 'antd';
const goStyle = {float:"right",color:"#1890ff"};
const BreadCrumbs = ({cssStyle, goUrl, goName, rootName, name }={}) => {
    return (
        <div className="main-header" style={cssStyle}>
            { goUrl ? <Link to={goUrl} style={goStyle}>{goName}</Link> : null }
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>{rootName || "组织管理"}</Breadcrumb.Item>
                <Breadcrumb.Item>{name}</Breadcrumb.Item>
            </Breadcrumb>
            
        </div>
    )
}
export default BreadCrumbs;