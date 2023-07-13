"use client";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";

export default function Home() {
  const [showText, setShowText] = useState(false);
  const [textBoxValue, setTextBoxValue] = useState("");
  const [outputURL, setOutputURL] = useState("");

  function extractPathFromUrl(url: string): string {
    const trimmedUrl = url.trim();
    const parts = trimmedUrl.split("/");
    return parts[parts.length - 1];
  }

  async function handleButtonClick(): Promise<void> {
    toast("...בודק קישור", {
      icon: "⌛",
    });
    const didliPath = extractPathFromUrl(textBoxValue);
    axios
      .get(`/api?path=${didliPath}`)
      .then((response) => {
        const jsonData = response.data.result;
        toast.success("!הקישור נמצא");
        setOutputURL(jsonData);
        setShowText(true);
      })
      .catch((error) => {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 400) {
            toast.error("רשמו קישור דידלי תקין");
          } else if (statusCode === 404) {
            toast.error("קישור דידלי זה אינו קיים");
          } else if (statusCode === 500) {
            toast.error(
              "קרתה תקלה בשרתי דידלי ולא ניתן להגיע לקישור הלא מקוצר"
            );
          }
        } else {
          toast.error(
            "קרתה תקלה בשרת שלנו, מתנצלים. נסו שוב מאוחר יותר. אם ההודעה הזאת ממשיכה להופיעה, תפתחו אישו ברפוזיטורי בגיטהאב"
          );
        }
      });
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#ffffff] text-right p-3 gap-y-3">
      <div>
        <Toaster reverseOrder={true} />
      </div>
      <header className="py-8">
        <h1 className="text-5xl font-normal text-[#35747e]">
          חשיפת קישורי דידלי
        </h1>
        <h1 className="text-2xl font-normal text-[#35747e]">
          .האתר הזה נועד לפתור בעיה אחת ומרכזית: קישורים מקוצרים שנוצרים בדידלי
          <br></br>
          ,דידלי הוא שירות קיצורים ישראלי וחינמי, אבל לא כמו ביטלי ודומיו הלא
          ישראליים
          <br></br>
          .ל-דידלי אין אפשרות להציג את הקישור שאליו נכנסים במקום להיכנס ישירות
          אליו
          <br></br>
          טוב, באתר הזה אתם יכולים לעשות בדיוק את זה! רשמו בתיבת הטקסט שבאתר את
          <br></br>
          קישור הדידלי שלכם, ותקבלו את הקישור הסופי
        </h1>
      </header>
      <main className="flex-grow">
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={textBoxValue}
            maxLength={25}
            onChange={(e) => {
              setTextBoxValue(e.target.value);
            }}
            placeholder="did.li/קישור-מקוצר"
            className="py-3 px-4 block w-full border-none text-white bg-[#35747e] rounded-md text-xl focus:border-none mb-6"
          ></input>
          <button
            className="bg-[#35747e] text-white px-4 py-2 rounded text-xl"
            onClick={() => {
              handleButtonClick();
            }}
          >
            חשפו את הקישור
          </button>
          {showText && (
            <>
              <p className="mt-4 text-xl break-words text-[#35747e] text-center max-w-screen-md ">
                :הקישור הלא מקוצר הוא
                <br></br>
                <code>{outputURL}</code>
              </p>
              <button
                className="bg-[#35747e] text-white px-4 py-2 mt-2 rounded text-md"
                onClick={() => {
                  navigator.clipboard.writeText(outputURL);
                  toast.success("!הקישור הועתק")
                }}
              >
                העתיקו את הקישור
              </button>
              <button
                className="bg-[#35747e] text-white px-4 py-2 mt-2 rounded text-md"
                onClick={() => {
                  window.open(outputURL, '_blank');
                }}
              >
                פתחו את הקישור בחלון חדש
              </button>
            </>
          )}
        </div>
      </main>
      <footer className="bg-[#ffffff] py-4 text-[#35747e] text-xl text-center">
        נוצר על ידי רון נוס, תשפ&#34;ג | {"  "}
        {/* עדיף להשתמש ב&#34; במקום להשתמש במירכאות רגילות  */}
        <a href="https://github.com/itsrn/un-did-li" target="_blank">
          לצפייה בקוד האתר בגיטהאב
        </a>
      </footer>
    </div>
  );
}
