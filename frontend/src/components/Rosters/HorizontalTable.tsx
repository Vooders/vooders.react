import React from 'react'
import { Table } from 'react-bootstrap'
import { Profile } from './Unit'

interface HorizontalTableProps {
  data: Profile[]
}

export class HorizontalTable extends React.Component<HorizontalTableProps> {
  render () {
    return (
      <>
        <Table>
          <thead>
            {this.props.data[0].characteristics.map((characteristic) => {
              return <th>{characteristic.name}</th>
            })}
          </thead>
          <tbody>
            {this.props.data[0].characteristics.map((characteristic) => {
              return <td>{characteristic.value}</td>
            })}
          </tbody>
        </Table>
      </>
    )
  }
}

