import Layout from '../components/layout'
import { getSession } from 'next-auth/client'
import {orderInfo} from '../utils/orderInfo'
import * as moment from 'moment';
import {Table, Link, Text} from '@geist-ui/react'

function formatDate(momentDate) {        
    return moment(momentDate).format("MM/DD/YYYY hh:mm:ss");
  }

export default function Page ({orders}) {
  if (orders.length==0) {
    return (
      <Layout>
          <Text p>
            还没有进行过购买呢
          </Text>
      </Layout>
    )
  }
  const items=[]
  for (var i=0;i<orders.length;i++){
    let data={}
    data['订单编号']=<Link href={"/order/"+orders[i].id} underline block>{orders[i].id}</Link>
    data['物品名称']=<Link href={"/product/"+orders[i].productid} underline block>{orders[i].productname}</Link>
    data['订购日期']=formatDate(orders[i].time)
    data['购买者']='由'+orders[i].touser+'购买'
    data['状态']=orderInfo(orders[i].status)
    items.push(
      data
    )
  }
  return (
    <Layout>
        <Table data={items} className='tablemysell'>
          <Table.Column prop="订单编号" label="订单编号" />
          <Table.Column prop="物品名称" label="物品名称" />
          <Table.Column prop="订购日期" label="订购日期" />
          <Table.Column prop="购买者" label="购买者" />
          <Table.Column prop="状态" label="状态" />
        </Table>
    </Layout>
  )
}

export async function getServerSideProps(context) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
  const session = await getSession(context)
  const res = await fetch('https://api.hezh.fail/mysell/'+session.user.name)
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
