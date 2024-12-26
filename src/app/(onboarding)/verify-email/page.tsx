'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VerifyEmailPage = () => {
    const [code, setCode] = useState(["", "", "", ""])

    const handleCodeChange = (index: number, value: string) => {
      if (value.length <= 1) {
        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)
        
        // Auto-focus next input
        if (value && index < 3) {
          const nextInput = document.getElementById(`code-${index + 1}`)
          nextInput?.focus()
        }
      }
    }
  
    const router = useRouter()
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      router.push('/onboarding/company')
    }
  
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex flex-col items-center">
              <Image
                          className='h-12 w-auto'
                          src={'/logo.svg'}
                          width={120}
                          height={48}
                          alt='TrackTr Logo'
                        />
              <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-white text-center">
                Check your email
              </h2>
              <p className="mt-2 text-center text-sm sm:text-base text-gray-400">
                A verification code has been sent to
                <br />
                john.doe@domain.com
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="flex justify-center space-x-2 sm:space-x-4">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    className="h-10 w-10 sm:h-12 sm:w-12 text-center text-lg bg-gray-800 border-gray-700"
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                  />
                ))}
              </div>
              <Button
                type="submit"
                className="w-full bg-gray-600 hover:bg-gray-500"
              >
                Verify email
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-400">
                Didn&apos;t receive the code?{" "}
                <button className="text-white hover:underline">
                  Click to resend
                </button>
              </p>
              <p className="mt-2 text-xs sm:text-sm text-gray-400">
                Make sure to check your spam or junk folder if you don&apos;t see it in your inbox.
              </p>
            </div>
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center text-xs sm:text-sm text-gray-400 hover:text-white"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to Start
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    )
};

export default VerifyEmailPage;
