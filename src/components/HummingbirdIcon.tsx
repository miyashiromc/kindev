import { SVGProps } from 'react';

export default function HummingbirdIcon(props: SVGProps<SVGSVGElement> & { size?: number | string }) {
  const { size = 24, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {/* Pico / Beak */}
      <path d="M22 4l-6.5 3.5" />
      {/* Cabeza y Cuerpo / Head & Body */}
      <path d="M15.5 7.5c-2.5 0-4 1.5-4 4 0 2.5-1.5 4.5-3.5 6L14 21l4-4.5c1.5-2 3-5 3-7 0-1-1-2-5.5-2z" />
      {/* Ala Superior / Upper Wing */}
      <path d="M12.5 10c0 0-3-7-7-8-1 1-1.5 3-.5 5 1.5 3 7 5 7 5" />
      {/* Ala Inferior / Lower Wing */}
      <path d="M11 12c0 0-5-5-8-5-.5 1-1 3 0 4.5 1.5 2.5 6.5 3.5 6.5 3.5" />
      {/* Cola / Tail */}
      <path d="M8 17.5L2 21l6.5-1.5" />
    </svg>
  );
}
