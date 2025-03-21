import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, message , Form , Table, DatePicker} from 'antd';
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment';
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setshowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency,setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type,setType] = useState('all')

  const columns = [
    {
      title:'Date',
      dataIndex:'date',
      render : (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title:'Amount',
      dataIndex:'amount'
    },
    {
      title:'Type',
      dataIndex:'type'
    },
    {
      title:'Category',
      dataIndex:'category'
    },
    {
      title:'Reference',
      dataIndex:'reference'
    },
    {
      title:'Actions',
    },
  ]


  useEffect(()=>{
    const getAllTransaction = async () => {
      try {
        const user =JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        const res= await axios.post('/api/v1/transactions/get-transaction',
           {userid: user._id,frequency,
            selectedDate: selectedDate.length
            ? [moment(selectedDate[0]).format("YYYY-MM-DD"), moment(selectedDate[1]).format("YYYY-MM-DD")]
            : [],
            type
           });
        setLoading(false);
        setAllTransaction(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue with Transaction");
      }
    };
    getAllTransaction();
  }, [frequency, selectedDate, type]);

  const handleSubmit = async (values) =>{
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      await axios.post('/api/v1/transactions/add-transaction',{...values, 
        userid:user._id,
        frequency,
        date: values.date.format("YYYY-MM-DD"),
      
      });
      setLoading(false);
      message.success("Transaction Added Successfully");
    } catch (error) {
      setLoading(false);
      message.error("Failed to add transation");
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}
      <div className='filters'>
        <div>
          <h6>Select Type</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === 'custom' && (<RangePicker 
          value={selectedDate} 
          onChange={(values) => setSelectedDate(values)}
          />)}

        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === 'custom' && (<RangePicker 
          value={selectedDate} 
          onChange={(values) => setSelectedDate(values)}
          />)}

        </div>
        <div>
          <button className='btn btn-primary' onClick={() => setshowModal(true)}>Add new</button>
        </div>

      </div>
      <div className='content'>
        <Table columns ={columns} dataSource ={allTransaction}/>
      </div>
      <Modal title="Add Transaction" 
      open={showModal}
      onCancel={() => setshowModal(false)}
      footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit}></Form>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="clothing">Clothing</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="health">Health</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
              <Select.Option value="electronics">Electronics</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date"/>
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <button type="submit" className='btn btn-primary'> SAVE</button>
          </div>
        

      </Modal>
    </Layout>
  );
};

export default HomePage;
