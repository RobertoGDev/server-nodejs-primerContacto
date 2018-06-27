//Incluimos un paquete que viene nativo en node, el http
const http = require('http');
let fs = require('fs');

// Creamos una función que maneja las request y las filtra
function releaseContent(req, res) {
    
    //Establezco tipo de cabecera y el header que va a ser común a todas
    res.setHeader("Content-type", "text/html");
    
    //Obtengo los valores que van a estar fijos
    let validUrls = ["/index", "/bio", "/servicios", "/contacto"];
    let allowHtml;
    let file;
    let body;
    
    //Preparo el contenidop
    const header = fs.readFileSync("./templates/header.html");
 
    if (req.url === "/" || req.url === "") {
        res.statusCode = 200;
        file = 'index.html';
        allowHtml = true;
    }
    else if (req.url.includes('css')) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/css");
        file = fs.readFileSync('.'+req.url, {encoding: 'utf8'});
        res.write(file);
        allowHtml = false;
    }
    else if (req.url.includes('img')) { 
        res.statusCode = 200;
        file = fs.readFileSync('.'+req.url);
        res.write(file);
        allowHtml = false; 
    }
    else if (req.url === "/img/favicon.ico" ) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "image/ico");
        file = fs.readFileSync('./img/favicon.ico');
        res.write(file);
        allowHtml = false; 
    }
    else if (validUrls.indexOf(req.url) !== -1) {
        res.statusCode = 200;
        file = req.url+'.html';
        allowHtml = true;
    } 
    else {
        res.statusCode = 404; 
        file = '404.html'; 
        allowHtml = true;
    }
    
    if(allowHtml) {
        body = fs.readFileSync(`./templates/bodies/${file}`);
    }
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