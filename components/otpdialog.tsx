"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import axios from "axios"

type OTPDialogProps = {
  email: string | null;
}; 

export default function OTPDialog({email}: OTPDialogProps) {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [message, setMessage] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true)
      return
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const updated = [...otp]
      updated[index] = value
      setOtp(updated)
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleVerify = async() => {
    if (otp.every((d) => d !== "")) {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verifyotp`, {email,otp});
            if(response.status == 200){
                setShowResetPassword(true);
            }
            else{
                setMessage(response.data.message);
                setOtp(['','','','']);
            }
        } catch(error){
            setMessage("Invalid OTP");
             setOtp(['','','','']);
            console.log(error);
        }
    //   setMessage("✅ OTP verified successfully! You can now continue.")
    } else {
      setMessage("⚠️ Please enter the complete 4-digit OTP.")
    }
  }

  const handleResend = async(e: React.FormEvent) => {
    // setMessage("OTP has been resent to your email or phone.")
    // setOtp(["", "", "", ""])
    // setTimeLeft(60)
    // setCanResend(false)
    // document.getElementById("otp-0")?.focus()
    e.preventDefault();
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/forgotpassword`, {email});
        if(response.status == 200){
          setMessage("OTP has been resent to your email.");
          setOtp(["", "", "", ""])
          setTimeLeft(60)
          setCanResend(false)
          document.getElementById("otp-0")?.focus()
        }
        else{
          setMessage(response.data.message);
        }
      } catch(error) {
        console.log(error);
      }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  const resetPassword = async() => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/resetpassword`, {email,newPassword});
        if(response.status == 200){
            window.location.href = '/login';
        }
        else{
            console.log('Password not Matched');
        }
    } catch(error){
        console.log(error);
    }
  }

  return (
    <div className="w-[99vw] flex justify-center items-center h-[90vh]">
    <Dialog>
      <div className={`${showResetPassword ? 'hidden' : 'block'} sm:max-w-sm !rounded-xl p-6 border`}>
        <div className="text-center mb-4">
          <DialogTitle className="text-lg font-semibold">OTP Verification</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Enter the 4-digit code sent to <strong>{email}</strong>.
          </DialogDescription>
        </div>

        <p className="text-center text-xs text-muted-foreground mb-4">
          Step 1 of 1: Verify your account
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, idx) => (
            <Input
              key={idx}
              id={`otp-${idx}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              className="w-14 h-14 text-center text-lg font-medium rounded-md border border-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              maxLength={1}
            />
          ))}
        </div>

        {/* Timer */}
        {!canResend && (
          <p className="text-center text-xs text-muted-foreground mb-2">
            You can resend OTP in <strong>{formatTime(timeLeft)}</strong>
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleVerify}>
            Verify OTP
          </Button>

          <Button
            variant="outline"
            className="w-full flex justify-between items-center"
            onClick={handleResend}
            disabled={!canResend}
          >
            {canResend ? "Send Again" : "Resend OTP"}
            {!canResend && (
              <span className="text-xs text-muted-foreground">{formatTime(timeLeft)}</span>
            )}
          </Button>
        </div>

        {/* Feedback message */}
        {message && (
          <p className="mt-3 text-center text-sm text-muted-foreground">{message}</p>
        )}
      </div>
     </Dialog>
        <div className={`${showResetPassword ? 'block' : 'hidden'} border p-8 rounded-xl w-[30%]`}>
            <label className='mt-4 text-sm'>New Password</label>
            <input type='password'
                required
                value={newPassword}
                onChange={(e)=> setNewPassword(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm'
            />
            <button className="p-2 bg-blue-600 rounded-lg text-white mt-3 ms-[64%]" onClick={resetPassword}>Reset Password</button>
            <div className={`${message == "Password has been Changed Successfully" ? 'text-green-600' : 'text-red-600'} mt-3 text-center`}>{message}</div>
        </div>
    </div>
  )
}
