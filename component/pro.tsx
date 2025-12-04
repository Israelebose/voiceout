import React, { useState, useEffect, useCallback } from 'react';
// Assuming Framer Motion and Lucide are installed in the Next.js project
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, UserPlus, Link, Copy, Check, Heart, CornerUpLeft, Github, Edit, Info } from 'lucide-react';

// --- Constants and Utility Functions ---

const VIEWS = {
  ABOUT: 'about',       // New informational homepage
  REGISTER: 'register', // Registration/Sign-in selection
  HOME: 'home',         // User Dashboard (view messages, edit link)
  SUBMIT: 'submit',     // Anonymous post form
  MESSAGES: 'messages', // Inbox view
};

// Initial data for demonstration purposes
const INITIAL_MESSAGES = [
  { id: 1, content: "You inspire me every day, keep shining!", date: "2025-11-20" },
  { id: 2, content: "That presentation you gave last week was brilliant!", date: "2025-11-21" },
  { id: 3, content: "Your taste in music is unmatched 🎶", date: "2025-11-22" },
];

/**
 * Copies text to the clipboard.
 */
const copyToClipboard = (text) => {
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed'; 
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return true;
    } catch (err) {
        console.error('Could not copy text: ', err);
        return false;
    }
};

// Utility to generate a clean, URL-safe ID
const generateIdFromName = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Math.random().toString(36).substring(2, 6);
};

const generateLink = (id) => `https://your-next-app.com/secret/${id}`;

// --- Helper Components ---

