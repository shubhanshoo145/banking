# Reuters Service

## Reuters API documentation

Reuters API documentation can be found on the [official Thompson Reuters site](https://www.trkd.thomsonreuters.com/SupportSite/Home/Index?ReturnUrl=/SupportSite/TestApi/Catalog#).

Authentication is required in order to view the API documentation. Please see the configuration files for the credentials.

## Start-up

In order to launch the application for the first time, please execute the following steps:

1. Create an `.env` file. Please use the `.env-example` as a reference to which fields are required.
2. Launch the application in docker, by executing `docker-compose up`. In case if you are running Windows - please add the `-f docker-compose.windows.yaml` to the command.

## Usage

In order to retrieve the list of rates from Redis, please execute the following request:
```
curl -x POST localhost:4703/api/v1/cronjobs/getRates
```
The address should correspond to the address & port where the service is launched.