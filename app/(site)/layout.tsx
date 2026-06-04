import Footer from "@/components/layout/footer/Footer"
import Header from "@/components/layout/header/Header"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}