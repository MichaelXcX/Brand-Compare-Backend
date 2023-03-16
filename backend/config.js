let get_brands = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 0,
    "method": "socialinsider_api.get_brands",
    "params": {
        "projectname": "API_test"
    }
});

var config_brands = {
    method: 'post',
    url: 'https://app.socialinsider.io/api',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer API_KEY_TEST'
    },
    data : get_brands
};



module.exports = {get_brands, config_brands}
