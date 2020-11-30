export  function orderInfo(status){
    if(status===0)return "待商家确认"
    if(status===1)return "订单待发货"
    if(status===2)return "已发货待确认"
    if(status===3)return "订单已完成"
    }