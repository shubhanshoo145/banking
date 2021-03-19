# Assignment

## Start-up

In order to launch the application for the first time, please execute the following steps:

1. Create an `.env` file. Please use the `.env-example` as a reference to which fields are required.
2. Launch the application in docker, by executing `docker-compose up`.

## Usage

The APIs are provided below
First need to create an account and then proceed with other banking operations

#### Account Creation API
```
curl --location --request POST 'localhost:4703/api/v1/createAccount' \
--header 'Content-Type: application/json' \
--data-raw '{
    "accountNumber": "34567890",
    "cardNumber":"32425245245",
    "pin":"1234"
}'
```

#### Banking APIs
```
curl --location --request POST 'http://localhost:4703/api/v1/deposit' \
--header 'Content-Type: application/json' \
--data-raw '{
    "accountNumber":"34567890",
    "amount":100
}'
```

```
curl --location --request POST 'http://localhost:4703/api/v1/withdraw' \
--header 'Content-Type: application/json' \
--data-raw '{
    "cardNumber":"32425245245",
    "pin":"1234",
    "amount":10
}'
```

```
curl --location --request POST 'http://localhost:4703/api/v1/balanceEnquiry' \
--header 'Content-Type: application/json' \
--data-raw '{
    "cardNumber":"32425245245",
    "pin":"1234"
}'
```

```
curl --location --request POST 'http://localhost:4703/api/v1/miniStatement' \
--header 'Content-Type: application/json' \
--data-raw '{
    "cardNumber":"32425245245",
    "pin":"1234"
}'
```

#### Tech Stack
- NodeJS
- MongoDB (without ACID)