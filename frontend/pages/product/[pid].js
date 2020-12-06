import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as moment from 'moment';
import Datetime from 'react-datetime'
import {genid} from '../../utils/genid'
function formatDate(momentDate) {        
  return moment(momentDate).format("YYYY-MM-DD hh:mm:ss");
}
//如果是个人的产品显示修改界面,否则显示订购界面
const fetcher = url => fetch(url).then(res => res.json());
function ttime (){
  let mtime=new Date()
  return formatDate(mtime)
}
export default function Product (props) {
  //change back please
  const buy=async(e)=>{
    e.preventDefault();
    if(typeof window !== "undefined"){
      if(window.confirm('真的要订购么？')){
        await fetch('https://api.hezh.fail/neworder/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            touser:session.user.name,
            productid:product.id,
            productname:product.productname,
            fromuser: product.name,
            time:ttime()
          })
        })
        await fetch('https://api.hezh.fail/productstatus',{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id:product.id,
            status:1
          })
        })
        window.location.href ='/myorder'
      }
    else{
      alert("那没事了")
    }
  }
  }
  const del=async(e)=>{
    e.preventDefault();
    if(typeof window !== "undefined"){
      if(window.confirm('真的要删除么？')){
        await fetch('https://api.hezh.fail/deletep/' + product.id, {
          method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
        window.location.href ='/'
      }
    else{
      alert("那没事了")
    }
    }
  
  }
  const session=props.session
  const data=props.data
  const product = data.response[0]
  const username = product.name
  console.log(product)
  // If no session exists, display access denied message
  //if (!session) { return  <Layout><AccessDenied/></Layout> }
  if(session.user.name!=username){
    return (
      <Layout>
      <div>
        <h2 style={{color:'rgb(52, 109, 241)'}}>欢迎订购</h2>
        <div className="buyproduct">
        <img src={product.productimg}></img>
        <a href={"/product/"+product.id}><h2>{product.productname}</h2></a>
        <p>{product.detail}</p>
    <p>{product.price}{product.per}</p>
    <p>发布者:{product.name}</p>
    <p className="time">{formatDate(product.starttime)}</p>
    <p className="time">{formatDate(product.endtime)}</p>
    <button className="postbtn" onClick={buy}>订购 </button>
      </div>
      </div>
      </Layout>
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
        dateTo:formatDate(product.endtime),
        detail:Product.detail
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
          dateTo:values.dateTo,
          detail:values.detail
        })
      })
      alert("修改成功")
      }}
    render={props =>
        <form onSubmit={props.handleSubmit}>
            <h1>修改商品信息</h1>
          <div className="content">
          <div>
              <label className="label">productname： </label><input className="inputbox" type="text" id="productname" name="productname" value={props.values.productname}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.productname && props.errors.productname && <div>{props.errors.productname}</div>}
            </div>
            <div>
              <label className="label">detail: </label><input className="inputbox" type="text" id="detail" name="detail" value={props.values.detail}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.detail && props.errors.detail && <div>{props.errors.detail}</div>}
            </div>
            <div>
              <label className="label">price： </label><input className="inputbox" type="text" id="price" name="price" value={props.values.price}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.price && props.errors.price && <div>{props.errors.price}</div>}
            </div>
            <div>
              <label className="label">单位： </label><input className="inputbox" type="text" id="per" name="per" value={props.values.per}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.per && props.errors.per && <div>{props.errors.per}</div>}
            </div>
            <div>
              <label className="label">imageurl： </label><input className="inputbox" type="text" id="image" name="image" value={props.values.image}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.image && props.errors.image && <div>{props.errors.image}</div>}
            <img className="displayimg"src={props.values.image}></img>
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
              <button className="postbtn"type="submit">提交</button>
            </div>
          </div>
        </form>
      }

//......
 />
<button className="deletebtn" onClick={del}>删除商品
</button>
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

