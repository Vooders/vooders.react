import React from 'react'
import { Table } from 'react-bootstrap'
import { Profile } from './Unit'

interface VerticalTableTableProps {
  data: Profile[]
}

export class VerticalTable extends React.Component<VerticalTableTableProps> {
  render () {
    return (
      <>
        <Table>
          <thead>
            <th></th>
          { this.props.data[0].characteristics.map((characteristic) => {
              return(
                <th>{ characteristic.name }</th>
              )
            })}
          </thead>
          <tbody>
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
          </tbody>
        </Table>
      </>
    )
  }
}

