import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import { connectMongoDB } from '@/lib/mongoose';
import { UserModel } from '@/services/users/user.schema';
import bcrypt from 'bcrypt';

const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID as string,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				await connectMongoDB();
				// Add logic here to look up the user from the credentials supplied
				const email = credentials?.email;
				const password = credentials?.password;
				if (!email || !password) return null;
				const result = await UserModel.findOne({ email });
				if (!result || !result.password) return null;
				const valid = await bcrypt.compare(password, result.password);
				if (!valid) return null;
				// User object returned must have an id property of type string, else Next will yeet
				const user = { id: result._id.toString(), email: result.email };
				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;
					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
	pages: {
		signIn: '/auth/signin',
		// error: '/auth/error',
	},
	callbacks: {
		async signIn({ profile, account }) {
			if (account?.provider === 'credentials' || account?.provider === 'email') return true;
			try {
				await connectMongoDB();
				const email = profile?.email;
				const result = await UserModel.findOne({ email });
				// No user in database
				if (!result) {
					const user = await UserModel.create({ email, provider: account?.provider });
					return true;
				}
				// Mismatch provider
				// Linking is optional
				if (result && result.provider !== account?.provider) {
					return '/auth/signin?error=AccountAlreadyExists'; // Redirect to this url
				}
				// In database with matching provider
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
	// adapter: MongoDBAdapter(clientPromise),
};

export default authOptions;
