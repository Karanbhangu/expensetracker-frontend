import React from 'react'

const Tabled = (props) => {
  return (
    <table className="custom-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Expense</th>
                </tr>
              </thead>
              <tbody>
                {props.labels.map((item, index)=>{
                  return <tr key={item}>
                  <td>{item}</td>
                  <td>${props.presentData[index]}</td>
                </tr>
                })}
              </tbody>
            </table>
  )
}

export default Tabled