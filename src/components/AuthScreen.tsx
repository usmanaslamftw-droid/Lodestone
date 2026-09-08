import React, { useState } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { Compass, Sparkles, Mail, Lock, ShieldCheck, ArrowRight, User } from 'lucide-react';

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void;
  onBackToLanding: () => void;
  isDark: boolean;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess, onBackToLanding, isDark }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authNotAllowed, setAuthNotAllowed] = useState(false);

  // Instant Offline Demo Mode Bypass
  const handleOfflineBypass = () => {
    onAuthSuccess({
      uid: 'offline_demo_traveler',
      email: 'traveler@lodestone.com',
      displayName: 'Tastemaker Guest'
    });
  };

  // Handle traditional Email/Password Auth
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (isSignUp && !displayName) {
      setError('Please provide your name.');
      return;
    }

    setLoading(true);
    setError(null);
    setAuthNotAllowed(false);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        onAuthSuccess(userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onAuthSuccess(userCredential.user);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setAuthNotAllowed(true);
        setError('Firebase Authentication: Email/Password login provider is currently not enabled in your Firebase Console.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/invalid-credential') {
        setError('Incorrect password or user credentials. Try again.');
      } else {
        setError(err.message || 'An error occurred during authentication.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google / Gmail Authentication
  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);
    setAuthNotAllowed(false);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      onAuthSuccess(userCredential.user);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setAuthNotAllowed(true);
        setError('Firebase Authentication: Google Sign-In is currently not enabled in your Firebase Console.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('The Google sign-in popup was blocked by your browser. Please try again, or use Email & Password below.');
      } else {
        setError(
          'Google authentication was cancelled or blocked in this sandbox. Please use our standard Email & Password registration below (any valid-looking email works!).'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Quick Instant Access Demo Mode (for seamless user testing)
  const handleDemoAccess = () => {
    setEmail('traveler@lodestone.com');
    setPassword('traveler123');
    setIsSignUp(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-earth-cream text-earth-charcoal transition-colors duration-300" id="auth-portal-screen">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center border border-earth-sand/60 bg-earth-moss-light">
            <Compass className="w-6 h-6 text-earth-terracotta animate-spin-slow" />
          </div>
        </div>
        
        <h2 className="mt-6 text-center font-serif text-3xl italic tracking-tight font-normal text-earth-charcoal">
          {isSignUp ? 'Calibrate Your Account' : 'Welcome back to Lodestone'}
        </h2>
        
        <p className="mt-2 text-center text-xs font-mono uppercase tracking-widest text-earth-charcoal/60">
          The Tastemaker Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 border border-earth-sand/60 bg-earth-moss-light shadow-md sm:rounded-sm sm:px-10">
          
          {/* Gmail/Google Authentication Button */}
          <div>
            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-earth-sand bg-earth-beige/50 hover:bg-earth-sand/30 text-earth-charcoal rounded-sm font-sans text-xs font-bold uppercase tracking-wider transition-all"
              id="btn-google-auth"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.111C18.281 1.055 15.523 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.89 11.57-11.79 0-.795-.085-1.4-.195-1.925H12.24z"
                />
              </svg>
              <span>Continue with Gmail</span>
            </button>
            
            <p className="mt-2 text-[10px] text-center font-light leading-relaxed text-earth-charcoal/50">
              Note: Popups might be blocked in inside-frame previews. If so, use Email & Password below.
            </p>
          </div>

          {/* Divider */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-earth-sand/60" />
            </div>
            <div className="relative flex justify-center text-xs font-mono uppercase">
              <span className="px-2 px-3 text-[10px] bg-earth-moss-light text-earth-charcoal/60">
                Or use credentials
              </span>
            </div>
          </div>

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleEmailAuth}>
            {error && (
              <div className="p-3.5 border border-red-500/30 bg-red-500/10 text-red-400 text-xs rounded-sm space-y-2">
                <p className="font-semibold leading-relaxed">{error}</p>
                {authNotAllowed && (
                  <div className="border-t border-red-500/20 pt-2 mt-2 text-[11px] text-earth-sand/80 space-y-2">
                    <p className="font-bold uppercase tracking-wider text-[10px] text-earth-terracotta">How to enable this in Firebase Console:</p>
                    <ol className="list-decimal list-inside space-y-1 pl-1">
                      <li>Go to your Firebase console project page.</li>
                      <li>In the left menu, select <strong>Authentication</strong>.</li>
                      <li>Under the <strong>Sign-in method</strong> tab, enable the <strong>Email/Password</strong> provider.</li>
                    </ol>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleOfflineBypass}
                        className="w-full flex items-center justify-center gap-1 py-1.5 px-3 bg-earth-terracotta text-white font-mono text-[10px] uppercase tracking-wider font-bold rounded-sm hover:bg-earth-terracotta-dark transition-all"
                      >
                        ⚡ Bypass Auth & Use Offline Demo Portal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isSignUp && (
              <div>
                <label htmlFor="name" className={`block text-[10px] font-mono uppercase tracking-widest font-bold mb-1.5 ${
                  isDark ? 'text-earth-sand/80' : 'text-earth-charcoal/80'
                }`}>
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-earth-charcoal/40">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Elena Rostova"
                    className={`block w-full pl-9 pr-3 py-2.5 border rounded-sm text-xs font-sans focus:outline-none focus:border-earth-terracotta ${
                      isDark 
                        ? 'bg-earth-charcoal/50 border-earth-sand/20 text-white placeholder-earth-sand/30' 
                        : 'bg-earth-cream/40 border-earth-sand text-earth-charcoal placeholder-earth-charcoal/40'
                    }`}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className={`block text-[10px] font-mono uppercase tracking-widest font-bold mb-1.5 ${
                isDark ? 'text-earth-sand/80' : 'text-earth-charcoal/80'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-earth-charcoal/40">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className={`block w-full pl-9 pr-3 py-2.5 border rounded-sm text-xs font-sans focus:outline-none focus:border-earth-terracotta ${
                    isDark 
                      ? 'bg-earth-charcoal/50 border-earth-sand/20 text-white placeholder-earth-sand/30' 
                      : 'bg-earth-cream/40 border-earth-sand text-earth-charcoal placeholder-earth-charcoal/40'
                  }`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-[10px] font-mono uppercase tracking-widest font-bold mb-1.5 ${
                isDark ? 'text-earth-sand/80' : 'text-earth-charcoal/80'
              }`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-earth-charcoal/40">
                  <Lock className="h-3.5 w-3.5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`block w-full pl-9 pr-3 py-2.5 border rounded-sm text-xs font-sans focus:outline-none focus:border-earth-terracotta ${
                    isDark 
                      ? 'bg-earth-charcoal/50 border-earth-sand/20 text-white placeholder-earth-sand/30' 
                      : 'bg-earth-cream/40 border-earth-sand text-earth-charcoal placeholder-earth-charcoal/40'
                  }`}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-sm text-xs font-mono uppercase tracking-wider font-extrabold text-white bg-earth-terracotta hover:bg-earth-terracotta-dark transition-all focus:outline-none disabled:opacity-50"
                id="btn-submit-auth"
              >
                {loading ? 'Processing...' : isSignUp ? 'Begin Journey' : 'Enter Portal'}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="mt-4 flex flex-col items-center justify-center gap-2">
            <button
              onClick={handleDemoAccess}
              className={`text-[10px] font-mono uppercase tracking-wider font-bold transition-all ${
                isDark ? 'text-earth-sand/60 hover:text-white' : 'text-earth-charcoal/50 hover:text-earth-terracotta'
              }`}
            >
              ⚡ Load Demo Account Credentials
            </button>
            <span className="text-[9px] opacity-40 font-mono">— OR —</span>
            <button
              onClick={handleOfflineBypass}
              className={`text-[10px] font-mono uppercase tracking-wider font-extrabold transition-all text-earth-terracotta hover:underline`}
            >
              🚀 Launch Offline Sandbox Mode Directly
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className={`font-semibold hover:underline ${
                isDark ? 'text-earth-sand' : 'text-earth-charcoal'
              }`}
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Register"}
            </button>
            
            <button
              onClick={onBackToLanding}
              className="text-earth-terracotta hover:underline font-semibold"
            >
              Back to Lodestone Home
            </button>
          </div>

        </div>
      </div>

      <div className="mt-8 text-center flex items-center justify-center gap-2 text-[10px] font-light opacity-60">
        <ShieldCheck className="w-4 h-4 text-earth-terracotta" />
        <span>Secured via Firebase Identity Services & Auth tokens.</span>
      </div>

    </div>
  );
};
