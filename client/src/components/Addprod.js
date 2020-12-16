import React,{useState} from 'react'
import {Button, Container} from 'reactstrap'
import '../styles/addprod.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
export default function Addprod() {
    const [type,settype] = useState('');
    const[title, settitle] = useState('');
    const[price, setprice] = useState('');
    const[description, setdescription] = useState('');

    const handleSubmit =(e)=>{
        e.preventDefault();
        const { files } = document.querySelector('#img');
        const formData = new FormData();
        formData.append('file', files[0]);
// replace this with your upload preset name
        formData.append('upload_preset', 'coding-clone');

// replace cloudname with your Cloudinary cloud_name
axios.post('https://api.cloudinary.com/v1_1/nishantsunny/image/upload', formData)
  .then(res => {
      console.log(res)
      console.log(res.data.secure_url);
      setTimeout(() => {
        let body={
            type,
            title,
            price,
            image:res.data.secure_url,
            description
        }
        axios.post('/addprod',body).then(res=>{
            console.log('posted successfully');
            alert('posted');
        }).catch(err=>
          {
              console.log(err);
          })
      }, 300);
  })
  .catch(err => console.log(err));

    }

    return (
        <Container fluid>
        <Navbar />
        <h2>Add New ProdUct</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="type eg:cloth, grocery etc" className="input" onChange={e=>settype(e.target.value)}  /><br/>
              <input type="text" placeholder="title: jeans, shirt etc" className="input" onChange={e=>settitle(e.target.value)}  /><br/>
              <input type="text" placeholder="price" className="input"  onChange={e=>setprice(e.target.value)} /><br/>
              <input type="file" placeholder="upload prod" className="input" id="img"  /><br/>
              <textarea id="w3review" rows="4" cols="50" placeholder="product description" onChange={e=>setdescription(e.target.value)} /><br/>
              <Button className="addButton">Add Prod</Button>
            </form>
            <Footer />
        </Container>
    )
}
