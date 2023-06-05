# **WEB APPLICATION : UberEats prototype using MERN Stack & Kafka Messaging**

The is a prototype of the famous UberEats application, an online portal for food delivery or pickup
across varied locations throughout the world. Since, this application is just a prototype, it mainly
highlights the below functionalities-

1. A customer signs up on the application, creates user login, selects food items from a particular
   restaurant he/she wishes to order from, specifies a delivery or pickup mode, and places an
   order.
2. The restaurant owner also has a user account managing the restaurant profile, food menu,
   delivery systems, etc. accepts the order from the customer.
3. The life cycle of the order from ordered, being prepared at the restaurant till the time it is
   delivered, or pickup is updated by the restaurant and tracked by the customer.
4. Restaurants fulfill the order and sign it off to a delivery person.
5. Either the order is picked up by the customer or delivered by a delivery person to the customer.
6. Also, there is an action for both customer and restaurant owner to cancel the order before it is
   excepted by the restaurant.
7. The application also gives the records of all the past orders to both the customers as well as
   restaurant owners.
8. The customers are also able to record their profile details and a list of their favorite restaurants.

All the above main functionalities were incorporated by builiding a functional, user friendly and responsive application.

### System Architecture Design:

The project is divided into folder structures Frontend using React JS and Redux and 2 server folders - Backend and Kafka-backend, wherein I have used Kafka Messaging queue as per the requirement of the assignment.

<img src="https://github.com/Archita22ind/UberEats_Prototype/blob/main/images/systemarch.png" >

### Some Design Patterns Used:

#### Strategy Pattern:

Used Strategy Pattern in finding the list of restaurants by a user/customer. Below two links of code highlight this design pattern being used.

https://github.com/Archita22ind/UberEats_Prototype/blob/main/kafka-backend/services/restaurantService/getListOfRestaurants.js

https://github.com/Archita22ind/UberEats_Prototype/blob/main/kafka-backend/services/restaurantService/model/getListOfRestaurantsDao.js

<img src ="https://github.com/Archita22ind/UberEats_Prototype/blob/main/images/RestaurantListSearchPage.png">

Use Case: A certain restaurant list is returned for display on the landing page based on the typeahead value on the page header, the sidebar filters, and the Pickup or Delivery categories available. There can be several options to filter out the restaurants on the page like Food dietary filter options, any specific food item on the restaurant Menu searched from the typeahead, a combination of both, and even none. So based on these filter criteria, I designed an API to get the restaurant details from the database.

The code for fetching restaurant list data demonstrates modularization, where each file has a specific purpose based on the SRP principle, thus improving maintainability and reusability. For instance, 'getListOfRestaurants.js' handles the request for fetching restaurants, while 'getListOfRestaurantsDao.js' encapsulates the database operations.

The design choice of the Factory Pattern in the 'getListOfRestaurantsDao.js' provides a flexible way to fetch restaurant data based on various conditions. The 'restaurantFetchStrategyFactory' object creates functions for each type of restaurant fetch strategy. Adhering to the Single Responsibility Principle (SRP), the main API function is immune to changes irrespective of the modifications in filter conditions and this implementation ensures that the code remains loosely coupled and any new filter case can be added as a function to the 'restaurantFetchStrategyFactory' object in future.

#### Command Pattern:

Used Command Pattern to design the food item cart manipulation by the customers ordering food. Like using commands like adding food, removing food, etc. This behavioral design pattern helps to turn a request into a standalone object that contains all information about the request and any type of command can be executed on the same object.

The below link highlights this design pattern used for the cart of the application and currently handles add and remove food items command on the cartData object.

https://github.com/Archita22ind/UberEats_Prototype/tree/main/kafka-backend/services/customer/cart

Note: This part of code is being considered for further improvement.

### Few screen captures of the application:

<img src="https://github.com/Archita22ind/UberEats_Prototype/blob/main/images/loginPage.png" >

<img src="https://github.com/Archita22ind/UberEats_Prototype/blob/main/images/glimpseofapp.png" >

<img src="https://github.com/Archita22ind/UberEats_Prototype/blob/main/images/glimpse1.png" >

<img src="https://github.com/Archita22ind/UberEats_Prototype/blob/main/images/orderstatus.png" >

## Getting Started with the Github repository-

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

You will need Node.js installed on your machine.

To install Node.js on Mac:

`brew install nodejs`

To install Node.js on Linux:

`brew install nodejs`

To install kafka on Mac, download the binary file from below link:

https://www.apache.org/dyn/closer.cgi?path=/kafka/3.0.0/kafka_2.13-3.0.0.tgz

On local machine unpack the .tgz file and go to the kafka_2.13-3.0.0 folder from terminal

To start zookeeper:
bin/zookeeper-server-start.sh config/zookeeper.properties

To start Kafka server:
bin/kafka-server-start.sh config/server.properties

To create topic:
bin/kafka-topics.sh --create --topic <topicname> --partitions 1 --replication-factor 1 --bootstrap-server localhost:9092

(Script for topic creation provided)

## Installing

Clone the contents of the Git repository to your local:

Go into the Backend directory and run the following command:

`npm install`

Go into the Frontend directory and run the following command:

`npm install`

Go into the kafka-backend directory and run the following command:

`npm install`

To run the Backend, go into the Backend directory and run the following command:

`node app.js`

To run the Frontend, go into the Frontend directory and run the following command:

`export NODE_OPTIONS=--openssl-legacy-provider`
`npm start`

To run the kafka-backend, go into the kafka-backend directory and run the following command:

`node server.js`

Note : currently the SQL database is not connected
