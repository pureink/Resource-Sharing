export function genid(username){
    let nowDate = new Date()
    let year = nowDate.getFullYear()
    let month = nowDate.getMonth() + 1
    let day = nowDate.getDate()
    var hh = nowDate.getHours();
    var mm = nowDate.getMinutes();
    var ss= nowDate.getSeconds();
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    var result = username+'-'+year + month +day+hh+mm+ss
    return result
}