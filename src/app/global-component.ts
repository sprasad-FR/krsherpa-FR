export const GlobalComponent = {
    // Api Calling
   // API_URL : 'https://api-node.themesbrand.website/',
   //API_URL : 'http://[::1]:3000',
 
    
    headerToken : {'Authorization': `Bearer ${sessionStorage.getItem('token')}`},
    API_URL : 'http://[::1]:3000',
    AUTH_API:"http://[::1]:3000/users/login", 

    // Auth Api 
     // AUTH_API:"http://[::1]:3000/users/login",
    // AUTH_API:"https://api.krsherpa.com/users/login",
    // API_URL : 'https://api.krsherpa.com',
//Final 03Jan2024
 //  API_URL : 'https://devapi.krsherpa.com/', 
//     AUTH_API:"https://devapi.krsherpa.com/users/login",
     
     

    //AUTH_API:"https://api-node.themesbrand.website/auth/",
    // Products Api
    product:'apps/product',
    productDelete:'apps/product/',

    // Orders Api
    order:'apps/order',
    orderId:'apps/order/',

    // Customers Api
    customer:'apps/customer',
}