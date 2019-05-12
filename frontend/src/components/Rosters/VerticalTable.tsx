import React from 'react'
import { Table } from 'react-bootstrap'

interface VerticalTableTableProps {
  data: Characteristics[]
}

export type Characteristics = {
  meta: {
    name: string
  },
  characteristics: Characteristic[]
}

export type Characteristic = {
  name: string,
  value: string
}

export class VerticalTable extends React.Component<VerticalTableTableProps> {
  render () {
    return (
      <>
        <Table>
          { this.props.data.map((characteristics) => {
            return(
              <tr>
                <th>{ characteristics.meta.name }</th>
                { characteristics.characteristics.map((characteristic) => {
                  return(
                    <td>{ characteristic.value }</td>
                  )
                })}
              </tr>
            )
          }) }
        </Table>
      </>
    )
  }
}

