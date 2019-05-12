import React from 'react'
import { Table } from 'react-bootstrap'

interface HorizontalTableProps {
  data: Characteristics[]
}

export type Characteristics = {
  meta: {},
  characteristics: Characteristic[]
}

export type Characteristic = {
  name: string,
  value: string
}

export class HorizontalTable extends React.Component<HorizontalTableProps> {
  render () {
    return (
      <>
        <Table>
          <thead>
            {this.props.data[0].characteristics.map((characteristic: Characteristic) => {
              return <th>{characteristic.name}</th>
            })}
          </thead>
          <tbody>
            {this.props.data[0].characteristics.map((characteristic: Characteristic) => {
              return <td>{characteristic.value}</td>
            })}
          </tbody>
        </Table>
      </>
    )
  }
}

