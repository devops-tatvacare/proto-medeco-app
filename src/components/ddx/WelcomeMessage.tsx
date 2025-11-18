"use client";

import Image from 'next/image';

interface WelcomeMessageProps {
  onGetStarted: () => void;
  onBack?: () => void;
}

export function WelcomeMessage({ onGetStarted, onBack }: WelcomeMessageProps) {
  return (
    <div
      className="relative w-full h-full bg-gradient-to-b from-[#200535] to-[#5e0f9b] overflow-y-auto"
      style={{ backgroundPosition: '0% 78.021%' }}
    >
      {/* Purple Gradient Background Image */}
      <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
        <div className="absolute w-full" style={{ top: '-32.23%', height: '157.91%' }}>
          <Image
            src="/assets/703ac4e5d1d1c24fe4d000c5f2489bfb188e9b1b.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Status Bar with Back Button */}
        <div className="h-14 flex items-center justify-between px-4">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Time */}
          <p className="text-white text-[17px] font-semibold">9:41</p>

          {/* Spacer for symmetry */}
          <div className="w-10 h-10"></div>
        </div>

        {/* Welcome Section */}
        <div className="flex flex-col items-center pt-6 pb-4">
          {/* AI Logo */}
          <div className="w-20 h-20 mb-4">
            <Image
              src="/assets/7ad7187d00371975974120ce650f92bc58dd31fb.svg"
              alt="AI Logo"
              width={82}
              height={82}
              className="w-full h-full"
            />
          </div>

          {/* Welcome Text */}
          <h1
            className="text-[32px] font-semibold text-center mb-4 bg-clip-text text-transparent px-4"
            style={{
              backgroundImage: 'linear-gradient(90deg, rgb(158, 173, 255) 0%, rgb(255, 128, 145) 100%)'
            }}
          >
            Welcome to DDx
          </h1>
        </div>

        {/* Card Content */}
        <div className="relative flex-1 px-0">
          <div
            className="bg-[#ede3ff] rounded-tl-[24px] rounded-tr-[24px] shadow-[0px_4px_40px_0px_rgba(141,121,172,0.6)] p-6 h-full overflow-y-auto"
          >
            {/* Decorative Vector top right */}
            <div className="absolute right-0 top-[-29px] w-[108px] h-[107.911px] opacity-80">
              <Image
                src="/assets/2f1e308a8fa6e732af7bf929ca977bda5ee311f4.svg"
                alt=""
                width={108}
                height={108}
              />
            </div>

            {/* Hero Section */}
            <div className="mb-8">
              <h2
                className="text-[28px] font-bold leading-[36px] mb-2 bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, rgb(78, 73, 226) 0%, rgb(124, 45, 239) 31.488%, rgb(182, 9, 255) 70.76%)'
                }}
              >
                Revolutionize
                <br />
                Diagnosis with AI
              </h2>
              <p className="text-[#454551] text-[16px] leading-[24px] mt-4">
                Unlock AI-powered precision to identify differential diagnoses. Enter patient data, let the AI analyze, and gain clear insights to enhance your clinical decisions.
              </p>
            </div>

            {/* Why Trust Our DDx Section */}
            <div className="bg-[#fefdff] rounded-tl-[32px] rounded-tr-[32px] p-6 mb-8 relative overflow-visible min-h-[320px]">
              <h3 className="text-[24px] font-semibold text-[#1f2933] mb-6">
                Why Trust Our DDx?
              </h3>

              <div className="space-y-6 relative z-10 max-w-[190px]">
                {/* Trust Point 1 */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-[rgba(223,205,253,0.4)] to-[rgba(255,255,255,0)] rounded-[24px] px-3 py-2">
                  <div className="w-6 h-6 flex-shrink-0">
                    <Image src="/assets/73f80ab40ccf422ecdab1b1e5af622ddf76f9451.svg" alt="" width={24} height={24} />
                  </div>
                  <p className="text-[14px] text-[#454551] opacity-80">
                    Powered by evidence-based AI algorithms.
                  </p>
                </div>

                {/* Trust Point 2 */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-[rgba(223,205,253,0.4)] to-[rgba(255,255,255,0)] rounded-[24px] px-3 py-2">
                  <div className="w-6 h-6 flex-shrink-0">
                    <Image src="/assets/b73429d62abb742bf8ee805b878276a998a59135.svg" alt="" width={24} height={24} />
                  </div>
                  <p className="text-[14px] text-[#454551] opacity-80">
                    Validated by<br />healthcare experts.
                  </p>
                </div>

                {/* Trust Point 3 */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-[rgba(223,205,253,0.4)] to-[rgba(255,255,255,0)] rounded-[24px] px-3 py-2">
                  <div className="w-6 h-6 flex-shrink-0">
                    <Image src="/assets/425da35ef91d82318e1bf0d2480775ad179f949c.svg" alt="" width={24} height={24} />
                  </div>
                  <p className="text-[14px] text-[#454551] opacity-80">
                    HIPAA & GDPR Compliant
                  </p>
                </div>

                {/* Trust Point 4 */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-[rgba(223,205,253,0.4)] to-[rgba(255,255,255,0)] rounded-[24px] px-3 py-2">
                  <div className="w-6 h-6 flex-shrink-0">
                    <Image src="/assets/977b674c00a3a9ddbb1ba1873bfdfc4a2f7e283d.svg" alt="" width={24} height={24} />
                  </div>
                  <p className="text-[14px] text-[#454551] opacity-80">
                    Backed by<br />Clinical Studies
                  </p>
                </div>
              </div>

              {/* Doctor Image - Positioned at bottom right INSIDE the card */}
              <div className="absolute bottom-0 right-0 w-[160px] h-[280px]">
                <Image
                  src="/assets/d1c6a60fbb2b193f096c2d24c0f540ef2bad7b38.png"
                  alt="Doctor"
                  fill
                  className="object-cover object-bottom scale-x-[-1]"
                />
              </div>
            </div>

            {/* How it works */}
            <div className="mb-8">
              <h3 className="text-[18px] font-semibold text-[#1f2933] mb-6">
                How it works?
              </h3>

              <div className="space-y-10 relative">
                {/* Step 1 */}
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[#ba7de9] rounded-[14.662px] shadow-[0px_3.665px_0px_0px_#30295c] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[23.459px] font-extrabold">1</span>
                  </div>
                  <p className="text-[16px] text-[#213053] opacity-80 pt-2">
                    Provide patient details such as <strong>age</strong> and <strong>gender</strong>.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[#ba7de9] rounded-[14.662px] shadow-[0px_3.665px_0px_0px_#30295c] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[23.459px] font-extrabold">2</span>
                  </div>
                  <p className="text-[16px] text-[#213053] opacity-80 pt-2">
                    Enter <strong>symptoms</strong> (mandatory) and any additional relevant patients details
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[#ba7de9] rounded-[14.662px] shadow-[0px_3.665px_0px_0px_#30295c] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[23.459px] font-extrabold">3</span>
                  </div>
                  <p className="text-[16px] text-[#213053] opacity-80 pt-2">
                    Let the AI generate a comprehensive list of differential diagnoses
                  </p>
                </div>
              </div>
            </div>

            {/* Get Started Button */}
            <button
              onClick={onGetStarted}
              className="w-full py-3.5 px-6 rounded-full text-white font-medium text-base shadow-lg transition-all hover:shadow-xl"
              style={{
                background: 'linear-gradient(to right, #4b4ad5, #a461d8)',
                border: '1px solid white'
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
