import mongoose from 'mongoose';

export const connectMongoDB = () => {
	return mongoose.connect(
		process.env.NODE_ENV === 'development'
			? (process.env.MONGODB_URI_DEV as string)
			: (process.env.MONGODB_URI as string),
		{}
	);
};
