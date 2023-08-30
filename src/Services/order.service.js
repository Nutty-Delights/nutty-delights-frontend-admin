import http from '../http-common';
import { URLs } from './base_urls/constant';
class OrderDataService {

    orderUrl = URLs.order;
    getOrder(orderId) {
        return http.get(`/${this.orderUrl}/${orderId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
    }

    createOrder(data) {
        return http.post(`/${this.orderUrl}/`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        });
    }
    getUserOrders() {
        return http.get(`/${this.orderUrl}/user`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        });
    }
    getAllOrders() {
        return http.get(`${this.orderUrl}/`,);
    }
    shippedOrder(orderId) {
        return http.put(`${this.orderUrl}/${orderId}/ship`,);
    }
    deliveredOrder(orderId) {
        return http.put(`${this.orderUrl}/${orderId}/deliver`,);
    }
    cancelOrder(orderId) {
        return http.put(`${this.orderUrl}/${orderId}/cancel`,);
    }
    deleteOrder(orderId) {
        return http.put(`${this.orderUrl}/${orderId}/delete`,);
    }




}

// eslint-disable-next-line import/no-anonymous-default-export
export default new OrderDataService();