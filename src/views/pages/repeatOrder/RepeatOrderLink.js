// Link dummy for testing using JSON - Server

// base url
const base_url = "http://localhost:3004";

// Endpoint
const get_products = base_url + "/products?_sort=procode&_order=asc";
const get_order_numb = base_url + "/th_reqprod";
const get_request_order = base_url + "/th_reqprod?_embed=td_reqprod";

export { get_products, get_order_numb, get_request_order };

