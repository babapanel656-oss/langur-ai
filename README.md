# Langur AI

A polished, responsive chatbot UI with a Node.js backend that calls the OpenAI API.

## Requirements
- Node.js 20+ recommended
- An OpenAI API key with API billing/usage enabled

## Run locally
1. Extract the ZIP and open a terminal in this folder.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Open `.env` and replace the placeholder with your own API key.
5. Run `npm start`.
6. Open `http://localhost:3000`.

**Never commit `.env` or expose the API key in browser code.** The included `.gitignore` excludes `.env`.

## Included
- Responsive chat interface
- New conversation, recent chats, message copy, text export, light/dark appearance
- API setup/privacy guidance panel
- `/api/chat` backend route using the OpenAI Responses API
- Basic request validation, Helmet security headers and rate limiting

## Before publishing publicly
- Add user authentication and per-user conversation storage.
- Add budget/usage limits and monitoring in your OpenAI project.
- Consider persistent storage, streaming responses, and secure file uploads if needed.
- Review rate limits for your hosting setup and add abuse protection.
- Keep dependencies updated and configure HTTPS on your host.

This starter stores chat history in the current browser session only; it does not include a database or account system. API usage may incur charges according to your OpenAI account and model pricing.
