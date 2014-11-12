var url = require('url');
var seaport = require('seaport');

exports.register = function (plugin, options, next) {

    options = options || {};

    options.server = options.server || "tcp://127.0.0.1:9090"
    options.opts = options.opts || null;

    if (typeof options.server === 'string'){
        options.server = parseUri(options.server);
    }

    var s = seaport.connect(options.server.port, options.server.host, options.opts);

    function disconnected(){
        s.once("connect", connected)
        plugin.log([ 'hapi-seaport', 'disconnect' ], "disconnected from seaport server")
    }

    function connected(){
        s.once("disconnect", disconnected)
        plugin.log([ 'hapi-seaport', 'connect' ], "connected to seaport server")
    }

    s.once("connect", connected);

    s.on('synced', function(){
        plugin.log(['hapi-seaport', 'sync'], "synchronised with seaport server")
    })

    s.once('synced', function(){
        next()
    })

    plugin.expose('client', s);


}


exports.register.attributes = {
  pkg: require('./package.json')
};

function parseUri(uri){

    var bits = url.parse(uri);
    return {port: bits.port, host: bits.hostname}

}