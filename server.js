const express=require('express');
const hbs = require('hbs');
const fs=require('fs');
const port = process.env.PORT || 3000;
var app=express();


app.use((req, res,next)=>{
    var now =new Date().toString();
    var log =`${now}+${req.method}+${req.url}`;
    console.log(log);
    fs.appendFile('ServerLog.log',log+'\n',(err)=>{
        if(err){
            console.log('unable of open the file');
        }
        next();
    });
   // next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         page_title:'Oops!!Bad Link'
//     })
// });

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
app.set('view engine','hbs');


app.get('/',(req,res)=>{
    //res.send('<h1>Hello World from Express</h1>')
    res.render('home.hbs',{
        page_title:'Home',
        page_heading:'Hello World from Express',
        page_body:'How are you doing today ?',
    });
});

app.get('/about',(req,res)=>{
    // res.send(`<title>About page</title>
    // <body>Hello this is a page about me
    //     <p>
    //         {
    //             "Name"= "Kush",
    //             "Age"=24;
    //         }
    //     </p>
    //  </body>`);

    res.render('about.hbs',{
        page_title:'About page',
        page_heading:'This is about page'
    });
    
});

app.get('/bad',(req,res)=>{
    res.statusCode=404;
    res.send({
    "ErrMsg":"Unable to handle request"
    });
});

app.use(express.static(__dirname+'/public'));

app.listen(port,()=>{
  console.log(`Sever is now running @port:${port}`);
});

