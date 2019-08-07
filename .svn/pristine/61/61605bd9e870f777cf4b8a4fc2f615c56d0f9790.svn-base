import axios from "axios";
import qs from "qs";
import router from "../../router";
import { Dialog, Toast } from 'vant';
import Global from '@/components/Global';

let baseUrl = process.env.VUE_APP_API_BASE_URL + '/';

/****** 创建axios实例 ******/
const service = axios.create({
    baseURL: baseUrl,       //process.env.BASE_URL,  // api的base_url
    timeout: 10000           // 请求超时时间
});

/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {

    //开始加载
    // console.log(config.headers.hideLoading);
    if(!config.headers.hideLoading){        //是否显示加载框
        if(Global.axiosLoading){            //限制触发频率
            Global.axiosLoading= false;
            setTimeout(function(){
                Toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                Global.axiosLoading= true;
            },300);
        }
    }

    config.method === 'post'
        ? config.data = qs.stringify({...config.data})
        : config.params = {...config.data};
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    config.headers['XX-Token'] = localStorage.token ? localStorage.token : '';
    config.headers['XX-Device-Type'] = 'mobile';

    return config;
}, error => {  //请求错误处理

    Toast.clear();      //关闭加载提示
    Toast.fail('网络异常!');
    Promise.reject(error)
});


/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
    response => {  //成功请求到数据

        Toast.clear();      //关闭加载提示

        //保存token
        if(response.headers['xx-token']){
            localStorage.setItem('token',response.headers['xx-token']);
        }

        return response.data;
    },
    error => {  //响应错误处理

        Toast.clear();      //关闭加载提示

        //获取异常的数据信息
        let response = error.response.data;

        if(response['status_code'] === 401 && response.code === 40101){    //登录失效
            router.push({ path: '/bindPhone' });return;
        }

        if(response['status_code'] === 401 && response.code === 40102){    //token过期
            againRequest(error,'refreshToken');
        }

        if(response['status_code'] === 428){    //数据异常
            Toast.fail(response['message']);
            return;
        }

        if(response['status_code'] === 409){    //弹框提示数据异常
            Dialog.alert({
                title: '警告',
                message: response['message']
            });
            return;
        }

        // Toast.fail('网络异常');
        return Promise.reject(error)
    }
);

/**
 * 刷新token同时请求上一次请求
 *
 * @param error
 * @param handle
 * @returns {Promise<AxiosResponse<T>>}
 */
async function againRequest (error,handle) {
    let response;
    switch (handle) {
        case 'refreshToken':
            response = await refreshToken();
            break;
    }

    let newToken = response.headers['xx-token'];

    let config = error.response.config;
    config.headers['XX-Token'] = newToken;
    if(newToken){
        localStorage.setItem('token',newToken);
    }

    return await axios.request(config); //重新发送请求

}

/**
 * 刷新token
 *
 * @returns {Promise<AxiosResponse<T> | never>}
 */
function refreshToken() {
    return axios.get(baseUrl+'refresh_token',{
        headers:{'XX-Token':localStorage.token,'XX-Device-Type':'mobile'}
    }).then(response => {
        return response;
    }).catch(error =>{
        let response = error.response.data;
        if(response['status_code'] === 401 && response.code === 40110){    //token被加黑名单
            //重新登录
            Dialog.alert({
                message: '数据异常，请重新登录！'
            }).then(() => {
                localStorage.removeItem('token');
                router.push({ path: '/bindPhone' });
            });
        }
    });
}

export default service;