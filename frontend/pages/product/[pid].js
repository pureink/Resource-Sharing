import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import useSWR from "swr";
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as moment from 'moment';
import Datetime from 'react-datetime'
function formatDate(momentDate) {        
  return moment(momentDate).format("YYYY-MM-DD hh:mm:ss");
}
//如果是个人的产品显示修改界面,否则显示订购界面
const fetcher = url => fetch(url).then(res => res.json());
export default function Product (props) {
  const session=props.session
  const data=props.data
  const product = data.response[0]
  const username = product.name
  console.log(product)
  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }
  if(session.user.name!=username){
    return (
      <div>
        <p>欢迎订购</p>
      </div>
    )
  }
  // 这个商品属于你,进行修改操作
  return (
    <Layout>
    <Formik
    initialValues={{
        id:product.id,
        name: session.user.name,
        image:product.productimg,
        productname: product.productname,
        price:product.price,
        per:product.per,
        dateFrom:formatDate(product.starttime),
        dateTo:formatDate(product.endtime)
      }}
    validationSchema={Yup.object().shape({
      price: Yup.number().moreThan(0, "price must be greater than 0"),
      productname: Yup.string().trim().required("Name can not be empty")
    })}
    onSubmit={(values) => {
        console.log(values)
        const res =fetch('https://api.hezh.fail/change', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: values.id,
          productname: values.productname,
          price: values.price,
          per:values.per,
          name: values.name,
          image:values.image,
          dateFrom:values.dateFrom,
          dateTo:values.dateTo
        })
      })
      }}
    render={props =>
        <form onSubmit={props.handleSubmit}>
            <h1>修改商品信息</h1>
          <div className="content">
          <div>
              <label className="label">productname： </label><input type="text" id="productname" name="productname" value={props.values.productname}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.productname && props.errors.productname && <div>{props.errors.productname}</div>}
            </div>
            <div>
              <label className="label">price： </label><input type="text" id="price" name="price" value={props.values.price}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.price && props.errors.price && <div>{props.errors.price}</div>}
            </div>
            <div>
              <label className="label">单位： </label><input type="text" id="per" name="per" value={props.values.per}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.per && props.errors.per && <div>{props.errors.per}</div>}
            </div>
            <div>
              <label className="label">imageurl： </label><input type="text" id="image" name="image" value={props.values.image}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.image && props.errors.image && <div>{props.errors.image}</div>}
            <img src={props.values.image}></img>
            </div>
            <p>商品起始时间</p>
            <Datetime
    id="dateFrom"
    name="dateFrom"
    placeholder="Enter date"
    value={props.values.dateFrom}
    onChange={(dateFromValue) => {props.setFieldValue('dateFrom', formatDate(dateFromValue))}}
    onBlur={props.onBlur}
    isInvalid={!!props.errors.dateFrom}
/>
<p>商品结束时间</p>
            <Datetime
    id="dateTo"
    name="dateTo"
    placeholder="Enter date"
    value={props.values.dateTo}
    onChange={(dateToValue) => {props.setFieldValue('dateTo', formatDate(dateToValue))}}
    onBlur={props.onBlur}
    isInvalid={!!props.errors.dateTo}
/>
            <div className="submit-area">
              <button type="submit">提交</button>
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
  const path = context.params.pid
  console.log(path)
  const data = await fetcher("https://api.hezh.fail/api/product/"+path)
  return {
    props: {
      session,
      data
    }
  }
}

