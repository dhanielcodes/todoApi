const express = require("express");
const mongodb = require('mongodb')
const cors = require('cors')
const { responseBody } = require('./handleResponse')
let db;

const app = express()

/* const whitelist = ['http://127.0.0.1:5501']; // assuming front-end application is running on localhost port 3000

const corsOptions = {
  origin: function (origin, callback) {
    if (origin === 'localhost:5034') {
      callback(null, true)
    } else {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        console.log(origin)
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
} 
  
app.use(cors(corsOptions));
*/

app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const uri = 'mongodb+srv://adekoyadaniel53:jrf62sOJKLE0u1h7@cluster0.polcmk8.mongodb.net/Nodeapp?retryWrites=true&w=majority&appName=Cluster0'


const connectDb = async () => {
  const client = new mongodb.MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  await client.connect()
  db = client.db().collection('pets')
  app.listen(5034)

}
connectDb()
// Define the CORS options

const passWordAuthenticate = (req, res, next) => {
  res.set('WWW-Authenticate', 'Basic realm="Simple Todo App"')
  if (req.headers.authorization == 'Basic RGhhbmllbDphZGU=') {
    next()
  } else {
    res.status(401).send({ ['Status Message']: 'Unauthorized' })
  }
}
//app.use(passWordAuthenticate)

const start = async (req, res) => {
  res.send(`
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple To-Do App</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
      integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
      crossorigin="anonymous" />
  </head>
  <body>
    <div class="container">
    <h1 class="display-4 text-center py-1">Pet Names</h1>

      <div class="jumbotron p-3 shadow-sm">
        <form id="form">
          <div class="d-flex align-items-center">
            <input
              autofocus
              autocomplete="off"
              name="name"
              class="form-control mr-3"
              id="name"
              type="text"
              style="flex: 1" />
            <button class="btn btn-primary">Add New Item</button>
          </div>
        </form>
      </div>
      <ul class="list-group pb-5 ll"></ul>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="browser.js"></script>
  </body>
</html>

    `)
}

const home = async (req, res) => {
  console.log(req)
  const list = await db.find().toArray()
  res.status(200).send(responseBody(list))
}

