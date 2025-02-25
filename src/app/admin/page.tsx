// src/app/admin/page.tsx

"use client";

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    window.location.replace('/admin/signin');
  }, []);

  return null;
}