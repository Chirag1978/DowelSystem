import { get, put, post, remove } from "./client";

const fetchCustomerList = async () =>{
    try {
        const response = await get('GetCustomers');
        if (response.success) {
            console.log('User data:', response.data);
            return response.data
        } else {
            console.error('Error:', response.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
const addCustomer = async (data: any) =>{
    try {
        const response = await post('AddCustomer', data);
        if (response.success) {
            console.log('User data:', response.data);
            return response.data
        } else {
            console.error('Error:', response.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
const updateCustomer = async (data: any) =>{
    try {
        const response = await put('UpdateCustomer', data);
        if (response.success) {
            console.log('User data:', response.data);
            return response.data
        } else {
            console.error('Error:', response.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
const deleteCustomer = async (id: any) =>{
    try {
        const response = await remove<{}>('DeleteCustomer/'+id);
        if (response.success) {
            console.log('User data:', response.data);
            return response.data
        } else {
            console.error('Error:', response.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

const apiService  = {
    fetchCustomerList,
    addCustomer,
    updateCustomer,
    deleteCustomer
}
export default apiService