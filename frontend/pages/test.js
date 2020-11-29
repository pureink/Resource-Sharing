import * as moment from 'moment';
function formatDate(momentDate) {        
  return moment(momentDate).format("YYYY-MM-DD hh:mm:ss");
}
export default function Test(){
    const product={
        id: '1',
        name: 'a73841959',
        productname: 'dust3',
        productimg: 'https://img.hezh.in/map-badge/dust2.png',
        price: 2,
        per: '元/局',
        starttime: '2020-11-01T00:00:00.000Z',
        endtime: '2020-11-11T00:00:00.000Z',
        multi: 1
      }
    return(
        <div>
        <p>欢迎订购</p>
        <div className="productpage">
        <h2>{product.productname}</h2>
        <img className="" src={product.productimg}></img>
    <p>{product.price}{product.per}</p>
    <p>发布者:{product.name}</p>
    <p className="time">{formatDate(product.starttime)}</p>
    <p className="time">{formatDate(product.endtime)}</p>

      </div>
      </div>
    )
}