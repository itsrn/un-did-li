# un-did-li
Unshorten did.li shortened links

## 📚 About this project
There is a new Israeli shortening links service called "did.li" which is very good, except it does not have the checking-shortened-links-before-entering-them method. If you know about bit.ly, you know that you can add the "+" symbol at every bit.ly shortened link end to view a page of bit.ly that shows you the long page url without redirecting you into it. Well, did.li does not have this important feature so I created this project, to help people with this new type of shortend links.

## 📦 Tools
- Nextjs (v13, up-to-date, with the new /app folder)
- Tailwindcss (for desinging the website)
- react-hot-toast (for the toasts of the websites)
- axios (for interacting with did.li's servers to know where the shortened links are going to)

## ✍ API
This project uses *kind-of* API that you can simply understand it by looking in the project's files. The API uses GET as the method.

To use the API, use this URL: `un-did-li.vercel.app/api`. There is the "path" parameter which you need to add when you are using the API. The "path" parameter is the value of the shortned did.li url. So it means that for the url: `did.li/12312323`, the "path" parameter will be "12312323". You can use the following TS snippet to get the path of the shortened URL:
```ts
function extractPathFromUrl(url: string): string {
    const trimmedUrl = url.trim();
    const parts = trimmedUrl.split("/");
    return parts[parts.length - 1];
}
```
## ✨ Installation & Usage
To install the project, install modules and run it, use this snippet in your terminal:
```bash
git clone https://github.com/itsrn/un-did-li.git
cd un-did-li
yarn
yarn start
```

## 📰 License
This project is licensed under [MIT license](https://github.com/itsrn/un-did-li/blob/main/LICENSE).