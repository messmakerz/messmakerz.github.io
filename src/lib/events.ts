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
    slug: "live-from-hell",
    title: "LIVE FROM HELL",
    date: "March 2025",
    tickets: "1,000",
    coverPhoto: "HELL_COVER",
    photos: [
      "DSC00001","DSC00002","DSC00006","DSC00017","DSC00019",
      "DSC00021","DSC00026","DSC00036-Enhanced-NR","DSC00037-Enhanced-NR","DSC00038-Enhanced-NR",
      "DSC00041-Enhanced-NR","DSC00044-Enhanced-NR","DSC00054","DSC00055","DSC00058",
      "DSC00059","DSC00060","DSC00062","DSC00063","DSC00064",
      "DSC00066","DSC00067","DSC00070","DSC00071","DSC00087-Enhanced-NR",
      "DSC00088-Enhanced-NR","DSC00089","DSC00090-Enhanced-NR","DSC00091-Enhanced-NR","DSC00097-Enhanced-NR",
      "DSC00098-Enhanced-NR","DSC00107-Enhanced-NR","DSC00110-Enhanced-NR","DSC00111-Enhanced-NR","DSC00112-Enhanced-NR",
      "DSC00113","DSC00116","DSC00117","DSC00118","DSC00120",
      "DSC00130","DSC00131","DSC00132","DSC00133","DSC00148",
      "DSC00150-Enhanced-NR","DSC00154-Enhanced-NR","DSC00178","DSC00180","DSC00206",
      "DSC00208","DSC00228-Enhanced-NR","DSC00232","DSC00235","DSC00238",
    ],
  },
  {
    slug: "tribe-called-mess",
    title: "A TRIBE CALLED MESS",
    date: "Aug 2025",
    tickets: "800",
    coverPhoto: "TRIBE_COVER",
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
  {
    slug: "mess-jungle-trip",
    title: "MESS JUNGLE TRIP",
    date: "Oct 2025",
    tickets: "1,200",
    coverPhoto: "B97A5720",
    photos: [
      "B97A5705","B97A5706","B97A5708","B97A5709","B97A5712",
      "B97A5713","B97A5714","B97A5715","B97A5716","B97A5717",
      "B97A5718","B97A5719","B97A5720","B97A5721","B97A5722",
      "B97A5724","B97A5725","B97A5726","B97A5728","B97A5729",
      "B97A5730","B97A5731","B97A5732","B97A5733","B97A5734",
      "B97A5736","B97A5738","B97A5741","B97A5742","B97A5743",
      "B97A5744","B97A5745","B97A5746","B97A5747","B97A5749",
      "B97A5750","B97A5752","B97A5753","B97A5754",
    ],
  },
  {
    slug: "mess-gala",
    title: "MESS GALA",
    date: "May 2025",
    tickets: "150",
    coverPhoto: "GALA01",
    photos: ["GALA01","GALA02","GALA03","GALA04","GALA05","GALA06","GALA07","GALA08"],
  },
];

export function getEvent(slug: string): EventData | undefined {
  return EVENTS.find((e) => e.slug === slug);
}
