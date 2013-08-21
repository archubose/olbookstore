
/*
 * GET home page.
 */

// handler for form submitted from homepage
exports.home_post_handler = function(req, res) {
    // if the username is not submitted, give it a default of "Anonymous"
    username = req.body.username || 'Anonymous';
    // store the username as a session variable
    req.session.username = username;
    // redirect the user to homepage
    res.redirect('/');
};

// handler for homepage
exports.home = function(req, res) {
    // if user is not logged in, ask them to login
    if (typeof req.session.username == 'undefined') res.render('home', { title: 'Book Store'});
    // if user is logged in already, take them straight to the items list
    else res.redirect('/items');
};


// our 'database'
var items = {
    SKN:{name:'Readers Digest', price:100},
    ASK:{name:'Techno Quiz', price:690},
    CGI:{name:'Childrens Digest', price:250},
    NGT:{name:'Quiz Master', price:900},
    KTN:{name:'How to code?', price:1000}
};


// handler for displaying the items
exports.items = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else res.render('items', { title: 'Book Store - Items', username: req.session.username, items:items });
};

// handler for displaying individual items
exports.item = function(req, res) {
    // don't let nameless people view the items, redirect them back to the homepage
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else {
        var name = items[req.params.id].name;
        var price = items[req.params.id].price;
        res.render('item', { title: 'Book Store - ' + name, username: req.session.username, name:name, price:price });
    }
};



// handler for showing simple pages
exports.page = function(req, res) {
    var name = req.query.name;
    var contents = {
        about: 'OBS sells the Best book in the world. Become an Techie is possible now with US.',
        contact: 'You can contact us at <address><strong>OBS Store</strong>,<br>1, World Book Headquarters,<br>BookAvenue,<br>Chiba.</address>'
    };
    res.render('page', { title: 'Book store - ' + name, username: req.session.username, content:contents[name] });
};