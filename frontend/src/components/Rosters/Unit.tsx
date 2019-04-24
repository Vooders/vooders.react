import React from 'react'
// import { Tab, Row, Col, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { CharacteristicsTable } from './CharacteristicsTable'

interface UnitProps {
  unit : {
    meta: any,
    profiles: any[]
  }
}

export class Unit extends React.Component<UnitProps> {
  render () {
    return (
      <>
        <h4>{ this.props.unit.meta.name }</h4>
        { this.props.unit.meta.type === 'model' ?
          this.props.unit.profiles.map((profile: any, i) => {
            return (
              <>
                <h6>{ profile.meta.name }</h6>
                <CharacteristicsTable characteristics={profile.characteristics} />
              </>
            )
          }) : <>bob</>
        }
      </>
    )
  }
}
