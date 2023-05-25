import lib from "weatherAPILib";
// import popup from "popups";

lib.Configuration.key = process.env.WEATHER_API_KEY; // key to access weatherAPI data
let controller = lib.APIsController;


function makeQuery(request, response){
    const city = request.body.city; // get city entered in the form

    controller.getRealtimeWeather(city)
    .then(data => {
        if (data.location.country != "Colombia"){ // if the city queried is not a Colombian city               
            response.render("home", {errorMessage: `${city} is not a Colombian city or town.`}); // pass error message to the frontend
        }
        else{
            const context = { //data to be rendered in the template
                city: data.location.name,
                localtime: data.location.localtime,
                lastUpdated: data.current.lastUpdated,
                temperature: data.current.tempC, 
                hr: data.current.humidity,
                precipitation: data.current.precipMm, 
                condition: data.current.condition.text,
                weatherConditionImage: data.current.condition.icon,
                post: true // renders data in the template
            }        
            response.render("home", context);
        }
       
    })
    .catch(error => {
        console.log(error)
        response.render("home", {errorMessage: "Something went wrong, try again."});
    });
}

export {makeQuery};
