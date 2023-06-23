'use client';

import LogoImage from '@/assets/vectors/logo.svg';
import Link from 'next/link';

interface Props {
  hasText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function Logo({ hasText = true, size = 'md' }: Props) {
  const sizeMap = {
    sm: 'w-[24px] h-[24px]',
    md: 'w-[36px] h-[36px]',
    lg: 'w-[48px] h-[48px]',
  };

  return (
    <Link href="/" className="flex items-center gap-1">
      <LogoImage className={`${sizeMap[size]} text-primary1`} />
      {hasText && <p className="text-primary1 font-bold text-lg">Qplay</p>}
    </Link>
  );
}

export default Logo;
