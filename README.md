# cihm-iiif-presentation

cihm-iiif-presentation is a web service providing the [IIIF Presentation API v2.1][http://iiif.io/api/presentation/2.1/] for Canadiana content.

## Configuration

You will need to create a `docker-compose.override.yml` file with machine-specific information. Here are the contents of such a file for development:

  version: "3"

  services:
    iiifp:
      build: .
      command: yarn run dev
      environment:
        COPRESENTATION_ENDPOINT: <path to copresentation db>
        IIIFI_ENDPOINT: <path to IIIF Image server>
      ports:
        - "3000:3000"
      volumes:
        - ./src:/home/node/app/src

Note that the two endpoint environment variables are required for the server to run.
