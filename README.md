# React + DynamoDB Testing

This is a repo to test React + DynamoDB pairing. Most of the material here is taken from Amazon's [DynamoDB + Javascript](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.JavaScript.html) tutorial. Instead of vanilla JS, I used React instead. Instead of localhost endpoint, I used my own dynamoDB endpoint instead.


## Usage

1. Install all dependencies. `npm install`
2. Log in to AWS, go to DynamoDB, and create your table. In my case, I created one named `"Donuts"` with `"Flavor"` attribute.
3. Input your constants. In my case, my DynamoDB is under us-west-1 region. **Make sure they match your actual DynamoDB Region** or you'll see `"Requested resource not found"` error.
4. That's it! Happy coding :)

```
const AWS_REGION = 'us-west-1';

const END_POINT_WEB = 'dynamodb.us-west-1.amazonaws.com';

const ACCESS_KEY_ID_WEB = 'your_key_id_here';

const SECRET_ACCESS_KEY_WEB = 'your_secret_access_key_here';

const TABLE_NAME = "Donuts";
```

*Uses [react-multistep](https://github.com/srdjan/react-multistep)*
