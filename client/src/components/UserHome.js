import React,{useState, useContext, useEffect} from 'react'
import {Col, Container, Row} from 'reactstrap'
import axios from 'axios'
import Product from '../components/Product'
import Navbar from './Navbar'
import Footer from './Footer'
import '../styles/home.css'
import {ProductContext} from '../contexts/ProductsContext'


import p1 from '../images/p1.jpg'

export default function UserHome() {

    const [products, setproducts] = useContext(ProductContext);

   useEffect(() => {
        axios.get('/').then(res=>{
        setproducts(res.data);
    })
    }, []);

    return (
        <Container fluid className="home">
            <Navbar />

            <Container fluid className="header">
             <Row>
                 <Col xs="12" sm="12" md="6" lg="6" xl="6" className="leftHeader">
                     <img src={p1} />
                 </Col>
                 <Col xs="12" sm="12" md="6" lg="6" xl="6" className="rightHeader">
                   <h3>Wel Come,<br/>In  the world of Organic Products.<br/><span>Be Organic, Buy Organic</span></h3>
                 </Col>
             </Row>
         </Container> 

            <Product />

        <Container fluid className="thirdSection">

                        <Row>
                            <Col xs="10" sm="10" md="3" lg="3" xl="3" className="section3">
                            <h3>Free Shipping</h3>
                            <p>above $5 only</p>
                            </Col>
                            <Col xs="10" sm="10" md="2" lg="2" xl="2" className="section3">
                            <h3>Organic</h3>
                            <p>above $5 only</p>
                            </Col>
                            <Col xs="10" sm="10" md="2" lg="2" xl="2" className="section3">
                            <h3>Huge Savings</h3>
                            <p>above $5 only</p>
                            </Col>
                            <Col xs="10" sm="12" md="3" lg="3" xl="3" className="section3">
                            <h3>Easy Returns</h3>
                            <p>above $5 only</p>
                            </Col>
                    </Row>

            </Container>

            <Footer />
        </Container>
    )
}
