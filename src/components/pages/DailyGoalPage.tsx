"use client";

import React from 'react';
import Image from 'next/image';
import ContinueButton from '../ContinueButton';
import SurveyLayout from '../SurveyLayout';
import { useSurvey } from '@/context/SurveyContext';

const DailyGoalPage = () => {
  const { surveyData, updateSurveyData } = useSurvey();

  const timeOptions = [
    '5 MIN/DAY',
    '10 MIN/DAY',
    '15 MIN/DAY',
    '20 MIN/DAY',
    '30 MIN/DAY'
  ];

  const handleTimeSelect = (time: string) => {
    updateSurveyData({ dailyGoal: time });
  };

  const handleContinue = async () => {
    if (surveyData.dailyGoal) {
      // Log the survey data being submitted
      console.log('Submitting survey data:', surveyData);

      // Prepare the data to match the expected structure
      const formData = [
        surveyData.language,
        surveyData.referralSource,
        surveyData.languageLevel,
        surveyData.motivation,
        surveyData.dailyGoal
      ];

      try {
        const response = await fetch('/api/submit-survey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Send the formData array
        });

        if (response.ok) {
          console.log('Survey data submitted successfully');
          // Proceed to the next page or show a success message
        } else {
          const errorData = await response.json();
          console.error('Failed to submit survey data:', errorData);
          // Handle error
        }
      } catch (error) {
        console.error('Error submitting survey data:', error);
        // Handle error
      }
    }
  };

  return (
    <SurveyLayout showBackButton showProgressBar currentStep={5}>
      <div className="flex-1 flex flex-col md:flex-row items-center md:items-start w-full px-4 min-h-0 md:px-20 md:pt-4 h-full">
        {/* Message Container */}
        <div className="w-full md:w-[45%] flex justify-center md:justify-end mb-2 md:mb-0 mt-[-20px] md:mt-0">
          <div className="w-[300px] h-[240px] md:w-[500px] md:h-[350px] relative">
            <Image
              src="/assets/image/onboarding msg_6.png"
              alt="What's your daily learning goal?"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Options Container */}
        <div className="w-full md:w-[55%] flex justify-center md:justify-start md:pl-20">
          <div className="w-full max-w-[335px] md:max-w-[450px] flex flex-col gap-[6px] md:gap-3">
            {timeOptions.map((option) => (
              <button
                key={option}
                className={`w-full h-[38px] md:h-[48px] border-2 rounded-[5px] text-sm md:text-lg transition-colors px-2 ${
                  surveyData.dailyGoal === option
                    ? 'bg-[#00C853] text-white border-[#00C853]'
                    : 'border-[#00C853] text-[#00C853] hover:bg-[#00C853] hover:text-white'
                }`}
                onClick={() => handleTimeSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button Container */}
      <div className="w-full px-4 md:px-[40px] mt-3 md:mt-6 mb-4 md:mb-10">
        <ContinueButton onClick={handleContinue} nextPage='/success' disabled={!surveyData.dailyGoal} />
      </div>
    </SurveyLayout>
  );
};

export default DailyGoalPage;
