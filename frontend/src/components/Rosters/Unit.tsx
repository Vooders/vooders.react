import React from 'react'
import { StatTable } from './StatTable'
import { Keywords } from './Keywords'
import * as Roster from '../../types/Roster'

interface UnitProps {
  unit: Roster.Selection
}

export type UnitState = {
  models: Roster.Profile[],
  weapons: Roster.Profile[],
  abilities: Roster.Profile[]
}

export class Unit extends React.Component<UnitProps> {
  constructor (props: UnitProps) {
    super(props)
  }

  state: UnitState = {
    models: [],
    weapons: [],
    abilities: []
  }

  private readonly ignoreList: string[] = ['Unit', 'Wound Track', 'Psychic Power', 'Abilities']

  private getModelWeapons (selectionsArray: Roster.Selection[]) {
    return selectionsArray.reduce((output: Roster.Profile[], selection) => {
      const weapons = selection.profiles.Weapon || []
      return [...output, ...weapons]
    }, [])
  }

  private uniqueArrayByName (arr: Roster.Profile[]) {
    const names: any = {}
    return arr.filter((obj) => {
      if (names[obj.meta.name]) {
        return false
      }
      names[obj.meta.name] = true
      return true
    })
  }

  componentDidMount (): void {
    if (this.props.unit.profiles.Unit) {
      this.setState((state: UnitState): UnitState => {
        const unit = this.props.unit.profiles.Unit || []
        return {
          models: this.uniqueArrayByName([...state.models, ...unit]),
          weapons: state.weapons,
          abilities: state.abilities
        }
      })
    }

    this.setState((state: UnitState): UnitState => {
      const abilities = this.props.unit.profiles.Abilities || []
      return {
        models: state.models,
        weapons: state.weapons,
        abilities: this.uniqueArrayByName([...state.abilities, ...abilities])
      }
    })

    this.props.unit.selections.forEach((selection: Roster.Selection) => {
      if (selection.meta.type === 'model') {
        this.setState((state: UnitState): UnitState => {
          const modelWeapons = this.getModelWeapons(selection.selections)
          const unit = selection.profiles.Unit || []
          return {
            models: this.uniqueArrayByName([...state.models, ...unit]),
            weapons: this.uniqueArrayByName([...state.weapons, ...modelWeapons]),
            abilities: state.abilities
          }
        })
      } else if (selection.meta.type === 'upgrade') {
        const weapons = selection.profiles.Weapon || []
        this.setState((state: UnitState): UnitState => {
          return {
            models: state.models,
            weapons: this.uniqueArrayByName([...state.weapons, ...weapons]),
            abilities: state.abilities
          }
        })
      }
    })
  }

  render () {
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

        { this.props.unit.profiles['Wound Track'] ?
          <>
            <StatTable data={this.props.unit.profiles['Wound Track']}
              heading='Wound Track'></StatTable>
          </> : <></>
        }

        { this.props.unit.profiles['Psychic Power'] ?
          <>
          <StatTable data={this.props.unit.profiles['Psychic Power']}
            heading='Psychic Powers'
            nameCell={true}></StatTable>
          </> : <></>
        }

        { this.state.abilities.length > 0 ?
          <StatTable data={this.state.abilities}
            heading='Abilities'
            nameCell={true}></StatTable> : <></>
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
