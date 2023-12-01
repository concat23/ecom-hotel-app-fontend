import React from 'react'
import { Container } from '../../items/Container'
import { Row } from '../column/Row'
import { Col } from '../column/Col'

export const Footer = () => {

  const today = new Date();

  return (
    <footer className='by-dark text-align py-3 footer mt-lg-5'>
        <Container>
            <Row>
                <Col xs={12} md={12} className='text-center' >
                    <p className='mb-0'>&copy; {today.getFullYear() } Ecom Hotel</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}
