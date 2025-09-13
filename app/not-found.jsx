import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-8xl font-bold gradient-title mb-4">404</h1>
      <h2 className="text-4xl text-orange-900 font-semibold mb-4">Oopsie Doodle🖊️</h2>
      <p className="text-gray-600 mb-8">
        This page must’ve wandered off the notebook... <br/>
        Don’t worry, every story has a way back home.
      </p>
      <Link href="/">
        <Button variant="journal">Return Home</Button>
      </Link>
    </div>
  );
}