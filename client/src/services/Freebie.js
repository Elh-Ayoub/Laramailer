import http from "../http-common";


class FreebieServices{
    index(){
        return http.get('/freebies', {withCredentials: true})
    }

    store(data){
        return http.post('/freebies', data, {withCredentials: true})
    }
}

export default new FreebieServices()
