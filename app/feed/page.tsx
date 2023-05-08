'use client'
import Post from '../../components/post'
import PostCreateForm from '../../components/postCreateForm'
import { store } from '../../redux/store'
import { useEffect, useState } from 'react'

type Post = {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

const getPosts = async () => {
  const response = await fetch('https://dev.codeleap.co.uk/careers/')
  const { results } = await response.json() as { results: Post[] }
  return results ? results : []
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    getPosts().then((response) => setPosts(response)) // eslint-disable-line
  }, [])

  useEffect(() => {
    store.subscribe(() => {
      const state = store.getState()
      setPosts(state.posts)
    })
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-3/5 min-w-[300px] bg-white min-h-screen">
        <header className="flex items-center justify-between p-6 bg-primary text-white font-bold text-[22px]">
          <h1>CodeLeap Network</h1>
        </header>

        <div className="p-4 space-y-6">
          <PostCreateForm />
          {posts.map((post: Post) => (
            <Post
              key={post.id}
              username={post.username}
              createdAt={post.created_datetime}
              title={post.title}
              content={post.content}
              id={post.id}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
