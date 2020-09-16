import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {Container, Button} from 'reactstrap'

export default function Signup() {


     const [name, setname] = useState('');

     const [email, setemail] = useState('');

     const [password, setpassword] = useState('');

     let history = useHistory();

     

     const handleSubmit = (e)=>{
       
        e.preventDefault();


        let body = {
            name,
            email,
            password
        };
   
        axios.post('/register', body).then(user=>{
            console.log(user);
            history.push('./login');
        }).catch(err=>{
            console.log('not make a request');
            alert('email already used');
            console.log(err);
        })

     }
    

    return (
        <Container fluid className="container" >
           
             <form onSubmit = {handleSubmit} className="forms">
             <h1>Instagram</h1>
                 <input type="text" placeholder ="name" className="fields" value={name} onChange={(e)=>setname(e.target.value)} /> <br/>

                 
                 <input type="text" placeholder="email" className="fields" value={email} onChange={(e)=>setemail(e.target.value)} /> <br/>
                     
                
                 <input type="password" placeholder="password" className="fields" value={password} onChange={e=>setpassword(e.target.value)} /> <br/>
                 <Button color="success" className="signup">SignUp</Button>
                 <Button color="secondary" className="login"><a href="/login">Login</a></Button>
             </form>
        </Container>
    )
}