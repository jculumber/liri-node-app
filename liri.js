require("dotenv").config();

var keys = require("./keys");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Grab all of the command line arguments from Node.
var nodeArg = process.argv;

// node liri.js my-tweets
var my_tweets = function () {
    var params = { screen_name: 'Jenn28592490' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("======================================================================")
                console.log(tweets[i].text);
                console.log("");
                console.log(tweets[i].created_at);
                
                fs.appendFile("log.txt", "\n======================================================================\n" + "\n" + tweets[i].text + "\n" + tweets[i].created_at, function (err) {
                    // If an error was experienced we say it.
                    if (err) {
                        console.log(err);
                    };
                });
            };
        };
    });
};
if (nodeArg[2] == "my-tweets") {
    my_tweets();
};

// node liri.js spotify-this-song '<song name here>'
var spotify_this_song = function () {
    if (nodeArg[3] == null) {
        spotify.search({ type: 'track', query: "The+Sign+Ace+of+Base", limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            };
            var songResults = [
                "Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2),
                "Song: " + JSON.stringify(data.tracks.items[0].name, null, 2),
                "Link: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2),
                "Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2)
            ];
            console.log(songResults[0]);
            console.log(songResults[1]);
            console.log(songResults[2]);
            console.log(songResults[3]);
            fs.appendFile("log.txt", "\n\n======================================================================\n" + "\n" + songResults[0] + "\n" + songResults[1] + "\n" + songResults[2] + "\n" + songResults[3], function (err) {
                // If an error was experienced we say it.
                if (err) {
                    console.log(err);
                };
            });
        });
    } else {
        spotify.search({ type: 'track', query: nodeArg.slice(3).join("+"), limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var songResults = [
                "Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2),
                "Song: " + JSON.stringify(data.tracks.items[0].name, null, 2),
                "Link: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2),
                "Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2)
            ];
            console.log(songResults[0]);
            console.log(songResults[1]);
            console.log(songResults[2]);
            console.log(songResults[3]);

            fs.appendFile("log.txt", "\n\n======================================================================\n" + "\n" + songResults[0] + "\n" + songResults[1] + "\n" + songResults[2] + "\n" + songResults[3], function (err) {
                // If an error was experienced we say it.
                if (err) {
                    console.log(err);
                };
            });
        });
    };
};
if (nodeArg[2] == "spotify-this-song") {
    spotify_this_song();
};

// node liri.js movie-this '<movie name here>'
var movie_this = function () {
    if (nodeArg[3] == null) {
        request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                var movieResults = [
                    "Movie Title: " + JSON.parse(body).Title,
                    "Year of Release: " + JSON.parse(body).Year,
                    "IMDB Rating: " + JSON.parse(body).imdbRating,
                    "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value,
                    "Produced in: " + JSON.parse(body).Country,
                    "Language: " + JSON.parse(body).Language,
                    "Plot: " + JSON.parse(body).Plot,
                    "Actors: " + JSON.parse(body).Actors
                ]
                // Parse the body of the site and recover info
                console.log(movieResults[0]);
                console.log(movieResults[1]);
                console.log(movieResults[2]);
                console.log(movieResults[3]);
                console.log(movieResults[4]);
                console.log(movieResults[5]);
                console.log(movieResults[6]);
                console.log(movieResults[7]);

                fs.appendFile("log.txt", "\n\n======================================================================\n" + "\n" + movieResults[0] + "\n" + movieResults[1] + "\n" + movieResults[2] + "\n" + movieResults[3] + movieResults[4] + "\n" + movieResults[5] + "\n" + movieResults[6] + "\n" + movieResults[7], function (err) {
                    // If an error was experienced we say it.
                    if (err) {
                        console.log(err);
                    };
                });
            };
        });
    } else {
        // Then run a request to the OMDB API with the movie specified
        request("http://www.omdbapi.com/?t=" + nodeArg.slice(3).join("+") + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                var movieResults = [
                    "Movie Title: " + JSON.parse(body).Title,
                    "Year of Release: " + JSON.parse(body).Year,
                    "IMDB Rating: " + JSON.parse(body).imdbRating,
                    "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value,
                    "Produced in: " + JSON.parse(body).Country,
                    "Language: " + JSON.parse(body).Language,
                    "Plot: " + JSON.parse(body).Plot,
                    "Actors: " + JSON.parse(body).Actors
                ]
                // Parse the body of the site and recover info
                console.log(movieResults[0]);
                console.log(movieResults[1]);
                console.log(movieResults[2]);
                console.log(movieResults[3]);
                console.log(movieResults[4]);
                console.log(movieResults[5]);
                console.log(movieResults[6]);
                console.log(movieResults[7]);

                fs.appendFile("log.txt", "\n\n======================================================================\n" + "\n" + movieResults[0] + "\n" + movieResults[1] + "\n" + movieResults[2] + "\n" + movieResults[3] + movieResults[4] + "\n" + movieResults[5] + "\n" + movieResults[6] + "\n" + movieResults[7], function (err) {
                    // If an error was experienced we say it.
                    if (err) {
                        console.log(err);
                    };
                });
            };
        });
    };
};
if (nodeArg[2] == "movie-this") {
    movie_this();
};

