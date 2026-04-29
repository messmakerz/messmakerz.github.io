import { notFound } from "next/navigation";
import { EVENTS, getEvent } from "@/lib/events";
import EventGalleryClient from "./EventGalleryClient";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventGalleryPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  return <EventGalleryClient event={event} />;
}
