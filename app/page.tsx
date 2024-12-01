"use client";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const [textBoxValue, setTextBoxValue] = useState("");
  const [outputURL, setOutputURL] = useState("");

  function extractPathFromUrl(url: string): string {
    const trimmedUrl = url.trim();
    const parts = trimmedUrl.split("/");
    return parts[parts.length - 1];
  }

  function validateDidliUrl(url: string): boolean {
    const didliRegex = /^(https?:\/\/)?(www\.)?did\.li\/[a-zA-Z0-9-_]+$/;
    return didliRegex.test(url);
  }

  async function handleButtonClick(): Promise<void> {
    if (!textBoxValue.trim()) {
      toast.error("נא להזין קישור דידלי");
      return;
    }

    const didliPath = extractPathFromUrl(textBoxValue);
    if (!didliPath) {
      toast.error("נא להזין קישור דידלי תקין");
      return;
    }

    const loadingToast = toast("...בודק קישור", { 
      icon: "⌛",
      duration: Infinity
    });
    
    try {
      const response = await axios.get(`/api?path=${didliPath}`);
      const jsonData = response.data.result;
      toast.dismiss(loadingToast);
      toast.success("!הקישור נמצא");
      setOutputURL(jsonData);
    } catch (error: any) {
      toast.dismiss(loadingToast);
      if (error.response?.status === 400) {
        toast.error("רשמו קישור דידלי תקין");
      } else if (error.response?.status === 404) {
        toast.error("קישור דידלי זה אינו קיים");
      } else {
        toast.error("קרתה תקלה, נסו שוב מאוחר יותר");
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] px-6">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            direction: 'rtl',
            background: '#1A1A1A',
            color: '#fff',
            padding: '16px',
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: '#1A1A1A',
            },
          },
          error: {
            iconTheme: {
              primary: '#fff',
              secondary: '#1A1A1A',
            },
          },
        }}
      />
      
      <div className="max-w-4xl mx-auto py-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-16"
        >
          <div className="space-y-3">
            <h1 className="text-6xl font-light tracking-tight text-[#1A1A1A]">
              חשיפת קישורי דידלי
            </h1>
            <p className="text-xl text-[#666666]">
              גלו את היעד האמיתי של הקישור המקוצר
            </p>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <input
                type="text"
                value={textBoxValue}
                onChange={(e) => setTextBoxValue(e.target.value)}
                placeholder="הדביקו כאן קישור דידלי..."
                className="w-full px-8 py-6 bg-white border-[1.5px] border-[#E5E5E5] 
                         rounded-2xl text-lg focus:outline-none focus:border-[#1A1A1A]
                         transition-all placeholder:text-[#999999]"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleButtonClick}
              className="w-full bg-[#1A1A1A] text-white py-6 px-8 rounded-2xl 
                       text-lg font-light hover:bg-black transition-all"
            >
              בדוק קישור
            </motion.button>

            {outputURL && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-8 bg-white border-[1.5px] border-[#E5E5E5] rounded-2xl"
              >
                <p className="text-[#666666] mb-3">הקישור המלא (לחצו על הקישור לפתיחה):</p>
                <a
                  href={outputURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A1A1A] hover:text-[#666666] break-all text-lg"
                >
                  {outputURL}
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
