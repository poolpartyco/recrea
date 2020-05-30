/**
 * Importing required interfaces
 */
import { IProduct } from '../interfaces/ProductInterface';
import { metrics } from '../rules/MetricList'
import {Schema, model} from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, required: 'Enter a product name' },
    description: { type: String, required: 'Enter a description' },
    metricPrice: { type: String, required: 'Enter a metric price' },
    image: { type: String },
    quantity: { type: String, required: 'Enter an image' },
    metric: { type: String, required: 'Enter a metric' },
    tags: [{ type: String, enum: metrics }],
    publisher: { type: Schema.Types.ObjectId, ref:'User', required: 'Enter a userId' },
    status: { type: Boolean, default: true },
    }, { timestamps: true });

export default model<IProduct>('Contact', ProductSchema);
