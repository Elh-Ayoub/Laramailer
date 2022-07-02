import Http from "../http-common";


class AuthServices{

    login(data){
        return Http.post("/auth/login", data, {withCredentials: true})
    }

    register(data){
        return Http.post("/auth/register", data)
    }

    logout(){
        return Http.post("/auth/logout", null, {withCredentials: true})
    }

    user(){
        return Http.get("/auth/user", {withCredentials: true})
    }
}

export default new AuthServices()
