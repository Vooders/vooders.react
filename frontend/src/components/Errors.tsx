import React from 'react'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'

interface ErrorsProps {
  code: number,
  message: string
}

export class Errors extends React.Component<ErrorsProps> {
  render () {
    return (
      <Container>
        <Row className='mt-5'>
          <Col>
            <Jumbotron>
              <h1>{ this.props.code }</h1>
              <p>
                { this.props.message }
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    )
  }
}