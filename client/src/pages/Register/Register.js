import React, { useEffect, useState ,useContext} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
 import 'react-toastify/dist/ReactToastify.css';
import Spiner from '../../components/Spinner/Spinner';
import {registerFunc} from '../../services/Apis';
import './register.css';
import { addData } from '../../components/context/ContextProvider';

const Register = () => {
  const [showSpin, setShowSpin] = useState(true);

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  const [inputData, setInputData] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    gender: '',
    location: '',
  });
  //console.log(inputData)
  const [status, setStatus] = useState('Active');
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const navigate=useNavigate();
  
  const {useradd, setUseradd}=useContext(addData);

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  }

  const setStatusValue = (e) => {
    setStatus(e.value)
  }

  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  const SubmitUserData =async (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputData;
    if (fname === '') {
      toast.error('First Name is Required')
    } else if (lname === '') {
      toast.error('Last Name is Required')
    } else if (email === '') {
      toast.error('EMAIL is Required')
    } else if (!email.includes('@')) {
      toast.error('Enter Valid Email Id')
    } else if (mobile === '') {
      toast.error('Mobile Number is Required')
    } else if (mobile.length > 10) {
      toast.error('Enter Valid Mobile Number')
    } else if (gender === '') {
      toast.error('Gender is Required')
    } else if (status === '') {
      toast.error('Status is Required')
    } else if (image === '') {
      toast.error('Profile image is Required')
    } else if (location === '') {
      toast.error('Location is Required')
    } else {
      const data=new FormData();
      data.append('fname',fname)
      data.append('lname',lname)
      data.append('email',email)
      data.append('mobile',mobile)
      data.append('gender',gender)
      data.append('status',status)
      data.append('user_profile',image)
      data.append('location',location)
      const config={
        "Content-Type":"multipart/form-data"
      }

      const response=await registerFunc(data,config)
      if(response.status===200){
        setInputData({
          ...inputData,
          fname: '',
          lname: '',
          email: '',
          mobile: '',
          gender: '',
          location: '',
        });
        setStatus('');
        setImage('');
        setUseradd(response.data)
        navigate('/');
      }else{
        toast.error('Error')
      }
    }
  }

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [image]);

  return (
    <>
      {showSpin ? <Spiner /> : <div className='container'>
        <h1 className='text-center mt-1'>Register Your Details</h1>
        <Card className='shadow mt-3 p-3'>
          <div className='profile_div text-center'>
            <img src={preview ? preview : '/men.png'} alt='img' />
          </div>
          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail" >
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name='fname' value={inputData.fname} onChange={setInputValue} placeholder='Enter First Name' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name='lname' value={inputData.lname} onChange={setInputValue} placeholder='Enter Last Name' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' value={inputData.email} onChange={setInputValue} placeholder='Enter Email' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail" >
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="text" name='mobile' value={inputData.mobile} onChange={setInputValue} placeholder='Enter Mobile Number' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail" >
                <Form.Label>Select Your Gender </Form.Label>
                <Form.Check
                  type={'radio'}
                  label={'Male'}
                  name='gender'
                  value={'Male'}
                  onChange={setInputValue}
                />
                <Form.Check
                  type={'radio'}
                  label={'Female'}
                  name='gender'
                  value={'Female'}
                  onChange={setInputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail" >
                <Form.Label>Select Your Status </Form.Label>
                <Select options={options} onChange={setStatusValue}  />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail" >
                <Form.Label>Select Your Profile</Form.Label>
                <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Select Your Profile' />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail" >
                <Form.Label>Enter Your Location</Form.Label>
                <Form.Control type="text" name='location' value={inputData.location} onChange={setInputValue} placeholder='Enter Location' />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={SubmitUserData}>
                Submit
              </Button>
            </Row>
          </Form>

        </Card>
        <ToastContainer position='top-center' />
      </div>
      }
    </>

  )
}

export default Register