const AnimatedButton = ({ children, onClick, variant = 'primary', icon: Icon, className = '', disabled = false }) => {
    const baseStyle = "flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-900";
    
    const colors = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/50",
        secondary: "bg-slate-700 hover:bg-slate-600 text-slate-100 shadow-slate-900/50",
        github: "bg-gray-700 hover:bg-gray-600 text-white shadow-gray-900/50",
        icon: "bg-transparent hover:bg-slate-700 text-slate-300"
    };

    const disabledStyle = "opacity-50 cursor-not-allowed";

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyle} ${colors[variant]} ${className} ${disabled ? disabledStyle : ''}`}
            disabled={disabled}
        >
            {Icon && <Icon className="w-5 h-5" />}
            <span>{children}</span>
        </motion.button>
    );
};

const Card = ({ children, title, icon: Icon, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={`bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 w-full max-w-lg ${className}`}
    >
        {title && (
            <h2 className="text-3xl font-extrabold text-white mb-6 flex items-center space-x-3">
                {Icon && <Icon className="w-7 h-7 text-indigo-400" />}
                <span>{title}</span>
            </h2>
        )}
        {children}
    </motion.div>
);

// --- View Implementations ---

const AboutView = ({ setView }) => (
    <Card title="Welcome to Secret Board" icon={Info} className="max-w-xl">
        <p className="text-xl text-indigo-400 mb-4 font-semibold">
            Share kindness, anonymously.
        </p>
        <p className="text-slate-400 mb-6 leading-relaxed">
            Secret Board allows you to create a unique, private link that you can share with anyone. Your friends, colleagues, or followers can use this link to send you anonymous compliments, kind words, or confessions. You'll never know who sent it, but you'll feel the love!
        </p>
        <div className="space-y-3">
            <div className="flex items-start space-x-3 text-slate-300">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>Create a personalized, shareable link.</p>
            </div>
            <div className="flex items-start space-x-3 text-slate-300">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>Receive messages with guaranteed anonymity.</p>
            </div>
            <div className="flex items-start space-x-3 text-slate-300">
                <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p>Boost positivity and connection among your network.</p>
            </div>
        </div>
        
        <AnimatedButton onClick={() => setView(VIEWS.REGISTER)} className="mt-8 w-full">
            Get Started
        </AnimatedButton>
    </Card>
);

const RegisterView = ({ setView, setUserName, setUserId, setUserLink }) => {
    const [name, setName] = useState('');

    const completeRegistration = (inputName) => {
        if (!inputName.trim()) return;
        
        const newId = generateIdFromName(inputName);
        const newLink = generateLink(newId);
        
        setUserName(inputName.trim());
        setUserId(newId);
        setUserLink(newLink);
        setView(VIEWS.HOME);
    };

    const handleRegister = () => completeRegistration(name);
    
    // Simulate GitHub Sign-in success
    const handleGithubSignIn = () => {
        // In a real app, this would redirect to GitHub, authenticate, and return user data.
        const mockGithubName = "CodeMaster_99";
        completeRegistration(mockGithubName);
    };

    return (
        <Card title="Register or Sign In" icon={UserPlus}>
            <p className="text-slate-400 mb-6">
                Use your name to create a personalized link, or sign in with GitHub for quick setup.
            </p>

            {/* GitHub Sign-in Mock */}
            <AnimatedButton 
                onClick={handleGithubSignIn} 
                variant="github" 
                icon={Github}
                className="w-full mb-6"
            >
                Sign In with GitHub (Simulated)
            </AnimatedButton>

            <div className="flex items-center space-x-4 mb-6">
                <div className="flex-grow border-t border-slate-700"></div>
                <span className="text-slate-500 text-sm">OR</span>
                <div className="flex-grow border-t border-slate-700"></div>
            </div>

            <input
                type="text"
                placeholder="Your Desired Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mb-6 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <AnimatedButton onClick={handleRegister} disabled={!name.trim()}>
                Create Link Manually
            </AnimatedButton>
        </Card>
    );
};

const HomeView = ({ setView, userName, userId, userLink, setUserId, setUserLink }) => {
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newUserName, setNewUserName] = useState(userName);
    const [newUserId, setNewUserId] = useState(userId);

    const handleCopy = () => {
        if (copyToClipboard(userLink)) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSaveEdit = () => {
        if (!newUserId.trim()) return;

        // Update link and ID
        setUserId(newUserId.trim());
        setUserLink(generateLink(newUserId.trim()));
        setIsEditing(false);
        // Note: In a real app, the server would validate if the ID is available.
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        setNewUserName(name);
        // Automatically generate a new ID based on the name
        setNewUserId(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
    };
    
    const handleIdChange = (e) => {
        const id = e.target.value;
        // Enforce URL-safe characters only
        setNewUserId(id.toLowerCase().replace(/[^a-z0-9-]+/g, ''));
    };

    return (
        <Card title={`Welcome, ${userName}`} icon={Link}>
            <p className="text-slate-400 mb-4">
                This is your unique link for receiving anonymous messages.
            </p>

            {isEditing ? (
                <div className="space-y-4 mb-6">
                    <label className="block text-sm font-medium text-slate-400">
                        Edit Username (optional)
                    </label>
                    <input
                        type="text"
                        value={newUserName}
                        onChange={handleNameChange}
                        placeholder="New Username"
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />

                    <label className="block text-sm font-medium text-slate-400">
                        Edit Link ID (e.g., `secret/{id}`)
                    </label>
                    <div className="flex items-center text-sm font-mono bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
                        <span className="p-3 text-slate-500 flex-shrink-0">
                            https://your-next-app.com/secret/
                        </span>
                        <input
                            type="text"
                            value={newUserId}
                            onChange={handleIdChange}
                            className="flex-grow p-3 bg-slate-700 text-indigo-300 min-w-0 focus:outline-none"
                        />
                    </div>
                    
                    <AnimatedButton onClick={handleSaveEdit} variant="primary" className="w-full" disabled={!newUserId.trim()}>
                        Save New Link
                    </AnimatedButton>
                    <AnimatedButton onClick={() => setIsEditing(false)} variant="secondary" className="w-full">
                        Cancel
                    </AnimatedButton>
                </div>
            ) : (
                <>
                    <p className="text-indigo-300 mb-4 font-mono text-sm break-all bg-slate-700 p-3 rounded-xl border border-slate-600 select-all flex justify-between items-center">
                        {userLink}
                        <motion.button 
                            onClick={() => setIsEditing(true)}
                            className="ml-4 text-slate-400 hover:text-indigo-400 transition"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Edit className="w-5 h-5" />
                        </motion.button>
                    </p>
                    
                    <div className="flex flex-col space-y-3 mb-6">
                        <AnimatedButton 
                            onClick={handleCopy} 
                            variant="primary" 
                            icon={copied ? Check : Copy}
                        >
                            {copied ? 'Link Copied!' : 'Copy Link to Share'}
                        </AnimatedButton>

                        <AnimatedButton 
                            onClick={() => setView(VIEWS.MESSAGES)} 
                            variant="secondary" 
                            icon={Mail}
                        >
                            View Messages ({INITIAL_MESSAGES.length} Mock Messages)
                        </AnimatedButton>
                    </div>
                    
                    <p className="text-xs text-slate-500 mt-6">
                        Click the edit icon to change your custom link ID.
                    </p>
                </>
            )}
        </Card>
    );
};

const MessageItem = ({ message, index }) => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="p-5 bg-slate-700/70 border-l-4 border-indigo-400 rounded-xl shadow-md backdrop-blur-sm"
    >
        <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-indigo-300 bg-indigo-900/50 px-2 py-0.5 rounded-full">
                Anonymous Sender
            </span>
            <span className="text-xs text-slate-500">
                {message.date}
            </span>
        </div>
        <p className="text-lg text-white leading-relaxed">
            {message.content}
        </p>
    </motion.div>
);


const MessagesView = ({ setView, messages }) => {
    return (
        <Card title="Inbox of Love" icon={Heart} className="max-w-xl">
            <p className="text-slate-400 mb-6">
                You have received {messages.length} beautiful anonymous messages!
            </p>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {/* Custom CSS for the scrollbar. This needs to be included globally in a real Next.js app. */}
                <style jsx="true">{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: #1f2937;
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #4f46e5;
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #6366f1;
                    }
                `}</style>
                {messages.map((msg, index) => (
                    <MessageItem key={msg.id} message={msg} index={index} />
                ))}
            </div>
            
            <div className="mt-8">
                <AnimatedButton 
                    onClick={() => setView(VIEWS.HOME)} 
                    variant="secondary" 
                    icon={CornerUpLeft}
                    className="w-full"
                >
                    Back to Dashboard
                </AnimatedButton>
            </div>
        </Card>
    );
};

