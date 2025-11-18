"use client";

interface UserConfirmationProps {
  label: string;
  value: string;
  onEdit: () => void;
}

export function UserConfirmation({ label, value, onEdit }: UserConfirmationProps) {
  return (
    <div className="px-4 py-3 bg-white/60 backdrop-blur-sm rounded-lg mx-4 my-2 flex items-center gap-3">
      {/* Edit Icon */}
      <button
        onClick={onEdit}
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-[#4b4ad5]/10 hover:bg-[#4b4ad5]/20 transition-colors"
        aria-label="Edit"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b4ad5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      </button>

      {/* Confirmation Text */}
      <div className="flex-1">
        <p className="text-sm text-[#171725]">
          <span className="font-semibold">{label}:</span> {value}
        </p>
      </div>
    </div>
  );
}
