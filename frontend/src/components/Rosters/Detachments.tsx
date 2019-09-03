import React from 'react'
import { Tab, Row, Col, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Unit } from './Unit'
import { Detachment, Selection, Profile } from '../../types/Roster'

interface DetachmentProps {
  readonly detachments: Detachment[]
}

type DetachmentState = {
  readonly detachments: Detachment[]
}

export class Detachments extends React.Component<DetachmentProps> {
  constructor (props: DetachmentProps) {
    super(props)
  }

  state: DetachmentState = {
    detachments: []
  }

  componentDidUpdate () {
    if (this.props.detachments.length > this.state.detachments.length) {
      this.setState((_: DetachmentState): DetachmentState => {
        return {
          detachments: []
        }
      })
      this.bob()
    }
  }

  private getDetachmentAbilities (units: Selection[]): Profile[] {
    return units.reduce((detachmentAbilities: Profile[], unit) => {
      if (unit.meta.type === 'upgrade') {
        console.log(unit.meta.name, unit)
        const newDetachmentAbilities = unit.selections.reduce((selectionAbilities: Profile[], selection: Selection) => {
          const abilities = selection.profiles.Abilities || []
          return [...selectionAbilities, ...abilities]
        }, [])
        return [...detachmentAbilities, ...newDetachmentAbilities]
      }
      return detachmentAbilities
    }, [])
  }

  bob () {
    this.props.detachments.forEach((detachment) => {
      const abilities = this.getDetachmentAbilities(detachment.units)
      const det: Detachment = {
        meta: detachment.meta,
        units: detachment.units,
        abilities
      }
      this.setState((state: DetachmentState): DetachmentState => {
        return {
          detachments: [...state.detachments, det]
        }
      })
    })
  }

  render () {
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="key00">
        <Row>
          <Col sm={3} className='scrollable'>
            {this.props.detachments.map((detachment: Detachment, detachmentIndex) => {
              return (
                <div key={detachmentIndex}>
                  <OverlayTrigger
                    placement='top'
                    overlay={
                      <Tooltip id={`tooltip-${detachmentIndex}`}>
                        {detachment.meta.catalogueName}
                      </Tooltip>
                    } >
                    <h5>{detachment.meta.name}</h5>
                  </OverlayTrigger>
                  { detachment.units.map((unit: Selection, index) => {
                    return (
                      <Nav variant="pills" className="flex-column" key={index}>
                        <Nav.Item>
                          <Nav.Link eventKey={`key${detachmentIndex}${index}`}>{ unit.meta.name }</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    )
                  }) }
                </div>
              )
            })}
          </Col>
          <Col sm={9} className='scrollable'>
            {this.props.detachments.map((detachment: Detachment, detachmentIndex) => {
              return (
                <Tab.Content key={detachmentIndex}>
                  { detachment.units.map((unit: Selection, index) => {
                    return (
                      <Tab.Pane eventKey={`key${detachmentIndex}${index}`} key={index}>
                        <Unit unit={unit} />
                      </Tab.Pane>
                    )
                  }) }
                </Tab.Content>
              )
            })}
          </Col>
        </Row>
      </Tab.Container>
    )
  }
}
