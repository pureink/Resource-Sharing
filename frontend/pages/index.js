import Layout from '../components/layout'
import {Pagination, Link} from '@geist-ui/react'
import * as moment from 'moment';
function formatDate(momentDate) {        
  return moment(momentDate).format("MM/DD/YYYY hh:mm:ss");
}
export default function Page ({products}) {
  const items=[]
  for (var i=0;i<products.length&&i<4;i++){
    items.push(
      <div key ={i} className="product">
        <img className="productimg" src={products[i].productimg}></img>
        <a href={"/product/"+products[i].id}><h2>{products[i].productname}</h2></a>
    <p>{products[i].price}{products[i].per}</p>
    <p>发布者:{products[i].name}</p>
    <p className="time">{formatDate(products[i].starttime)}</p>
    <p className="time">{formatDate(products[i].endtime)}</p>

      </div>
    )
  }
  return (
    <Layout>
  <div className="products">{items}</div>
  <Link href={"/pages/1"} underline block>查看更多</Link>
    </Layout>
  )
}
export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://api.hezh.fail/api/products/1')
  const json = await res.json()
  const products=json.response
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products,
    },
  }
}