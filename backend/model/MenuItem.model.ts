import mongoose, { Schema, Document } from "mongoose";

// TypeScript interface for type checking
export interface IMenuItem extends Document {
    name: string;
    price: number;
    image: string;
    category?: string;  // Optional field
    description?: string; // Optional field
    createdAt: Date;
    updatedAt: Date;
}

const MenuItemSchema: Schema = new Schema({
    name: { 
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    image: { 
        type: String,
        required: [true, 'Image URL is required'],
        validate: {
            validator: (value: string) => {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
            },
            message: 'Invalid image URL format'
        }
    },
    category: {
        type: String,
        enum: ['appetizer', 'main', 'dessert', 'beverage'],
        default: 'main'
    },
    description: {
        type: String,
        maxlength: [200, 'Description cannot exceed 200 characters']
    }
}, {
    timestamps: true
});

// Indexes for frequently queried fields
MenuItemSchema.index({ name: 'text', category: 1 });

const MenuItem = mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);

export default MenuItem;