const resT = async (req, res) => {
  console.log(req)
  await res.status(200).send(responseBody({

    "data": [
      {
        "location_id": "23023329",
        "name": "Sadrasa Kitchen and Bar",
        "latitude": "-6.900828",
        "longitude": "107.61735",
        "num_reviews": "1407",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/1c/e7/29/39/breakfast-corner.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/1c/e7/29/39/breakfast-corner.jpg",
              "height": "50"
            },
            "original": {
              "width": "900",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/1c/e7/29/39/breakfast-corner.jpg",
              "height": "600"
            },
            "large": {
              "width": "900",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/1c/e7/29/39/breakfast-corner.jpg",
              "height": "600"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/1c/e7/29/39/breakfast-corner.jpg",
              "height": "367"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2021-04-25T20:40:01-0400",
          "caption": "Breakfast corner",
          "id": "484911417",
          "helpful_votes": "4",
          "published_date": "2021-04-25T20:40:01-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/23023329",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.970806121826172",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "1",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#1 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "$$ - $$$",
        "price": "$50,000 - $300,000",
        "description": "Who’s hungry? Come take a seat at the Sadrasa Kitchen & Bar, an innovative space designed for savoring traditional recipes with a modern twist or relishing international favorites. Take your time exploring the flavors of a quick breakfast, a leisurely business lunch, or a celebratory dinner with friends. Whatever the occasion, whatever the time of day, Sadrasa Kitchen & Bar stands at the ready.",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d23023329-Reviews-Sadrasa_Kitchen_and_Bar-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d23023329-Sadrasa_Kitchen_and_Bar-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [
          {
            "key": "sit_down",
            "name": "Sit down"
          }
        ],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+(62)86038881",
        "website": "http://all.accor.com/hotel/9109/index.id.shtml",
        "email": "H9109-FB@accor.com",
        "address_obj": {
          "street1": "Jl. Diponegoro No 27",
          "street2": "Pullman Bandung Grand Central",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40115"
        },
        "address": "Jl. Diponegoro No 27 Pullman Bandung Grand Central, Bandung 40115 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 360,
                "close_time": 1260
              }
            ],
            [
              {
                "open_time": 360,
                "close_time": 1260
              }
            ],
            [
              {
                "open_time": 360,
                "close_time": 1260
              }
            ],
            [
              {
                "open_time": 360,
                "close_time": 1260
              }
            ],
            [
              {
                "open_time": 360,
                "close_time": 1260
              }
            ],
            [
              {
                "open_time": 360,
                "close_time": 1260
              }
            ],
            [
              {
                "open_time": 360,
                "close_time": 1260
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "10648",
            "name": "International"
          },
          {
            "key": "10659",
            "name": "Asian"
          },
          {
            "key": "10690",
            "name": "Indonesian"
          }
        ],
        "dietary_restrictions": [],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "15699453",
        "name": "Justus Steak House Dago",
        "latitude": "-6.90126",
        "longitude": "107.611855",
        "num_reviews": "848",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/24/8a/61/76/ambience.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/24/8a/61/76/ambience.jpg",
              "height": "50"
            },
            "original": {
              "width": "1280",
              "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/24/8a/61/76/ambience.jpg",
              "height": "854"
            },
            "large": {
              "width": "1024",
              "url": "https://media-cdn.tripadvisor.com/media/photo-w/24/8a/61/76/ambience.jpg",
              "height": "684"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/24/8a/61/76/ambience.jpg",
              "height": "367"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2022-07-11T02:38:04-0400",
          "caption": "ambience",
          "id": "613048694",
          "helpful_votes": "0",
          "published_date": "2022-07-11T02:38:04-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/15699453",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.954573631286621",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "2",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#2 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "$$ - $$$",
        "description": "",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d15699453-Reviews-Justus_Steak_House_Dago-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d15699453-Justus_Steak_House_Dago-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 811-2180-880",
        "website": "http://www.justusku.co.id",
        "email": "justussteakhouse@gmail.com",
        "address_obj": {
          "street1": "Jl. Ir. H. Juanda No. 59",
          "street2": "Tamansari, Bandung Wetan",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40116"
        },
        "address": "Jl. Ir. H. Juanda No. 59 Tamansari, Bandung Wetan, Bandung 40116 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "4617",
            "name": "Italian"
          },
          {
            "key": "10345",
            "name": "Steakhouse"
          },
          {
            "key": "10642",
            "name": "Cafe"
          },
          {
            "key": "10654",
            "name": "European"
          },
          {
            "key": "10659",
            "name": "Asian"
          },
          {
            "key": "10690",
            "name": "Indonesian"
          }
        ],
        "dietary_restrictions": [],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "15333482",
        "name": "Pago Restaurant",
        "latitude": "-6.923141",
        "longitude": "107.62387",
        "num_reviews": "1163",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/15/7a/f4/02/pago-balcony.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/15/7a/f4/02/pago-balcony.jpg",
              "height": "50"
            },
            "original": {
              "width": "750",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/15/7a/f4/02/pago-balcony.jpg",
              "height": "500"
            },
            "large": {
              "width": "750",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/15/7a/f4/02/pago-balcony.jpg",
              "height": "500"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/15/7a/f4/02/pago-balcony.jpg",
              "height": "367"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2018-11-23T05:50:14-0500",
          "caption": "Pago Balcony",
          "id": "360379394",
          "helpful_votes": "6",
          "published_date": "2018-11-23T05:50:14-0500",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/15333482",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.953856945037842",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "3",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#3 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "$$ - $$$",
        "price": "$65,000 - $250,000",
        "description": "Pago Restaurant is a new dining experience concept serving authentic Indonesian, Asian and Western specialties. Open for breakfast, lunch, and dinner, this restaurant offers extensive buffet and a la carte options.",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d15333482-Reviews-Pago_Restaurant-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d15333482-Pago_Restaurant-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [
          {
            "key": "sit_down",
            "name": "Sit down"
          }
        ],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 22 7310799",
        "website": "http://www.thepapandayan.com/dining/pago",
        "email": "info@thepapandayan.com",
        "address_obj": {
          "street1": "Jl. Gatot Subroto No.83",
          "street2": "The Papandayan Hotel",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40262"
        },
        "address": "Jl. Gatot Subroto No.83 The Papandayan Hotel, Bandung 40262 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 360,
                "close_time": 1380
              }
            ],
            [
              {
                "open_time": 360,
                "close_time": 1380
              }
            ],
            [
              {
                "open_time": 360,
                "close_time": 1380
              }
            ],
            [
              {
                "open_time": 360,
                "close_time": 1380
              }
            ],
            [
              {
                "open_time": 360,
                "close_time": 1380
              }
            ],
            [
              {
                "open_time": 360,
                "close_time": 1380
              }
            ],
            [
              {
                "open_time": 360,
                "close_time": 1380
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "9908",
            "name": "American"
          },
          {
            "key": "10659",
            "name": "Asian"
          },
          {
            "key": "10690",
            "name": "Indonesian"
          },
          {
            "key": "10651",
            "name": "Barbecue"
          },
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "dietary_restrictions": [
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "2368427",
        "name": "Hummingbird Eatery & Space",
        "latitude": "-6.904715",
        "longitude": "107.6183",
        "num_reviews": "4586",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/26/b6/2f/cc/new-aviary.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/26/b6/2f/cc/new-aviary.jpg",
              "height": "50"
            },
            "original": {
              "width": "1280",
              "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/26/b6/2f/cc/new-aviary.jpg",
              "height": "853"
            },
            "large": {
              "width": "1024",
              "url": "https://media-cdn.tripadvisor.com/media/photo-w/26/b6/2f/cc/new-aviary.jpg",
              "height": "683"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/26/b6/2f/cc/new-aviary.jpg",
              "height": "367"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2022-10-27T21:39:18-0400",
          "caption": "new aviary\n",
          "id": "649473996",
          "helpful_votes": "0",
          "published_date": "2022-10-27T21:39:18-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/2368427",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.947447776794434",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "4",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#4 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "$$ - $$$",
        "price": "$8 - $20",
        "description": "We offer you luxurious tasting food and beverages. Celebrate special and cozy moments with us and enjoy the outstanding interior of our restaurant.",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d2368427-Reviews-Hummingbird_Eatery_Space-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d2368427-Hummingbird_Eatery_Space-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [
          {
            "key": "sit_down",
            "name": "Sit down"
          }
        ],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 22 4212582",
        "website": "http://www.hummingbird-eatery.com",
        "email": "hummingbird_eatery@yahoo.com",
        "address_obj": {
          "street1": "Jl. Progo 14",
          "street2": null,
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40115"
        },
        "address": "Jl. Progo 14, Bandung 40115 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "10654",
            "name": "European"
          },
          {
            "key": "10690",
            "name": "Indonesian"
          },
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "dietary_restrictions": [
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "23789757",
        "name": "Mad Cow Wine & Grill Bandung",
        "latitude": "-6.900701",
        "longitude": "107.61652",
        "num_reviews": "337",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/21/b6/a6/14/semi-outdoor-seating.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/21/b6/a6/14/semi-outdoor-seating.jpg",
              "height": "50"
            },
            "original": {
              "width": "1280",
              "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/21/b6/a6/14/semi-outdoor-seating.jpg",
              "height": "853"
            },
            "large": {
              "width": "1024",
              "url": "https://media-cdn.tripadvisor.com/media/photo-w/21/b6/a6/14/semi-outdoor-seating.jpg",
              "height": "683"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/21/b6/a6/14/semi-outdoor-seating.jpg",
              "height": "367"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2021-12-27T03:43:08-0500",
          "caption": "semi outdoor - seating area",
          "id": "565618196",
          "helpful_votes": "2",
          "published_date": "2021-12-27T03:43:08-0500",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/23789757",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.937067031860352",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "5",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#5 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "$$$$",
        "price": "$59,000 - $4,000,000",
        "description": "MAD ABOUT FOOD, SERIOUS ABOUT WINE. We believe in REAL FOOD. Mad Cow Wine and Grill Bandung combines the best New York-style grill with a casual urban wine bar, creating a stylishly unique atmosphere. Enjoy delectable meals paired with an exceptional beverage selection fashioned by our in-house mixologist, all the while surrounded by limitless views and city lights from above.",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d23789757-Reviews-Mad_Cow_Wine_Grill_Bandung-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d23789757-Mad_Cow_Wine_Grill_Bandung-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [
          {
            "key": "sit_down",
            "name": "Sit down"
          }
        ],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 22 86038888",
        "website": "http://madcowbandung.com/",
        "email": "h9109@accor.com",
        "address_obj": {
          "street1": "Jl. Diponegoro No.27",
          "street2": "Pullman Tower, 17th Floor",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40115"
        },
        "address": "Jl. Diponegoro No.27 Pullman Tower, 17th Floor, Bandung 40115 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 960,
                "close_time": 1350
              }
            ],
            [
              {
                "open_time": 960,
                "close_time": 1350
              }
            ],
            [
              {
                "open_time": 960,
                "close_time": 1350
              }
            ],
            [
              {
                "open_time": 960,
                "close_time": 1350
              }
            ],
            [
              {
                "open_time": 960,
                "close_time": 1350
              }
            ],
            [
              {
                "open_time": 960,
                "close_time": 1350
              }
            ],
            [
              {
                "open_time": 960,
                "close_time": 1350
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "10648",
            "name": "International"
          },
          {
            "key": "10690",
            "name": "Indonesian"
          },
          {
            "key": "10345",
            "name": "Steakhouse"
          },
          {
            "key": "10682",
            "name": "Wine Bar"
          }
        ],
        "dietary_restrictions": [],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "23486451",
        "name": "Justus Steak House Metro Indah Mall",
        "latitude": "-6.94178",
        "longitude": "107.65821",
        "num_reviews": "487",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/24/8a/64/1c/ambience.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/24/8a/64/1c/ambience.jpg",
              "height": "50"
            },
            "original": {
              "width": "1280",
              "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/24/8a/64/1c/ambience.jpg",
              "height": "960"
            },
            "large": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/24/8a/64/1c/ambience.jpg",
              "height": "413"
            },
            "medium": {
              "width": "250",
              "url": "https://media-cdn.tripadvisor.com/media/photo-f/24/8a/64/1c/ambience.jpg",
              "height": "188"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2022-07-11T02:47:15-0400",
          "caption": "ambience",
          "id": "613049372",
          "helpful_votes": "1",
          "published_date": "2022-07-11T02:47:15-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/23486451",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.928979396820068",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "6",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#6 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "",
        "description": "",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d23486451-Reviews-Justus_Steak_House_Metro_Indah_Mall-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d23486451-Justus_Steak_House_Metro_Indah_Mall-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 811-2180-880",
        "website": "http://justusku.co.id",
        "address_obj": {
          "street1": "Jl. Soekarno-hatta Jl. Mtc Barat No.59040286",
          "street2": null,
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40286"
        },
        "address": "Jl. Soekarno-hatta Jl. Mtc Barat No.59040286, Bandung 40286 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 660,
                "close_time": 1200
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1200
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1200
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1200
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1200
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1200
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1200
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "9908",
            "name": "American"
          },
          {
            "key": "10659",
            "name": "Asian"
          }
        ],
        "dietary_restrictions": [],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "23794947",
        "name": "Monomono",
        "latitude": "-6.843884",
        "longitude": "107.60022",
        "num_reviews": "373",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/21/f0/54/79/outdoor-dinning-area.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/21/f0/54/79/outdoor-dinning-area.jpg",
              "height": "50"
            },
            "original": {
              "width": "820",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/21/f0/54/79/outdoor-dinning-area.jpg",
              "height": "547"
            },
            "large": {
              "width": "820",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/21/f0/54/79/outdoor-dinning-area.jpg",
              "height": "547"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/21/f0/54/79/outdoor-dinning-area.jpg",
              "height": "367"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2022-01-23T21:31:38-0500",
          "caption": "Outdoor Dinning Area",
          "id": "569398393",
          "helpful_votes": "2",
          "published_date": "2022-01-23T21:31:38-0500",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/23794947",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.928658962249756",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "7",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#7 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "",
        "description": "Inspired by the exploration, discovery and creativity of Japanese migrants in Peru, Monomono’s menu tells the story of possibilities. Serving unique combination of Nikkei Cuisine and Argentinean Grill, Monomono is where guests enjoy a relaxed and social dining experience.",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d23794947-Reviews-Monomono-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d23794947-Monomono-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 811-2110-1278",
        "website": "https://www.instagram.com/monomonobandung/",
        "email": "monomono@thegaiabandung.com",
        "address_obj": {
          "street1": "Jl. Dr. Setiabudi No 430",
          "street2": null,
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "55165"
        },
        "address": "Jl. Dr. Setiabudi No 430, Bandung 55165 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 690,
                "close_time": 1350
              }
            ],
            [
              {
                "open_time": 900,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 900,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 900,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 900,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 690,
                "close_time": 1350
              }
            ],
            [
              {
                "open_time": 630,
                "close_time": 1350
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "10631",
            "name": "Peruvian"
          },
          {
            "key": "21367",
            "name": "Japanese Fusion"
          }
        ],
        "dietary_restrictions": [],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "6650362",
        "name": "Miss Bee Providore",
        "latitude": "-6.86842",
        "longitude": "107.60909",
        "num_reviews": "3266",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/13/21/85/50/venue.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/13/21/85/50/venue.jpg",
              "height": "50"
            },
            "original": {
              "width": "1000",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/13/21/85/50/venue.jpg",
              "height": "669"
            },
            "large": {
              "width": "1000",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/13/21/85/50/venue.jpg",
              "height": "669"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/13/21/85/50/venue.jpg",
              "height": "368"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2018-05-31T21:55:50-0400",
          "caption": "venue",
          "id": "320963920",
          "helpful_votes": "5",
          "published_date": "2018-05-31T21:55:50-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/6650362",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.927484512329102",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "8",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#8 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "4.5",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "$$ - $$$",
        "price": "$20 - $250",
        "description": "",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d6650362-Reviews-Miss_Bee_Providore-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d6650362-Miss_Bee_Providore-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [
          {
            "key": "cafe",
            "name": "Café"
          }
        ],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 22 2033613",
        "website": "http://www.missbeeprovidore.com",
        "email": "missbee.providore@yahoo.com",
        "address_obj": {
          "street1": "Jl. Ranca Bentang no. 11A",
          "street2": "Ciumbuleuit",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40142"
        },
        "address": "Jl. Ranca Bentang no. 11A Ciumbuleuit, Bandung 40142 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "4617",
            "name": "Italian"
          },
          {
            "key": "9908",
            "name": "American"
          },
          {
            "key": "10634",
            "name": "Southwestern"
          },
          {
            "key": "10654",
            "name": "European"
          },
          {
            "key": "10659",
            "name": "Asian"
          },
          {
            "key": "10690",
            "name": "Indonesian"
          },
          {
            "key": "10670",
            "name": "Pub"
          },
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "dietary_restrictions": [
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "14758505",
        "name": "Justus Steak House Paskal 23",
        "latitude": "-6.90956",
        "longitude": "107.59843",
        "num_reviews": "488",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/24/8a/65/59/ambience.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/24/8a/65/59/ambience.jpg",
              "height": "50"
            },
            "original": {
              "width": "1280",
              "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/24/8a/65/59/ambience.jpg",
              "height": "960"
            },
            "large": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/24/8a/65/59/ambience.jpg",
              "height": "413"
            },
            "medium": {
              "width": "250",
              "url": "https://media-cdn.tripadvisor.com/media/photo-f/24/8a/65/59/ambience.jpg",
              "height": "188"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2022-07-11T02:51:12-0400",
          "caption": "ambience",
          "id": "613049689",
          "helpful_votes": "0",
          "published_date": "2022-07-11T02:51:12-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/14758505",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.9248948097229",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "9",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#9 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "$$ - $$$",
        "description": "",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d14758505-Reviews-Justus_Steak_House_Paskal_23-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d14758505-Justus_Steak_House_Paskal_23-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 22 20568355",
        "website": "http://www.justusku.co.id/",
        "address_obj": {
          "street1": "Jl. Paskirkaliki No. 25-27",
          "street2": "23 Paskal, Level 3",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40241"
        },
        "address": "Jl. Paskirkaliki No. 25-27 23 Paskal, Level 3, Bandung 40241 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "10648",
            "name": "International"
          }
        ],
        "dietary_restrictions": [],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "3157556",
        "name": "Purnawarman Restaurant",
        "latitude": "-6.912856",
        "longitude": "107.59762",
        "num_reviews": "970",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/12/fb/23/dd/social-gathering-at-purnawarma.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/12/fb/23/dd/social-gathering-at-purnawarma.jpg",
              "height": "50"
            },
            "original": {
              "width": "2000",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/12/fb/23/dd/social-gathering-at-purnawarma.jpg",
              "height": "1333"
            },
            "large": {
              "width": "1024",
              "url": "https://media-cdn.tripadvisor.com/media/photo-w/12/fb/23/dd/social-gathering-at-purnawarma.jpg",
              "height": "682"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/12/fb/23/dd/social-gathering-at-purnawarma.jpg",
              "height": "367"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2018-05-18T01:24:15-0400",
          "caption": "Social gathering at Purnawarman Restaurant",
          "id": "318448605",
          "helpful_votes": "2",
          "published_date": "2018-05-18T01:24:15-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/3157556",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.920822620391846",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "10",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#10 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "$$ - $$$",
        "price": "$70,000 - $262,000",
        "description": "Experience fresh flavors from Asia and around the world in the all-day dining venue, Purnawarman Restaurant at the Hilton Bandung hotel. Savor a fresh buffet breakfast, a la carte lunch and buffet dinner and experience the theatrical, interactive kitchen. Dine on contemporary and traditional Asian delicacies such as Sop Buntut and Purnawarman Fried Rice on relaxed indoor and outdoor seating in this warm and welcoming restaurant.",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d3157556-Reviews-Purnawarman_Restaurant-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d3157556-Purnawarman_Restaurant-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [
          {
            "key": "sit_down",
            "name": "Sit down"
          }
        ],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 22 86066888",
        "website": "http://eatdrinkhilton.com/purnawarman",
        "email": "bdohi_fb@hilton.com",
        "address_obj": {
          "street1": "Jl. HOS Tjokroaminoto no. 41-43",
          "street2": "Hilton Hotel Bandung",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40172"
        },
        "address": "Jl. HOS Tjokroaminoto no. 41-43 Hilton Hotel Bandung, Bandung 40172 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 390,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 390,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 390,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 390,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 390,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 390,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 390,
                "close_time": 1320
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "10659",
            "name": "Asian"
          },
          {
            "key": "10690",
            "name": "Indonesian"
          },
          {
            "key": "10648",
            "name": "International"
          },
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "dietary_restrictions": [
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "7913140",
        "name": "Fresco Restaurant",
        "latitude": "-6.912778",
        "longitude": "107.5975",
        "num_reviews": "582",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/1e/4d/f3/10/enjoy-a-little-italian.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/1e/4d/f3/10/enjoy-a-little-italian.jpg",
              "height": "50"
            },
            "original": {
              "width": "1280",
              "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/1e/4d/f3/10/enjoy-a-little-italian.jpg",
              "height": "960"
            },
            "large": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/1e/4d/f3/10/enjoy-a-little-italian.jpg",
              "height": "413"
            },
            "medium": {
              "width": "250",
              "url": "https://media-cdn.tripadvisor.com/media/photo-f/1e/4d/f3/10/enjoy-a-little-italian.jpg",
              "height": "188"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2021-09-25T23:03:01-0400",
          "caption": "Enjoy a little Italian vibes only at Fresco Restaurant",
          "id": "508424976",
          "helpful_votes": "0",
          "published_date": "2021-09-25T23:03:01-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/7913140",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.919547080993652",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "11",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#11 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "$$ - $$$",
        "price": "$39 - $80,000",
        "description": "Located by the rooftop pool, Fresco serves up array of Italian food and beverages. Take in the panoramic city views and enjoy the cool evening breeze as the chefs prepare food at the live interactive kitchen.",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d7913140-Reviews-Fresco_Restaurant-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d7913140-Fresco_Restaurant-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [
          {
            "key": "sit_down",
            "name": "Sit down"
          }
        ],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 22 86066888",
        "website": "http://eatdrinkhilton.com/fresco/#/",
        "email": "bdohi_fb@hilton.com",
        "address_obj": {
          "street1": "Jl. H.O.S. Tjokroaminoto no. 41-43",
          "street2": "Hilton Bandung, 6th Floor",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40172"
        },
        "address": "Jl. H.O.S. Tjokroaminoto no. 41-43 Hilton Bandung, 6th Floor, Bandung 40172 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 840,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 840,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 840,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 840,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 840,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 840,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 840,
                "close_time": 1320
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "4617",
            "name": "Italian"
          },
          {
            "key": "10641",
            "name": "Pizza"
          },
          {
            "key": "10649",
            "name": "Mediterranean"
          },
          {
            "key": "10648",
            "name": "International"
          },
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "dietary_restrictions": [
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "12153371",
        "name": "The Restaurant at The Trans Luxury Hotel",
        "latitude": "-6.927232",
        "longitude": "107.63605",
        "num_reviews": "752",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/0e/b0/5e/31/live-cooking-area.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/0e/b0/5e/31/live-cooking-area.jpg",
              "height": "50"
            },
            "original": {
              "width": "2000",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/0e/b0/5e/31/live-cooking-area.jpg",
              "height": "1209"
            },
            "large": {
              "width": "1024",
              "url": "https://media-cdn.tripadvisor.com/media/photo-w/0e/b0/5e/31/live-cooking-area.jpg",
              "height": "619"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/0e/b0/5e/31/live-cooking-area.jpg",
              "height": "332"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2017-03-17T07:59:45-0400",
          "caption": "Live cooking area",
          "id": "246439473",
          "helpful_votes": "1",
          "published_date": "2017-03-17T07:59:45-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/12153371",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.917623043060303",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "12",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#12 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Open Now",
        "is_long_closed": false,
        "price_level": "$$ - $$$",
        "price": "$150,000 - $350,000",
        "description": "Indulge in a world of difference! Satisfy your cravings with a choice of Asian and Western cuisines accompanied by live cooking stations, mouth-watering desserts and ice cream stations. Savour the delights with buffet style or a la carte style within distinctive surroundings at our Halal certified All Day Dining, The Restaurant.",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d12153371-Reviews-The_Restaurant_at_The_Trans_Luxury_Hotel-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d12153371-The_Restaurant_at_The_Trans_Luxury_Hotel-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [
          {
            "key": "sit_down",
            "name": "Sit down"
          }
        ],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 22 87348888",
        "website": "http://www.thetranshotel.com/gastronomy",
        "email": "the.restaurant@thetranshotel.com",
        "address_obj": {
          "street1": "Gatot Subroto 289",
          "street2": "The Trans Luxury Hotel – 3rd Floor",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40273"
        },
        "address": "Gatot Subroto 289 The Trans Luxury Hotel – 3rd Floor, Bandung 40273 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ],
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ],
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ],
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ],
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ],
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ],
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "5379",
            "name": "Chinese"
          },
          {
            "key": "10648",
            "name": "International"
          },
          {
            "key": "10659",
            "name": "Asian"
          },
          {
            "key": "10690",
            "name": "Indonesian"
          },
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "dietary_restrictions": [
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "23408196",
        "name": "Noughts And Crosses Coffee",
        "latitude": "-6.914611",
        "longitude": "107.593155",
        "num_reviews": "267",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/28/04/51/4c/noughts-and-crosses-coffee.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/28/04/51/4c/noughts-and-crosses-coffee.jpg",
              "height": "50"
            },
            "original": {
              "width": "1024",
              "url": "https://media-cdn.tripadvisor.com/media/photo-w/28/04/51/4c/noughts-and-crosses-coffee.jpg",
              "height": "1365"
            },
            "large": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-p/28/04/51/4c/noughts-and-crosses-coffee.jpg",
              "height": "733"
            },
            "medium": {
              "width": "338",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/28/04/51/4c/noughts-and-crosses-coffee.jpg",
              "height": "450"
            }
          },
          "is_blessed": false,
          "uploaded_date": "2023-01-26T08:31:17-0500",
          "caption": "",
          "id": "671371596",
          "helpful_votes": "0",
          "published_date": "2023-01-26T08:31:17-0500",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/23408196",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.916936874389648",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "13",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#1 of 189 Coffee & Tea in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "",
        "description": "",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d23408196-Reviews-Noughts_And_Crosses_Coffee-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d23408196-Noughts_And_Crosses_Coffee-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 22 20578748",
        "website": "http://www.instagram.com/noughtsandcrosses.bdg/?hl=en",
        "address_obj": {
          "street1": "Jl. Pasir Kaliki No.25-27",
          "street2": "Paskal Hyper Square, Blok J, The House Convention Hall",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40181"
        },
        "address": "Jl. Pasir Kaliki No.25-27 Paskal Hyper Square, Blok J, The House Convention Hall, Bandung 40181 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "10654",
            "name": "European"
          },
          {
            "key": "10659",
            "name": "Asian"
          }
        ],
        "dietary_restrictions": [],
        "establishment_types": [
          {
            "key": "9900",
            "name": "Coffee & Tea"
          }
        ]
      },
      {
        "location_id": "12392000",
        "name": "Justus Steakhouse Cimanuk",
        "latitude": "-6.904865",
        "longitude": "107.6205",
        "num_reviews": "651",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/24/8a/5f/89/ambience.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/24/8a/5f/89/ambience.jpg",
              "height": "50"
            },
            "original": {
              "width": "1280",
              "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/24/8a/5f/89/ambience.jpg",
              "height": "854"
            },
            "large": {
              "width": "1024",
              "url": "https://media-cdn.tripadvisor.com/media/photo-w/24/8a/5f/89/ambience.jpg",
              "height": "684"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/24/8a/5f/89/ambience.jpg",
              "height": "367"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2022-07-11T02:31:04-0400",
          "caption": "Ambience",
          "id": "613048201",
          "helpful_votes": "0",
          "published_date": "2022-07-11T02:31:04-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/12392000",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.911557674407959",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "14",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#13 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "$$ - $$$",
        "price": "$30,000 - $400,000",
        "description": "Justus Steak House. A Bandung restaurant that specializes in steaks from highest quality meat but also serves chicken, salad, pasta, burger, desert, and beverages.",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d12392000-Reviews-Justus_Steakhouse_Cimanuk-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d12392000-Justus_Steakhouse_Cimanuk-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [
          {
            "key": "sit_down",
            "name": "Sit down"
          }
        ],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 811-2180-880",
        "website": "http://www.justusku.co.id",
        "email": "justussteakhouse@gmail.com",
        "address_obj": {
          "street1": "Jl. Cimanuk No. 08",
          "street2": null,
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40115"
        },
        "address": "Jl. Cimanuk No. 08, Bandung 40115 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "10345",
            "name": "Steakhouse"
          },
          {
            "key": "10642",
            "name": "Cafe"
          },
          {
            "key": "10648",
            "name": "International"
          },
          {
            "key": "10654",
            "name": "European"
          },
          {
            "key": "10668",
            "name": "Grill"
          }
        ],
        "dietary_restrictions": [],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "16850243",
        "name": "Justus Steakhouse - Ciwalk",
        "latitude": "-6.894155",
        "longitude": "107.60394",
        "num_reviews": "290",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/21/52/14/fe/justus-steakhouse-ciwalk.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/21/52/14/fe/justus-steakhouse-ciwalk.jpg",
              "height": "50"
            },
            "original": {
              "width": "800",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/21/52/14/fe/justus-steakhouse-ciwalk.jpg",
              "height": "600"
            },
            "large": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/21/52/14/fe/justus-steakhouse-ciwalk.jpg",
              "height": "413"
            },
            "medium": {
              "width": "250",
              "url": "https://media-cdn.tripadvisor.com/media/photo-f/21/52/14/fe/justus-steakhouse-ciwalk.jpg",
              "height": "188"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2021-11-02T01:13:21-0400",
          "caption": "Justus Steakhouse Ciwalk",
          "id": "559027454",
          "helpful_votes": "0",
          "published_date": "2021-11-02T01:13:21-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/16850243",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.902921676635742",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "15",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#14 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "",
        "description": "",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d16850243-Reviews-Justus_Steakhouse_Ciwalk-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d16850243-Justus_Steakhouse_Ciwalk-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 811-2180-880",
        "website": "http://www.justusku.co.id/",
        "address_obj": {
          "street1": "Jl. Cihampelas no. 160",
          "street2": "Cihampelas Walk, Young street SG 17A",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40131"
        },
        "address": "Jl. Cihampelas no. 160 Cihampelas Walk, Young street SG 17A, Bandung 40131 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "9908",
            "name": "American"
          },
          {
            "key": "10345",
            "name": "Steakhouse"
          },
          {
            "key": "10642",
            "name": "Cafe"
          },
          {
            "key": "10659",
            "name": "Asian"
          },
          {
            "key": "10668",
            "name": "Grill"
          },
          {
            "key": "10690",
            "name": "Indonesian"
          }
        ],
        "dietary_restrictions": [],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "14982924",
        "name": "Justus Steak House Paris van Java",
        "latitude": "-6.889219",
        "longitude": "107.59599",
        "num_reviews": "417",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/21/52/18/a2/justus-steakhouse-paris.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/21/52/18/a2/justus-steakhouse-paris.jpg",
              "height": "50"
            },
            "original": {
              "width": "1280",
              "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/21/52/18/a2/justus-steakhouse-paris.jpg",
              "height": "854"
            },
            "large": {
              "width": "1024",
              "url": "https://media-cdn.tripadvisor.com/media/photo-w/21/52/18/a2/justus-steakhouse-paris.jpg",
              "height": "684"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/21/52/18/a2/justus-steakhouse-paris.jpg",
              "height": "367"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2021-11-02T01:41:37-0400",
          "caption": "Justus Steakhouse Paris van Java",
          "id": "559028386",
          "helpful_votes": "1",
          "published_date": "2021-11-02T01:41:37-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/14982924",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.896938800811768",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "16",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#15 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "",
        "description": "",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d14982924-Reviews-Justus_Steak_House_Paris_van_Java-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d14982924-Justus_Steak_House_Paris_van_Java-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 811-2180-880",
        "website": "http://www.justusku.co.id/",
        "address_obj": {
          "street1": "Jl. Sukajadi No.131 - 139",
          "street2": "Paris van Java Sky Level SL-C 21",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40162"
        },
        "address": "Jl. Sukajadi No.131 - 139 Paris van Java Sky Level SL-C 21, Bandung 40162 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 660,
                "close_time": 1320
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "10345",
            "name": "Steakhouse"
          },
          {
            "key": "10646",
            "name": "Fast Food"
          },
          {
            "key": "10648",
            "name": "International"
          },
          {
            "key": "10654",
            "name": "European"
          }
        ],
        "dietary_restrictions": [],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "23486453",
        "name": "Justus Steak House Miko Mall",
        "latitude": "-6.960056",
        "longitude": "107.58103",
        "num_reviews": "133",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/21/52/17/0d/justus-steakhouse-miko.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/21/52/17/0d/justus-steakhouse-miko.jpg",
              "height": "50"
            },
            "original": {
              "width": "1280",
              "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/21/52/17/0d/justus-steakhouse-miko.jpg",
              "height": "853"
            },
            "large": {
              "width": "1024",
              "url": "https://media-cdn.tripadvisor.com/media/photo-w/21/52/17/0d/justus-steakhouse-miko.jpg",
              "height": "683"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/21/52/17/0d/justus-steakhouse-miko.jpg",
              "height": "367"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2021-11-02T01:33:18-0400",
          "caption": "Justus Steakhouse Miko Mall",
          "id": "559027981",
          "helpful_votes": "0",
          "published_date": "2021-11-02T01:33:18-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/23486453",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.864223003387451",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "17",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#16 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "is_long_closed": false,
        "price_level": "",
        "description": "",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d23486453-Reviews-Justus_Steak_House_Miko_Mall-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d23486453-Justus_Steak_House_Miko_Mall-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 811-2180-880",
        "website": "http://justusku.co.id",
        "address_obj": {
          "street1": "Miko Mall",
          "street2": null,
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40227"
        },
        "address": "Miko Mall, Bandung 40227 Indonesia",
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "9908",
            "name": "American"
          },
          {
            "key": "10659",
            "name": "Asian"
          }
        ],
        "dietary_restrictions": [],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "23695059",
        "name": "Kumari (Bake And Brew)",
        "latitude": "-6.893191",
        "longitude": "107.617096",
        "num_reviews": "184",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/29/11/58/b2/caption.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/29/11/58/b2/caption.jpg",
              "height": "50"
            },
            "original": {
              "width": "1280",
              "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/29/11/58/b2/caption.jpg",
              "height": "1280"
            },
            "large": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-p/29/11/58/b2/caption.jpg",
              "height": "550"
            },
            "medium": {
              "width": "450",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/29/11/58/b2/caption.jpg",
              "height": "450"
            }
          },
          "is_blessed": false,
          "uploaded_date": "2023-05-10T07:34:09-0400",
          "caption": "",
          "id": "689002674",
          "helpful_votes": "0",
          "published_date": "2023-05-10T07:34:09-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/23695059",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.862416744232178",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "18",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#2 of 189 Coffee & Tea in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "$",
        "price": "$20 - $50",
        "description": "We Bake and We Brew",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d23695059-Reviews-Kumari_Bake_And_Brew-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d23695059-Kumari_Bake_And_Brew-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [
          {
            "key": "sit_down",
            "name": "Sit down"
          }
        ],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 817-7511-5155",
        "email": "kumari.bakeandbrew@gmail.com",
        "address_obj": {
          "street1": "Lebakgede, Kecamatan Coblong",
          "street2": "Jalan Bagusrangin No. 1",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40132"
        },
        "address": "Lebakgede, Kecamatan Coblong Jalan Bagusrangin No. 1, Bandung 40132 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ],
            [
              {
                "open_time": 420,
                "close_time": 1320
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [],
        "dietary_restrictions": [],
        "establishment_types": [
          {
            "key": "9900",
            "name": "Coffee & Tea"
          }
        ]
      },
      {
        "location_id": "10860074",
        "name": "Tjokro Restaurant",
        "latitude": "-6.886478",
        "longitude": "107.60401",
        "num_reviews": "574",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/0c/df/a0/0b/getlstd-property-photo.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/0c/df/a0/0b/getlstd-property-photo.jpg",
              "height": "50"
            },
            "original": {
              "width": "1000",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/0c/df/a0/0b/getlstd-property-photo.jpg",
              "height": "313"
            },
            "large": {
              "width": "1000",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/0c/df/a0/0b/getlstd-property-photo.jpg",
              "height": "313"
            },
            "medium": {
              "width": "1000",
              "url": "https://media-cdn.tripadvisor.com/media/photo-o/0c/df/a0/0b/getlstd-property-photo.jpg",
              "height": "313"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2016-09-08T03:56:05-0400",
          "caption": "getlstd_property_photo",
          "id": "215982091",
          "helpful_votes": "8",
          "published_date": "2016-09-08T03:56:05-0400",
          "user": null
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/10860074",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.781994819641113",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "19",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#17 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Open Now",
        "is_long_closed": false,
        "price_level": "$$ - $$$",
        "description": "",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d10860074-Reviews-Tjokro_Restaurant-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d10860074-Tjokro_Restaurant-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 22 82021221",
        "website": "http://www.grandtjokrobandung.com/restaurants/",
        "email": "reservation.bandung@grandtjokro.com",
        "address_obj": {
          "street1": "Jl. Cihampelas no. 211-217",
          "street2": "Grand Tjokro Bandung Hotel",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40131"
        },
        "address": "Jl. Cihampelas no. 211-217 Grand Tjokro Bandung Hotel, Bandung 40131 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ],
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ],
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ],
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ],
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ],
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ],
            [
              {
                "open_time": 0,
                "close_time": 1439
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "10648",
            "name": "International"
          },
          {
            "key": "10659",
            "name": "Asian"
          },
          {
            "key": "10690",
            "name": "Indonesian"
          },
          {
            "key": "10742",
            "name": "Eastern European"
          },
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          }
        ],
        "dietary_restrictions": [
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          }
        ],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      },
      {
        "location_id": "3535654",
        "name": "The Restaurant",
        "latitude": "-6.864333",
        "longitude": "107.608864",
        "num_reviews": "1558",
        "timezone": "Asia/Jakarta",
        "location_string": "Bandung, West Java, Java",
        "photo": {
          "images": {
            "small": {
              "width": "150",
              "url": "https://media-cdn.tripadvisor.com/media/photo-l/25/8e/00/bb/the-restaurant.jpg",
              "height": "150"
            },
            "thumbnail": {
              "width": "50",
              "url": "https://media-cdn.tripadvisor.com/media/photo-t/25/8e/00/bb/the-restaurant.jpg",
              "height": "50"
            },
            "original": {
              "width": "1280",
              "url": "https://media-cdn.tripadvisor.com/media/photo-m/1280/25/8e/00/bb/the-restaurant.jpg",
              "height": "853"
            },
            "large": {
              "width": "1024",
              "url": "https://media-cdn.tripadvisor.com/media/photo-w/25/8e/00/bb/the-restaurant.jpg",
              "height": "683"
            },
            "medium": {
              "width": "550",
              "url": "https://media-cdn.tripadvisor.com/media/photo-s/25/8e/00/bb/the-restaurant.jpg",
              "height": "367"
            }
          },
          "is_blessed": true,
          "uploaded_date": "2022-09-01T03:50:11-0400",
          "caption": "The Restaurant",
          "id": "630063291",
          "helpful_votes": "0",
          "published_date": "2022-09-01T03:50:11-0400",
          "user": {
            "user_id": null,
            "member_id": "0",
            "type": "user"
          }
        },
        "api_detail_url": "https://api.tripadvisor.com/api/internal/1.14/location/3535654",
        "awards": [],
        "doubleclick_zone": "as.indonesia.java.bandung",
        "preferred_map_engine": "default",
        "raw_ranking": "4.756841659545898",
        "ranking_geo": "Bandung",
        "ranking_geo_id": "297704",
        "ranking_position": "20",
        "ranking_denominator": "1912",
        "ranking_category": "restaurant",
        "ranking": "#18 of 2,167 Restaurants in Bandung",
        "distance": null,
        "distance_string": null,
        "bearing": null,
        "rating": "5.0",
        "is_closed": false,
        "open_now_text": "Closed Now",
        "is_long_closed": false,
        "price_level": "$$ - $$$",
        "price": "$65,000 - $715,000",
        "description": "Recently reimagined, The Restaurant is Padma Hotel Bandung’s refined all-day dining outlet. Situated overlooking the surrounding verdant valley, the new concept is designed to enhance your dining experience, be it breakfast, lunch, afternoon tea, or whilst sharing a romantic dinner and the delightful views. Enjoy a fine collection of beautifully crafted light snacks, Asian and European dishes, complemented by a wide range of roasted coffees, select teas, freshly pressed juices, curated wines and cigars. The Restaurant is also the ideal venue for informal meetings and celebrations.",
        "web_url": "https://www.tripadvisor.com/Restaurant_Review-g297704-d3535654-Reviews-The_Restaurant-Bandung_West_Java_Java.html",
        "write_review": "https://www.tripadvisor.com/UserReview-g297704-d3535654-The_Restaurant-Bandung_West_Java_Java.html",
        "ancestors": [
          {
            "subcategory": [
              {
                "key": "city",
                "name": "City"
              }
            ],
            "name": "Bandung",
            "abbrv": null,
            "location_id": "297704"
          },
          {
            "subcategory": [
              {
                "key": "province",
                "name": "Province"
              }
            ],
            "name": "West Java",
            "abbrv": null,
            "location_id": "2301792"
          },
          {
            "subcategory": [
              {
                "key": "region",
                "name": "Region"
              }
            ],
            "name": "Java",
            "abbrv": null,
            "location_id": "294228"
          },
          {
            "subcategory": [
              {
                "key": "country",
                "name": "Country"
              }
            ],
            "name": "Indonesia",
            "abbrv": null,
            "location_id": "294225"
          }
        ],
        "category": {
          "key": "restaurant",
          "name": "Restaurant"
        },
        "subcategory": [
          {
            "key": "sit_down",
            "name": "Sit down"
          }
        ],
        "parent_display_name": "Bandung",
        "is_jfy_enabled": false,
        "nearest_metro_station": [],
        "phone": "+62 821-1837-3868",
        "website": "https://padmahotelbandung.com/dining/the-restaurant.php",
        "email": "gro.bandung@padmahotels.com",
        "address_obj": {
          "street1": "Jl Ranca Bentang 56 58, Ciumbuleuit",
          "street2": "Padma Hotel",
          "city": "Bandung",
          "state": null,
          "country": "Indonesia",
          "postalcode": "40142"
        },
        "address": "Jl Ranca Bentang 56 58, Ciumbuleuit Padma Hotel, Bandung 40142 Indonesia",
        "hours": {
          "week_ranges": [
            [
              {
                "open_time": 390,
                "close_time": 1380
              }
            ],
            [
              {
                "open_time": 390,
                "close_time": 1380
              }
            ],
            [
              {
                "open_time": 390,
                "close_time": 1380
              }
            ],
            [
              {
                "open_time": 390,
                "close_time": 1380
              }
            ],
            [
              {
                "open_time": 390,
                "close_time": 1380
              }
            ],
            [
              {
                "open_time": 390,
                "close_time": 1380
              }
            ],
            [
              {
                "open_time": 390,
                "close_time": 1380
              }
            ]
          ],
          "timezone": "Asia/Jakarta"
        },
        "is_candidate_for_contact_info_suppression": false,
        "cuisine": [
          {
            "key": "10654",
            "name": "European"
          },
          {
            "key": "10659",
            "name": "Asian"
          },
          {
            "key": "10690",
            "name": "Indonesian"
          },
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "dietary_restrictions": [
          {
            "key": "10665",
            "name": "Vegetarian Friendly"
          },
          {
            "key": "10697",
            "name": "Vegan Options"
          },
          {
            "key": "10751",
            "name": "Halal"
          },
          {
            "key": "10992",
            "name": "Gluten Free Options"
          }
        ],
        "establishment_types": [
          {
            "key": "10591",
            "name": "Restaurants"
          }
        ]
      }
    ]
  }))
}
const createItem = async (req, res) => {
  if (req.body.name) {
    const insertedPost = await db.insertOne(req.body)
    const find = await db.findOne({ _id: insertedPost.insertedId })
    res.status(200).send({ msg: 'item Created', data: { ...find, dateCreated: new Date() } });
  } else {
    res.status(400).send({ error: 'Name is required' });
  }


  //res.status(200).send({ msg: 'item added!', data: req.body.name })

  console.log(req.body.name)
}
const updateItem = async (req, res) => {
  await db.findOneAndUpdate({ _id: new mongodb.ObjectId(req.body.id) }, { $set: { name: req.body.name } })
  res.status(200).send({ data: req.body.name })
}

const deleteItem = async (req, res) => {
  await db.findOneAndDelete({ name: req.body.name })
  console.log(req.body)
  res.status(200).send({ data: `${req.body.name} Deleted` })
}



app.get('/', start)
app.get('/get-list', home)
app.get('/restaurants', resT)
app.post('/create-item', createItem)
app.get('/create-item', createItem)
app.post('/update-item', updateItem)
app.post('/delete-item', deleteItem)

app.get('*', (req, res) => {
  res.status(404).send({ data: 'Endpoint not found' });
})

app.post('*', (req, res) => {
  res.status(404).send({ data: 'Endpoint not found' });
})