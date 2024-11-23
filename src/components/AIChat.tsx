import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "👋 Hi! I'm your Modern Shoes AI assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Product-specific responses
    if (input.includes('classic runner')) {
      return "The Classic Runner is our premium running shoe designed for both performance and comfort. It features responsive cushioning, breathable mesh upper, and is available in sizes 7-12. The price is $129.99. Would you like to know more about its features or see available colors?";
    }
    
    if (input.includes('urban street')) {
      return "The Urban Street is our trendy casual shoe perfect for everyday wear. It comes in sizes 6-10 and is priced at $149.99. It's one of our most popular styles for its versatility and comfort. Would you like to see the available color options?";
    }

    // Size and fit queries
    if (input.includes('size') || input.includes('fit')) {
      if (input.includes('run')) {
        return "Most of our shoes run true to size. However, for athletic shoes like the Classic Runner, we recommend going up half a size if you prefer more toe room. Would you like me to help you find your perfect size?";
      }
      if (input.includes('chart') || input.includes('guide')) {
        return "Here's our size guide:\nUS | EU | UK | CM\n5 | 35 | 3 | 22\n6 | 36 | 4 | 23\n7 | 37 | 5 | 24\n8 | 38 | 6 | 25\n9 | 39 | 7 | 26\n10 | 40 | 8 | 27\n\nNeed help finding your size?";
      }
      return "Our shoes typically run true to size. For the best fit, I recommend measuring your foot length in centimeters. Would you like me to guide you through the measurement process?";
    }

    // Shipping and delivery
    if (input.includes('shipping') || input.includes('delivery')) {
      if (input.includes('time') || input.includes('long')) {
        return "Standard shipping takes 3-5 business days. Express shipping (2 days) is also available. International shipping typically takes 7-14 business days. Would you like to know the shipping rates for your location?";
      }
      if (input.includes('track')) {
        return "You can track your order by clicking the tracking link in your shipping confirmation email or by logging into your account. Would you like me to explain how to track your order step by step?";
      }
      if (input.includes('free')) {
        return "We offer free standard shipping on all orders over $100! For orders under $100, standard shipping is $7.99. Would you like to know about our express shipping options?";
      }
      return "We offer several shipping options:\n- Standard (3-5 days): Free over $100, otherwise $7.99\n- Express (2 days): $14.99\n- International: Varies by location\n\nWould you like to know more about any of these options?";
    }

    // Returns and exchanges
    if (input.includes('return') || input.includes('exchange')) {
      if (input.includes('policy')) {
        return "Our return policy includes:\n- 30-day return window\n- Items must be unworn with original tags\n- Free returns for store credit\n- $7.99 for refund to original payment\n\nWould you like me to guide you through the return process?";
      }
      if (input.includes('how') || input.includes('process')) {
        return "To return or exchange an item:\n1. Log into your account\n2. Select the order\n3. Choose items to return\n4. Print the return label\n5. Drop off at any postal location\n\nWould you like me to help you start a return?";
      }
      return "We have a hassle-free 30-day return policy. Items must be unworn and in original packaging. Would you like to know more about returns or start a return process?";
    }

    // Payment and pricing
    if (input.includes('payment') || input.includes('price') || input.includes('cost')) {
      if (input.includes('method')) {
        return "We accept:\n- Credit/Debit cards (Visa, Mastercard, Amex)\n- PayPal\n- Apple Pay\n- Google Pay\n- Shop Pay\n\nWhich payment method would you like to know more about?";
      }
      if (input.includes('discount') || input.includes('coupon')) {
        return "You can find our current promotions in the 'Sale' section. Sign up for our newsletter to receive a 10% discount on your first order! Would you like me to help you find current deals?";
      }
    }

    // Material and care
    if (input.includes('material') || input.includes('care') || input.includes('clean')) {
      return "Most of our shoes are made with premium materials including:\n- Full-grain leather\n- Breathable mesh\n- Memory foam insoles\n- Rubber outsoles\n\nFor care instructions, what type of shoe are you interested in?";
    }

    // Default response
    return "I can help you with:\n- Product details and recommendations\n- Sizing and fit guidance\n- Shipping and delivery\n- Returns and exchanges\n- Payment methods\n- Material and care instructions\n\nWhat would you like to know more about?";
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col animate-scale-in">
          <div className="p-4 bg-black text-white rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <span className="font-medium">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-800 p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <ReactMarkdown className="prose prose-sm">
                    {message.content}
                  </ReactMarkdown>
                  <div className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={handleSend}
                className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}