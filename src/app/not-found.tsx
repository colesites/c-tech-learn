import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"
import { BackButton } from "@/components/BackButton"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="space-y-6 text-center max-w-md mx-auto">
        <div className="flex justify-center">
          <div className="p-6 rounded-full bg-muted/50 ring-1 ring-border shadow-sm">
            <FileQuestion className="h-12 w-12 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404</h1>
          <h2 className="text-2xl font-semibold tracking-tight">Page not found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-4">
          <BackButton className="h-10 px-6 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
            Go back
          </BackButton>
          <Button asChild size="lg" className="font-medium">
            <Link href="/">
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
