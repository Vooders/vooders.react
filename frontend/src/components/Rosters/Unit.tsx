import React from 'react'
// import { Tab, Row, Col, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { CharacteristicsTable } from './CharacteristicsTable'

interface UnitProps {
  unit : {
    meta: any,
    profiles: any
  }
}

export class Unit extends React.Component<UnitProps> {
  render () {
    return (
      <>
        <h4>{ this.props.unit.meta.name }</h4>
        { this.props.unit.meta.type === 'model' ?
          Object.keys(this.props.unit.profiles).map((profileKey: any) => {
            return (
              <>
                <h6>{ profileKey }</h6>
                <CharacteristicsTable characteristics={this.props.unit.profiles[profileKey]} />
              </>
            )
          }) : <>bob</>
        }
      </>
    )
  }
}
