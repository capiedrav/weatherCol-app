import lib from "weatherAPILib";

lib.Configuration.key = "c9622fc1e06244eda40192657231505"
let controller = lib.APIsController;


function makeQuery(request, response){
    const query = "Medellin";

    controller.getRealtimeWeather(query)
    .then(data => {
        // console.log(data);
        response.json(data);
    })
    .catch(error => {
        console.log(error)
        response.json(error);
    });
}

export {makeQuery};
