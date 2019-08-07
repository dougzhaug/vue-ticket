export default {

    /**
     * 拼接图片的地址
     *
     * @param url
     * @returns {string|*}
     */
    jointImgUrl(url){
        if(url){
            if(url.indexOf('http') >= 0){
                return url;
            }else{
                return process.env.VUE_APP_IMG_BASE_URL + url;
            }
        }
    }
}