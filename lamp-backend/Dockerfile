FROM php:7.0-apache

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN a2enmod rewrite

RUN apt update && \
  apt install -y ssmtp && \
  apt clean && \
  echo 'sendmail_path = "/usr/sbin/ssmtp -t"' > /usr/local/etc/php/conf.d/mail.ini

ADD ./src /var/www/html/
ADD ./ssmtp.conf /etc/ssmtp/ssmtp.conf
