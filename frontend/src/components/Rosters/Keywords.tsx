import React from 'react'
import { Keyword } from './Unit'

export interface KeywordsProps {
  keywords: Keyword[]
}

export class Keywords extends React.Component<KeywordsProps> {
  render () {
    return (
      <p>
        {this.props.keywords.map((keyword) => {
          return (keyword.name + ', ')
        })}
      </p>
    )
  }
}
