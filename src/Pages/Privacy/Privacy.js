import { useEffect } from "react";
import "./Privacy.css";

function Privacy({ showNavbar, setShowNavbar }) {
  useEffect(() => {
    setShowNavbar(false);
  });

  return (
    !showNavbar && (
      <>
        <div className="privacy-container">
          <h1>PRIVACY POLICY</h1>
          <p>
            This privacy policy is applicable for website <strong>PREMIUMMODELSAPP.COM</strong> and
            mobile application <strong>PM APP.</strong>
          </p>

          <div>
            <h2>How we handle any personal data you give us</h2>
            <p>
              When you join website <strong>PREMIUMMODELSAPP.COM</strong> and mobile application
              <strong> PM APP</strong> we want you to know exactly what happens with your data, so
              you can have complete confidence in being one of our valued and much loved members.
            </p>
            <p>
              The information that we request from you is for one purpose only, to improve your
              experience and help you get the most from being a member of website
              <strong> PREMIUMMODELSAPP.COM</strong> and mobile application <strong>PM APP</strong>{" "}
              and to use our platform in a business to business way with your peers. To give you
              even more peace of mind, we look after your data in the right way and never share it
              with any 3rd parties.
            </p>
          </div>
          <div>
            <h2>What data do we collect?</h2>
            <p>
              For models this data is collected:
              <ul className="privacy-list">
                <li> Name and/or company name</li>
                <li> Email address</li>
                <li> Location</li>
                <li> Gender</li>
                <li> Password which is encrypted</li>
                <li> Details of your transactions on our site</li>
                <li>
                  Date when you signed up, your last login, uploaded images, followed another user,
                  loved, liked or favorited an image or another user
                </li>
                <li>
                  Ethnicity, nationality, hair and eye color, height, shoe size, bust size, waist
                  size, hips size, dress size
                </li>
                <li> Languages spoken</li>
                <li> Modeling categories and disciplines that suit your look</li>
                <li> Your favorite places to connect with people</li>
                <li> Date when you apply to job, or accepted/declined a booking</li>
                <li> Details of payments made through our site, reviews, comments etc.</li>
                <li>
                  Free text area called "About me" where you can leave any relevant professional
                  information about yourself
                </li>
                <li> Phone number</li>
                <li> Social media links</li>
                <li> Uploaded images</li>
              </ul>
            </p>
            <p>
              For photographers, brands, model agencies, casting directors, advertising agencies,
              production companies, media, showrooms, hair and makeup artists, PR / Events this data
              is collected:
              <ul className="privacy-list">
                <li>Name and/or company name</li>
                <li>Email address</li>
                <li>Location</li>
                <li>Gender</li>
                <li>Website or portfolio link, if you have one</li>
                <li>Password which is encrypted</li>
                <li>Details of your transactions on our site</li>
                <li>
                  Date when you signed up, your last login, uploaded images, followed another user,
                  loved, liked or favorited an image or another user
                </li>
                <li>Visual media industry sector</li>
                <li>
                  Free text area called "About me" where you can leave any relevant professional
                  information about yourself
                </li>
                <li>Phone number</li>
                <li>Social media links</li>
                <li>Uploaded images</li>
              </ul>
            </p>
          </div>
          <div className="privacy-data-share">
            <h2>Which providers do we share your data with?</h2>
            <p>
              Companies we use to connect with to provide services through our website. For example,
              if you sign up we connect with payment companies such as Paystack to handle the online
              payment securely. Click on the individual company names to view their privacy
              policies.
            </p>

            <div>
              <p>
                Analytics - GTM with
                <a
                  className="privacy-link"
                  href="https://www.google.com/analytics/learn/privacy.html">
                  {" "}
                  Google Analytics
                </a>
              </p>
              <div>Cookies and usage data</div>
            </div>
            <div>
              <p>
                Marketing -{" "}
                <a className="privacy-link" href="https://www.facebook.com/about/privacy/">
                  {" "}
                  Facebook
                </a>{" "}
                and Instagram pixels
              </p>
              <div>Cookies and usage data</div>
            </div>
            <div>
              <p>
                Advertising -{" "}
                <a className="privacy-link" href="https://policies.google.com/privacy">
                  Google DFP
                </a>
              </p>
              <div>Cookies and usage data</div>
            </div>
            <div>
              <p>
                Handling payments –{" "}
                <a className="privacy-link" href="https://policies.google.com/privacy">
                  Paystack
                </a>{" "}
              </p>
              <div>Data as specified in the privacy policy of the service</div>
            </div>
            <div>
              <p>
                SMS -{" "}
                <a className="privacy-link" href="https://www.twilio.com/legal/privacy">
                  Twilio
                </a>
              </p>
              <div>Phone number, usage data</div>
            </div>
            <div>
              <p>
                Managing contacts and sending messages -
                <a className="privacy-link" href="https://sendy.co/privacy-policy">
                  {" "}
                  Sendy
                </a>
                ,
                <a className="privacy-link" href="https://aws.amazon.com/privacy/">
                  {" "}
                  SES
                </a>
                ,
                <a className="privacy-link" href="https://sendgrid.com/policies/privacy/">
                  {" "}
                  Sendgrid
                </a>
                ,
                <a className="privacy-link" href="https://mailchimp.com/legal/privacy/">
                  {" "}
                  Mailchimp
                </a>
                ,
                <a className="privacy-link" href="https://www.mailgun.com/privacy-policy">
                  {" "}
                  Mailgun
                </a>
                ,
                <a className="privacy-link" href="https://www.whatsapp.com/legal/#privacy-policy">
                  {" "}
                  Whatsapp
                </a>
              </p>
              <div>Email address, usage data</div>
            </div>
            <div>
              <p>
                Support and live chat -
                <a
                  className="privacy-link"
                  href="https://www.zendesk.com/company/customers-partners/privacy-policy/">
                  Zendesk
                </a>
              </p>
              <div>Email address, cookies, usage data</div>
            </div>
            <p>
              Access to third-party account. These are companies you can decide to use on our
              website to make certain tasks simpler. For example if you decide to sign up to our
              site with Facebook, or if you decide to invite your personal contacts to join our site
              via your own email database.
            </p>
            <p>
              <a className="privacy-link" href="https://www.facebook.com/about/privacy/update">
                Facebook
              </a>{" "}
              - About me, birthday, city, email address, website
            </p>
            <p>
              <a className="privacy-link" href="https://policies.google.com/privacy">
                Google
              </a>{" "}
              and{" "}
              <a
                className="privacy-link"
                href="https://policies.yahoo.com/xa/en/yahoo/privacy/index.htm">
                Yahoo
              </a>
              - Contacts
            </p>
            <div>
              <p>
                SPAM protection -{" "}
                <a className="privacy-link" href="https://akismet.com/tos/">
                  Akismet
                </a>{" "}
                and{" "}
                <a className="privacy-link" href="https://policies.google.com/privacy">
                  Google reCAPTCHA
                </a>
              </p>
              <div>Various types of data as specified in the privacy policy of the service</div>
            </div>
            <div>
              <p>
                Interaction with external social networks and platforms -
                <a className="privacy-link" href="https://www.facebook.com/about/privacy/">
                  {" "}
                  Facebook
                </a>{" "}
                Like button and social widgets,{" "}
                <a className="privacy-link" href="https://policy.pinterest.com/privacy-policy">
                  {" "}
                  Pinterest
                </a>{" "}
                and
                <a className="privacy-link" href="https://policies.google.com/privacy">
                  {" "}
                  Google +1
                </a>
              </p>
              <div>Cookies and usage data</div>
            </div>
            <div>
              <p>
                Content performance and features testing (A/B testing) -
                <a className="privacy-link" href="https://policies.google.com/privacy">
                  {" "}
                  Google optimize
                </a>
              </p>
              <div>Phone number, usage data</div>
            </div>
          </div>
          <div>
            <h2>Which 3rd parties do we share your data with?</h2>
            <p>
              We do will not share your data with any third parties, unless we have your permission
              or are required by law to do so.
            </p>
          </div>
          <div>
            <h2>How long do we keep your data?</h2>
            <p>
              Your data will be kept as long as you are a user of our site and have not requested
              that your account and data to be erased.
            </p>
          </div>
          <div>
            <h2>Where is it stored?</h2>
            <p>All data is stored on our secure European based servers.</p>
          </div>
          <div>
            <h2>What do we do with this information?</h2>
            <p>Analyze user activity to improve our service.</p>
            <p>
              Provide a high quality and ultimately useful user experience throughout our site and
              email communication.
            </p>
            <p>
              We may notify you by email, phone by SMS or Whatsapp, Facebook Messenger with
              important information of relevance to your account. In addition, if another user has
              liked, loved images or followed, or with changes and updates to our site, promotional
              offers, surveys, tips, news etc. Other users such as photographers, brands, model
              agencies, casting directors, advertising agencies, production companies, media,
              showrooms, hair and make-up artists, PR / Events can be contacted if the account is
              not approved, information about the user is missing as well as reminder to post a
              casting can be sent. In addition, user can be contacted by mentioned channels if
              another user has liked, loved images or followed, or with changes and updates to our
              site, promotional offers, surveys, tips, news etc.
            </p>
          </div>
          <div>
            <h2> IP addresses and Cookies</h2>
            <p>IP address is stored temporarily for security and spam prevention.</p>
            <p>
              Website <strong>PREMIUMMODELSAPP.COM</strong> and mobile application
              <strong> PM APP</strong> uses cookies to store visitors’ preferences, record session
              information, record user-specific information on what pages’ users access or visit,
              record past activity at a site in order to provide better service when visitors return
              to our site, customize Web page content based on visitors' browser type or other
              information that the visitor sends.
            </p>
            <p>
              Cookies are text files that are either temporarily stored in the random access memory
              or on the hard drive of your computer. They generally serve for offering you the
              services of website <strong>PREMIUMMODELSAPP.COM</strong> and mobile application
              <strong> PM APP</strong> within your personal settings of each new session, which
              basically means to give you a better and faster experience more in tune with what you
              like to see. Cookies are partly stored permanently on your hard drive. You may prevent
              this by setting your browser accordingly, however you may notice that our website does
              not run as fast and in the same way to what you would expect.
            </p>
          </div>
          <div>
            <h2>Technical security</h2>
            <p>
              We will report any data breaches and security issues to the data protection authority
              within 72 hours of discovery. We will also notify by email any users who are directly
              affected by this breach.
            </p>
          </div>
          <div>
            <h2> How you can control the use and display of your information?</h2>
            <p>
              All data that we gather is used to give you and other users the best possible
              experience on our website.
            </p>
            <p>
              You have the right to edit or erase certain information about you on your account, but
              this may result in our site being less useful for you.
            </p>
            <p>
              You have the right for your account and information about you to be erased from our
              site. You can find this by logging into your account and visiting the “Edit profile”
              and by clicking the button: “Delete account”.
            </p>
            <p>
              If you want to opt in or out of the emails we send you, these can be changed in the
              Edit my profile section of your account. Certain important emails may still be sent to
              you, for example if you've forgotten your password, or if we update our Terms and
              Conditions or Privacy Policy.
            </p>
            <p>
              You can request to see details of any personal information which we hold about you. If
              you would like to see this information, please contact us at:
              privacy@modelmanagement.com and mobile application MODEL NOW. You will need to provide
              proof of your identity and we may charge a fee to provide this information. Requests
              of information will take up to 30 days.
            </p>
          </div>
          <div>
            <h2>Changes to this privacy policy</h2>
            <p>
              We reserve the right to make changes to this Privacy Policy at any time. This page
              will show a notice that changes have been made. If a user objects to the updated
              Privacy Policy, they should request for their account to be erased and personal data
              removed.
            </p>
            <p>
              We hope that this Privacy Policy answers any questions that you may have. If you have
              any further questions, feel free to contact us directly here by email at:
              premiummodelsapp@gmail.com.
            </p>
          </div>
          <div>
            <h2>Contact us</h2>
            <p>PREMIUM MODELS NETWORKS.</p>
            <p>Lagos, Nigeria</p>
            <p>Phone Number: +2347062445649</p>
            <p>Email: premiummodelsapp@gmail.com</p>
          </div>
        </div>
        <div style={{ background: " rgb(29, 30, 43)" }} className="footer-copyright">
          <small>Copyright &copy; 2023 PM Networks.</small>
        </div>
      </>
    )
  );
}
export default Privacy;
