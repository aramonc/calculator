# calculator
Four function calculator to practice JavaScript, ES6, and React

You will need to run `npm i` to download the dependency and then you will need some sort of web server to serve the HTML pages. I was using the following Docker command:

```bash
docker run \
  -p 8080:80 \
  -v ./calculator:/usr/share/nginx/html:ro \
  --name calculator-sandbox \
  nginx:latest 
```
