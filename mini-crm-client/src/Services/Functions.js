import axios from 'axios'

const url = 'http://localhost:8000/api/';
const Auth_token = localStorage.getItem('token');
const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${Auth_token}`
}
const get = async (url) => {

    return await axios.get(
        url,
        {
            headers: headers
        }
    ).then(res => {

        return res;
    })
        .catch(err => {
            console.log(err);
        })
}
const post = async (url, data) => {
    return await axios.post(
        url,
        data,
        {
            headers: headers
        }
    ).then(res => {

        return res;
    })
        .catch(err => {
            console.log(err);
        })
}

export const getData = async (resource, pageNum = 1) => {
    return get(url + resource + '?page=' + pageNum);
}
export const addData = async (resource, formData) => {
    return await post(url + resource, formData)
}
export const getEdit = (resource, id) => {
    return get(url + resource + "/" + id + '/edit')
}
export const updateData = (resource, id, data) => {
    return post(url + resource + "/" + id + '?_method=put', data)
}
export const getValues = async () => {
    return get(url + 'company-values')
}
export const deleteData = async (resource, id) => {
    return axios.delete(url + resource + '/' + id, {
        headers: headers
    })
}

export const postLogout = () => {
    return post(url + "logout",[])
}
