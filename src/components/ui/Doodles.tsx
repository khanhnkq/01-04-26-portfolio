import { SVGProps } from "react";

export const StarDoodle = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path 
      d="M50 10 C50 10, 58 38, 58 38 C58 38, 88 38, 88 38 C88 38, 63 56, 63 56 C63 56, 73 85, 73 85 C73 85, 50 68, 50 68 C50 68, 27 85, 27 85 C27 85, 37 56, 37 56 C37 56, 12 38, 12 38 C12 38, 42 38, 42 38 Z" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="drop-shadow-sm"
    />
  </svg>
);

export const HeartDoodle = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path 
      d="M50 85 C50 85, 20 60, 20 35 C20 20, 40 15, 50 30 C60 15, 80 20, 80 35 C80 60, 50 85, 50 85 Z" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path d="M15 45 L85 25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M85 25 L75 20 M85 25 L80 32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const SparkleDoodle = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path 
      d="M50 10 Q50 40 20 50 Q50 60 50 90 Q50 60 80 50 Q50 40 50 10 Z" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M20 20 Q20 30 10 35 Q20 40 20 50 Q20 40 30 35 Q20 30 20 20 Z" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const CrownDoodle = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path 
      d="M20 70 L25 30 L40 50 L50 20 L60 50 L75 30 L80 70 Z" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="25" cy="25" r="4" fill="currentColor" />
    <circle cx="50" cy="15" r="4" fill="currentColor" />
    <circle cx="75" cy="25" r="4" fill="currentColor" />
  </svg>
);

export const SwirlDoodle = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path 
      d="M20 50 C20 70, 80 70, 80 50 C80 30, 40 30, 40 50 C40 60, 60 60, 60 50" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round" 
    />
  </svg>
);

export const FlowerDoodle = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="6" />
    <path 
      d="M50 38 C40 20, 60 20, 50 38 M50 62 C40 80, 60 80, 50 62 M38 50 C20 40, 20 60, 38 50 M62 50 C80 40, 80 60, 62 50 M41 41 C25 25, 40 15, 41 41 M59 59 C75 75, 60 85, 59 59 M41 59 C25 75, 15 60, 41 59 M59 41 C75 25, 85 40, 59 41" 
      stroke="currentColor" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);
