import Layout from "../../components/layout"
import {Formik} from 'formik'
import * as moment from 'moment';
function formatDate(momentDate) {        
    return moment(momentDate).format("YYYY-MM-DD hh:mm:ss");
  }
const fetcher = url => fetch(url).then(res => res.json());
export default function Search(props){
    const products=props.products
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

      </div>)
  }
  if(items.length===0)
  return(
    <Layout>
    <h1>您搜索的结果为空</h1>
    <Formik initialValues={{
        name: ""
      }}
      onSubmit={(values) => {
        window.location.href =`/search/`+values.name
      }}
      render={props=>
        <form onSubmit={props.handleSubmit}>
          <label className="slabel"><input placeholder="Search product..." className="searchbox" type="text" id="name" name="name" value={props.values.name}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.name && props.errors.name && <div>{props.errors.name}</div>}</label>
              <button className="scbtn" type="submit">search!</button>
          </form>
      }/>
</Layout>
  )
  else{
    return(
        <Layout>
                  <Formik initialValues={{
        name: ""
      }}
      onSubmit={(values) => {
        window.location.href =`/search/`+values.name
      }}
      render={props=>
        <form onSubmit={props.handleSubmit}>
          <label className="slabel"><input placeholder="Search product..." className="searchbox" type="text" id="name" name="name" value={props.values.name}
                                        onChange={props.handleChange} onBlur={props.handleBlur}/>
{props.touched.name && props.errors.name && <div>{props.errors.name}</div>}</label>
              <button className="scbtn" type="submit">search!</button>
          </form>
      }/>
            <h1>以下是您的搜索结果</h1>
        <div className="products">{items}</div>
        </Layout>
    )
  }


}
export async function getServerSideProps(context) {
    const path = context.params.sid
    console.log(path)
    const data = await fetcher("https://api.hezh.fail/search/"+path)
    const products=data.response
    return {
      props: {
        products
      }
    }
}
  
  