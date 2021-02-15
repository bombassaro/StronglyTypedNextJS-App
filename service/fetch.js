
const fetch_api_bff_request = async ( path ) => {
  const api_url = process.env["POLOPOLY_ADDRESS"];
  const url_to_fetch = `${api_url}${path}`
  let res = null
  let payload = {}
  try {
    console.log(`*** bff.fetching ${url_to_fetch}`);
    res = await fetch(url_to_fetch);
    payload = await res.json()
  } catch(e) {
    payload = {
      error_page: true
    }
  }
  return payload
}

module.exports = { fetch_api_bff_request };