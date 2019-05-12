import React from 'react'
import { HorizontalTable } from './HorizontalTable'
import { VerticalTable } from './VerticalTable'

interface UnitProps {
  unit : {
    meta: {
      name: string
    },
    profiles: {
      [key :string]: Profile[]
    }
  }
}

export type Profile = {
  meta: {
    name: string
  },
  characteristics: Characteristic[]
}

export type Characteristic = {
  name: string,
  value: string
}

export class Unit extends React.Component<UnitProps> {
  render () {
    return (
      <>
        <h2>{ this.props.unit.meta.name }</h2>
        { Object.keys(this.props.unit.profiles).map((profileKey: any) => {
            return (
              <>
                <h5>{ profileKey }</h5>
                { this.props.unit.profiles[profileKey].length === 1 ?
                  <HorizontalTable data={this.props.unit.profiles[profileKey]}></HorizontalTable> :
                  <VerticalTable data={this.props.unit.profiles[profileKey]}></VerticalTable>
                }
              </>
            )
          })
        }
      </>
    )
  }
}
