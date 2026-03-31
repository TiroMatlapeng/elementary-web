import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Elementary",
  description:
    "Terms and conditions governing use of theelementary.co.za, operated by Elementary Digital & Software Solutions (Pty) Ltd (EDSS).",
};

export default function TermsPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-[720px] px-6">
        <h1 className="font-display text-4xl text-text-primary mb-3">
          Terms &amp; Conditions
        </h1>
        <p className="text-text-muted text-sm mb-12">Last updated: 31 March 2026</p>

        <div className="space-y-10">
          {/* 1. Introduction */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              1. Introduction
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the website
              located at theelementary.co.za (&quot;the Website&quot;), operated by Elementary
              Digital &amp; Software Solutions (Pty) Ltd (&quot;EDSS&quot;, &quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;), a company registered and operating in the Republic of South
              Africa. By accessing or using the Website, you agree to be bound by
              these Terms. If you do not agree, please do not use the Website.
            </p>
          </section>

          {/* 2. Website purpose */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              2. Website Purpose
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              The Website serves as a marketing and informational platform for EDSS
              and its products, including the Dickson handyman marketplace. Its
              primary functions are to provide information about EDSS and its
              services, allow visitors to register interest via the Dickson waitlist,
              and enable prospective partners to submit B2B enquiries. The Website
              does not facilitate the purchase of goods or services directly.
            </p>
          </section>

          {/* 3. Waitlist participation */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              3. Waitlist Participation
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Registering on the Dickson waitlist does not constitute a contract, a
              guarantee of access, a reservation, or any other binding commitment by
              EDSS. We do not guarantee any specific launch date, availability of the
              Dickson service, or that waitlist registrants will be granted access to
              the service. We reserve the right to modify, delay, or discontinue the
              Dickson product or waitlist at any time without notice or liability.
            </p>
          </section>

          {/* 4. Intellectual property */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              4. Intellectual Property
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              All content on the Website, including but not limited to text, graphics,
              logos, icons, images, design elements, and software, is the property of
              EDSS or its content licensors and is protected under the intellectual
              property laws of the Republic of South Africa, including the Copyright
              Act 98 of 1978 and the Trade Marks Act 194 of 1993. You may not
              reproduce, distribute, modify, create derivative works of, or otherwise
              exploit any content from this Website without our prior written
              permission.
            </p>
          </section>

          {/* 5. Disclaimer of warranties */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              5. Disclaimer of Warranties
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              The Website and all content are provided on an &quot;as is&quot; and &quot;as
              available&quot; basis, without warranties of any kind, whether express or
              implied. To the fullest extent permitted by applicable South African
              law, EDSS disclaims all warranties, including implied warranties of
              merchantability, fitness for a particular purpose, non-infringement, and
              accuracy. We do not warrant that the Website will be uninterrupted,
              error-free, secure, or free of viruses or other harmful components.
            </p>
          </section>

          {/* 6. Limitation of liability */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              To the maximum extent permitted by South African law, EDSS, its
              directors, employees, and affiliates shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages
              arising out of or relating to your use of, or inability to use, the
              Website or its content. This includes, without limitation, loss of data,
              loss of profits, or damages resulting from unauthorised access to or
              alteration of your submissions. Our total liability for any claim
              arising from your use of the Website shall not exceed the amount you
              paid to access the Website, which in most cases is nil.
            </p>
          </section>

          {/* 7. Privacy */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              7. Privacy
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Your use of the Website is also governed by our{" "}
              <Link
                href="/privacy"
                className="text-accent hover:text-accent-light underline underline-offset-2 transition-colors"
              >
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference. By using the
              Website, you consent to the collection and use of your information as
              described in the Privacy Policy.
            </p>
          </section>

          {/* 8. Governing law */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              8. Governing Law
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of
              the Republic of South Africa, without regard to its conflict of law
              provisions. Any disputes arising out of or in connection with these
              Terms or your use of the Website shall be subject to the exclusive
              jurisdiction of the courts of the Republic of South Africa.
            </p>
          </section>

          {/* 9. Changes to these terms */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              9. Changes to These Terms
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              We reserve the right to update or modify these Terms at any time. We
              will update the &quot;Last updated&quot; date at the top of this page when we do
              so. Your continued use of the Website after any changes have been posted
              constitutes your acceptance of the revised Terms. We encourage you to
              review this page periodically.
            </p>
          </section>

          {/* 10. Contact */}
          <section>
            <h2 className="font-display text-lg font-bold text-text-primary mb-3">
              10. Contact
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              If you have any questions about these Terms &amp; Conditions, please
              contact us at{" "}
              <a
                href="mailto:legal@theelementary.co.za"
                className="text-accent hover:text-accent-light underline underline-offset-2 transition-colors"
              >
                legal@theelementary.co.za
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
