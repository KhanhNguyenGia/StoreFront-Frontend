import { connectMongoDB } from '@/lib/mongoose';
import { UserModel } from '@/services/users/user.schema';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	await connectMongoDB();
	const { email, password, confirmPassword } = req.body;
	if (!email || !password || !confirmPassword) {
		return res.status(400).json({ message: 'Please fill all fields' });
	}
	if (password !== confirmPassword) {
		return res.status(400).json({ message: 'Passwords do not match' });
	}
	try {
		const result = await UserModel.findOne({ email });
		if (result) {
			return res.status(400).json({ message: 'User already exists' });
		}
		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);
		const user = await UserModel.create({ email, password: hashed, provider: 'credentials' });
		return res.status(307).redirect('/auth/signin');
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong' });
	}
}
