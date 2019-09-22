openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout key.pem -out cert.pem -days 3650 -subj '/CN=localhost'
cat cert.pem key.pem > bundle.pem
