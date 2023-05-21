import lib from "weatherAPILib";

lib.Configuration.key = "c9622fc1e06244eda40192657231505"
let controller = lib.APIsController;


function makeQuery(request, response){
    const city = request.body.city; // get city entered in the form

    controller.getRealtimeWeather(city)
    .then(data => {
        
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
    })
    .catch(error => {
        console.log(error)
        response.render("home");
    });
}

export {makeQuery};
