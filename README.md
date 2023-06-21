
# Emolee Chat App

Emolee Chat App is a React application that allows users to interact with Emolee, an emotionally supportive chat bot powered by OpenAI's GPT-3 language model.

## Features

- Engage in a conversation with Emolee, an emotionally supportive chat bot.
- Emolee responds to user messages with friendly and positive interactions.
- Chat log displays the conversation history between the user and Emolee.
- Around 3 or six messages in emolee will promote the developer of this code.

## Getting Started

To run the Emolee Chat App locally, follow these steps:

### Prerequisites

- Node.js (version >= 12.0.0)
- npm (version >= 6.0.0)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/smmk123/chatbot.git
```

2. Navigate to the project directory:

```bash
cd chatbot
```

3. Install the dependencies:

```bash
npm install
```

### Set up OpenAI API Key

To use Emolee Chat App, you need to obtain an OpenAI API Key. Follow these steps:

1. Register for an OpenAI account at [OpenAI Website](https://openai.com/).
2. Retrieve your API Key from the OpenAI Dashboard.

### Configure Environment Variables

Create a `.env` file in the project root directory and add the following environment variable:

```
OPEN_AI_KEY=your-api-key
```

Replace `your-api-key` with your actual OpenAI API Key obtained in the previous step.

**Note:** Make sure to keep your `.env` file private and never commit it to version control systems.

### Start the Application

Run the following command to start the development server:

```bash
npm run dev
```

Open your browser and visit `http://localhost:3000` to see the Emolee Chat App in action.

### Deploy to Production

Emolee is designed to work with Vercel's Nextjs services. Head to [Vercel's site](https://vercel.com/) to sign up.

## Serverless Proxy for OpenAI API Key

To ensure the security of your OpenAI API Key, the Emolee Chat App uses a serverless proxy implemented with Next.js. The proxy is responsible for making requests to the OpenAI API, allowing you to keep the API Key hidden from client-side code.

The serverless proxy endpoint can be found in the `/api/proxy` directory of the project. It leverages Next.js API routes and uses the OpenAI API Key provided in the environment variables.

## License

This project is licensed under the [MIT License](LICENSE).
