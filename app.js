const express = require('express'),
         app = express(),
         bodyParser = require("body-parser"),
         mongoose = require('mongoose'),
         Blog = require("./models/blog"),
         User = require('./models/user'),
         Comment = require('./models/user'),
         News = require("./models/info"),
         passport = require('passport'),
         flash = require('connect-flash'),
         LocalStrategy = require('passport-local');

 mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true});


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended :true}));
app.set("view engine", "ejs");
app.use(flash());


app.use(require('express-session')({
	secret: 'Rusty',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
})


// RECENT NEWS DATA


// News.create({
//     name:"Iran: Floods - Mar 2019",
//     image: "https://images.app.goo.gl/P7XDhoa97AhRTxGMA",
//     description: "sdvThe Golestan floods, caused by heavy rains starting on 19 March, have affected a total of 10 cities in northeast Iran (The cities of Gorgan, Bandar Turkman, Azad Shahr, Aq Ghala, Gonbad-e Kavus, bandar-e Gaz, Ali Abad, Kalaleh, Kordkuy, and Minodaasht). The government is currently investigating local reports on the lack of mitigation measures by the Water Authorities. The worst affected areas are in the cities of Aq Qala and Gonbad Kavous and their surrounding villages where large parts are submerged under water. As a safety measure power supply was cut off in several areas. Of the estimated 60,000 displaced, most stay with relatives in nearby villages. At least 10,000 people are provided emergency shelter assistance in stadiums, exhibition areas, schools and other large public facilities provided by IRCS...Other areas in west and south-west of Iran have been affected by heavy rains too. Namely, the Provinces of Lorestan, Kurdistan, Kermanshah, Khuzestan, Fars and Kohkilouyeh. As of 25 March, floods in Shiraz, Poldokhtar, Khoramabad, Doreh, Khoramshahr, Abadan, Aligoudarz and Saghez were also reported. In Shiraz flash floods killed at least 20, injured 94 and an unverified number of people are still missing. In the city of Dezful in Khuzestan, south-west of Iran, the emergency situation is declared. (OCHA, 26 Mar 2019) Continued rainfall has caused floods in 586 cities and villages across Iran. Flood water has destroyed infrastructure, livestock, agriculture and livelihoods, with estimated damage USD 150,000 million, in Golestan and Mazandaran Provinces alone. The disaster struck in the middle of Nowruz, Iranian New Year holidays. National Metrological service predicts more rainfall for the coming week.By now, IRCS has reported 45 persons dead and at least 434 persons injured. The most affected areas are Golestan, Mazandaran, North Khorasan, Kohgiluyeh and Boyer-Ahmad, Fars, Kermanshah, Khozestan, Semnan, Ilam and Hamedan. To date, IRCS has assisted 156,531 flood-affected persons and is provided temporary shelter for 50,732 people"
// }, function(err, news){
//     if(err){
//         console.log(err);
//     } else{
//         console.log('Added')
//     }
// })
// News.create({
//     name:"Iran: Floods - Mar 2019",
//     image: "https://images.app.goo.gl/P7XDhoa97AhRTxGMA",
//     description: "sdvThe Golestan floods, caused by heavy rains starting on 19 March, have affected a total of 10 cities in northeast Iran (The cities of Gorgan, Bandar Turkman, Azad Shahr, Aq Ghala, Gonbad-e Kavus, bandar-e Gaz, Ali Abad, Kalaleh, Kordkuy, and Minodaasht). The government is currently investigating local reports on the lack of mitigation measures by the Water Authorities. The worst affected areas are in the cities of Aq Qala and Gonbad Kavous and their surrounding villages where large parts are submerged under water. As a safety measure power supply was cut off in several areas. Of the estimated 60,000 displaced, most stay with relatives in nearby villages. At least 10,000 people are provided emergency shelter assistance in stadiums, exhibition areas, schools and other large public facilities provided by IRCS...Other areas in west and south-west of Iran have been affected by heavy rains too. Namely, the Provinces of Lorestan, Kurdistan, Kermanshah, Khuzestan, Fars and Kohkilouyeh. As of 25 March, floods in Shiraz, Poldokhtar, Khoramabad, Doreh, Khoramshahr, Abadan, Aligoudarz and Saghez were also reported. In Shiraz flash floods killed at least 20, injured 94 and an unverified number of people are still missing. In the city of Dezful in Khuzestan, south-west of Iran, the emergency situation is declared. (OCHA, 26 Mar 2019) Continued rainfall has caused floods in 586 cities and villages across Iran. Flood water has destroyed infrastructure, livestock, agriculture and livelihoods, with estimated damage USD 150,000 million, in Golestan and Mazandaran Provinces alone. The disaster struck in the middle of Nowruz, Iranian New Year holidays. National Metrological service predicts more rainfall for the coming week.By now, IRCS has reported 45 persons dead and at least 434 persons injured. The most affected areas are Golestan, Mazandaran, North Khorasan, Kohgiluyeh and Boyer-Ahmad, Fars, Kermanshah, Khozestan, Semnan, Ilam and Hamedan. To date, IRCS has assisted 156,531 flood-affected persons and is provided temporary shelter for 50,732 people"
// }, function(err, news){
//     if(err){
//         console.log(err);
//     } else{
//         console.log('Added')
//     }
// })

// Blog.create({
//     name: "Example",
//     image: "Example",
//     descreption: "example"
// }, function(err, blog){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Added");
//     }
// })







// home page
app.get('/', function(req, res){
    News.find({}, function(err, allNews){
        if(err){
            console.log(err);
        } else{
            res.render("index", {news: allNews});
        }
    })
   
})

// Recent Page
app.get('/recent', function(req ,res){
    News.find({}, function(err, allNews){
        if(err){
            console.log(err);
        } else{
            res.render("recent", {news: allNews});
        }
    })
   
})

app.get('/blogs', function(req, res){
    Blog.find({}, function(err, allBlogs){
        if(err){
            console.log(err)
        } else{
            res.render('blogs', {blog: allBlogs});        
        }
    })
    
});

app.get('/blog', function(req, res){
    res.render('blog');
})

app.post('/blog', function(req ,res){
        var name = req.body.name;
        var image = req.body.image;
        var description = req.body.description;
        var author = {
            id: req.user._id,
            username: req.user.username
        };
        var newBlog = { name : name, image : image, description: description, author: author};
        Blog.create(newBlog, function(err, newlyCreated){
            if(err){
                console.log(err);
            }else {
                res.redirect("/blogs");
            }
        })
        
    })	;


app.get('/feedback', function(req, res){
    res.render('feedback');
})

app.post('/feedback', function(req, res){

})

//Disaster Types
app.get('/cyclone', function(req, res){
    res.render('cyclone');
})

app.get('/earthquake', function(req, res){
    res.render('earthquake');
})

app.get('/flood', function(req, res){
    res.render('flood');
})

app.get('/volcano', function(req, res){
    res.render('volcano');
});

app.get('/landslide', function(req, res){
    res.render('landslide');
});


// 6 types and 6 diffrent pages

app.get('/help', function(req, res){
    res.render('help');
});

app.get('/ngo', function(req, res){
    res.render('ngo');
})

app.get('/login',  function(req, res){
    res.render('login');
});

app.post('/login', passport.authenticate('local', 
	{
		successRedirect: '/',
		failureRedirect: '/login'
	}) , function(req, res){
});

app.get('/signup', function(req ,res){
    res.render('signup');
});

app.post('/signup', function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
            console.log(err);
            req.flash('error', err.message);
			return res.render('signup')
		}
		passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to AIDERS '+ user.username);
			res.redirect('/');
		})
	});
})

app.get('/logout', function(req, res){
    req.logOut();
    req.flash('success', 'You have been Logged Out');
	res.redirect('/');
})



app.listen(8080, function(){
    console.log('App is listening');
})
