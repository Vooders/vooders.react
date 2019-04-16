import React from 'react'
import { Alert, Button, Container, Row, Col } from 'react-bootstrap'
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
            <Alert variant='danger'>
              <Alert.Heading>{ this.props.code }</Alert.Heading>
              <p>
                { this.props.message }
              </p>
              <hr />
              <p className='mb-0'>
                Oops, something has gone wrong!
                <div className='d-flex justify-content-end'>
                  <Link to={'/'}>
                    <Button variant='outline-danger'>
                      Take me home
                    </Button>
                  </Link>
                </div>
              </p>
            </Alert>
          </Col>
        </Row>
      </Container>
    )
  }
}