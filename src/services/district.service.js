import api from "./api"

export const getDistrict = async ()=>{
    try {
        const url = "District";
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return [];
    }
}