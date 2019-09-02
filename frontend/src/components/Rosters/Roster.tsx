import React from 'react'
import axios from 'axios'
import { Badge, Container } from 'react-bootstrap'
import { Detachments } from './Detachments'
import { Meta, Characteristic, Detachment } from '../../types/Roster'

type RosterState = {
  meta: Meta,
  costs: Characteristic[],
  detachments: Detachment[]
}

export class Roster extends React.Component {
  state: RosterState = {
    meta: {
      name: ''
    },
    costs: [],
    detachments: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/roster/5d6c25704669414667692b0e`)
      .then(res => {
        const roster = res.data
        this.setState({ 
          meta: roster.meta, 
          costs: roster.costs,
          detachments: roster.detachments
        })
      })
  }

  render () {
    return (
      <Container>
        <h2>{ this.state.meta.name }</h2>
        { this.state.costs.map((cost: Characteristic, index: number) => {
          return <Badge pill variant="info" key={index}>
            { cost.name }: { cost.value }
          </Badge> 
        }) }
        <Detachments detachments={this.state.detachments} />
      </Container>
    )
  }
}
