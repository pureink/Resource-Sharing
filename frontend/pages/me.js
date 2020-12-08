import Layout from '../components/layout'
import * as moment from 'moment';
import { getSession } from 'next-auth/client'
import Datetime from 'react-datetime'
import { Text } from '@geist-ui/react'
import AccessDenied from '../components/access-denied'
function formatDate(momentDate) {        
  return moment(momentDate).format("MM/DD/YYYY hh:mm:ss");
}
export default function Page ({products,session}) {
  if (products.length==0) {
    return (
      <Layout>
          <Text p>
            还没有发布过商品呢
          </Text>
      </Layout>
    )
  }
  const items=[]
  for (var i=0;i<products.length;i++){
    items.push(
      <div className="product">
        <img className="productimg" src={products[i].productimg}></img>
        <a href={"/product/"+products[i].id}><h2>{products[i].productname}</h2></a>
    <p>{products[i].price}{products[i].per}</p>
    <p>发布者:{products[i].name}</p>
    <p className="time">{formatDate(products[i].starttime)}</p>
    <p className="time">{formatDate(products[i].endtime)}</p>
    <p>{products[i].status? "已被购买":"正在出售"}</p>
      </div>
    )
  }
  return (
    <Layout>
  <div className="products">{items}</div>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const session = await getSession(context)
  // const session = {
  //   user: {
  //     name:'123'
  //   }
  // }
  const res = await fetch('https://api.hezh.fail/api/user/'+session.user.name)
  const json = await res.json()
  const products=json.response
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      session,
      products
    },
  }
}
