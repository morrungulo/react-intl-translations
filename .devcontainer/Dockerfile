FROM node
LABEL maintainer="Alexandre Lopes (morrungulo@gmail.com)"

# install node.js modules
RUN npm install -g \
  nodemon

# setup workdir
ENV REPO=/repo
RUN mkdir -p ${REPO}
WORKDIR ${REPO}
ENV PATH=${REPO}${PATH:+:${PATH}}

# expose port
EXPOSE 3000
EXPOSE 3001
