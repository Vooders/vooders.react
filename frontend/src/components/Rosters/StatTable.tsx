import React from 'react'
import { Table } from 'react-bootstrap'
import { Profile } from './Unit'

interface StatTableProps {
  data: Profile[],
  heading?: string,
  nameCell?: boolean
}

export class StatTable extends React.Component<StatTableProps> {
  render () {
    return (
      <>
        { this.props.heading ?
          <h5>{ this.props.heading }</h5> : <></>
        }
        <Table bordered>
          <thead>
            { this.props.nameCell ? <th></th> : <></> }
            {this.props.data[0].characteristics.map((characteristic) => {
              return <th>{characteristic.name}</th>
            })}
          </thead>
          <tbody>
            { this.props.data.map((bob: any) => {
              return (
                <tr>
                  { this.props.nameCell ? <th>{ bob.meta.name }</th> : <></> }
                  { bob.characteristics.map((characteristic: any) => {
                    return <td>{characteristic.value}</td>
                  }) }
                </tr>
              )
            }) }
          </tbody>
        </Table>
      </>
    )
  }
}

