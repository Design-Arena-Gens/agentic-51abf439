import { useState } from 'react';
import { chatApi } from '../services/api.js';

const initialMessages = [
  {
    from: 'bot',
    text: 'Namaste! I am your AnnapurnaAI guide. Share your concern or mood today, and I will suggest an Ayurvedic ritual.',
  },
];

const ChatbotPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setLoading(true);
    try {
      const { data } = await chatApi.ask(userMessage.text);
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: data.response,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: 'I am unable to connect with the ancient sages right now. Please try again shortly.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
      <div className="glass-card flex h-[70vh] flex-col">
        <div className="border-b border-white/60 px-6 py-4">
          <h1 className="font-heading text-3xl text-primary">Ayurvedic Chatbot</h1>
          <p className="text-sm text-forest/70">Seek guidance, rituals, and mindful nudges.</p>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {messages.map((message, index) => (
            <div
              key={`${message.from}-${index}`}
              className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-lg rounded-3xl px-5 py-3 text-sm ${
                  message.from === 'user'
                    ? 'bg-primary text-white shadow shadow-primary/30'
                    : 'bg-white/80 text-forest'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {loading && <p className="text-center text-sm text-secondary">Consulting the Vedas…</p>}
        </div>
        <form onSubmit={handleSubmit} className="border-t border-white/60 px-6 py-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Describe how you feel..."
              className="flex-1 rounded-full border border-primary/30 bg-white/70 px-5 py-3 text-sm text-forest focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow shadow-secondary/30 hover:bg-clay disabled:cursor-not-allowed disabled:bg-secondary/40"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </form>
      </div>

      <aside className="glass-card h-[70vh] overflow-hidden px-6 py-8">
        <h2 className="font-heading text-2xl text-primary">Guidance</h2>
        <p className="mt-4 text-sm text-forest/70">
          Ask about hydration, sleep, stress, immunity, digestion, or seasonal foods. AnnapurnaAI
          shares gentle rituals grounded in Ayurveda.
        </p>
        <div className="mt-6 space-y-4 text-sm text-forest/70">
          <p>Try prompts like:</p>
          <ul className="space-y-2">
            <li>• “I feel anxious before sleep.”</li>
            <li>• “Suggest foods for joint pain.”</li>
            <li>• “How to stay hydrated with Pitta imbalance?”</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default ChatbotPage;

