import Layout from '../components/layout'

export default function Page ({products}) {
  const items=[]
  for (var i=0;i<products.length;i++){
    items.push(
      <div className="product">
        <img className="productimg" src={products[i].productimg}></img>
        <h2>{products[i].productname}</h2>
    <p>{products[i].price}{products[i].per}</p>
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
  const res = await fetch('http://localhost:3001/api/product')
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