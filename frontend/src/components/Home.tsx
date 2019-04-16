import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export class Home extends React.Component {
  render () {
    return (
      <>
        <Container>
          <Row className='mt-5'>
            <Col><h1>Home</h1></Col>
          </Row>
        </Container>
      </>
    )
  }
}
