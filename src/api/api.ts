import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'http://79.143.31.216/'
})
export const authAPI = {
    async login(username: string, password: string) {
        const response = await axios(
            {
                method: 'post',
                url: 'http://79.143.31.216/login',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: `username=${username}&password=${password}`
            })
        return response;
    },
    async signIn(username: string, password: string){
        const response = await instance.post(`/register?username=${username}&password=${password}`, {}, {
            headers: {
                'accept': 'application/json',
            }
        })
        return response;
    }
}
export const linksAPI = {
    async fetchLinks(order:string, access_token: string, token_type: string) {
        const response = await axios({
            method: 'get',
            url: `http://79.143.31.216/statistics?order=${order}`,
            headers: {
                'accept': 'application/json',
                'Authorization': `${token_type} ${access_token}`,
            }
        })
        return response
    },
    async getShortLink(target: string, access_token: string, token_type: string) {
        const response = await axios({
            method: 'post',
            url: 'http://79.143.31.216/squeeze',
            params:{
                link: target
            },
            headers: {
                'accept': 'application/json',
                'Authorization': `${token_type} ${access_token}`,
            },
            data: ''
        })
        return response
    }
}
