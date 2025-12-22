import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: December 15, 2024</p>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h3>1. Terms</h3>
            <p>
              By accessing this Website, accessible from helprx.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
            </p>

            <h3>2. Use License</h3>
            <p>
              Permission is granted to temporarily download one copy of the materials on HelprX&apos;s Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose or for any public display;</li>
              <li>attempt to reverse engineer any software contained on HelprX&apos;s Website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
            </ul>

            <h3>3. Disclaimer</h3>
            <p>
              All the materials on HelprX&apos;s Website are provided &quot;as is&quot;. HelprX makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, HelprX does not make any representations concerning the accuracy or likely results of the use of the materials on its Website or otherwise relating to such materials or on any sites linked to this Website.
            </p>

            <h3>4. Limitations</h3>
            <p>
              HelprX or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on HelprX&apos;s Website, even if HelprX or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage.
            </p>

            <h3>5. Revisions and Errata</h3>
            <p>
              The materials appearing on HelprX&apos;s Website may include technical, typographical, or photographic errors. HelprX will not promise that any of the materials in this Website are accurate, complete, or current. HelprX may change the materials contained on its Website at any time without notice.
            </p>

            <h3>6. Links</h3>
            <p>
              HelprX has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by HelprX of the site. The use of any linked website is at the user&apos;s own risk.
            </p>

            <h3>7. Site Terms of Use Modifications</h3>
            <p>
              HelprX may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
            </p>

            <h3>8. Governing Law</h3>
            <p>
              Any claim related to HelprX&apos;s Website shall be governed by the laws of India without regards to its conflict of law provisions.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
