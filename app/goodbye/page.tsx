import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart } from "lucide-react";
import Link from "next/link";

export default function GoodbyePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4 pb-6">
          <div className="mx-auto bg-green-100 dark:bg-green-900/20 rounded-full p-3 w-fit">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">
            Account Deleted Successfully
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Your Lynt account and all associated data have been permanently
              deleted.
            </p>
            <p className="text-sm text-muted-foreground">
              We&apos;re sorry to see you go! If you change your mind, you can
              always create a new account.
            </p>
          </div>

          <div className="border-t pt-6">
            <p className="text-sm text-muted-foreground mb-4 flex items-center justify-center gap-1">
              Thank you for using Lynt{" "}
              <Heart className="h-4 w-4 text-red-500" />
            </p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/">Return to Homepage</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/sign-up">Create New Account</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
