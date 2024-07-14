import { model, Schema} from 'mongoose';

const contactsSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        // optional: true,
      },
      isFavourite: {
        type: Boolean,
        default: false,
      },
      contactType: {
        type: String,
        required: true,
        default: 'personal',
        enum: ['work', 'home', 'personal'],
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      photo: { type: String },
    },
    {
      createdAt: {
        timestamps: true,
        versionKey: false,
      },
      updatedAt: {
        timestamps: true,
        versionKey: false,
      },
    },
  );

    export const contactsCollection = model('contacts', contactsSchema);

