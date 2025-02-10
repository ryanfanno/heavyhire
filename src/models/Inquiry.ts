import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: String,
  message: { type: String, required: true },
  city: { type: String, required: true },
  equipment: { type: String, required: true },
  userAgent: String,
  ipAddress: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema); 