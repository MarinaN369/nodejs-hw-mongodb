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
        required: false,
      unique: true,

        // optional: true,
      },
      isFavourite: {
        type: Boolean,
        default: false,
        required: false,
      },
      contactType: {
        type: String,
        required: false,
        default: 'personal',
        enum: ['work', 'home', 'personal'],
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',

      },
      photo: { type: String },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

    export const contactsCollection = model('contacts', contactsSchema);

