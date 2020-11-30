import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import React from 'react';
import * as moment from 'moment';
import {orderInfo} from '../../utils/orderInfo'
const fetcher = url => fetch(url).then(res => res.json());
function formatDate(momentDate) {        
  return moment(momentDate).format("YYYY-MM-DD hh:mm:ss");
}
export default function Product (props) {
//const session = props.session;
const conf1=async(e)=>{
  e.preventDefault();
  if(typeof window !== "undefined"){
    if(window.confirm('是否接受此订单')){
      fetch('https://api.hezh.fail/orderstatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:order.id,
          status:1
        })
      })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res))
    }
  else{
    //删除此订单并修改产品status（fetch put）
    fetch('https://api.hezh.fail/productstatus', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id:product.id,
        status:0
      })
    })
    fetch('https://api.hezh.fail/order', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id:order.id,
      })
    })
    window.location.href ='/'
    alert("已重新上架您的商品")
  }
}
}
const conf2=async(e)=>{
  e.preventDefault();
  if(typeof window !== "undefined"){
    if(window.confirm('是否确认收货？')){
      fetch('https://api.hezh.fail/orderstatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:order.id,
          status:3
        })
      })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res))
    }
  else{
    alert("那没事了")
  }
}
}
const send=async(e)=>{
  e.preventDefault();
  if(typeof window !== "undefined"){
    if(window.confirm('是否确认发货？')){
      fetch('https://api.hezh.fail/orderstatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id:order.id,
          status:2
        })
      })
      .then(res => res.text()) // or res.json()
      .then(res => console.log(res))
    }
  else{
    alert("那没事了")
  }
}
}
  const session=props.session
  const data=props.data
  const order = data.response[0]
  const info = props.info
  const product = info.response[0]
  const status = order.status
  console.log(info)
  console.log(order)
  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }
  //当前用户为该订单购买者
  //判断status
  if(session.user.name==order.touser){
    let btns
    if(status===2)
    btns = <button onClick={conf2} className="">确认收货</button>
    else 
    btns = <p>暂无可用操作，请耐心等待... </p>
    return (
      <div>
<h2>你是购买者,订单信息如下</h2>
<div>
  <p>{order.id}</p>
  <p>{order.productname}</p>
  <p>{formatDate(order.time)}</p>
</div>
<h2>订单状态</h2>
<p>{orderInfo(order.status)}</p>
<h2>选择您要进行的操作</h2>
{btns}
      </div>
    )
  }
  else if(session.user.name==order.fromuser)
  {
    let btns
    if(status===0)btns=<button onClick={conf1}>确认订单</button>
    if(status===1)btns=<button onClick={send}>确认发货</button>
    else btns=<p>暂无可用的操作</p>
    return(
      <div>
你是发布者
<div>
  <p>{order.id}</p>
  <p>{order.productname}</p>
  <p>{formatDate(order.time)}</p>
</div>
<h2>订单状态</h2>
<p>{orderInfo(order.status)}</p>
<h2>选择您要进行的操作</h2>
{btns}
      </div>
    )
  }
  else{
    return (
      <Layout>
        这个订单和你没有关系
      </Layout>
    )
  }

}
export async function getServerSideProps(context) {
  const session = await getSession(context)
  const path = context.params.oid
  console.log(path)
  const data = await fetcher("https://api.hezh.fail/order/"+path)
  const info = await fetcher("https://api.hezh.fail/api/product/"+data.response[0].productid)
  return {
    props: {
      session,
      data,
      info
    }
  }
}

