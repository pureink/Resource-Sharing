import Layout from '../components/layout'
import { getSession } from 'next-auth/client'
import {orderInfo} from '../utils/orderInfo'
import * as moment from 'moment';
import { Table } from '@geist-ui/react'
function formatDate(momentDate) {        
    return moment(momentDate).format("MM/DD/YYYY hh:mm:ss");
  }

export default function Page ({orders, product}) {
  const items=[]
  for(var i=0; i<orders.length;i++)
  {
    let data = {}
    data["订单编号"] = <a href={"/product/"+ orders[i].productid}>{orders[i].id}</a>
    data["物品名称"] = <a href={"/product/"+ orders[i].productid}>{orders[i].productname}</a>
    data["订购日期"] = formatDate(orders[i].time)
    data["供货商"] = orders[i].fromuser
    data["状态"] = orderInfo(orders[i].status)
    items.push(data)
  }
  return (
    <Layout>
        <h2>以下是您订购的商品</h2>
    <Table data={items}>
      <Table.Column prop="订单编号" label="订单编号"/>
      <Table.Column prop="物品名称" label="物品名称" />
      <Table.Column prop="订购日期" label="订购日期" />
      <Table.Column prop="供货商" label="供货商" />
      <Table.Column prop="状态" label="状态"/>
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