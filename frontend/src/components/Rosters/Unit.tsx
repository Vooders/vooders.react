import React from 'react'
// import { Tab, Row, Col, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { HorizontalTable } from './HorizontalTable'
import { VerticalTable } from './VerticalTable'

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
                <h5>{ profileKey }</h5>
                { this.props.unit.profiles[profileKey].length === 1 ?
                  <HorizontalTable data={this.props.unit.profiles[profileKey]}></HorizontalTable> :
                  <VerticalTable data={this.props.unit.profiles[profileKey]}></VerticalTable>
                }
              </>
            )
          }) : <>bob</>
        }
      </>
    )
  }
}
