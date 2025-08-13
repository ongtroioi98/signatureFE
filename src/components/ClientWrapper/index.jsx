'use client';
import React from 'react';
//https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
export default function ClientWrapper({ children }) {
  return <>{children}</>;
}
