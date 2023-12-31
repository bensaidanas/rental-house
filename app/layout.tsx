import Modal from './components/modals/Modal'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/nav/Navbar'
import './globals.css'
import { Inter, Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modals/RentModal'

const inter = Inter({ subsets: ['latin'] })
const nunito = Nunito({subsets: ['latin']})

export const metadata = {
  title: 'Venus',
  description: 'Rent The Best House With Venus',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-black text-white`}>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-20 ">
          {children}
        </div>
      </body>
    </html>
  )
}
