import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {Container, Col, Row, ListGroup, ListGroupItem} from 'reactstrap'
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
import '../styles/navbar.css'

export default function Navbar() {
    let history = useHistory();
    const[basketProd, setbasketProd]= useState([]);
    var val=sessionStorage.getItem('loginInfo');
   var count = sessionStorage.getItem('basket');
    //console.log(count);
    
    const handleClick = e=>{
        sessionStorage.removeItem('userData');
        sessionStorage.removeItem('basket');
        sessionStorage.setItem('loginInfo',1);
        history.push('/');
    }

    const handleAddProd = e=>{
        history.push('/add');
    }

    const handleBasket = e=>{
        if(sessionStorage.getItem('loginInfo')==0){
            const user=JSON.parse(sessionStorage.getItem('userData'));
            const userId=user._id;
            console.log(userId);
            let body={
                userId:userId
            };
            axios.post('/getbasketdetail', body).then(res=>{
                if(res){
                    //console.log(res);
                    setbasketProd(res.data);
                    sessionStorage.setItem('basketProd',JSON.stringify(res.data));
                    history.push(`/basket/${userId}`);
                }
                  
                else{
                    console.log('basket is empty');
                }
            }).catch(err=>{
                console.log(err);
            })
        }
        else{
            alert('kindly login first');
        }
    }
    const handleLogin=e=>{
        history.push('/login');
    }
    const handleSignup = e=>{
        history.push('/signup');
    }
   
    return (
        <Container fluid className="myNav">
            <Row>
                <Col Xs="12" sm="6" md="5" lg="5" xl="5" className="logo">
                    <h1>DNK</h1>
                </Col>
                <Col xs="12" sm="6" md="6" lg="6" xl="6">
                   <ListGroup  horizontal="md" className="list">
                       <ListGroupItem className="listItem" >Home</ListGroupItem>
                       <ListGroupItem className="listItem" >Men</ListGroupItem>
                       <ListGroupItem className="listItem" >Women</ListGroupItem>
                       <ListGroupItem className="listItem" onClick={handleAddProd} >Add Prod</ListGroupItem>
                       {
                           val==1 ? <ListGroupItem className="listItem" onClick={handleLogin} >LogIn</ListGroupItem>:<ListGroupItem className="listItem" onClick={handleClick} >LogOut</ListGroupItem>
                       }
                       {
                           val==1 ? <ListGroupItem className="listItem" onClick={handleSignup} >SignUp</ListGroupItem>: ''
                       }
                   </ListGroup>
                </Col>
                <Col xs="12" sm="12" md="1"lg="1" xl="1" className="basket">
                    <p onClick={handleBasket}>basket</p>
                  
                    {
                      sessionStorage.getItem('basket') ?   <h6>{sessionStorage.getItem('basket')}</h6> : <h6>0</h6>
                    }
                    
                </Col>
            </Row>
        </Container>
    )
}