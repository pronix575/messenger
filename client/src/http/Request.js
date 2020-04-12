export const request = async (url, method = 'GET', body = null, headers = {}) => {
    try {
        
        if (body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
        }
        
        console.log(body)
        const response = await fetch(url, {method, body, headers})
        const data = await response.json()
  
        if (!response.ok) {
            throw new Error(data.message || 'Something wrong')
        }
  
        return data
      
    } catch (e) {

        console.warn(e)
        throw e
    }
}