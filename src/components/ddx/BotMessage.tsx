"use client";

import Image from 'next/image';

interface BotMessageProps {
  message: string;
  description?: string;
}

export function BotMessage({ message, description }: BotMessageProps) {
  return (
    <div className="flex gap-3 px-4 py-4 items-start">
      {/* AI Logo */}
      <div className="flex-shrink-0 w-8 h-8 bg-[#4b4ad5] rounded-lg flex items-center justify-center p-1">
        <Image
          src="/assets/7ad7187d00371975974120ce650f92bc58dd31fb.svg"
          alt="AI"
          width={24}
          height={24}
          className="w-full h-full"
        />
      </div>

      {/* Message Content */}
      <div className="flex-1">
        <p className="text-[#171725] text-sm leading-relaxed">
          {message}
          {description && (
            <>
              {' '}
              <span className="text-[#454551]">{description}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
