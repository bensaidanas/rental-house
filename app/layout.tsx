import Navbar from './components/nav/Navbar'
import './globals.css'
import { Inter, Nunito } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({subsets: ['latin']})

export const metadata = {
  title: 'Venus',
  description: 'Rent The Best House With Venus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
