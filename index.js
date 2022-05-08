const express = require("express");
const cheerio = require("cheerio");
const requests = require("requests");
const app = express();


app.get("/",(req,res)=>{
  requests("https://thefreeonlinenovel.com/").on("data",page=>{
    const $ = cheerio.load(page);
    const data = []
    $("nav.homebook > ul > li").each((i)=>{
      data.push({
        image:'https://thefreeonlinenovel.com'+$("nav.homebook > ul > li > center > a > img").eq(i).attr("src"),
        title:$("nav.homebook > ul > li > a.page-scroll").eq(i).eq(0).text(),
        url:"https://thefreeonlinenovel.com"+$("nav.homebook > ul > li > a").eq(i).attr("href")
      })
    })
    res.send(data);
  })
})

app.listen(process.env.PORT || 8080,()=>console.log("listening..."))
