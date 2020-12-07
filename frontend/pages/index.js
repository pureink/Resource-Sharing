import Layout from '../components/layout'
import * as moment from 'moment';
import { Formik} from 'formik';
function formatDate(momentDate) {        
  return moment(momentDate).format("MM/DD/YYYY hh:mm:ss");
}
export default function Page ({products}) {
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
      <Formik initialValues={{
        name: ""
      }}
      onSubmit={(values) => {
        window.location.href =`/search/`+values.name
      }}
      render={props=>
        <form onSubmit={props.handleSubmit}>
          <p>search</p>
          <label className="label"></label><input className="searchbox" type="text" id="name" name="name" value={props.values.name}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.name && props.errors.name && <div>{props.errors.name}</div>}
<div className="submit-area">
              <button className="smbtn" type="submit">submit!</button>
            </div>
          </form>
      }/>
  <div className="products">{items}</div>
    </Layout>
  )
}
export async function getServerSideProps() {
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