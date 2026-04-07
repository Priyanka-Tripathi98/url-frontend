import {useState} from 'react'
import "../App.css"

function Url() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")

  const handleChange = (e) => {
      setUrl(e.target.value)
    // Logic to shorten the URL and set the shortUrl state
  }
  
 const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const res = await fetch("https://url-backend.onrender.com/url/shorten", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ originalUrl: url })
    })

    const data = await res.json()

    if (!res.ok) {
      console.log(data)
      throw new Error(data.message || "Something went wrong")
    }

    setShortUrl(data.shortUrl)
    alert("URL shortened successfully!")

  } catch (error) {
    console.error(error)
    alert(error.message)
  }
}
  return (
    <div>
    <h2>URL Shortener</h2>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter URL to shorten" value={url} onChange={handleChange}/><br/><br/>
      <button type="submit">Shorten</button>
    </form>
    {shortUrl && (
      <div>
      <p>
  Shortened URL:{""}
  <a href={shortUrl} target="_blank" rel="noopener noreferrer">
    {shortUrl.slice(-4)}
  </a>
</p>
      </div>
    )}
    </div>
  )
}

export default Url