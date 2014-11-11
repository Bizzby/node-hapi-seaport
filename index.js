var url = require('url');
var seaport = require('seaport');

exports.register = function (plugin, options, next) {

    options = options || {};

    options.server = options.server || "tcp://127.0.0.1:9090"
    options.opts = options.opts || null;

    if (typeof options.server === 'string'){
        options.server = parseUri(options.server);
    }

    seaport.connect(options.server.port, options.server.host, options.opts);

    seaport.on("disconnect", function(err){
        plugin.log([ 'hapi-seaport', 'disconnect' ], "disconnected from seaport server")
    })

    seaport.on('synced', function(){
        plugin.log(['hapi-seaport', 'sync'], "synchronised with seaport server")
        next()
    })

    seaport.once('synced', function(){
        next()
    })

    plugin.expose('client', seaport);


}


exports.register.attributes = {
  pkg: require('./package.json')
};

function parseUri(uri){

    var bits = url.parse(uri);
    return {port: bits.port, host: bits.hostname}

}