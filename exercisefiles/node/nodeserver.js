// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"

const http = require('http');

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const key = url.searchParams.get('key');
    if (url.pathname === '/get') {
        if (key) {
        res.end(`hello ${key}`);
        } else {
        res.end('key not passed');
        }
    } else if (url.pathname === '/daysBetweenDates') {
        const date1 = new Date(url.searchParams.get('date1'));
        const date2 = new Date(url.searchParams.get('date2'));
        const days = Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
        res.end(`${days}`);
    } else if (url.pathname === '/validatephonenumber') {
        const phoneNumber = url.searchParams.get('phonenumber');
        // validate a spanish phone number starting with +34 like +34666777888
        const regExp = /^\+34\d{9}$/;
        const isValid = regExp.test(phoneNumber);
        res.end(`${isValid}`);
    } else if (url.pathname === '/moviesByDirector') {
        const director = url.searchParams.get('director');
        // call the omdbapi with axios and return the movies of the director
        const API_KEY = '7d7cc66d';
        const axios = require('axios');
        const omdbapiUrl = `http://www.omdbapi.com/?s=${director}&apikey=${API_KEY}`; 
        console.log(omdbapiUrl);
        axios.get(omdbapiUrl)
            .then(response => {
                const movies = response.data.Search.map(movie => movie.Title);
                res.end(`${movies}`);
            })
            .catch(error => {
                console.log(error);
                res.end('error');
            });
    }
    else {
        res.end('method not supported');
    }
});

server.listen(3000, () => {
    console.log('server is listening on port 3000');
});