# status-api

API for requesting the status of Ocean components

## Running Locally

1. Duplicate the `.env.example` file and rename it `.env`. If you are running the monitoring services and the frontend at the same time, you will need to make sure that they all have different ports.
2. `npm i`
3. `npm run dev`

## API Endpoints

### Get the current status of Ocean components on all networks.

```
GET: http://localhost:8000/
```

### Get the current status of Ocean components on a given network.

```
GET: http://localhost:8000/network/mainnet
```

### Update status of Ocean components in DB.

```
POST: http://localhost:8000/update
```

## Testing

You can test the status service with the following command:

```Bash
npm run test
```
