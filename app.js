const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html"); 
});

app.post("/",function(req,res){

    // console.log(req.body.city);
    const city = req.body.city;
    const units = "metric";
    const apiKey = "dd0d37e3f1bd8b988f4d918f0a3df0af";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q="+city+"&units="+units;
    
    https.get(url,function(response){
  
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            res.write("<h1>The temperature in "+city+" is "+temp+" degree Celcius</h1>");
            res.write("<h2>The weather is currently "+desc+" </h2>");
            res.write("<img src='"+icon+"' >");
            res.send();
        });
    });
});

app.listen(2000,function(){
    console.log("Server running on port 2000");
});