const { map } = require('lodash');
const { fetch_api_bff_request } = require('./fetch');
const rewrite_urls = require('../datamodel/rewrite.json');

const bff_url = process.env["MIDDLEWARE_ADDRESS"]

const rewrite = (req, res, handle) => {
  const {url} = req
  let shouldRedirect = {}
  map(rewrite_urls, ({from, to}) => {
    if(url == from)
      shouldRedirect = {from, to}})

  if(shouldRedirect && shouldRedirect.from && shouldRedirect.to) {
    return res.redirect(`${bff_url}${shouldRedirect.to}`)
  }
  const _u = url.split("/")
  let main_path = 'costanorte'
  let legacy_id = ''
  // check if is legacy
  isLegacyUrl = false
  
  map(_u, (item) => {
    // costanorte rewrite
    let cast = parseInt(item)
    if(!item.includes(".") && typeof cast === 'number' && cast%1 == 0) {
      isLegacyUrl = true
      legacy_id = cast
    }
    
    // tv-cultura rewrite
    if(item == "Tv") {
      isLegacyUrl = true
      main_path = 'tvcultura'
    }
    // beacheco rewrite
    if(item == "oquefazer") {
      isLegacyUrl = true
      main_path = 'beacheco'
    }
    // bertioga especial rewrite
    if(item == "bertioga-especial") {
      isLegacyUrl = true
      main_path = 'bertioga-especial'
    }
  })
  if(legacy_id && legacy_id != '') {
    const extid = `costanorte.legacy.article.${legacy_id}`
    return fetch_api_bff_request(`/?legacy=${extid}`).then((payload) => {
      if(payload["path"]) {
        let _r = ''
        let _p = payload["path"].split(":8080")
        if(_p.length > 1) {
          _r = `${bff_url}${_p[1]}`
        } else {
          _r = `${bff_url}${_p[0]}`
        }
        return res.redirect(_r)
      }
      return handle(req, res)
    }).catch((error) => {
      return handle(req, res)
    })
  }
  return handle(req, res)
}

module.exports = rewrite