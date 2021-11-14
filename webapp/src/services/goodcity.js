import { Axios } from "axios";
import config from "../config";
import store from "../store";

const client = new Axios({
  baseURL: config.endpoints.http
})

const apiHeaders = () => ({
  "accept": "application/json",
  "cache-control": "no-cache",
  "Authorization": `Bearer ${store.getters.authToken}`,
  "x-goodcity-app-name": "stock .goodcity",
  "page_size": 1000
});

export async function loadBookingTypes() {
  let { data } = await client.get('/api/v1/booking_types', {
    headers: apiHeaders()
  });

  data = typeof data === 'string' ? JSON.parse(data) : data;

  return data['booking_types'];
}

export async function loadOrders() {
  const start = new Date();
  start.setUTCHours(0,0,0,0);

  const end = new Date();
  end.setUTCHours(23,59,59,999);

  let { data } = await client.get('/api/v1/orders', {
    params: {
      after: start.getTime(),
      before: end.getTime()
    },
    headers: apiHeaders()
  });

  data = typeof data === 'string' ? JSON.parse(data) : data;

  const orders = data['orders'] || data['designations'] || [];

  const findChild = (key, id) => {
    return (data[key] || []).find(t => (
      t.designation_id === id || t.order_id === id
    ));
  }

  const findChildren = (key, id) => {
    return (data[key] || []).filter(t => (
      t.designation_id === id || t.order_id === id
    ));
  }

  return orders.map(o => ({
    ...o,
    order_transport: findChild('order_transports', o.id),
    goodcity_requests: findChildren('goodcity_requests', o.id),
    orders_packages: findChildren('orders_packages', o.id),
  }))
}
