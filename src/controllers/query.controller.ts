import { Request, Response } from "express";
import https from 'node:https';

export const query = (req:Request, res:Response) => {

    const CITY:string = req.body.city as string;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${process.env.APIKEY}&units=metric`;

    https.get(URL, (response) => {

        console.log(response.statusCode);

        if(response.statusCode === 404) {

            const error = 'Something is wrong. Try it again.'

            res.render('../views/pages/home', {error})
            
        }else {

            response.on('data', (data) => {

                const weatherdata = JSON.parse(data);
                const cityName = weatherdata.name;
                const country = weatherdata.sys.country;
                const temp = `${weatherdata.main.temp}°C`;
                const min = `${weatherdata.main.temp_min}°C`;
                const max = `${weatherdata.main.temp_max}°C`;
                const icon = `https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`;
                const description = weatherdata.weather[0].description;
                
    
                res.render('../views/pages/query', {
                    cityName,
                    country,
                    temp,
                    min,
                    max,
                    icon,
                    description
                });
    
            })
        }
 
    }).on('error', (error) => {

        console.log(error.message);
        
    })

}