// node liri.js do-what-it-says
var do_what_it_says = function () {

}
if (nodeArg[2] == "do-what-it-says") {
    // This block of code will read from the "random.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {

            console.log("ERROR ------------------------------------------")
            console.log(error);
            console.log("------------------------------------------------")
            return;
        }

        // We will then print the contents of data
        //console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        //console.log(dataArr[0]);

        // We will then re-display the content as an array for later use.
        //console.log(dataArr);

        if (dataArr[0] == "spotify-this-song") {
            if (dataArr[1] == null) {
                spotify.search({ type: 'track', query: "The+Sign+Ace+of+Base", limit: 1 }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    };
                    var songResults = [
                        "Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2),
                        "Song: " + JSON.stringify(data.tracks.items[0].name, null, 2),
                        "Link: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2),
                        "Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2)
                    ];
                    console.log(songResults[0]);
                    console.log(songResults[1]);
                    console.log(songResults[2]);
                    console.log(songResults[3]);
                    fs.appendFile("log.txt", "\n\n======================================================================\n" + "\n" + songResults[0] + "\n" + songResults[1] + "\n" + songResults[2] + "\n" + songResults[3], function (err) {
                        // If an error was experienced we say it.
                        if (err) {
                            console.log(err);
                        };
                    });
                });
            } else {
                spotify.search({ type: 'track', query: dataArr[1], limit: 1 }, function (err, data) {
                    if (err) {
                        return console.log('Error occurred: ' + err);
                    }
                    var songResults = [
                        "Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2),
                        "Song: " + JSON.stringify(data.tracks.items[0].name, null, 2),
                        "Link: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2),
                        "Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2)
                    ];
                    console.log(songResults[0]);
                    console.log(songResults[1]);
                    console.log(songResults[2]);
                    console.log(songResults[3]);
        
                    fs.appendFile("log.txt", "\n\n======================================================================\n" + "\n" + songResults[0] + "\n" + songResults[1] + "\n" + songResults[2] + "\n" + songResults[3], function (err) {
                        // If an error was experienced we say it.
                        if (err) {
                            console.log(err);
                        };
                    });
                });
            };
        };
        if (dataArr[0] == "my-tweets") {
            my_tweets();
        };
        if (dataArr[0] == "movie-this") {
            if (dataArr[1] == null) {
                request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {
        
                    // If the request is successful (i.e. if the response status code is 200)
                    if (!error && response.statusCode === 200) {
                        var movieResults = [
                            "Movie Title: " + JSON.parse(body).Title,
                            "Year of Release: " + JSON.parse(body).Year,
                            "IMDB Rating: " + JSON.parse(body).imdbRating,
                            "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value,
                            "Produced in: " + JSON.parse(body).Country,
                            "Language: " + JSON.parse(body).Language,
                            "Plot: " + JSON.parse(body).Plot,
                            "Actors: " + JSON.parse(body).Actors
                        ]
                        // Parse the body of the site and recover info
                        console.log(movieResults[0]);
                        console.log(movieResults[1]);
                        console.log(movieResults[2]);
                        console.log(movieResults[3]);
                        console.log(movieResults[4]);
                        console.log(movieResults[5]);
                        console.log(movieResults[6]);
                        console.log(movieResults[7]);
        
                        fs.appendFile("log.txt", "\n\n======================================================================\n" + "\n" + movieResults[0] + "\n" + movieResults[1] + "\n" + movieResults[2] + "\n" + movieResults[3] + movieResults[4] + "\n" + movieResults[5] + "\n" + movieResults[6] + "\n" + movieResults[7], function (err) {
                            // If an error was experienced we say it.
                            if (err) {
                                console.log(err);
                            };
                        });
                    };
                });
            } else {
                // Then run a request to the OMDB API with the movie specified
                request("http://www.omdbapi.com/?t=" + dataArr.slice(1).join("+") + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        
                    // If the request is successful (i.e. if the response status code is 200)
                    if (!error && response.statusCode === 200) {
                        var movieResults = [
                            "Movie Title: " + JSON.parse(body).Title,
                            "Year of Release: " + JSON.parse(body).Year,
                            "IMDB Rating: " + JSON.parse(body).imdbRating,
                            "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value,
                            "Produced in: " + JSON.parse(body).Country,
                            "Language: " + JSON.parse(body).Language,
                            "Plot: " + JSON.parse(body).Plot,
                            "Actors: " + JSON.parse(body).Actors
                        ]
                        // Parse the body of the site and recover info
                        console.log(movieResults[0]);
                        console.log(movieResults[1]);
                        console.log(movieResults[2]);
                        console.log(movieResults[3]);
                        console.log(movieResults[4]);
                        console.log(movieResults[5]);
                        console.log(movieResults[6]);
                        console.log(movieResults[7]);
        
                        fs.appendFile("log.txt", "\n\n======================================================================\n" + "\n" + movieResults[0] + "\n" + movieResults[1] + "\n" + movieResults[2] + "\n" + movieResults[3] + movieResults[4] + "\n" + movieResults[5] + "\n" + movieResults[6] + "\n" + movieResults[7], function (err) {
                            // If an error was experienced we say it.
                            if (err) {
                                console.log(err);
                            };
                        });
                    };
                });
            };
        };
    });
};
