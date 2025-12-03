import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.API_LEAGUE_KEY

  if (!apiKey) {
    return NextResponse.json({ memes: [] }, { status: 200 })
  }

  try {
    // Fetch 5 memes in parallel
    const promises = Array(5).fill(null).map(() => 
      fetch('https://api.apileague.com/retrieve-random-meme?keywords=programming', {
        headers: {
          'x-api-key': apiKey
        },
        next: { revalidate: 0 } // Disable caching for random memes
      }).then(res => res.ok ? res.json() : null)
    )

    const results = await Promise.all(promises)
    
    // Filter out failed requests and format
    const memes = results
      .filter(meme => meme && meme.url)
      .map(meme => ({
        url: meme.url,
        caption: meme.description || 'Programmers be like...',
        type: 'image'
      }))

    return NextResponse.json({ memes })
  } catch (error) {
    console.error('Error fetching memes:', error)
    return NextResponse.json({ error: 'Failed to fetch memes' }, { status: 500 })
  }
}
