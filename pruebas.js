let validUrls = [ "", "/", "/home", "/bio", "/servicios", "/contacto"];
let resourceUrls = ["/img", "/css", "/js"];


let req = {
   url: "/img"
};

if (validUrls.indexOf(req.url) && resourceUrls.indexOf(req.url) !== -1) {
    
    console.log(true);
} else {
    
    console.log(false);
}

//console.log(validUrls.indexOf(req) > -1 && validUrls.indexOf(req) !== 0);
