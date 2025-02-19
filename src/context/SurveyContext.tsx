"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SurveyData {
  language: string;
  referralSource: string;
  languageLevel: string;
  motivation: string;
  dailyGoal: string;
}

interface SurveyContextProps {
  surveyData: SurveyData;
  updateSurveyData: (data: Partial<SurveyData>) => void;
}

const SurveyContext = createContext<SurveyContextProps | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [surveyData, setSurveyData] = useState<SurveyData>({
    language: '',
    referralSource: '',
    languageLevel: '',
    motivation: '',
    dailyGoal: '',
  });

  const updateSurveyData = (data: Partial<SurveyData>) => {
    setSurveyData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <SurveyContext.Provider value={{ surveyData, updateSurveyData }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};
