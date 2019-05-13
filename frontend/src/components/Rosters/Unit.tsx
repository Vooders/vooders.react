import React from 'react'
import { StatTable } from './StatTable'
import { Keywords } from './Keywords'

interface UnitProps {
  unit : {
    meta: {
      name: string
    },
    profiles: {
      [key :string]: Profile[]
    },
    selections: any,
    categories: Keyword[]
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

export type Keyword = {
  name: string,
  primary: string
}

export class Unit extends React.Component<UnitProps> {
  private readonly ignoreList: string[] = ['Unit', 'Wound Track', 'Psychic Power', 'Abilities']

  render () {
    return (
      <>
        <h2>{ this.props.unit.meta.name }</h2>
        <Keywords keywords={this.props.unit.categories}></Keywords>
        { this.props.unit.profiles.Unit ?
          <>
            <StatTable data={this.props.unit.profiles.Unit}
              heading='Unit'></StatTable>
          </> : <></>
        }

        { this.props.unit.profiles['Wound Track'] ?
          <>
            <StatTable data={this.props.unit.profiles['Wound Track']}
              heading='Wound Track'></StatTable>
          </> : <></>
        }

        { this.props.unit.selections.Weapon ?
          <>
          <StatTable data={this.props.unit.selections.Weapon} 
            heading='Weapons'
            nameCell={true}></StatTable>
          </> : <></>
        }

        { this.props.unit.selections['Psychic Power'] ?
          <>
          <StatTable data={this.props.unit.selections['Psychic Power']}
            heading='Psychic Powers'
            nameCell={true}></StatTable>
          </> : <></>
        }

        { this.props.unit.profiles.Abilities ?
          <>
          <StatTable data={ this.props.unit.profiles.Abilities }
            heading='Abilities'
            nameCell={true}></StatTable>
          </> : <></>
        }

        { this.props.unit.selections.Abilities ?
          <>
          <StatTable data={this.props.unit.selections.Abilities}
            heading='Selection Abilities'
            nameCell={true}></StatTable>
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
        })}
      </>
    )
  }
}
