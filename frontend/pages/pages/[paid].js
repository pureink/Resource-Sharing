import Layout from '../../components/layout'
import * as moment from 'moment';
import { Formik} from 'formik';
import {Pagination} from '@geist-ui/react'
import { useRouter } from 'next/router'

function formatDate(momentDate) {        
  return moment(momentDate).format("MM/DD/YYYY hh:mm:ss");
}

export default function Page ({products}) {
  const router = useRouter()
  function change(pageNumber) {
    router.push('/pages/'+pageNumber)
  }
  
  const items=[]
  for (var i=0;i<products.length;i++){
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
  <Pagination count={20} onChange={change}/>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const path = context.params.paid
  const res = await fetch("https://api.hezh.fail/api/product/"+path)
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