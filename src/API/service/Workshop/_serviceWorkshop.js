import AxiosConfig from "../../AxiosConfig"


export const getFolderWorkshop = async () => {
    try {
        const response = await AxiosConfig.get('/folder')
        return response.data
    } catch (error) {
        throw error
    }
}

export const getFileWorkshop = async (id) => {
    try {
        const response = await AxiosConfig.get('/folder/' + id)
        return response.data
    } catch (error) {
        throw error
    }
}