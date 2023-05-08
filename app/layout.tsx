import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata = {
  title: 'Codeleap Engineering Test',
  description: 'Made it with app folder since it\'s stable and easy to use',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gray`}>{children}</body>
    </html>
  )
}
