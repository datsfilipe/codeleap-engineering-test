'use client'
import Image from 'next/image'
import trashIcon from '../assets/ic_baseline-delete-forever.svg'
import editIcon from '../assets/bx_bx-edit.svg'
import Modal from './modal'
import { type ChangeEvent, useEffect, useState } from 'react'
import Input from './input'

type PostProps = {
  id: number
  username: string
  createdAt: string
  title: string
  content: string
}
  

const deletePost = async (id: number) => {
  try {
    await fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.error(error)
  }
}

const editPost = async (id: number, title: string, content: string) => {
  try {
    await fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
  } catch (error) {
    console.error(error)
  }
}

export default function Post({ id, title, username, content, createdAt }: PostProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [titleInput, setTitleInput] = useState(title)
  const [contentInput, setContentInput] = useState(content)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <div className="flex flex-col">
        <header className="flex items-center justify-between p-4 bg-primary text-white font-bold text-[22px] rounded-t-2xl">
          <h1>{title.length > 16 ? `${title.slice(0, 16)}...` : title}</h1>
          {localStorage.getItem('username') === username && (
            <div className="flex items-center space-x-4">
              <button
                className="text-white"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <Image src={trashIcon as string} alt="Delete" />
              </button>
              <button
                className="text-white cursor-pointer"
                onClick={() => setIsEditModalOpen(true)}
              >
                <Image src={editIcon as string} alt="Edit" />
              </button>
            </div>
          )}
        </header>
        <div className="flex flex-col p-4 space-y-2 border-r border-l border-b border-gray-darker rounded-b-2xl">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-muted">@{username > 16 ? `${username.slice(0, 16)}...` : username}</p>
            <p className="text-lg text-gray-darker">{
              new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            }</p>
          </div>
          <p className="text-black text-justify overflow-hidden">{content}</p>
        </div>
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        title="Are you sure you want to delete this item?"
        darkBg
        onClickOutside={() => setIsDeleteModalOpen(false)}
      >
        <div className="flex justify-end space-x-4 mt-8">
          <button
            className="text-black border border-gray-darker py-[3px] bg-white px-10 text-base font-bold rounded-lg"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="text-white bg-red-500 px-10 text-base py-[3px] font-bold rounded-lg"
            onClick={() => {
              // eslint-disable-next-line
              deletePost(id).then(() => {
                window.location.reload()
              })

              setIsDeleteModalOpen(false)
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isEditModalOpen}
        title="Edit Item"
        onClickOutside={() => setIsEditModalOpen(false)}
        darkBg
      >
        <div>
          <label className="text-black">Title</label>
          <Input type="text" placeholder="Hello World" value={titleInput} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleInput(e.target.value)} />
        </div>
        <div>
          <label className="text-black">Content</label>
          <Input type="text" placeholder="Hello World" multiline value={contentInput} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContentInput(e.target.value)} />
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button
            className="text-black border border-gray-darker py-[3px] bg-white px-10 text-base font-bold rounded-lg"
            onClick={() => setIsEditModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="text-white bg-green-500 px-10 text-base py-[3px] font-bold rounded-lg"
            onClick={() => {
              // eslint-disable-next-line
              editPost(id, titleInput, contentInput).then(() => {
                window.location.reload()
              })

              setIsEditModalOpen(false)
            }}
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  )
}
