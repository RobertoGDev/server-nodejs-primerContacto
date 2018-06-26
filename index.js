//Incluimos un paquete que viene nativo en node, el http
const http = require('http');
let fs = require('fs');

// Creamos una función que maneja las request y las filtra
function releaseContent(req, res) {
    
    //Establezco tipo de cabecera y el header que va a ser común a todas
    res.setHeader("Content-type", "text/html");
    
    //Obtengo los valores que van a estar fijos
    let validUrls = ["/", "/home", "/bio", "/servicios", "/contacto"];
    let resourceUrls = ["/img", "/css", "/js"];
    let file;
    
    //Preparo el contenidop
    const header = fs.readFileSync("./templates/header.html");

    if (validUrls.indexOf(req.url)) {
        res.statusCode = 200;
        file = req.url+'.html';
        if(req.url === "") { // No funciona esto si no tiene barra ni url???
            file = 'index.html';
        }
    } else if (resourceUrls.indexOf(req.url) !== -1) {
        res.statusCode = 200;
        file = req.url;
    }
    else {
        res.statusCode = 404; 
        file = '404.html'; 
    }

    let body = fs.readFileSync(`./templates/bodies/${file}`);
    const footer = fs.readFileSync("./templates/footer.html");
     
    //Establezco el footer y lanzo
    res.end(header + body + footer);
};
 

// Levantamos el server con la función 
const server = http.createServer((req, res) => {
    releaseContent(req, res);
});


server.listen(3000, "0.0.0.0", () => {
    console.log("Servidor corriendo en puerto 3000");
});