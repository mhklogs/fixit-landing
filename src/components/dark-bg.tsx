'use client';

import { useEffect } from 'react';

export default function DarkBg() {
  useEffect(() => {
    document.documentElement.style.background = '#050507';
    document.body.style.background = '#050507';
  }, []);
  return null;
}