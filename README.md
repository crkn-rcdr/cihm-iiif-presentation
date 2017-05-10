# cihm-iiif-presentation

cihm-iiif-presentation is a web service providing the [IIIF Presentation API v2.1](http://iiif.io/api/presentation/2.1/) for Canadiana content.

## Configuration

You will need to create a `docker-compose.override.yml` file with machine-specific information. Here are the contents of such a file for development:

    version: "3"

    services:
      cihm-iiif-presentation:
        build: .
        command: yarn run dev
        environment:
          COPRESENTATION_ENDPOINT: <path to copresentation db>
          IIIFI_ENDPOINT: <path to IIIF Image server, with prefix>
          SELF_ENDPOINT: <path to this server, with prefix>
        ports:
          - "3000:3000"
        volumes:
          - ./src:/home/node/iiifp/src

A similar file for a production build, which does not allow for code watching:

    version: "3"

    services:
      cihm-iiif-presentation:
        build: .
        command: yarn run start
        environment:
          COPRESENTATION_ENDPOINT: <path to copresentation db>
          IIIFI_ENDPOINT: <path to IIIF Image server>
          SELF_ENDPOINT: <path to this server, with prefix>
          NODE_ENV: production
        ports:
          - "3000:3000"

Note that the three endpoint environment variables are required for the server to run.
