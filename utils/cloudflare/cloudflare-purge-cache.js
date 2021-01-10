const r2 = require('r2')
const secrets = require('./cloudflare-secrets')

const main = async () => {
  const url = `https://api.cloudflare.com/client/v4/zones/${secrets.zoneId}/purge_cache`
  const options = {
    headers: {
      'X-Auth-Email': secrets.email,
      'X-Auth-Key': secrets.apiKey,
    },
    json: {
      purge_everything: true,
    },
  }

  try {
    const response = await r2.delete(url, options).json
    if (!response.success) {
      throw response
    }
    return response
  }
  catch (e) {
    console.error(e)
  }
}

main()
