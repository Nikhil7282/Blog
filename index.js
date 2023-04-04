const express=require('express');
const articleRouter=require('./routes/article');
const mongoose = require('mongoose');
const app=express();
const Article=require('./models/article')
const methodOverride=require('method-override')


mongoose.connect("mongodb+srv://nikihl:root123@blogs.nppigs4.mongodb.net/blogs?retryWrites=true&w=majority",
{useNewUrlParser:true},
)

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get('/',async(req,res)=>{
    const articles=await Article.find().sort(
        {createdAt:"desc"})
    res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter)

app.listen(3001,()=>{
    console.log("Running at port 3001")
});