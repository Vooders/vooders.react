import React from 'react'
import { Alert, Jumbotron, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
            <Alert variant="danger">
              <Alert.Heading>{ this.props.code }</Alert.Heading>
              <p>
                { this.props.message }
              </p>
              <hr />
              <p className="mb-0">
                Oops, something has gone wrong! Head <Link to={'/'}>home</Link>
              </p>
            </Alert>
          </Col>
        </Row>
      </Container>
    )
  }
}