import Header from "@/components/Header";

export const metadata = {
  title: "מדיניות פרטיות — MESS",
  description: "מדיניות הפרטיות של MESS Production.",
};

export default function PrivacyPage() {
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
          מדיניות פרטיות
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em", color: "var(--text)", lineHeight: 1, marginBottom: "3rem" }}>
          Privacy Policy
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

          <section>
            <h2 style={{ ...s, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.75rem" }}>
              01 — איזה מידע אנו אוספים
            </h2>
            <p style={{ ...s, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}>
              בעת הרשמה לניוזלטר אנו אוספים את כתובת המייל ומספר הטלפון שמסרת מרצונך החופשי.
              לא נאסף מידע נוסף ללא הסכמתך.
            </p>
          </section>

          <section>
            <h2 style={{ ...s, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.75rem" }}>
              02 — למה אנו משתמשים במידע
            </h2>
            <p style={{ ...s, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}>
              המידע ישמש אך ורק לשליחת עדכונים, ניוזלטר וחומר שיווקי בנוגע לאירועי MESS Production.
              לא נמכור, נעביר או נשתף את פרטיך עם גורמים שלישיים ללא הסכמה מפורשת.
            </p>
          </section>

          <section>
            <h2 style={{ ...s, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.75rem" }}>
              03 — הסרה מהרשימה
            </h2>
            <p style={{ ...s, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}>
              בכל עת תוכל/י להסיר את עצמך מרשימת התפוצה באמצעות הקישור ״הסרה מהרשימה״ המופיע
              בתחתית כל מייל שנשלח אליך, או בפנייה ישירה אלינו בכתובת:{" "}
              <a href="mailto:daniel@messmakerz.com" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                daniel@messmakerz.com
              </a>
            </p>
          </section>

          <section>
            <h2 style={{ ...s, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.75rem" }}>
              04 — אבטחת מידע
            </h2>
            <p style={{ ...s, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}>
              פרטיך מאוחסנים בשירות Resend ומוגנים בהתאם לתקני האבטחה שלהם.
              אנו נוקטים אמצעים סבירים להגנה על המידע מפני גישה בלתי מורשית.
            </p>
          </section>

          <section>
            <h2 style={{ ...s, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text)", marginBottom: "0.75rem" }}>
              05 — יצירת קשר
            </h2>
            <p style={{ ...s, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.8 }}>
              לכל שאלה בנוגע למדיניות הפרטיות:{" "}
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
