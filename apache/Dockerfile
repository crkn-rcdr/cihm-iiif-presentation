FROM httpd:2.4.37

RUN sed -i \
    -e 's/^#\(Include .*vhosts.conf\)/\1/' \
    -e 's/^#\(LoadModule .*mod_proxy.so\)/\1/' \
    -e 's/^#\(LoadModule .*mod_proxy_http.so\)/\1/' \
    conf/httpd.conf
COPY httpd-vhosts.conf /usr/local/apache2/conf/extra/
