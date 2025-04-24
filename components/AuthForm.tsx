import { useState } from 'react'
import { signIn } from '@/lib/auth/auth'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/actions/register'
import { Role } from '@/interfaces/userInterface'

const AuthForm = ({isLogin}: {isLogin: boolean}) => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });
        if (result?.error) {
          setError(result.error);
        } else {
          router.push('/dashboard');
        }
      } else {
        // Handle registration logic here
        const user = { name, email, password, role: Role.AGENT };
        const response = await registerUser(user);

        if(!response.ok){
          const data = await response.json()
          setError(data.error || 'Registration failed. Please try again.');
        }

        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });
        if (result?.error) {
          setError(result.error);
        } else {
          router.push('/dashboard');
        }

      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {!isLogin && (
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
          minLength={6}
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-black rounded hover:bg-black/80"
      >
        {isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  )
}

export { AuthForm }