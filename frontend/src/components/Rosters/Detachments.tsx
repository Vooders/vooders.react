import React from 'react'
import { Tab, Row, Col, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Unit } from './Unit'

interface DetachmentProps {
  detachments: detachment[]
}

type detachment = {
  meta: any,
  units: any[]
}

export class Detachments extends React.Component<DetachmentProps> {
  render () {
    return ( 
      <Tab.Container id="left-tabs-example" defaultActiveKey="key00">
        <Row>
          <Col sm={3} className='scrollable'>
            {this.props.detachments.map((detachment: detachment, detachmentIndex) => {
              return (
                <div key={detachmentIndex}>
                  <OverlayTrigger
                    placement='top'
                    overlay={
                      <Tooltip id={`tooltip-${detachmentIndex}`}>
                        {detachment.meta.catalogueName}
                      </Tooltip>
                    }
                  >
                  <h5>{detachment.meta.name}</h5>
                  </OverlayTrigger>
                  { detachment.units.map((unit: any, index) => {
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
            {this.props.detachments.map((detachment: detachment, detachmentIndex) => {
              return (
                <Tab.Content key={detachmentIndex}>
                  { detachment.units.map((unit: any, index) => {
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
