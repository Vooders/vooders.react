import React from 'react'

export interface KeywordsProps {
  keywords: {
    primary: string[],
    faction: string[],
    others: string[]
  }
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
