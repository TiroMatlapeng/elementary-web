import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Elementary",
  description:
    "Elementary (EDSS) Privacy Policy — how we collect, use, and protect your personal information in compliance with the Protection of Personal Information Act (POPIA).",
};

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-[720px] px-6">
        <h1 className="font-display text-4xl text-text-primary mb-3">
          Privacy Policy
        </h1>
        <p className="text-text-muted text-sm mb-12">Last updated: 31 March 2026</p>

        <div className="space-y-10">
          {/* 1. Who we are */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              1. Who We Are
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Elementary Digital &amp; Software Solutions (Pty) Ltd
              (&quot;EDSS&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is a South African company
              registered and operating in the Republic of South Africa. We operate
              the website at theelementary.co.za and are the developer behind
              Dickson, a vetted handyman marketplace.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mt-3">
              Our designated Information Officer for the purposes of the Protection
              of Personal Information Act 4 of 2013 (&quot;POPIA&quot;) is{" "}
              <span className="text-text-primary">Edwin Matlapeng</span>. You may
              contact our Information Officer at{" "}
              <a
                href="mailto:privacy@theelementary.co.za"
                className="text-accent hover:text-accent-light underline underline-offset-2 transition-colors"
              >
                privacy@theelementary.co.za
              </a>
              .
            </p>
          </section>

          {/* 2. What we collect */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              2. What Personal Information We Collect
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              We collect personal information in the following contexts:
            </p>
            <ul className="space-y-4">
              <li className="text-text-secondary text-sm leading-relaxed pl-4 border-l border-border">
                <span className="text-text-primary font-medium">Waitlist registration</span> — when
                you join our Dickson waitlist, we collect your full name, mobile
                number, email address, city or area, and your role (homeowner,
                tenant, property manager, or similar).
              </li>
              <li className="text-text-secondary text-sm leading-relaxed pl-4 border-l border-border">
                <span className="text-text-primary font-medium">Partner enquiries</span> — when you
                submit a partnership or B2B enquiry, we collect your full name,
                email address, company name, your role or job title, your industry,
                and the contents of your message.
              </li>
              <li className="text-text-secondary text-sm leading-relaxed pl-4 border-l border-border">
                <span className="text-text-primary font-medium">Technical data</span> — when you
                visit our website, we may automatically collect your IP address,
                browser type and version, the pages you visit, and referring URLs.
                This data is collected through standard web server logs and
                analytics tools.
              </li>
            </ul>
          </section>

          {/* 3. How we use it */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              3. How We Use Your Information
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              We use the personal information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary text-sm leading-relaxed">
              <li>Managing and maintaining our Dickson waitlist.</li>
              <li>
                Communicating with waitlist members via WhatsApp and email about the
                Dickson launch, early access opportunities, and relevant updates.
              </li>
              <li>
                Following up on partner and B2B enquiries submitted through our
                website.
              </li>
              <li>
                Improving our website, understanding how visitors use it, and
                diagnosing technical issues.
              </li>
            </ul>
          </section>

          {/* 4. Legal basis */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              4. Legal Basis for Processing
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              We process your personal information on the basis of your consent, as
              contemplated under POPIA. When you submit a waitlist registration or
              partner enquiry form, you consent to us processing your information for
              the purposes described in this policy.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed mt-3">
              You may withdraw your consent at any time by contacting us at{" "}
              <a
                href="mailto:privacy@theelementary.co.za"
                className="text-accent hover:text-accent-light underline underline-offset-2 transition-colors"
              >
                privacy@theelementary.co.za
              </a>
              . Withdrawal of consent does not affect the lawfulness of any
              processing carried out before the withdrawal.
            </p>
          </section>

          {/* 5. Who we share with */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              5. Who We Share Your Information With
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              We do not sell, rent, or trade your personal information. We may share
              your information only with the following categories of service providers,
              and only to the extent necessary to deliver our services:
            </p>
            <ul className="space-y-4">
              <li className="text-text-secondary text-sm leading-relaxed pl-4 border-l border-border">
                <span className="text-text-primary font-medium">
                  WhatsApp Business API provider
                </span>{" "}
                — we use a third-party provider (such as Twilio or Bird) to send
                WhatsApp communications. Your mobile number is shared with this
                provider solely for message delivery.
              </li>
              <li className="text-text-secondary text-sm leading-relaxed pl-4 border-l border-border">
                <span className="text-text-primary font-medium">
                  Hosting provider
                </span>{" "}
                — our website and associated data are hosted on Vercel. Data stored
                on our platform may reside on Vercel&apos;s infrastructure.
              </li>
            </ul>
          </section>

          {/* 6. Data storage & security */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              6. Data Storage &amp; Security
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              We take reasonable and appropriate technical and organisational measures
              to protect your personal information against loss, damage, unauthorised
              access, or disclosure. While no method of transmission or storage is
              completely secure, we are committed to protecting your information and
              will notify you in the event of a data breach as required by POPIA.
            </p>
          </section>

          {/* 7. Your rights under POPIA */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              7. Your Rights Under POPIA
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              As a data subject under POPIA, you have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary text-sm leading-relaxed">
              <li>
                <span className="text-text-primary">Right of access</span> — to
                request confirmation of whether we hold your personal information and
                to obtain a copy.
              </li>
              <li>
                <span className="text-text-primary">Right to correction</span> — to
                request that inaccurate, incomplete, or outdated information be
                corrected.
              </li>
              <li>
                <span className="text-text-primary">Right to deletion</span> — to
                request that your personal information be deleted where it is no
                longer necessary.
              </li>
              <li>
                <span className="text-text-primary">Right to object</span> — to
                object to the processing of your personal information.
              </li>
              <li>
                <span className="text-text-primary">Right to withdraw consent</span>{" "}
                — to withdraw consent at any time, without affecting the lawfulness
                of prior processing.
              </li>
              <li>
                <span className="text-text-primary">
                  Right to lodge a complaint
                </span>{" "}
                — to lodge a complaint with the Information Regulator of South Africa
                at{" "}
                <a
                  href="https://www.justice.gov.za/inforeg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-light underline underline-offset-2 transition-colors"
                >
                  www.justice.gov.za/inforeg
                </a>
                .
              </li>
            </ul>
            <p className="text-text-secondary text-sm leading-relaxed mt-4">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:privacy@theelementary.co.za"
                className="text-accent hover:text-accent-light underline underline-offset-2 transition-colors"
              >
                privacy@theelementary.co.za
              </a>
              .
            </p>
          </section>

          {/* 8. Data retention */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              8. Data Retention
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              We retain your personal information for as long as it remains relevant
              to the purpose for which it was collected. Waitlist and enquiry records
              are considered inactive after 12 months without engagement or
              correspondence. Inactive records are deleted within 30 days of
              inactivity being confirmed, unless a legal obligation requires us to
              retain them for longer.
            </p>
          </section>

          {/* 9. Changes to this policy */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              9. Changes to This Policy
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. When we make
              material changes, we will notify waitlist members via WhatsApp or email.
              The &quot;Last updated&quot; date at the top of this page reflects the date of
              the most recent revision. We encourage you to review this policy
              periodically.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
