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
    },
    selections: any
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

        { this.props.unit.profiles.Unit ?
          <>
            <h5>Unit</h5>
            <HorizontalTable data={this.props.unit.profiles.Unit}></HorizontalTable>
          </> : <></>
        }

        { this.props.unit.selections.Weapon ?
          <>
          <h5>Weapons</h5>
          <HorizontalTable data={this.props.unit.selections.Weapon} nameCell={true}></HorizontalTable>
          </> : <></>
        }

        { this.props.unit.selections['Psychic Power'] ?
          <>
          <h5>Psychic Powers</h5>
          <HorizontalTable data={this.props.unit.selections['Psychic Power']} nameCell={true}></HorizontalTable>
          </> : <></>
        }

        { Object.keys(this.props.unit.profiles).map((profileKey: string) => {
            return (
              profileKey !== 'Unit' ?
              <>
                <h5>{ profileKey }</h5>
                { this.props.unit.profiles[profileKey].length === 1 ?
                  <HorizontalTable data={this.props.unit.profiles[profileKey]}></HorizontalTable> :
                  <VerticalTable data={this.props.unit.profiles[profileKey]}></VerticalTable>
                }
              </> :
              <></>
            )
          })
        }
      </>
    )
  }
}
