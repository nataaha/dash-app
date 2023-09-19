# production environment

FROM nginx:latest
RUN apt-get update && apt-get upgrade -y && apt-get install -y python3-minimal
RUN  rm -rf /app && mkdir /app && mkdir /scripts
COPY ./build/ /app
COPY ./build/ /usr/share/nginx/html
COPY ./generate-config.sh /docker-entrypoint.d 
COPY ./createConfig.py /scripts 
RUN chmod +x /docker-entrypoint.d/generate-config.sh
WORKDIR /app
ENTRYPOINT ["/docker-entrypoint.sh"]
EXPOSE 80 443
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]