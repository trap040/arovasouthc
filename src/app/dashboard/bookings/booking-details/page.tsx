'use client';

import { Suspense } from 'react';
import BookingSection from "../../../../components/BookingSection";

export default function BookingDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingSection />
    </Suspense>
  );
}