'use client';
import {Button} from "@/components/ui/button";
import Link from"next/link";
import { cn } from "@/lib/utils";
interface SignInButtonProps{
    className?: string;
}

export function SignInButton({ className }: { className?: string }) {
    return (
      <Link href="/login">
  <Button>Sign In</Button>
</Link>

    );
  }