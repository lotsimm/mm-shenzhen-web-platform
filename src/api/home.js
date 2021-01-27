import * as API from './index'

export const login=(params)=>{
    return API.Login('/account/login',params)
}


//品牌
export const brandPage=(params)=>{
    return API.GET('/brand/page',params)
}
export const brandSave=(params)=>{
    return API.POST('/brand/save',params)
}
export const brandDel=(params)=>{
    return API.Del('/brand/del/',params)
}

//坐标
export const mapPage=(params)=>{
    return API.GET('/map/page',params)
}
export const mapSave=(params)=>{
    return API.POST('/map/save',params)
}
export const mapDel=(params)=>{
    return API.Del('/map/del/',params)
}
export const mapStatus=(params)=>{
    return API.GET('/map/stats',params)
}



