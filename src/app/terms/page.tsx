import Header from "@/components/Header";

export const metadata = {
  title: "תקנון — MESS",
  description: "תקנון האתר של MESS Production.",
};

export default function TermsPage() {
  const s = {
    fontFamily: "var(--font-display)",
    color: "var(--text-muted)",
  } as const;

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Header />
      <div
        className="px-6 md:px-14 lg:px-20"
        style={{ maxWidth: 720, paddingTop: "8rem", paddingBottom: "6rem" }}
      >
        <p style={{ ...s, fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "2rem" }}>
          תקנון האתר
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1, marginBottom: "3rem" }}>
          Terms of Use
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

          <section>
            <h2 style={{ ...s, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.75rem" }}>
              01 — שימוש באתר
            </h2>
            <p style={{ ...s, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}>
              האתר messmakerz.com מופעל על ידי MESS Production, תל אביב.
              השימוש באתר מהווה הסכמה לתנאי תקנון זה. האתר מיועד לשימוש אישי ולא מסחרי בלבד.
            </p>
          </section>

          <section>
            <h2 style={{ ...s, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.75rem" }}>
              02 — הרשמה לניוזלטר
            </h2>
            <p style={{ ...s, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}>
              ההרשמה לניוזלטר היא וולונטרית לחלוטין. בסימון תיבת ההסכמה ולחיצה על ״Join״
              אתה/את מאשר/ת קבלת תוכן שיווקי ועדכונים מ-MESS Production בהתאם לחוק התקשורת
              (תיקון 40) ולחוקי הספאם הרלוונטיים.
            </p>
          </section>

          <section>
            <h2 style={{ ...s, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.75rem" }}>
              03 — קניין רוחני
            </h2>
            <p style={{ ...s, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}>
              כל התכנים באתר — לרבות טקסטים, תמונות, סרטונים, עיצוב ולוגואים — הם רכושה של
              MESS Production ומוגנים בזכויות יוצרים. אין להעתיק, לשכפל או לעשות בהם שימוש
              מסחרי ללא אישור בכתב.
            </p>
          </section>

          <section>
            <h2 style={{ ...s, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.75rem" }}>
              04 — הגבלת אחריות
            </h2>
            <p style={{ ...s, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}>
              MESS Production אינה אחראית לנזק כלשהו שנגרם כתוצאה מהסתמכות על תוכן האתר
              או מחוסר יכולת לגשת אליו. המידע מסופק כפי שהוא (as is) ללא אחריות מכל סוג.
            </p>
          </section>

          <section>
            <h2 style={{ ...s, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.75rem" }}>
              05 — יצירת קשר
            </h2>
            <p style={{ ...s, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}>
              לכל שאלה בנוגע לתקנון:{" "}
              <a href="mailto:daniel@messmakerz.com" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                daniel@messmakerz.com
              </a>
            </p>
          </section>

          <p style={{ ...s, fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--text-subtle)", marginTop: "2rem", borderTop: "1px solid var(--border)", paddingTop: "2rem" }}>
            עודכן לאחרונה: מאי 2026 · MESS Production, תל אביב
          </p>
        </div>
      </div>
    </main>
  );
}
