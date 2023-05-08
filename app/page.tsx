'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Button from "../components/button.tsx";
import Input from "../components/input.tsx";
import Modal from "../components/modal.tsx";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Modal isOpen={true} title="Welcome to CodeLeap network!">
        <div className="space-y-2 flex flex-col">
          <p>Please enter your username</p>
          <Input type="text" placeholder="John Doe" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <Button
          disabled={!(username.length > 0)}
          onClick={() => {
            localStorage.setItem("username", username)
            router.push("/feed")
          }}
        >
          ENTER
        </Button>
      </Modal>
    </main>
  )
}
