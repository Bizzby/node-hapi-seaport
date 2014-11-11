# hapi-seaport


Hapi plugin to create a shared seaport client. Blocks until synchronised

## Install
`npm install hapi-seaport [--save]`

## Usage
Load plugin into your Hapi server as normal.

```
var Hapi = require("hapi");

var seaportOpts = {
    "host": "localhost",
    "options": {
        //either
        "server": "tcp://blahblah.com:6573",
        //or
        "server": {
          "host": blahblah.com,
          "port": 6573
        },
        opts: "//standard seaport opts object"
    }
};

var server = new Hapi.Server(8080);

server.pack.register({
    plugin: require('hapi-seaport'),
    options: seaportOpts
  }, function () {}
});

```

The default opts are
```
{
  "server":"tcp://127.0.0.1:9090"
}
```

Supplying either a server object or string will override this default.



To access the client in other plugins, place this plugin first (plugins
are loaded in the order they're declared) then reference the client
like:

`seaport = plugin.plugins['hapi-seaport'].client`