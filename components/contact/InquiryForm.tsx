"use client";
import { useRef, useState } from "react";
import { site } from "@/data/site";
import { services } from "@/data/services";
const budgetRanges = {
  USD: ["250–500", "500–1,000", "1,000–2,000", "2,000–4,000"],
  INR: ["25,000–50,000", "50,000–1,00,000", "1,00,000–2,00,000", "2,00,000–4,00,000"],
  EUR: ["250–500", "500–1,000", "1,000–2,000", "2,000–4,000"],
};
export default function InquiryForm() {
  const [currency,setCurrency]=useState<keyof typeof budgetRanges>("USD");
  const [budgetChoice,setBudgetChoice]=useState("Not sure yet");
  const form = useRef<HTMLFormElement>(null);
  const lock = useRef(false);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lock.current) return;
    const f = new FormData(e.currentTarget);
    setError("");
    setStatus("");
    setDraft("");
    if (f.get("website")) {
      setError("Please leave the website field empty.");
      return;
    }
    const choices = f.getAll("services").map(String);
    if (!choices.length) {
      setError("Choose at least one service so we know where to begin.");
      document.getElementById("service-0")?.focus();
      return;
    }
    if (!String(f.get("name")).trim() || !String(f.get("idea")).trim()) {
      setError("Please add your name and a little about your idea.");
      return;
    }
    const payload = {
      name: String(f.get("name")).trim(),
      email: String(f.get("email")).trim(),
      brand: String(f.get("brand")),
      services: choices,
      idea: String(f.get("idea")).trim(),
      budget: budgetChoice === "Not sure yet" ? "Not sure yet" : `${currency} ${budgetChoice === "Custom budget" ? String(f.get("customBudget") || "Let’s discuss") : budgetChoice}`,
      currency,
      timeline: String(f.get("timeline")),
      source: String(f.get("source")),
    };
    const body = `Hello Speckle Studios,

${payload.idea}

Name: ${payload.name}
Email: ${payload.email}
Brand: ${payload.brand || "Not specified"}
Looking for: ${choices.join(", ")}
Budget: ${payload.budget || "Let’s discuss"}
Timeline: ${payload.timeline || "Let’s discuss"}
Found you through: ${payload.source || "Not specified"}`;
    lock.current = true;
    setBusy(true);
    try {
      if (site.formEndpoint) {
        const response = await fetch(site.formEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            ...payload,
            services: choices.join(", "),
            _honey: String(f.get("website") || ""),
            _subject: "New project enquiry — Speckle Studios",
            _template: "table",
            _replyto: payload.email,
            _url: `${site.url}/contact/`,
          }),
          signal: AbortSignal.timeout(15000),
        });
        const result = await response.json();
        if (!response.ok || ![true, "true"].includes(result.success))
          throw Error("Your enquiry could not be sent. Your details are still here. Please try again or email us using the link below.");
        setStatus("Thank you! Your enquiry has been submitted. We’re looking forward to hearing more about your idea.");
        form.current?.reset();
        setBudgetChoice("Not sure yet");
        setCurrency("USD");
      } else {
        setDraft(body);
        setStatus(
          site.email
            ? "Your email draft is ready below. Open it in your email app to review and send. Nothing has been sent yet."
            : "Your email draft is ready. Add the studio’s confirmed email address before sending. Nothing has been sent.",
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setDraft(body);
    } finally {
      setBusy(false);
      setTimeout(() => {
        lock.current = false;
      }, 1200);
    }
  }
  function download() {
    const eml = `To: ${site.email}
Subject: A little idea for Speckle Studios
Content-Type: text/plain; charset=UTF-8

${draft}`;
    const url = URL.createObjectURL(
      new Blob([eml], { type: "message/rfc822" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "a-little-idea.eml";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <form ref={form} onSubmit={submit} className="inquiry-form">
      <p className="form-note">
        {site.formEndpoint
          ? "Fields marked * help us get back to you."
          : "Email draft mode — this form prepares a message in your email app. " +
            (!site.email
              ? "The studio recipient still needs to be added."
              : "You’ll review it before sending.")}
      </p>
      <div className="field-pair">
        <label>
          Your name *
          <input
            name="name"
            required
            autoComplete="name"
            maxLength={120}
            placeholder="The name we should know"
          />
        </label>
        <label>
          Email address *
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={254}
            placeholder="Somewhere to write back"
          />
        </label>
      </div>
      <label>
        Your brand / business name
        <input
          name="brand"
          autoComplete="organization"
          maxLength={160}
          placeholder="Or a working title. We like those too."
        />
      </label>
      <fieldset className="inquiry-choices" aria-describedby="service-help">
        <legend>What can we help with? *</legend>
        <p id="service-help" className="small">
          Choose all that apply.
        </p>
        <div className="round-options">
          {[...services.map((s) => s.short), "Something Else"].map((s, i) => (
            <label key={s}>
              <input
                type="checkbox"
                id={`service-${i}`}
                name="services"
                value={s}
              />
              <span className="round-choice"><span>{s}</span><span className="choice-check" aria-hidden="true">✓</span></span>
            </label>
          ))}
        </div>
      </fieldset>
      <label>
        Tell us about your idea *
        <textarea
          name="idea"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          placeholder="What are you making, imagining, or figuring out?"
        />
      </label>
      <fieldset className="inquiry-choices budget-section">
        <legend>What’s your budget?</legend>
        <p className="small">Optional. Pick a currency and a range, or tell us your own.</p>
        <div className="currency-options" role="group" aria-label="Budget currency">
          {([['USD','$ USD'],['INR','₹ INR'],['EUR','€ EUR']] as const).map(([value,label])=><label key={value}><input type="radio" name="currency" value={value} checked={currency===value} onChange={()=>{setCurrency(value);setBudgetChoice("Not sure yet");}}/><span>{label}</span></label>)}
        </div>
        <div className="round-options budget-options">
          {[...budgetRanges[currency],"Not sure yet","Custom budget"].map(value=><label key={value}><input type="radio" name="budget" value={value} checked={budgetChoice===value} onChange={()=>setBudgetChoice(value)}/><span className="round-choice"><span>{value}</span><span className="choice-check" aria-hidden="true">✓</span></span></label>)}
        </div>
        {budgetChoice==="Custom budget"&&<label className="custom-budget">Your budget ({currency})<input name="customBudget" type="number" min="1" step="any" required placeholder="Enter an amount"/></label>}
      </fieldset>
      <div className="field-pair">
        <label>
          Ideal project timeline
          {site.timelineOptions.length ? (
            <select name="timeline">
              <option value="">Let’s discuss</option>
              {site.timelineOptions.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          ) : (
            <input
              name="timeline"
              maxLength={120}
              placeholder="A date, a season, no rush…"
            />
          )}
        </label>
      </div>
      <label>
        Where did you find us?
        <input
          name="source"
          maxLength={160}
          placeholder="A friend? A happy internet detour?"
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {status && (
        <p className="form-status" role="status">
          {status}
        </p>
      )}
      <button className="button send-button" type="submit" disabled={busy}>
        {busy
          ? "Sending…"
          : site.formEndpoint
            ? "Send enquiry"
            : "Prepare your little idea"}
        <span aria-hidden="true">↗</span>
      </button>
      {draft && (
        <div className="draft-fallback">
          <a
            className="text-link"
            href={`mailto:${site.email}?subject=${encodeURIComponent("A little idea for Speckle Studios")}&body=${encodeURIComponent(draft)}`}
          >
            Open email draft ↗
          </a>
          <p className="small">No email app? Save your draft to open later.</p>
          <button type="button" className="text-link" onClick={download}>
            Download email draft ↓
          </button>
          <details>
            <summary>Read the prepared message</summary>
            <pre>{draft}</pre>
          </details>
        </div>
      )}
      <p className="small privacy-note">
        {site.formEndpoint
          ? "Your enquiry is securely submitted through FormSubmit to specklestudio7@gmail.com so we can respond."
          : "Your details stay in this browser until you open or download the email draft."}
      </p>
    </form>
  );
}
