const {fetchContentAPI, fetchStatistics} = require('./utils')
const {parseBody} = require('../modules/components/Article/Parse')
const {getImageData} = require('./image')

// const NodeCache = require('node-cache')
// const api_cache = new NodeCache({stdTTL: 300})
const {ads_status, api_domain, fbappid, fbpageid, image_service} = require('../config')

const renderDefault = (path_url) => {
  let result = {}
  return new Promise((resolve, reject) => {
    return fetchContentAPI(path_url).then((payload) => {
      result = payload
      result["ads_status"] = ads_status
      result["api_domain"] = api_domain
      result["img-root"] = image_service
      result["config-fbappid"] = fbappid
      result["config-fbpageid"] = fbpageid
      fetchStatistics(result) // todo move from here
      return resolve(result)
    }).catch((error) => {
      // console.log(`#render.err`, path_url)
      result.error = error.name
      result.message = error.message
      return resolve(result)
    })
  })
}
const renderNavigation = (path_url) => {
  return new Promise((resolve, reject) => {
    const parsedUrl = path_url.split('?amp=1')
    const url = `${parsedUrl[0]}?r=navigation`
    return fetchContentAPI(url)
      .then((payload) => resolve(payload))
      .catch((error) => resolve())
  })
}
const renderPageAds = (path_url) => {
  return new Promise((resolve, reject) => {
    const parsedUrl = path_url.split('?amp=1')
    let request_url = `${parsedUrl[0]}?r=pageads`
    return fetchContentAPI(request_url).then((payload) => {
      return resolve(payload)
    }).catch((error) => {
      return resolve()
    })
  })
}

const getTextBodyImagesByline = content => {
  const parseLegacyImage = path => {
    const image_slug_split = path.split("/")
    return `costanorte.legacy.image.${image_slug_split[image_slug_split.length - 1]}`
  }
  const parsedBody = parseBody(content);
  let ids = [];
  parsedBody.map(entry => {
    if (entry.type === 'Image') {
      const imageContentId = entry.value['image-contentId'];
      const legacyImage = entry.value['image-legacy'];
      const imageId = imageContentId ? imageContentId : parseLegacyImage(legacyImage);
      ids.push(getImageData(imageId));
    }
  })
  return Promise.all(ids);
}

const page = (req, res) => {
  let {pathurl} = req.body
  let result = null
  let start = new Date().getTime()
  // console.log(`#page.url ${path_url}`)
  const handlePage = () => {
    return new Promise((resolve, reject) => {
      let promises = []
      promises.push(renderDefault(pathurl))
      promises.push(renderPageAds(pathurl))
      promises.push(renderNavigation(pathurl))
      Promise.all(promises).then( async (responses) => {
        let pageads, navigation
        result = responses[0]

        //MOUNT OBJECT WITH BODY IMAGES BYLINE
        const isArticle = result['page-content'] ? result['page-content'].text : false;
        if (isArticle) {
          const textBodyImages = await getTextBodyImagesByline(result["page-content"].text)
          result["page-content"] = {...result["page-content"], textBodyImages: textBodyImages}
        }

        pageads = responses[1]
        navigation = responses[2]
        result.pathurl = pathurl
        result["site-pageads"] = pageads && pageads["site-pageads"] && pageads["site-pageads"]
        result["page-pageads"] = pageads && pageads["page-pageads"] && pageads["page-pageads"]
        result["navigation"] = navigation
        let finish = new Date().getTime()
        let time = finish - start
        console.log(`#page.hit ${time}ms ${(new Date()).toISOString()}`)
        return resolve(result)
      }).catch((e) => {
        console.log(`#page.err`, e)
        return reject(result)
      })
    })
  }
  return handlePage()
    .then(() => res.status(200).json({success: true, result}))
    .catch(() => res.status(200).json({success: false, result}))
}
module.exports = {page}