const SubmitPostView = ({ setView, targetId, addMessage }) => {
    const [content, setContent] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!content.trim()) return;

        addMessage(content);
        setIsSubmitted(true);
        // Automatically switch back after a delay
        setTimeout(() => setView(VIEWS.ABOUT), 3000); // Redirect to About after submission
    };

    if (isSubmitted) {
        return (
            <Card title="Message Sent!" icon={Check}>
                <p className="text-xl text-green-400 mb-6">
                    Your secret message has been delivered anonymously to **{targetId}**!
                </p>
                <p className="text-slate-400">
                    Redirecting you to the home screen shortly...
                </p>
            </Card>
        );
    }

    return (
        <Card title={`Send a Secret to @${targetId}`} icon={Send}>
            <p className="text-slate-400 mb-4">
                Write your message below. It will be sent completely anonymously.
            </p>
            <textarea
                placeholder="Type your kind words, confession, or compliment here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="5"
                className="w-full p-4 mb-6 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            <AnimatedButton 
                onClick={handleSubmit} 
                disabled={!content.trim()}
            >
                Send Anonymously
            </AnimatedButton>
            <AnimatedButton 
                onClick={() => setView(VIEWS.ABOUT)} 
                variant="icon"
                className="mt-4 w-full"
            >
                Go to Homepage
            </AnimatedButton>
        </Card>
    );
};


// --- Main Application Component ---

export default function App() {
    // New state for user's friendly name
    const [userName, setUserName] = useState(null); 
    // Simulated state for user and messages
    const [currentView, setCurrentView] = useState(VIEWS.ABOUT);
    const [userId, setUserId] = useState(null);
    const [userLink, setUserLink] = useState(null);
    const [messages, setMessages] = useState(INITIAL_MESSAGES);

    // Simulated function to receive a post from an anonymous sender
    const addMessage = useCallback((content) => {
        const newMessage = {
            id: Date.now(),
            content,
            date: new Date().toISOString().slice(0, 10),
        };
        setMessages(prev => [newMessage, ...prev]);
    }, []);

    // Effect to simulate accessing a shared link (e.g., /secret/target-user-id)
    useEffect(() => {
        // In a real Next.js app, this logic would use `useSearchParams` or `usePathname`
        const path = window.location.pathname;
        const hash = window.location.hash;
        
        // Mock checking path for a target ID (e.g., /secret/john-doe-1234)
        const pathMatch = path.match(/\/secret\/([a-z0-9-]+)/);
        // Mock checking hash for submission (for testing in local file/iframe)
        const hashMatch = hash.match(/#submit\/([a-z0-9-]+)/);

        if (pathMatch || hashMatch) {
            const targetId = pathMatch ? pathMatch[1] : hashMatch[1];
            setUserId(targetId); 
            // In the anonymous flow, we only need the ID to target the submission.
            setCurrentView(VIEWS.SUBMIT);
        }
    }, []);

    // Render the current view based on state
    const renderView = () => {
        switch (currentView) {
            case VIEWS.ABOUT:
                return <AboutView setView={setCurrentView} />;
            case VIEWS.HOME:
                return <HomeView 
                            setView={setCurrentView} 
                            userName={userName}
                            userId={userId} 
                            userLink={userLink}
                            setUserId={setUserId}
                            setUserLink={setUserLink}
                        />;
            case VIEWS.MESSAGES:
                return <MessagesView setView={setCurrentView} messages={messages} />;
            case VIEWS.SUBMIT:
                const targetId = userId || 'unknown-user';
                return <SubmitPostView setView={setCurrentView} targetId={targetId} addMessage={addMessage} />;
            case VIEWS.REGISTER:
            default:
                return <RegisterView 
                            setView={setCurrentView} 
                            setUserName={setUserName}
                            setUserId={setUserId} 
                            setUserLink={setUserLink} 
                        />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 antialiased font-sans">
            <header className="absolute top-0 w-full p-6 flex justify-center">
                <h1 className="text-4xl font-black text-white tracking-tight">
                    <span className="text-indigo-400">Secret</span><span className='text-white'>Board</span>
                </h1>
            </header>

            <AnimatePresence mode="wait">
                {/* Key is required for AnimatePresence to detect view changes */}
                <div key={currentView} className="w-full flex justify-center mt-16 md:mt-0">
                    {renderView()}
                </div>
            </AnimatePresence>
        </div>
    );
};