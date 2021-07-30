var express = require('express');
var router = express.Router();
var moment = require('moment');
var Movie = require("../models/MovieSchema");


const{cekAuth}=require('../config/auth');



//Get all movies
router.get("/", cekAuth, function(req,res,next){
    let ListMovies = [];
    Movie.find(function(err,movies){
        if(movies){
            for(let data of movies){
                ListMovies.push({
                    id:data._id,
                    name:data.name,
                    released_on:data.released_on
                })
            }
            res.render("movie/allMovies",{ListMovies})
        }
        else {
            ListMovies.push({
                id:"",
                name:"",
                released_on:""
            });
            res.render("movie/allMovies",{ListMovies});
        }
    });

});

//Create Movies
router.get("/create", cekAuth, function(req,res,next){
    res.render("movie/createMovies",{title:"Halaman Create Movies"});
});

//Update Movies
router.get("/update/:movieId",cekAuth, function(req,res,next){
    Movie.findById(req.params.movieId,function(err, movieinfo){
        var newDate = moment(movieinfo.release_on).format("YYYY-MM-DD");
    if(movieinfo){
        console.log(movieinfo);
        res.render("movie/updateMovies", {
            movies:movieinfo,
            newDate
        });
        }
    });
    
});  

//Action Create
router.post("/create",cekAuth, function(req,res){
   const {name,date} = req.body;

   let errors = [];
   if(!name || !date){
       errors.push({msg:"Silahkan Lengkapi Data yang Dibutuhkan"});
   } 
   if(errors.length > 0){
       res.render("movie/createMovies",{errors});
   }else {
   const newMovie = Movie({
       name,
       released_on : date
   })
   newMovie.save().then(
       movie =>{
           errors.push({msg:"Data Movie Berhasil ditambah"});
           res.render("movie/createMovies",{errors})
       }
   ).catch(err=>console.log(err));
}
   
});

//Action Update
router.post("/update",cekAuth, function(req,res){
    let errors =[];
    Movie.findByIdAndUpdate(req.body.id,{name:req.body.name,released_on:req.body.date},
        function(err){
            if(err){
                console.log(err);
            }else{
                errors.push({msg:"Data berhasil terupdate"});
                var newMovies = {_id:req.body.id,name:req.body.name};
                var newDate = moment(req.body.date).format("YYYY-MM-DD");
                res.render("movie/updateMovies",{
                    movies: newMovies,
                    newDate,
                    errors
                });
            }
        }
    );
});

//Action Delete
router.get("/delete/:movieId",cekAuth, function(req,res){
Movie.findByIdAndDelete(req.params.movieId,function(){
    res.redirect("/movies");
})
});

module.exports = router;