import { Model, Schema, model, models } from 'mongoose';

type User = {
	email: string;
	password?: string;
	provider: string;
};

export const UserSchema = new Schema<User>({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
	},
	provider: {
		type: String,
		required: true,
	},
});

// If the user model exists, use it.
export const UserModel = (models.User as Model<User>) || model<User>('User', UserSchema);
