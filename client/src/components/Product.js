import React,{useContext, useState} from 'react'
import {Col, Container, Row, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap'
import {ProductContext} from '../contexts/ProductsContext'
import {Link} from 'react-router-dom'

export default function Product() {

    const [products, setproducts] = useContext(ProductContext);

    const handleClick= index=>e=>{
        sessionStorage.setItem('index',JSON.stringify(products[index]));
    }

    return (
        <Container fluid className="mainProdArea" style={{"margin-top":"80px"}}>
        <h1>Our Products</h1>
        <Row>
            {
                products.map((prod,index)=>{
                    return(
                        <Col key={index} xs="12" sm="12" md="3" lg="4" xl="4" className="prod" style={{"margin-top":"80px"}}>
                                <Card>
                                <CardImg top width="100%" style={{"height":"180px"}} src={prod.image} alt="Card image cap" />
                                <CardBody>
                                <CardTitle>{prod.types}</CardTitle>
                                <CardSubtitle><b>{prod.title}</b></CardSubtitle>
                                <CardText>${prod.price}</CardText>
                                <Link to={`/proddetail/${prod._id}`}><Button onClick={handleClick(index)}>view</Button></Link>
                                </CardBody>
                                </Card>
                        </Col>
                        

                    )
                })
            }
            </Row>
        </Container>
    )
}
