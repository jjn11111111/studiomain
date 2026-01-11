import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Lightbulb, Timer } from "lucide-react"

export function PracticeSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-cinzel)] text-3xl sm:text-4xl font-bold mb-4">
            Practice with Static Images
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty text-lg">
            Perfect your stereoscopic viewing technique with static images before moving to video training.
          </p>
        </div>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur mb-12 max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-[family-name:var(--font-cinzel)] flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              How to View Stereoscopic Images
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Position Yourself</h4>
                  <p className="text-sm text-muted-foreground">
                    Sit comfortably about 12-18 inches from your screen. Ensure the image is at eye level.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Relax Your Eyes</h4>
                  <p className="text-sm text-muted-foreground">
                    Cross your eyes slightly or look "through" the screen as if focusing on something behind it. Don't
                    force it.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Find the Third Image</h4>
                  <p className="text-sm text-muted-foreground">
                    You should see 3 images appear. Focus on the middle one - it will appear in 3D with depth.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Hold the Focus</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintain this relaxed state. With practice, you'll be able to hold the 3D view for longer periods.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 p-4 bg-accent/20 rounded-lg border border-accent/30">
              <Lightbulb className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <span className="font-semibold">Pro Tip:</span> If you're having trouble, try slowly moving your head
                closer to or further from the screen while maintaining a relaxed gaze.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-primary/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <Eye className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Master the Technique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn cross-view stereoscopy with simple patterns before advancing to motion
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <Timer className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Practice At Your Pace</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No time pressure - take as long as you need to perfect each image
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <Lightbulb className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Build Foundation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Develop the skills needed for effective video-based pineal activation
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/practice">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              View Practice Images
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
