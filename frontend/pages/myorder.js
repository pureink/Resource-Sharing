import Layout from '../components/layout'
import { getSession } from 'next-auth/client'
import {orderInfo} from '../utils/orderInfo'
import * as moment from 'moment';
function formatDate(momentDate) {        
    return moment(momentDate).format("MM/DD/YYYY hh:mm:ss");
  }
export default function Page ({orders}) {
  const items=[]
  for (var i=0;i<orders.length;i++){
    items.push(
    <tbody key ={i} className="orders"> 
    <tr>
    <td><a href={`/order/${orders[i].id}`}>{orders[i].id}</a></td>
    <td><a href={"/product/"+orders[i].productid}>{orders[i].productname}</a></td>
    <td>{formatDate(orders[i].time)}</td>
    <td>从{orders[i].fromuser}手中购买</td>
    <td>{orderInfo(orders[i].status)}</td>
    </tr>
</tbody>
    )
  }
  return (
    <Layout>
        <h2>以下是您订购的商品</h2>
<table>
    <thead>
        <tr>
            <th>订单编号</th>
            <th>物品名称</th>
            <th>订购日期</th>
            <th>供货商</th>
            <th>状态</th>
        </tr>
    </thead>
    {items}
</table>
    </Layout>
  )
}
export async function getServerSideProps(context) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const session = await getSession(context)
    //const session = await getSession(context)
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