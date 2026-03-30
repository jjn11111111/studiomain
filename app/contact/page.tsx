import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SITE_CONTACT_EMAIL } from "@/lib/site-contact"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
        <div className="prose prose-invert prose-purple">
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <p className="text-white/80 text-lg leading-relaxed">
            Email:{" "}
            <a
              href={`mailto:${SITE_CONTACT_EMAIL}`}
              className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
            >
              {SITE_CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
