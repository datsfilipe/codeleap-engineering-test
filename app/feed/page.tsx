import Post from "@/components/post";
import PostCreateForm from "../../components/postCreateForm.tsx";

type Post = {
  id: number
  username: string
  created_datetime: string
  title: string
  content: string
}

const getPosts = async () => {
  const response = await fetch('*')
  const { results } = await response.json()
  return results ? results : []
}

export default async function Feed() {
  const posts = await getPosts() as Post[]

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
            />
          ))}
        </div>
      </div>
    </main>
  )
}
