import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: December 15, 2024</p>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              At HelprX, accessible from helprx.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by HelprX and how we use it.
            </p>

            <h3>Information We Collect</h3>
            <p>
              We collect information you provide directly to us, such as when you create an account, request a service, or communicate with us. This may include:
            </p>
            <ul>
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Location data to match you with local professionals</li>
              <li>Payment information processed securely by our third-party payment processors</li>
            </ul>

            <h3>How We Use Your Information</h3>
            <p>We use the information we collect in various ways, including to:</p>
            <ul>
              <li>Provide, operate, and maintain our webste</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h3>Log Files</h3>
            <p>
              HelprX follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
            </p>

            <h3>Cookies and Web Beacons</h3>
            <p>
              Like any other website, HelprX uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
            </p>

            <h3>Third Party Privacy Policies</h3>
            <p>
              HelprX&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
