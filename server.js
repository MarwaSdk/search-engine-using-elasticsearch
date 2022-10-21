const express = require("express")
const bodyparser = require("body-parser")
const cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended:true,
}))
var client = require('./connect.js');
//REST API
app.get("/search",async(request,response)=>{
        const input = request.query.query
        const result=await client.search({
            index: 'flickrphotos',
            query: {
                query_string:{
                    query:input+"~",
                    fields:["tags","title"],

                }
            },
            sort:[
                {"_score" : {"order":"desc"}
                }
            ]
            
        }) ;
        console.log(result.hits.hits)
        response.send(result.hits.hits)
        
});




app.listen(3000)