import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="p-6">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </header>

      {/* Demo Profile */}
      <main className="max-w-md mx-auto px-6 py-12">
        <div className="text-center space-y-6">
          {/* Profile Image */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">JD</span>
          </div>

          {/* Profile Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              John Doe
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Content creator & developer
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <a
              href="#"
              className="block w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  🌐 My Portfolio
                </span>
                <span className="text-gray-400">→</span>
              </div>
            </a>

            <a
              href="#"
              className="block w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  📱 Twitter
                </span>
                <span className="text-gray-400">→</span>
              </div>
            </a>

            <a
              href="#"
              className="block w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  💼 LinkedIn
                </span>
                <span className="text-gray-400">→</span>
              </div>
            </a>

            <a
              href="#"
              className="block w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  🎬 YouTube Channel
                </span>
                <span className="text-gray-400">→</span>
              </div>
            </a>

            <a
              href="#"
              className="block w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  📧 Newsletter
                </span>
                <span className="text-gray-400">→</span>
              </div>
            </a>
          </div>

          {/* Footer */}
          <div className="pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Powered by{" "}
              <Link href="/" className="text-purple-600 hover:underline">
                Lynt
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
