import React from 'react'
import { Categories } from '../../types/Roster'

export interface KeywordsProps {
  readonly keywords: Categories
}

export class Keywords extends React.Component<KeywordsProps> {
  render () {
    return (
      <>
        <h5>{ this.props.keywords.primary.toString().replace(/,/g, ', ') }</h5>
        <h6>{ this.props.keywords.others.toString().replace(/,/g, ', ') }</h6>
        <h6>Faction: { this.props.keywords.faction.toString().replace(/,/g, ', ') }</h6>
      </>
    )
  }
}
