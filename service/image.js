const {fetchContentAPI} = require('./utils')

const image_data = (req, res) => {
  let {policy} = req.params
  let request_url = `/?r=image_data&policy=${policy}`
  return fetchContentAPI(request_url).then((payload) => {
    return res.status(200).json(payload)
  }).catch((error) => {
    console.log(`image.data.fetch.failed`, error)
    return res.status(500).json({ok: false})
  })
}

const getImageData = params => {
  const policyId = params;
  const url = `/?r=image_data&policy=${policyId}`;
  return fetchContentAPI(url)
    .then(payload => {
      return {...payload, id: policyId};
    })
    .catch(e => {
      console.log(`Error fetching image ${url} | ${e.statusCode}`)
      return null;
    });
}

module.exports = {image_data, getImageData}