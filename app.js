const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
    const cityName=req.body.cityName;
    const query=cityName;
    const appid="b145b91418d0bb0afc4861afafb7365e";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+units+"&appid="+ appid +"";
    https.get(url,function(response){
            response.on("data", function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const conditions=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>City selected is "+query+"</h1>")
            res.write("<h1> the temp in celsius is : "+temp+" and the weather conditions are : "+ conditions +"</h1>")
            res.write("<img src="+imageURL+">");
            res.send();
        })
    }) 
})
 


app.listen(3000,function(){
    console.log("Server is running on port 3000");
})