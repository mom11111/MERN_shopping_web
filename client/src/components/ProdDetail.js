import Axios from 'axios';
import React,{useContext, useEffect, useState} from 'react'
import {ProductContext} from '../contexts/ProductsContext'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import '../styles/prodDetail.css'
import { Col, Container, Row, Button} from 'reactstrap';

export default function ProdDetail() {

    const [products, setproducts] = useContext(ProductContext);
    const single=JSON.parse(sessionStorage.getItem('index'));
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const[x,setx] = useState(JSON.parse(sessionStorage.getItem('basket')));

    const handleCart = prod_id=>e=>{
         e.preventDefault();
         let body={
             userId:user._id,
            productIds:prod_id
         };

         Axios.post('/addtobasket', body).then(res=>{

             if(res.data.message=='already added'){
                 alert('already added');
             }

             else{
                alert('added');
                sessionStorage.setItem('basket',JSON.stringify(x+1));
                setx(x+1);
             }

         }).catch(err=>{
             console.log(err);
         })

    }

    useEffect(() => {
       
       
    }, [x]);
    

    return (
        <Container fluid>
          <Navbar />
               <Container style={{"margin-top":"100px"}} className="product">
                 <Row>
                     <Col sm="12" md="6" lg="6" xl="6" className="imagePart">
                         <img src={single.image}/>
                     </Col>
                     <Col sm="12" md="6" lg="6" xl="6" className="otherPart">
                       <h2>Title:{single.title}</h2>
                       <h3>Price:${single.price}</h3>
                       <h4>Description:</h4>
                      <code>{single.description}</code>
                        <Row>
                            <Col sm="6" md="6" lg="6" xl="6" className="buttons" style={{"margin-top":"100px"}}>
                            <Button color="warning" onClick={handleCart(single._id)}>Add to cart</Button>
                            </Col>
                            <Col sm="6" md="6" lg="6" xl="6" className="buttons" style={{"margin-top":"100px"}}>
                            <Link to={`/${single._id}/buynow`}><Button color="success">Buy Now</Button></Link>
                            </Col>
                        </Row>
                     </Col>
                 </Row>
                   
              </Container>
            <Footer />
        </Container>
    )
}
