# 🚀 Buenro data proccessor API

## Description

REST API for managing data ingestion and retrieval

## Versions

The current version of the API is 1.0.0

## Tech stack

The projecty uses the following technologies and methodologies:

- **Node**: 22.5.1
- **NPM dependencies manager**: npm is used to manage project dependencies in an efficient way.
- **Mongoose**: ODM to interact with mongodb.
- **Hexagonal architecture**: The project folows a hexagonal architecture where the modules are splited by layers (domain, infrastructure and application) which makes it more maintainable and scalable.

## Instructions to clone and run the project

### Install the project
##
#### Clone repository
```bash
$ git clone 'url ssh del repositorio'
```
#### Navigate to project root folder 
```bash
$ cd buenro-data-proccessor
```
#### Create an env file and fill it with their respective values ####

```bash
$ cp .env.example .env
````

#### Install dependencies using NPM ####
```bash
$ npm install
```

#### Run 
```bash
$ npm start:dev
```

#### Build
```bash
$ npm run build
```

## 🌍 Production
**Base API en Url:**  
`https://buenro-api.leopoldoromero.com`  

## 📚 Documentación de Endpoints  

### 🔹 Get ingested data (GET)  
**Endpoint:**  
`/api/v1/ingested-data`  

#### 📌 Query params

| Params     | Example                                                                 | Description                                                                 |
|------------|-------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `sort`     | `sort=pricePerNight:DESC`                                               | Sort results by a field. Use `ASC` (ascending) or `DESC` (descending).      |
| `filters`  | `filters[0][field]=city&filters[0][operator]=eq&filters[0][value]=Paris` | Apply filters using readable operators (`EQUAL`, `NOT_EQUAL`, `LIKE`, etc.). Supports multiple filters. |
| `page`     | `page=2`                                                                | Select the page number for pagination (used with `limit`).                  |
| `limit`    | `limit=10`                                                              | Number of results per page.                                                 |


**Example:**  
```bash
curl --location 'https://buenro-api.leopoldoromero.com/api/v1/ingested-data?filters[0][field]=city&filters[0][operator]=EQUAL&filters[0][value]=Nice'
````
