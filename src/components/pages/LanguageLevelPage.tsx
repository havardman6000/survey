import React from 'react';
import Image from 'next/image';
import ContinueButton from '../ContinueButton';
import SurveyLayout from '../SurveyLayout';

const LanguageLevelPage = () => {
  const levels = [
    "I'M NEW TO IT",
    'I KNOW SOME COMMON WORDS',
    'I CAN HAVE BASIC CONVERSATION',
    'I CAN TALK ABOUT VARIOUS TOPICS',
    'I CAN DISCUSS MOST TOPICS IN DETAIL'
  ];

  return (
    <SurveyLayout showBackButton showProgressBar currentStep={3}>
      <div className="flex-1 flex flex-col md:flex-row items-center md:items-start w-full px-4 min-h-0 md:px-20 md:pt-4 h-full">
        {/* Message Container */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-end mb-2 md:mb-0 mt-[-20px] md:mt-0">
          <div className="w-[300px] h-[240px] md:w-[500px] md:h-[350px] relative">
            <Image
              src="/assets/image/onboarding msg_4.png"
              alt="How much do you know about the language you have selected?"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Options Container */}
        <div className="w-full md:w-[55%] flex justify-center md:justify-start md:pl-20">
          <div className="w-full max-w-[335px] md:max-w-[500px] flex flex-col gap-[6px] md:gap-4">
            {levels.map((level) => (
              <button
                key={level}
                className="w-full h-[38px] md:h-[48px] border-2 border-[#00C853] rounded-[5px] text-[#00C853] font-league-spartan text-sm md:text-lg hover:bg-[#00C853] hover:text-white transition-colors px-2"
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button Container */}
      <div className="w-full px-4 md:px-[40px] mt-3 md:mt-auto mb-4 md:mb-8">
        <ContinueButton onClick={() => {}}nextPage="/motivation" />
      </div>
    </SurveyLayout>
  );
};

export default LanguageLevelPage; 