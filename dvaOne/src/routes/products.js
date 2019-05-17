import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/productList';
const Products = ({ dispatch, products }) => {
  function handleDeleteFn(id){
    dispatch({
      type: 'products/delete',
      payload: {id}
    })
  }
  return (
    <div>
    <h2>products of list</h2>
    <ProductList
      data={products}
      onDeleteFn={handleDeleteFn}
    />
    </div>
  )
};
export default connect(({products})=>({
  products,
}))(Products);