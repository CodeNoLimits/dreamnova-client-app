import React from 'react';

export const BackIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const MoreIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>
);

export const SendIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);


interface HeaderProps {
  title: string;
  onBack?: () => void;
  showMore?: boolean;
}
export const Header: React.FC<HeaderProps> = ({ title, onBack, showMore }) => (
  <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-lg">
    <div>{onBack && <button onClick={onBack} className="p-2 text-slate-600"><BackIcon /></button>}</div>
    <h1 className="text-lg font-bold text-slate-800">{title}</h1>
    <div>{showMore ? <button className="p-2 text-slate-600"><MoreIcon /></button> : <div className="w-10"></div>}</div>
  </header>
);

interface RadialProgressProps {
  percentage: number;
}
export const RadialProgress: React.FC<RadialProgressProps> = ({ percentage }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getRiskColor = () => {
    if (percentage > 70) return 'text-red-500';
    if (percentage > 40) return 'text-orange-500';
    return 'text-green-500';
  };
  
  const getRiskRingColor = () => {
    if (percentage > 70) return '#ef4444';
    if (percentage > 40) return '#f97316';
    return '#22c55e';
  };

  return (
    <div className="relative h-40 w-40">
      <svg className="h-full w-full" viewBox="0 0 120 120">
        <circle className="text-slate-200" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
        <circle
          stroke={getRiskRingColor()}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          className="transform-gpu -rotate-90 origin-center transition-all duration-1000 ease-out"
        />
      </svg>
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${getRiskColor()}`}>
        <span className="text-4xl font-extrabold">{percentage}%</span>
        <span className="text-sm font-semibold tracking-wider">
            {percentage > 70 ? 'URGENT' : percentage > 40 ? 'ÉLEVÉ' : 'FAIBLE'}
        </span>
      </div>
    </div>
  );
};

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string, icon?: React.ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  name: string;
}

export function SegmentedControl<T extends string>({ options, value, onChange, name }: SegmentedControlProps<T>) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={`cursor-pointer rounded-xl border p-4 text-center transition-all duration-200 ${
            value === option.value
              ? 'border-violet-500 bg-violet-50 ring-2 ring-violet-500'
              : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          {option.icon && <div className="mx-auto mb-2 w-8 h-8 text-slate-600">{option.icon}</div>}
          <span className="font-semibold text-slate-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

export const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const renderContent = () => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return (
          <li key={index} className="ml-5 list-disc text-slate-700">
            {line.substring(2)}
          </li>
        );
      }
      const parts = line.split('**');
      const renderedParts = parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
      );
      return <p key={index} className="mb-2 text-slate-700">{renderedParts}</p>;
    });
  };
  return <div className="prose max-w-none">{renderContent()}</div>;
};

export const Loader: React.FC<{text?: string}> = ({ text = "Analyse en cours..."}) => {
  return (
    <div className="flex justify-center items-center my-4 p-4 rounded-lg bg-slate-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      <p className="ml-4 text-violet-600 font-semibold">{text}</p>
    </div>
  );
};