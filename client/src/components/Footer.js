import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import '../styles/footer.css'

export default function Footer() {
    return (
        <Container fluid className="footer">
           <Row>
               <Col md="4" lg="4" xl="4">
               <h3>Quick Links</h3>
                   <ul className="leftList">
                       <li>Home</li>
                       <li>About Us</li>
                       <li>Contact us</li>
                       <li>Cart</li>
                   </ul>
               </Col>
               <Col md="4" lg="4" xl="4">
               <h3>Men's Wear</h3>
               <ul className="midList">
                       <li>Shirts</li>
                       <li>Jeans</li>
                       <li>purses</li>
                       <li>Shoes</li>
                   </ul>
               </Col>
               <Col md="4" lg="4" xl="4">
               <h3>Women's wear</h3>
               <ul className="rightList">
                  <li></li>
                       <li>Shirts</li>
                       <li>Jeans</li>
                       <li>Suits</li>
                       <li>Sandals</li>
                   </ul>
               </Col>
           </Row>
        </Container>
    )
}