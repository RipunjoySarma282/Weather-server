var path=require('path');
var express=require('express');
var chalk=require('chalk');
var hbs=require('hbs');
var request=require('request');
var geocode=require('../../weather_app/utils/geocode');
var forecast=require('../../weather_app/utils/forecast');

const app=express();

//define path for express config
var direc=path.join(__dirname,'../public');
var viewsdirec=path.join(__dirname,'../template/views');
var partialsdirec=path.join(__dirname,'../template/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsdirec);
hbs.registerPartials(partialsdirec);

//Setup static directory to serve
app.use(express.static(direc));


app.get('',(req,res)=>{
        res.render('index',{title:'Weather',name:'Ripunjoy'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
        {
            return res.send({
                error:"Address is not provided :("
            })
        }
    
    geocode(req.query.address,(error,data)=>
    {
        if(error)
            {
                return res.send({
                    error:error
                })
            }
        // res.send({
        //     Address:data
        // })
        // console.log(data);
        forecast(data.latitude,data.longitude,(error,data)=>
        {
            if(error)
                {
                    return res.send({
                        error:error
                    })
                }
            res.send({
                forecast:data
            })
            // console.log(data); 
        })
    })
})

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        name:'Rip'
    });
})

app.get('/help/*',(req,res)=>
{
    res.render('404',{
        error:'Help article is not found'
    })
})


app.get('/products',(req,res)=>{
    if(!req.query.search)
        {
            return res.send({
                error: 'You must provide a search term'
            });
        }
    res.send({
        products:[]
    });
});

app.get('/*',(req,res)=>
{
    res.render('404',{
        error:'Error 404 : Not found'
    })
})


app.listen(3000, ()=>{
    console.log(chalk.green("Server is up on port 3000"));
})