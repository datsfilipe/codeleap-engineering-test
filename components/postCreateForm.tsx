'use client'
import Button from "./button"
import Input from "./input"
import { FormEvent, useEffect, useState } from "react"

const post = async (username: string, title: string, content: string) => {
  try {
    const response = await fetch('https://dev.codeleap.co.uk/careers/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        title,
        content,
      }),
    })

    return response
  } catch (error) {
    console.log(error)
  }
}

export default function PostCreateForm() {
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '')
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    post(username, title, content).then((response) => {
      if (response?.ok) {
        window.location.reload()
      }
    })
  }

  return (
    <form className="flex flex-col p-6 space-y-4 border border-gray-darker rounded-lg" onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold">What&apos;s on your mind?</h1>
      <div>
        <label className="text-black">Title</label>
        <Input type="text" placeholder="Hello World" value={title} onChange={event => setTitle(event.target.value)} />
      </div>
      <div>
        <label className="text-black">Content</label>
        <Input type="text" placeholder="Hello World" multiline onChange={event => setContent(event.target.value)} />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Create</Button>
      </div>
    </form>
  )
}
