'use client'
import { type ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../components/button'
import Input from '../components/input'
import Modal from '../components/modal'

export default function Home() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Modal isOpen={true} title="Welcome to CodeLeap network!">
        <div className="space-y-2 flex flex-col">
          <p>Please enter your username</p>
          <Input type="text" placeholder="John Doe" value={username} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
        </div>
        <Button
          disabled={username.length === 0}
          onClick={() => {
            localStorage.setItem('username', username)
            router.push('/feed')
          }}
        >
          ENTER
        </Button>
      </Modal>
    </main>
  )
}
