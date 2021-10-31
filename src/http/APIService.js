import axios from 'axios';
/* const API_URL = 'http://127.0.0.1:8000/';  */
const API_URL = 'https://memenationz.pythonanywhere.com/'
export class APIService {
  constructor() {

  }

  /* Customers stuff */
  GetCustomer(customer_pk) {
    const url = `${API_URL}/api/customers/${customer_pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  getCustomerList() {
    const url = `${API_URL}/api/customers/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  addNewCustomer(customer){
    const url = `${API_URL}/api/customers/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.post(url, customer, {headers: headers});
  }

  updateCustomer(customer){
    const url = `${API_URL}/api/customers/${customer.pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, customer, {headers: headers});
  }

  deleteCustomer(customer_Pk){
    const url = `${API_URL}/api/customers/${customer_Pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }


  /* Investment stuff */


  GetInvestment(investment_pk) {
    const url = `${API_URL}/api/investments/${investment_pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  getInvestmentList() {
    const url = `${API_URL}/api/investments/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  addNewInvestment(investments){
    const url = `${API_URL}/api/investments/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.post(url, investments, {headers: headers});
  }

  updateInvestment(investments){
    const url = `${API_URL}/api/investments/${investments.pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, investments, {headers: headers});
  }

  deleteInvestment(investments_Pk){
    const url = `${API_URL}/api/investments/${investments_Pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }

  /* Stock stuff */

  GetStock(stock_pk) {
    const url = `${API_URL}/api/stocks/${stock_pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  getStockList() {
    const url = `${API_URL}/api/stocks/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }

  addNewStock(stocks){
    const url = `${API_URL}/api/stocks/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.post(url, stocks, {headers: headers});
  }

  updateStock(stocks){
    const url = `${API_URL}/api/stocks/${stocks.pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, stocks, {headers: headers});
  }

  deleteStock(stocks_Pk){
    const url = `${API_URL}/api/stocks/${stocks_Pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }


  authenticateLogin(credentials) {
    const url = `${API_URL}/auth/`;
    return axios.post(url, credentials);
  }
}
