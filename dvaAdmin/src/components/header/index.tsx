import * as React from 'react'
// import styles from './index.less'
// import logoDefault from './logo.png'
type headerProps = {
  logo?: string;
  systomName?: string;
}

 const FcHeader = props => {
  let {logo, systomName} = props;
  return(
    <div>
      {/* <img src={logo} alt=""/> */}
      <span>{systomName}</span>
    </div>
  )
}
// const FCHeader: React.FC<headerProps> = props => {
//   let {logo, systomName} = props;
//   return(
//     <div>
//       {/* <img src={logo} alt=""/> */}
//       <span>{systomName}</span>
//     </div>
//   )
// }
export default FcHeader