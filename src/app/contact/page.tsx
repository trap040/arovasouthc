"use client";
import BookingSection from "@/components/BookingSection";
import { Suspense } from 'react';

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingSection />
    </Suspense>
  );
}
