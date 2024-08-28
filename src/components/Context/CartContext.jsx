import axios from 'axios';
import { createContext } from 'react'
 
export let CartContext =createContext();
export function CartContextProvider(props) {

    let headers={
        token :localStorage.getItem('userToken'),
}
function getLoggedUserCart(){
 return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{ headers}
  
    
)
.then((responce)=>
    responce
)
.catch((error)=>
    error   
)
}
console.log(headers);

 async function addProductToCart(productId) {
     return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId:productId
    },{headers})
    .then((responce)=>
        responce
    )
    .catch((error)=>
        error
        
    ) 
}
async function updateCertItemCount(productId,count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
count:count   
},{headers})
   .then((responce)=>
       responce
   )
   .catch((error)=>
       error
       
   ) 
}
async function deleteItemFromCart(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`

,{headers})
   .then((responce)=>
       responce
   )
   .catch((error)=>
       error
       
   ) 
}
function checkOut(cartId ,url , formValues) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}` ,{
        shippingAddress:formValues
    } , {
        headers:headers
    })
    .then((response) => response)
    .catch((error) => error)
}

  return <>
    <CartContext.Provider value={{getLoggedUserCart,addProductToCart,updateCertItemCount,deleteItemFromCart,checkOut}}>
{props.children}
    </CartContext.Provider>
    </>
}
