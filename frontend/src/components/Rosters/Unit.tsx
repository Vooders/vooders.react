import React from 'react'
import { StatTable } from './StatTable'

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
  private readonly ignoreList: string[] = ['Unit', 'Wound Track', 'Psychic Power', 'Abilities']

  render () {
    return (
      <>
        <h2>{ this.props.unit.meta.name }</h2>

        { this.props.unit.profiles.Unit ?
          <>
            <h5>Unit</h5>
            <StatTable data={this.props.unit.profiles.Unit}></StatTable>
          </> : <></>
        }

        { this.props.unit.profiles['Wound Track'] ?
          <>
            <h5>Wound Track</h5>
            <StatTable data={this.props.unit.profiles['Wound Track']}></StatTable>
          </> : <></>
        }

        { this.props.unit.selections.Weapon ?
          <>
          <h5>Weapons</h5>
          <StatTable data={this.props.unit.selections.Weapon} nameCell={true}></StatTable>
          </> : <></>
        }

        { this.props.unit.selections['Psychic Power'] ?
          <>
          <h5>Psychic Powers</h5>
          <StatTable data={this.props.unit.selections['Psychic Power']} nameCell={true}></StatTable>
          </> : <></>
        }

        { this.props.unit.profiles.Abilities ?
          <>
          <h5>Abilities</h5>
          <StatTable data={ this.props.unit.profiles.Abilities } nameCell={true}></StatTable>
          </> : <></>
        }

        { this.props.unit.selections.Abilities ?
          <>
          <h5>Selection Abilities</h5>
          <StatTable data={this.props.unit.selections.Abilities} nameCell={true}></StatTable>
          </> : <></>
        }

        { Object.keys(this.props.unit.profiles).map((profileKey: string) => {
            return (
              !this.ignoreList.includes(profileKey) ?
              <>
                <h5>{ profileKey }</h5>
                { this.props.unit.profiles[profileKey].length === 1 ?
                  <StatTable data={this.props.unit.profiles[profileKey]}></StatTable> :
                  <StatTable data={this.props.unit.profiles[profileKey]} nameCell={true}></StatTable>
                }
              </> : <></>
            )
          })
        }
      </>
    )
  }
}
