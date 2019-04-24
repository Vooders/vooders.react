import React from 'react'
import axios from 'axios'
import { Badge } from 'react-bootstrap'
import { Detachments } from './Detachments'

export class Roster extends React.Component {
  state: any = {
    meta: {},
    costs: [],
    detachments: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/roster/5cbe0190e0c8724f5ade903e`)
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
      <>
        <h2>{ this.state.meta.name }</h2>
        { this.state.costs.map((cost: any) => {
          return <Badge pill variant="info">
            { cost.name }: { cost.value }
          </Badge> 
        }) }
        <Detachments detachments={this.state.detachments} />
      </>
    )
  }
}
