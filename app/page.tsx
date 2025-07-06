import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LinkIcon, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <main className="px-6 py-12 text-center max-w-4xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Links
            </span>
            , Simplified
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create a beautiful landing page for all your links. Share your
            content, social media, and more with a single, customizable URL.
          </p>

          <div className="flex gap-4 justify-center pt-6">
            <Button size="lg" asChild>
              <Link href="/signup">Start Building</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <LinkIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Multiple Links
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Add unlimited links to your social media, websites, and content.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Lightning Fast
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built with Next.js for blazing fast performance and SEO.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Easy to Use
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Simple interface to manage and customize your link page.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
