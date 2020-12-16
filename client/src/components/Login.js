import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import '../styles/signup.css';
import axios from 'axios';
import Navbar from '../components/Navbar'

export default function Login() {

    const[email, setemail] = useState('');
    const [password, setpassword] = useState('');
    let history = useHistory();

    
    const handlesubmit = (e)=>{
        e.preventDefault();

        let body = {
            email,
            password
        }

        axios.post('/login', body).then(user=>{
            if(user.data.message=='wrong email or password'){
                alert('wrong email or password');
            }
            else{
            sessionStorage.setItem('userData',JSON.stringify(user.data[0]));
            sessionStorage.setItem('basket',user.data[1]);
            sessionStorage.setItem('loginInfo',0);
            history.push(`/user/${user.data[0]._id}`);
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <Container fluid className="container">
         <Navbar />
            <form onSubmit={handlesubmit} className="forms">
                <h1>Login</h1>
                <input type="text" className="fields" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)} /><br />
                <input type="password" className="fields" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)} /><br />
                <Button color="success" className="signup">Login</Button>
                <Button color="danger" className="login"><a href="/">SignUp</a></Button>
            </form>

            </Container>
        
    )
}