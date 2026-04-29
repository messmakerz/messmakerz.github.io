export interface EventData {
  slug: string;
  title: string;
  date: string;
  tickets: string;
  coverPhoto: string;
  photos: string[];
}

export const EVENTS: EventData[] = [
  {
    slug: "tribe-called-mess",
    title: "A TRIBE CALLED MESS",
    date: "Aug 2025",
    tickets: "800",
    coverPhoto: "B97A5120",
    photos: [
      "B97A5091","B97A5092","B97A5093","B97A5094","B97A5095",
      "B97A5097","B97A5098","B97A5099","B97A5100","B97A5101",
      "B97A5102","B97A5103","B97A5104","B97A5105","B97A5106",
      "B97A5107","B97A5108","B97A5110","B97A5111","B97A5116",
      "B97A5118","B97A5119","B97A5120","B97A5121","B97A5122",
      "B97A5123","B97A5124","B97A5125","B97A5127","B97A5131",
      "B97A5133","B97A5135","B97A5139","B97A5140","B97A5141",
      "B97A5142","B97A5144","B97A5145","B97A5146","B97A5147",
      "B97A5148","B97A5149","B97A5150","B97A5160","B97A5164",
      "B97A5165",
    ],
  },
];

export function getEvent(slug: string): EventData | undefined {
  return EVENTS.find((e) => e.slug === slug);
}
