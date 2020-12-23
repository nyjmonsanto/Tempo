const express          = require("express"),
      ejs              = require("ejs"),
      mysql            = require("mysql"),
      bodyParser       = require("body-parser"),
      urlencodedParser = bodyParser.urlencoded({extended: false}),
      methodOverride   = require('method-override'), 
      app              = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tempodb"
});

connection.connect((err) => {
    if(err){
        throw (err);
    }
    console.log("Connected To Database");
});

app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(express.static("./public"));
// ----------------------------------------------------------------------------------------------------
//RETRIEVE DATA
app.get("/", (req, res) => {
    let object = {};
    connection.query("SELECT * FROM list", (err, response) => {
        if(err){
            throw (err);
        }else{
            object = {post: response};
            res.render("tempo_todolist", object);
        }
    });
});

//DELETE DATA
app.delete('/tempo_todolist/:id', (req, res) => {
    connection.query("DELETE FROM list WHERE id = '"+req.params.id+"'", (err) => {
       if (err){
           throw (err);
       }
    });
    res.redirect("/");
 });

//RETRIEVE DATA
app.get("/tempo_todolist/:id/tempo_edittask" ,(req, res) => {
    connection.query("SELECT * FROM list WHERE id = '"+req.params.id+"'", (err, response) => {
        if(err){
            throw (err);
        }else{
            console.log(response);
            res.render("tempo_edittask", {values: response[0]});
        }
    });
});

//UPDATE DATA
app.put("/tempo_todolist/:id", urlencodedParser, (req, res) => {
    connection.query("UPDATE list SET description = '"+req.body.description+"' WHERE id = ?", [req.params.id], (err) => {
        if (err){
            throw (err);
        }
     });
     res.redirect("/");
});

app.get("/tempo_addtask", (req, res) => {
	res.render("tempo_addtask");
});

//CREATE DATA
app.post("/tempo_addtask", urlencodedParser, (req, res) => {
    connection.query("INSERT INTO list (description, duedate) VALUES ('"+req.body.description+"','"+req.body.duedate+"')", (err) => {
        if (err){
            throw (err);
        }
    });
    res.redirect("/");
});

//ERROR HANDLING
app.get('*', function(req, res){
	res.send("<h3>ERROR 404</h3><p>The URL you requested is not found.</p>");
});

app.listen(3000, function(){
	console.log("Server is running.");
});