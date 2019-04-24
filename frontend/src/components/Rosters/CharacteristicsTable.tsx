import React from 'react'
import { Table } from 'react-bootstrap'

interface CharacteristicsTableProps {
  characteristics: Characteristic[]
}

export type Characteristic = {
  name: string,
  value: string
}

export class CharacteristicsTable extends React.Component<CharacteristicsTableProps> {
  render () {
    return (
      <>
      {/* { JSON.stringify(this.props.characteristics, null, 2) } */}
        <Table>
          <thead>
            {this.props.characteristics.map((characteristic: Characteristic) => {
              return <th>{ characteristic.name }</th>
            })}
          </thead>
          <tbody>
            {this.props.characteristics.map((characteristic: Characteristic) => {
              return <td>{ characteristic.value }</td>
            })}
          </tbody>
        </Table>
      </>
    )
  }
}
