import { privateRequest } from "@/config/axios.config"

export const Index =  async()=>{
    return privateRequest.get('/admin/dashboard');
}