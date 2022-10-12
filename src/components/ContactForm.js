import { Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/lib/input/TextArea'
import React, { useState } from 'react'
import "../components/ContactForm.css"
function ContactForm() {
const [form] = useForm()
const [loading,setLoading] = useState(false) 

    const onFinish =async (values) => {
        setLoading(true)
       const data  = await fetch('https://realtime-database-1c837-default-rtdb.firebaseio.com/userDataRecords.json',
      {
        method:"POST",
        headers: {
             'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                firstName: values?.firstName,
                lastName: values?.lastName,
                phoneNumber: values?.phoneNumber,
                email: values?.email,
                address: values?.address,
                message: values?.message,
              })
      }
    )
if(data) {
     message.success("data stored in firebase")
    form.resetFields()
 }else {
    message.error("please fill the data")
}
    setLoading(false)
    } 

  return (
    <div className='parent_container'>
      <div className='wrap_login'>
        <h1 className='form_heading'>Contact Form</h1>
         <Form
          className='product_form'
          onFinish={onFinish}
          form={form}
         >
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Please input your first-name!' }]}
          >
            <Input type="text" placeholder="First Name" name="firstName" />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Please input your last-name!' }]}
          >
            <Input type="text" placeholder="Last Name" name="lastName" />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input your phone-number!' }]}
          >
            <Input type="tel" placeholder="Phone Name" name="phoneNumber" />
          </Form.Item>

           <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email-id!' }]}
          >
            <Input type="email" placeholder="Email ID" name="email" />
          </Form.Item>

          <Form.Item
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input type="text" placeholder="Address" name="address" />
          </Form.Item>

          <Form.Item
            name="message"
            rules={[{ required: true, message: 'Please input your Message!' }]}
          >
            <TextArea maxLength={100} rows={4} showCount type="text" placeholder="Enter Your Message" name="message" />
          </Form.Item>

          <div className='parent_btn'>
            <Button
              className='form_btn'
              htmlType="submit"
              type="primary"
              disabled={loading}
            >
               {loading ? 'Submiting...' : 'submit'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ContactForm
