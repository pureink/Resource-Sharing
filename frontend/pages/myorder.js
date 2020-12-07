import Layout from '../components/layout'
import { getSession } from 'next-auth/client'
import {orderInfo} from '../utils/orderInfo'
import * as moment from 'moment';
import { Table,Link,Text } from '@geist-ui/react'
function formatDate(momentDate) {        
    return moment(momentDate).format("MM/DD/YYYY hh:mm:ss");
  }

export default function Page ({orders}) {
  if (orders.length==0) {
    return (
      <Layout>
          <Text p>
            还没有出售信息
          </Text>
      </Layout>
    )
  }
  async function deleteRow(i, e) {
    e.preventDefault();
    if(typeof window !== "undefined"){
      if(window.confirm('真的要删除么？')){
        await fetch('https://api.hezh.fail/order/' + orders[i].id, {
          method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
        alert("成功")
      }
    else{
      alert("那没事了")
    }
  }
  }
  const items=[]
  for (var i=0;i<orders.length;i++){
    let data={}
    data['订单编号']=<Link href={"/order/"+orders[i].id} underline block>{orders[i].id}</Link>
    data['物品名称']=<Link href={"/product/"+orders[i].productid} underline block>{orders[i].productname}</Link>
    data['订购日期']=formatDate(orders[i].time)
    data['供货商']='由'+orders[i].touser+'购买'
    data['状态']=orderInfo(orders[i].status)
    data['操作']=<Button onClick={deleteRow.bind(this, i)}>删除订单</Button>
    items.push(
      data
    )
  }
  return (
    <Layout>
        <Table data={items} className='tablemybusiness'>
          <Table.Column prop="订单编号" label="订单编号" />
          <Table.Column prop="物品名称" label="物品名称" />
          <Table.Column prop="订购日期" label="订购日期" />
          <Table.Column prop="供货商" label="供货商" />
          <Table.Column prop="状态" label="状态" />
          <Table.Column prop="操作" label="操作" />
        </Table>
    </Layout>
  )
}

export async function getServerSideProps(context) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const session = await getSession(context)
    const res = await fetch('https://api.hezh.fail/myorder/'+session.user.name)
    const json = await res.json()
    const orders=json.response
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        session,
        orders
      },
    }
  }
