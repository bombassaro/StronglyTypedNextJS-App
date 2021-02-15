const { fetch_api_bff_request } = require('./fetch');

const load_data = (req, res) => {
  let {policy} = req.params
  let request_url = `/?r=policy&policy=${policy}`
  return fetch_api_bff_request(request_url).then((payload) => {
    return res.status(200).json(payload)
  }).catch((error) => {
    console.log(`data.fetch.failed`, error)
    return res.status(500).json({ok: false})
  })
}
module.exports = { load_data }