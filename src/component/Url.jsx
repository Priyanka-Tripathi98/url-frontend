import { useState } from 'react'
import "../App.css"

function Url() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")

  const handleChange = (e) => {
    setUrl(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("https://url-backend-cijf.onrender.com/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: url }),
      })

      const text = await res.text()

      try {
        const data = JSON.parse(text)
        setShortUrl(data.shortUrl)
        alert("URL shortened successfully!")
      } catch (err) {
        console.error("Not JSON:", text)
        alert("Server error")
      }

    } catch (error) {
      console.error(error)
      alert("Error shortening URL")
    }
  }

  return (
    <div>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL to shorten"
          value={url}
          onChange={handleChange}
        /><br /><br />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div>
         <p> Shortened URL:{""} <a href={shortUrl} target="_blank" rel="noopener noreferrer"> {shortUrl.slice(-4)} </a> </p>
        </div>
      )}
    </div>
  )
}

export default Url