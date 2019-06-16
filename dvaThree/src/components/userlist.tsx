import * as React from 'react'

type userProps = {
  data: any[];
}
export const FCUserList: React.FC<userProps> = props => {
  const { data } = props;
  return (
    <ul>
      {
        data && data.map(({name,gender,id}) => {
          return <li key={id}>{name} : {gender}</li>
        })
      }
    </ul>
  )
}