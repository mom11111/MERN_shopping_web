import React,{useState, useEffect} from 'react'
import {Col, Container, Row, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Axios from 'axios'

export default function BasketDetail() {

    const[products, setproducts] =useState(JSON.parse(sessionStorage.getItem('basketProd')));
    let numberOfItems = JSON.parse(sessionStorage.getItem('basket'));
    const[view, setview] = useState(null);

    const handleClick= index=>e=>{
        const allprod = products;
        const single = allprod.filter(prod=>{
            return prod._id==index;
        })
        sessionStorage.setItem('index',JSON.stringify(single[0]));
    }
    const removeProd = prod=>e=>{
            const user=JSON.parse(sessionStorage.getItem('userData'));
            const userId=user._id;
            let body={
                userId:userId,
                productId:prod

            };
            Axios.post('/removefrombasket', body).then(res=>{
                if(res){
                    alert('removed');
                    sessionStorage.setItem('basket',numberOfItems-1);
                    setview(prod);
                }
                else{
                    alert('dont know');
                }
            }).catch(err=>{
                console.log(err);
            })
    }


    useEffect(() => {
       let newprod = products.filter((produ)=>{
           return produ._id!=view;
       })
       setproducts(newprod);
    }, [view])

    
    return (
        <Container fluid>
        <Navbar />
             <Container style={{"margin-top":"100px"}} className="product">
             <Row>
               {
                   
                   products.map((prod, index)=>{
                       return(
                                <Col key={index} xs="12" sm="12" md="3" lg="4" xl="4" className="prod" style={{"margin-top":"80px"}}>
                                <Card>
                                <CardImg top width="100%" style={{"height":"180px"}} src={prod.image} alt="Card image cap" />
                                <CardBody>
                                <CardTitle>{prod.title}</CardTitle>
                                <CardSubtitle><b>${prod.price}</b></CardSubtitle>
                                <CardText>{prod.description}</CardText>
                                <Button onClick={removeProd(prod._id)}>Remove</Button>
                                <Link to={`/proddetail/${prod._id}`}><Button style={{"margin-left":"20px"}} onClick={handleClick(prod._id)}>view</Button></Link>
                                </CardBody>
                                </Card>
                        </Col>
                           
                       )
                   })
               }
               </Row>
            </Container>
          <Footer />
      </Container>
    )
}
