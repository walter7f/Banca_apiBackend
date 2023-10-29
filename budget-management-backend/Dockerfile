## Build
# docker build -t backend:0.1.0 .
# RUN
# docker run -d -e ORACLE_USER=appuser -e ORACLE_PASS=myapppass -e ORACLE_CONNSTR=localhost:1521/xepdb1 backend:0.1.0

FROM oraclelinux:8.7

# Install Oracle Client
# https://yum.oracle.com/oracle-instant-client.html
RUN dnf install oracle-instantclient-release-el8 -y
RUN dnf install oracle-instantclient-basic -y

# Install NodeJs
# https://yum.oracle.com/oracle-linux-nodejs.html#InstallingNodeOnOL8
RUN dnf module enable nodejs:16 -y
RUN dnf module install nodejs -y

# Variables de la app
ENV DB_NAME=BD_BUDGET \
DB_USERNAME=WALTER \
DB_PASSWORD=1234 \
DB_HOST=localhost \
SERVER_PORT=3800 

# APP Copy 
COPY . /opt/app

# Cambiar de directorio
WORKDIR /opt/app

# Dependencias
RUN npm install

CMD [ "npm", "start" ]