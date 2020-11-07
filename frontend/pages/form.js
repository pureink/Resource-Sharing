import React from 'react';
import Layout from '../components/layout'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as moment from 'moment';
import {genid} from '../utils/genid';
import { getSession } from 'next-auth/client'
import Datetime from 'react-datetime'
import AccessDenied from '../components/access-denied'
function formatDate(momentDate) {        
  return moment(momentDate).format("YYYY-MM-DD hh:mm:ss");
}
//此界面用于创建新的商品
 export default function FormPage({session}){
  if (!session) { return  <Layout><AccessDenied/></Layout> }
     return (
       <Layout>
    <Formik
    initialValues={{
        name: session.user.name,
        image:"",
        productname: "",
        price:"",
        per:"",
        dateFrom:"",
        dateTo:""
      }}
    validationSchema={Yup.object().shape({
      price: Yup.number().moreThan(0, "价格不能为负数哦!"),
      productname: Yup.string().trim().required("产品名称不可以留空哦"),
      per:Yup.string().trim().required("产品单位不可以留空哦")
    })}
    onSubmit={(values) => {
        console.log(values)
        const res =fetch('https://api.hezh.fail/add', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: genid(session.user.name),
          productname: values.productname,
          price: values.price,
          per:values.per,
          name: values.name,
          image:values.image,
          dateFrom:values.dateFrom,
          dateTo:values.dateTo
        })
      })
      alert("创建成功")
      }}
    render={props =>
        <form onSubmit={props.handleSubmit}>
            <h1>商品创建界面</h1>
          <div className="content">
          <div className="lb">
              <label className="label">请输入您产品的名称: </label><input className="inputbox" type="text" id="productname" name="productname" value={props.values.productname}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.productname && props.errors.productname && <div>{props.errors.productname}</div>}
            </div>
            <div className="lb">
              <label className="label">单价</label><input className="inputbox" type="text" id="price" name="price" value={props.values.price}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.price && props.errors.price && <div>{props.errors.price}</div>}
            </div>
            <div className="lb">
              <label className="label">单位：</label><input className="inputbox" type="text" id="per" name="per" value={props.values.per}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.per && props.errors.per && <div>{props.errors.per}</div>}
            </div>
            <div className="lb">
              <label className="label">展示图片地址</label><input className="inputbox" type="text" id="image" name="image" value={props.values.image}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.image && props.errors.image && <div>{props.errors.image}</div>}
            </div>
            <img className="displayimg"src={props.values.image}></img>
            <p>商品起始时间</p>
            <Datetime
    id="dateFrom"
    name="dateFrom"
    placeholder="Enter date"
    value={props.dateFrom}
    onChange={(dateFromValue) => {props.setFieldValue('dateFrom', formatDate(dateFromValue))}}
    onBlur={props.onBlur}
    isInvalid={!!props.errors.dateFrom}
/>
<p>商品结束时间</p>
            <Datetime
    id="dateTo"
    name="dateTo"
    placeholder="Enter date"
    value={props.dateFrom}
    onChange={(dateToValue) => {props.setFieldValue('dateTo', formatDate(dateToValue))}}
    onBlur={props.onBlur}
    isInvalid={!!props.errors.dateTo}
/>
            <div className="submit-area">
              <button className="smbtn" type="submit">submit!</button>
            </div>
          </div>
        </form>
      }
//......
 />
 </Layout>
     )
 }

 export async function getServerSideProps(context) {
    const session = await getSession(context)
    return {
      props: {
        session
      }
    }
  }
  