import React from 'react'
import { Table } from 'react-bootstrap'
import { Profile, Characteristic } from './Unit'

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
            <tr>
              { this.props.nameCell ? <th></th> : <></> }
              {this.props.data[0].characteristics.map((characteristic, index: number) => {
                return <th key={`h${index}`}>{characteristic.name}</th>
              })}
            </tr>
          </thead>
          <tbody>
            { this.props.data.map((bob: Profile, rIndex: number) => {
              return (
                <tr key={`r${rIndex}`}>
                  { this.props.nameCell ? <th>{ bob.meta.name }</th> : <></> }
                  { bob.characteristics.map((characteristic: Characteristic, index: number) => {
                    return <td key={`r${rIndex}c${index}`}>{characteristic.value}</td>
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

