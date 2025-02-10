import mongoose from 'mongoose';

const PlaceCacheSchema = new mongoose.Schema({
  searchQuery: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  results: [{
    name: String,
    address: String,
    rating: Number,
    userRatingsTotal: Number,
    types: [String],
    businessStatus: String,
    phone: String,
    website: String
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 15552000 // 6 months in seconds (180 days)
  }
});

// Create a compound index for efficient querying
PlaceCacheSchema.index({ searchQuery: 1, createdAt: 1 });

export default mongoose.models.PlaceCache || mongoose.model('PlaceCache', PlaceCacheSchema); 