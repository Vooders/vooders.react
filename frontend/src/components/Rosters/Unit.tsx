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
    categories: any
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

export type UnitState = {
  models: any[],
  weapons: any[]
}

export class Unit extends React.Component<UnitProps> {
  constructor (props: UnitProps) {
    super(props)
  }

  state: UnitState = {
    models: [],
    weapons: []
  }

  private readonly ignoreList: string[] = ['Unit', 'Wound Track', 'Psychic Power', 'Abilities']

  private getModelWeapons (selectionsArray: any[]) {
    return selectionsArray.reduce((output, selection) => {
      return [...output, ...selection.profiles.Weapon]
    }, [])
  }

  private uniqueArrayByName (arr: any[]) {
    const names: any = {}
    return arr.filter((obj) => {
      if (names[obj.meta.name]) {
        return false
      }
      names[obj.meta.name] = true;
      return true
    })
  }

  componentDidMount () {
    if (this.props.unit.profiles.Unit) {
      this.setState((state: UnitState) => {
        return {
          models: this.uniqueArrayByName([...state.models, ...this.props.unit.profiles.Unit]),
          weapons: state.weapons
        }
      })
    }
    this.props.unit.selections.forEach((selection: any) => {
      if (selection.meta.type === 'model') {
        this.setState((state: UnitState) => {
          const modelWeapons = this.getModelWeapons(selection.selections)
          return {
            models: this.uniqueArrayByName([...state.models, ...selection.profiles.Unit]),
            weapons: this.uniqueArrayByName([...state.weapons, ...modelWeapons])
          }
        })
      } else if (selection.meta.type === 'upgrade') {
        this.setState((state: UnitState) => {
          return {
            models: state.models,
            weapons: this.uniqueArrayByName([...state.weapons, ...selection.profiles.Weapon])
          }
        })
      }
    })
  }

  render () {
    console.log(this.props)
    return (
      <>
        <h2>{ this.props.unit.meta.name }</h2>
        <Keywords keywords={this.props.unit.categories}></Keywords>

        { this.state.models.length > 0 ?
          <>
            <StatTable data={this.state.models}
              heading=''
              nameCell={true}></StatTable>
          </> : <></>
        }

        { this.state.weapons.length > 0 ?
          <StatTable data={this.state.weapons} 
            heading='Weapons'
            nameCell={true}></StatTable> : <></>
        }

        { this.props.unit.selections.Unit ?
          <>
            <StatTable data={this.props.unit.selections.Unit}
              heading='' nameCell={true}></StatTable>
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

        { Object.keys(this.props.unit.profiles).map((profileKey: string, index: number) => {
          return (
            !this.ignoreList.includes(profileKey) ?
            <div key={`d${index}`}>
              <h5>{ profileKey }</h5>
              { this.props.unit.profiles[profileKey].length === 1 ?
                <StatTable data={this.props.unit.profiles[profileKey]} key={index}></StatTable> :
                <StatTable data={this.props.unit.profiles[profileKey]} nameCell={true} key={index}></StatTable>
              }
            </div> : <span key={`d${index}`}></span>
          )
        })}
      </>
    )
  }
}
