var http = require('http');

exports.index = function(req, res){
  res.render('index', { title: 'Currency Converter' });
};

exports.converter = function(req, res) {

    var amount = req.query.amount;
    var source = req.query.source;
    var target = req.query.target;

    http.get("http://www.google.com/ig/calculator?hl=en&q="+amount+source+"=?" + target, function(getres) {

        var body = '';

        getres.on('data', function(chunk) {
           body += chunk;
        });

        getres.on('end',function(){
            //Google returns invalid JSON so adding quotes to JSON keys
            var bodyString = body.replace('lhs', '"lhs"').replace('rhs', '"rhs"').replace('error', '"error"').replace('icc', '"icc"')

            //send back JSON
            res.send(JSON.parse(bodyString));
        });

    }).on('error', function(e) {
            res.send('error response from controller');
        });

}