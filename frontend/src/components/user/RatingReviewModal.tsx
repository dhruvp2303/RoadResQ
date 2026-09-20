import React, { useState } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import { Star, Sparkles } from 'lucide-react';

export const RatingReviewModal: React.FC = () => {
  const { activeIncident, submitRating } = useRoadResQ();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Punctual', 'Professional']);
  const [tip, setTip] = useState<number>(50);
  const [review, setReview] = useState('');

  if (!activeIncident || activeIncident.status !== 'CLOSED') return null;

  const availableTags = [
    'Punctual Arrival',
    'Professional & Courteous',
    'Skilled Diagnosis',
    'Clean & Careful Work',
    'Fair & Transparent',
    'Safety Minded',
  ];

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRating(rating, review, selectedTags, tip);
  };

  const provider = activeIncident.provider;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-up">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-900 text-center space-y-5">
        {/* Celebration Avatar */}
        <div className="relative mx-auto w-20 h-20">
          <img
            src={
              provider?.avatar ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
            }
            alt="Technician"
            className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-white shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-slate-900">
            Rate Your Experience with {provider?.name || 'Your Technician'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Incident #{activeIncident.id} successfully resolved in India
          </p>
        </div>

        {/* 5-Star Rating */}
        <div className="flex items-center justify-center gap-2 py-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(rating)}
              onClick={() => setRating(star)}
              className="p-1 transition-transform hover:scale-125 focus:outline-none"
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  star <= (hoverRating || rating)
                    ? 'fill-amber-400 text-amber-500'
                    : 'text-slate-300 hover:text-slate-400'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Feedback Tag Chips */}
        <div className="space-y-2 text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block text-center">
            What went well?
          </label>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleToggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Technician Tip Selector (INR) */}
        <div className="space-y-2 text-left">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block text-center">
            Add a tip for the technician?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[0, 30, 50, 100].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setTip(amount)}
                className={`py-2 rounded-xl border text-xs font-bold transition-all text-center ${
                  tip === amount
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {amount === 0 ? 'No Tip' : `₹${amount}`}
              </button>
            ))}
          </div>
        </div>

        {/* Review Input */}
        <textarea
          rows={2}
          placeholder="Leave a short comment on response time or service quality..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
        ></textarea>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-display text-xs font-extrabold uppercase tracking-wider transition-all shadow-sm"
        >
          Submit Review & Finish
        </button>
      </div>
    </div>
  );
};

export default RatingReviewModal;
