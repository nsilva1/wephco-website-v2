'use client'

import { useState } from 'react';
import type { INewUser } from '../interfaces/userInterface';
import { loginBrokerageUser } from '../actions/login';
import { registerBrokerageUser } from '../actions/register';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Image from 'next/image';
import logo from '../assets/images/logo.png';
import { useRouter } from 'next/navigation';

const AuthForm = ({ login }: { login: boolean }) => {
	const [user, setUser] = useState<INewUser>({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		role: 'Agent',
	});
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const handleLoginUser = async (event: React.FormEvent) => {
		event.preventDefault();
		if (!user.email || !user.password) {
			toast.warning('Please provide both email and password');
			return;
		}

		setLoading(true);

		try {
			await loginBrokerageUser(user.email, user.password!);
			router.push('/home');
		} catch (error) {
			console.error('Login failed', error);
			toast.error('Login failed');
		} finally {
			setLoading(false);
		}
	};

	const handleRegisterUser = async (event: React.FormEvent) => {
		event.preventDefault();
		if (
			!user.email ||
			!user.password ||
			!user.firstName ||
			!user.lastName ||
			!user.role
		) {
			toast.warning('Please fill in all required fields');
			return;
		}

		setLoading(true);

		try {
			await registerBrokerageUser(user);
			router.push('/home');
		} catch (error) {
			console.error('Registration failed', error);
			toast.error('Registration failed');
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (input: keyof INewUser, value: string) => {
		setUser((prev) => ({ ...prev, [input]: value }));
	};

	return (
		<div className="flex flex-col items-center gap-4">
			<h3 className=" flex flex-col gap-5">
				<Image src={logo} alt="Wephco Logo" className="w-full h-40" />
				<h3 className="text-3xl font-medium text-center">Wephco Brokerage</h3>
			</h3>
			<div className="shadow-2xl max-w-xl md:min-w-xl rounded-md p-10">
				<h1 className="text-2xl font-bold text-center">
					{login ? 'Login' : 'Register'}
				</h1>
				{login ? (
					<form onSubmit={handleLoginUser}>
						<div className="flex flex-col gap-2 mt-4">
							<label>
								Email<span className="text-red-500">*</span>
							</label>
							<input
								disabled={loading}
								required
								type="email"
								className="border rounded-md p-2"
								value={user.email}
								onChange={(e) => handleChange('email', e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-2 mt-8">
							<label>
								Password<span className="text-red-500">*</span>
							</label>
							<input
								disabled={loading}
								required
								type="password"
								className="border rounded-md p-2"
								value={user.password}
								onChange={(e) => handleChange('password', e.target.value)}
							/>
						</div>
						<div className="mt-4">
							<button
								disabled={loading}
								type="submit"
								className="w-full bg-primary text-white py-2 rounded-md mt-4 hover:bg-green-700 transition-colors cursor-pointer"
							>
								Login
							</button>
						</div>
						<div>
							<p className="text-sm mt-4 text-center">
								Don't have an account?{' '}
								<Link
									href="/register"
									className="text-primary font-medium hover:underline"
								>
									Register
								</Link>
							</p>
						</div>
					</form>
				) : (
					<form onSubmit={handleRegisterUser}>
						<div className="flex flex-col gap-2 mb-4">
							<label>
								First Name<span className="text-red-500">*</span>
							</label>
							<input
								disabled={loading}
								required
								type="text"
								className="border rounded-md p-2"
								value={user.firstName}
								onChange={(e) => handleChange('firstName', e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-2 mb-4">
							<label>
								Last Name<span className="text-red-500">*</span>
							</label>
							<input
								disabled={loading}
								required
								type="text"
								className="border rounded-md p-2"
								value={user.lastName}
								onChange={(e) => handleChange('lastName', e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-2 mb-4">
							<label>
								Email<span className="text-red-500">*</span>
							</label>
							<input
								disabled={loading}
								required
								type="email"
								className="border rounded-md p-2"
								value={user.email}
								onChange={(e) => handleChange('email', e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-2 mb-4">
							<label>
								Password<span className="text-red-500">*</span>
							</label>
							<input
								disabled={loading}
								required
								type="password"
								className="border rounded-md p-2"
								value={user.password}
								onChange={(e) => handleChange('password', e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-2 mb-4">
							<label>
								Role<span className="text-red-500">*</span>
							</label>
							<select
								disabled={loading}
								required
								className="border rounded-md p-2"
								value={user.role}
								onChange={(e) => handleChange('role', e.target.value)}
							>
								<option value="-">-</option>
								<option value="Agent">Agent</option>
								<option value="Investor">Investor</option>
							</select>
						</div>
						<div>
							<button
								disabled={loading}
								type="submit"
								className="w-full bg-primary text-white py-2 rounded-md mt-4 hover:bg-green-700 transition-colors cursor-pointer"
							>
								Register
							</button>
						</div>
						<div>
							<p className="text-sm mt-4 text-center">
								Already have an account?{' '}
								<Link
									href="/login"
									className="text-primary font-medium hover:underline"
								>
									Login
								</Link>
							</p>
						</div>
					</form>
				)}
			</div>
		</div>
	);
};

export { AuthForm };
