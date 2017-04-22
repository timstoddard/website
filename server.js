/* eslint-disable no-console */

const express = require('express')
const compression = require('compression')
const path = require('path')
const http = require('http')
const xml2js = require('xml2js')

const createServer = (setUp) => {
  const port = process.env.PORT || 8080
  const app = express()

  if (setUp) {
    setUp(app)
  }

  app.use(compression())

  // serve static assets normally
  app.use(express.static(__dirname))

  // pass every other route with index.html, and it will be handled with react-router
  app.get('*', function(request, response) {
    if (request.url === '/cnn-rss-feed') { // TODO make this less rachet
      http.get(
        'http://rss.cnn.com/rss/cnn_topstories.rss',
        function(res) {
          let xml = ''
          res.on('data', function(chunk) {
            xml += chunk
          })
          res.on('end', function() {
            xml2js.parseString(xml, function(err, result) {
              const items = result.rss.channel[0].item.slice(0, 10)
              items.forEach(function(item, i) {
                items[i] = {
                  link: item.link,
                  origLink: item['feedburner:origLink'],
                  title: item.title[0],
                  description: item.description[0]
                    .replace(/<div class="feedflare"[\s\S]*/, ''),
                }
              })
              response.send(JSON.stringify({ items: items }))
            })
          })
        }).on('error', function(e) {
          console.log('CNN XML error: ' + e.message)
        })
    } else {
      response.sendFile(path.resolve(__dirname, 'index.html'))
    }
  })

  app.listen(port)
  console.log('Server started on port ' + port)
}

module.exports = createServer
