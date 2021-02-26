FROM node as build
RUN npm install -g gatsby-cli
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM gatsbyjs/gatsby
ENV PUBLIC_PATH=/plasticwax.sifars.com
COPY --from=build /app/public /plasticwax.sifars.com
