import Layout from '../components/layout'
import * as moment from 'moment';
function formatDate(momentDate) {        
  return moment(momentDate).format("YYYY-MM-DD hh:mm:ss");
}
export default function Page ({products}) {
  const items=[]
  for (var i=0;i<products.length;i++){
    items.push(
      <div className="product">
        <img className="productimg" src={products[i].productimg}></img>
        <a href={"/product/"+products[i].id}><h2>{products[i].productname}</h2></a>
    <p>{products[i].price}{products[i].per}</p>
    <p>{formatDate(products[i].starttime)}-{formatDate(products[i].endtime)}</p>
      </div>
    )
  }
  return (
    <Layout>
  <div className="products">{items}</div>
    </Layout>
  )
}
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://api.hezh.fail/api/product')
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