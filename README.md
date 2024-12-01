# un-did-li

A simple tool to reveal the full URL behind did.li shortened links.

## Overview

Similar to bit.ly's "+" feature that allows users to preview the destination of shortened links, un-did-li provides this missing functionality for did.li links. This tool helps users verify the destination of did.li shortened URLs before visiting them.

## Features

- (Almost) Instantly reveal full URLs behind did.li shortened links
- Clean, modern interface
- No registration required
- Fast and reliable

## API

Base URL: `un-did-li.vercel.app/api`

### Parameters

- `path`: The did.li URL identifier (Required)

### Example

For the shortened URL `did.li/abc123`, use:
```bash
GET un-did-li.vercel.app/api?path=abc123
```

### Response Format

```json
{
  "result": string
}
```

### Status Codes & Responses

| Status | Response                        | Meaning                                               |
|--------|--------------------------------|-------------------------------------------------------|
| 200    | `{ "result": "https://..." }`  | Success - Returns the full URL                        |
| 400    | `{ "result": "Invalid path parameter" }` | Missing or invalid path parameter           |
| 404    | `{ "result": "Link doesn't exist" }`     | The did.li link was not found              |
| 500    | `{ "result": "Server error" }`           | Error reaching did.li servers |

### Error Handling Example

```typescript
try {
  const response = await fetch('un-did-li.vercel.app/api?path=abc123');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data.result); // The full URL
} catch (error) {
  console.error('Error:', error);
}
```

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/itsrn/un-did-li.git
```

2. Install dependencies:
```bash
cd un-did-li
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## License

This project is licensed under the [MIT License](https://github.com/itsrn/un-did-li/blob/main/LICENSE).

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.