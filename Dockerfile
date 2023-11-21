FROM node:lts
COPY package*.json /usr/src/app/
WORKDIR /usr/src/app
# If you are building your code for production
#RUN npm ci --only=production
RUN npm i
COPY . /usr/src/app
RUN npm run build
ENV PORT=8000
EXPOSE 8000
ENV DB_PATH='mongodb://localhost:27017/statusHistory'
ENV NETWORKS='[{"name":"mainnet","GET: http://localhost:8000/test":false},{"name":"polygon","test":false},{"name":"bsc","test":false},{"name":"moonriver","test":false},{"name":"energyweb","test":false},{"name":"mumbai","test":true},{"name":"moonbase","test":true},{"name":"goerli","test":true},{"name":"sepolia","test":true}]'
# Name of collection in DB, suggestion 'Live' | 'Test'
ENV COLLECTION='Live' 
CMD [ "npm", "run", "start" ]