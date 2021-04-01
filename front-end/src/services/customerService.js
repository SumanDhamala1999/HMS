import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/customers";

function CustomerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCustomers() {
  return http.get(apiEndpoint);
}

export function getCustomer(customerId) {
  return http.get(CustomerUrl(customerId));
}

export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(CustomerUrl(customer._id), body);
  }

  return http.post(apiEndpoint, customer);
}

export function deleteCustomer(customerId) {
  return http.delete(CustomerUrl(customerId));
}
