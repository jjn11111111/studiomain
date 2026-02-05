import { Eye, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 p-6 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-2">DISCLAIMER</p>
              <p className="mb-3">
                <strong>FOR ENTERTAINMENT PURPOSES ONLY.</strong>
              </p>
              <p className="mb-3">
                While I believe in the utility of these exercises to accomplish the intended purpose, these exercises
                are
                <strong> NOT </strong> medically or professionally prescribed, researched, or studied. Efficacy,
                viability, danger, or any other measurement of effectiveness whether considered positive or negative
                remains unknown at this time.
              </p>
              <p className="mb-3">
                Participants are encouraged to share detailed information relating to their unique experience and
                results before, during, and after interactions with this application in an effort to record a set of
                data which can better determine effectiveness.
              </p>
              <p className="mb-3">
                If you are sensitive to strobing lights, rapid movement, or have a history of photosensitive epilepsy,
                please use your own judgment and proceed with care.
              </p>
              <p className="text-xs mt-4 leading-relaxed">
                Any and all engagement by users with these exercises and application automatically immediately
                indemnifies the creator, subsidiary organizations, publishers, search engines, PR firms, periodicals,
                reviews, publications, developers, or any and all related parties of interest from ALL liabilities,
                damages, or harm which may emerge from allegations concerning use of the exercises, opinions, or related
                material featured on this application. Engagement, use, and interaction with these exercises and this
                application should be considered as entertainment for ALL purposes.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <span className="font-[family-name:var(--font-oswald)] font-semibold">Pineal Vision</span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/science" className="hover:text-foreground transition-colors">
              The Science
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Pineal Vision. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
