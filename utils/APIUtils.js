const { expect } = require('@playwright/test');

class APIUtils{


    constructor(request){       
        this.request = request;
    }


    async getToken(){
          const response = await this.request.post(
            'https://rahulshettyacademy.com/api/ecom/auth/login',
            {
              data: {
                userEmail: 'priyalal2792@gmail.com',
                userPassword: 'Tieto@123#',
              },
            }
          );
        
          const responseBody = await response.json();
          console.log('Login Response:', responseBody);
        
          this.token = responseBody.token;
          return this.token;
    }


    async add_to_cart(){
        
        const cartItems = [
        {
          _id: '67f506fbfc76541aad250e7a',
          product: {
            _id: '67a8dde5c0d3e6622a297cc8',
            productName: 'ZARA COAT 3',
            productCategory: 'fashion',
            productSubCategory: 'shirts',
            productPrice: 31500,
            productDescription: 'Adidas Originals',
            productImage: 'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg',
            productRating: '0',
            productTotalOrders: '0',
            productStatus: true,
            productAddedBy: 'admin@gmail.com',
            __v: 0,
            productFor: 'family',
          },
        },
        {
          _id: '67f506fbfc76541aad250e7a',
          product: {
            _id: '67a8df1ac0d3e6622a297ccb',
            productName: 'ADIDAS ORIGINAL',
            productCategory: 'fashion',
            productSubCategory: 'shirts',
            productPrice: 31500,
            productDescription: 'Addias Originals',
            productImage: 'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649488046.jpg',
            productRating: '0',
            productTotalOrders: '0',
            productStatus: true,
            productFor: 'women',
            productAddedBy: 'admin@gmail.com',
            __v: 0,
          },
        },
        {
          _id: '67f506fbfc76541aad250e7a',
          product: {
            _id: '67a8df56c0d3e6622a297ccd',
            productName: 'IPHONE 13 PRO',
            productCategory: 'electronics',
            productSubCategory: 'mobiles',
            productPrice: 231500,
            productDescription: 'iphonenew',
            productImage: 'https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649561326.jpg',
            productRating: '0',
            productTotalOrders: '0',
            productStatus: true,
            productFor: 'women',
            productAddedBy: 'admin@gmail.com',
            __v: 0,
          },
        },
      ];
    
      for (const item of cartItems) {
        const res = await this.request.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart', {
          headers: {
            Authorization: this.token,
            'Content-Type': 'application/json',
          },
          data: item,
        });
        expect(res.ok()).toBeTruthy();
      }
    }

    async place_order(){
        if (!this.token) {
      await this.getToken();
    }
        const x_xsrf_token="eyJpdiI6IkdNdk8wM3NOZzVaYURlaWpFTEUzSXc9PSIsInZhbHVlIjoiWjVhTkZNSmVTaTN4OUkwOEdRaDliaVVpcEV5N3FuUnV1bHBoL1ZxQ0tneE5vdkFnZ2s0Q1JqbzJ6VWt3UGdqRUU5TEN4ZmRZUHdkNUVadGpwREtkaldHWk9kajJSY3ZWQ2tkY0NhTHN1MUJ5QURLYkhUZHFUbG5hWDJ2OUlsT0YiLCJtYWMiOiJhMGYwY2E0NjM0MDgyMTEwYTRhY2JlNmUxMzhiMzlkNjZjMWI5YzZjNDFhZWExZTM1OTA2OGFkZjdhM2VhYTlhIiwidGFnIjoiIn0="
            const place_order_body={"orders":[{"country":"India","productOrderedId":"67a8dde5c0d3e6622a297cc8"},{"country":"India","productOrderedId":"67a8df1ac0d3e6622a297ccb"},{"country":"India","productOrderedId":"67a8df56c0d3e6622a297ccd"}]}
        
            const response_place_order = await this.request.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                {
                    headers: {
                        authorization: this.token,
                        "content-type": "application/json",
                        "x-xsrf-token": x_xsrf_token
                    },
                    data: place_order_body           
                }
            )
        
            const response_place_order_rponse = await response_place_order.json()
            console.log("response_place_order_rponse ", response_place_order_rponse)
            
    }


}

module.exports = APIUtils;