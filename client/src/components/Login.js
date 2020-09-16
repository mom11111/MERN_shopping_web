import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import axios from 'axios'
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
            //console.log(user);
            sessionStorage.setItem('myuser',JSON.stringify(user.data));
            history.push(`/posts/${user.data._id}`);
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <Container fluid className="container">
        
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