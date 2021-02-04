import axios from 'axios';
import { Message } from 'element-ui'

console.log(process.env.IS_ENV)
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // config.headers['Authorization'] = localStorage.getItem('token')
    // 在发送请求之前做些什么;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use( (res)=> {
    // 对响应数据做点什么;
    if (res.data.code == 0) {
        return res.data
    } else if (res.data.code == -2) {
        Message.error({
            message: '登录信息失效，请重新登录'
        })
        window.location.href = '#/'
        localStorage.clear()
        return Promise.reject(res.data)
    }
    else {
        // 统一处理提示
        Message.error({
            message: res.data.msg,
            duration:2000
        })
        return Promise.reject(res.data)
    }

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

let baseUrl="https://prod.mm-iworld.com/sz-map";
// let baseUrl="http://192.168.11.243:8080";



export const Login=(url,params)=>{
    return axios.get(`${baseUrl}${url}`,{params:params}).then((data)=>{return data})
}

export const GET=(url,params,headers)=>{
    return axios.get(`${baseUrl}${url};jsessionid=`+localStorage.getItem("sessionId"),{params:params},headers).then((data)=>{return data})
}


export const POST=(url,params,headers)=>{
    return axios.post(`${baseUrl}${url};jsessionid=`+localStorage.getItem("sessionId"),params,headers).then((data)=>{ return data})
}
export const Del=(url,params,headers)=>{
    return axios.get(`${baseUrl}${url}`+params+';jsessionid='+localStorage.getItem("sessionId"),headers).then((data)=>{ return data})
}