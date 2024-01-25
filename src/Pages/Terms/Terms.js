import { useEffect } from "react";
import "./Terms.css";

function Terms({ showNavbar, setShowNavbar }) {
  useEffect(() => {
    setShowNavbar(false);
  });
  return (
    !showNavbar && (
      <>
        <div className="terms-container">
          <h1>TERMS OF SERVICE</h1>
          <h3> PLEASE READ CAREFULLY BEFORE USING OUR PLATFORM.</h3>
          <p>
            These terms and conditions comprise a legal agreement (Agreement) between you, (you) and
            PM Networks (trading as PM App) of Lagos, Nigeria (PM App, PM Networks, us, our or we)
            governing your access and use of our Platform. The terms of our privacy policy
            applicable to your use of our Platform are incorporated by reference into this
            Agreement.
          </p>
          <p>By registering or using our Platform, you agree to be bound by this Agreement.</p>
          <p> Agreed terms</p>
          <div className="DEFINITIONS terms-section">
            <h2> 1.DEFINITIONS</h2>
            <div>
              <p>
                1.1 The following definitions in this clause apply in these terms and conditions:{" "}
                <ul className="terms-list">
                  <li>
                    <strong>Account: </strong>The User’s account.
                  </li>
                  <li>
                    <strong> App: </strong>means the PM App mobile application software.
                  </li>
                  <li>
                    {" "}
                    <strong> Client:</strong> means the person or company listing modeling jobs and
                    booking models using the platform.
                  </li>
                  <li>
                    {" "}
                    <strong>Booking Services:</strong> as defined in clause 2.6.
                  </li>
                  <li>
                    <strong>Market Services:</strong> means our mobile applications, websites, tools
                    and all other associated PM App services.
                  </li>
                  <li>
                    <strong>Model:</strong> means the person offering and providing Modeling
                    Services using the App. Model Fee: means the fee paid by the Client to the
                    Model, comprising the daily rate (more details of which are set out in clause
                    8.7) and any additional fee for Usage, as set out in the Modeling Job Listing.
                  </li>
                  <li>
                    <strong> Modeling Contract:</strong> the agreement made between the Model and
                    the Client whereby the Model agrees to provide the Modeling Services in return
                    for the payment of the Model Fee.
                  </li>
                  <li>
                    <strong>Modeling Job:</strong> means the event involving the delivery of
                    Modelling Services at the time, date and location specified by the Client.
                  </li>
                  <li>
                    <strong>Modeling Job Listing:</strong> means the details of any Modeling Job
                    posted on the Platform by the Client.
                  </li>
                  <li>
                    <strong>Modeling Services:</strong> means the Services performed by the Model
                    pursuant to the Modeling Contract.
                  </li>
                  <li>
                    {" "}
                    <strong>Platform:</strong> means the App, the Site and any other Market
                    Services.
                  </li>
                  <li>
                    {" "}
                    <strong>Profile:</strong> means the User’s Profile listed on the Platform.
                  </li>
                  <li>
                    <strong>Services:</strong> means Modeling Services and Booking Services, as the
                    context requires.
                  </li>
                  <li>
                    <strong>Site:</strong>{" "}
                    <a className="terms-link" href="https://www.premiummodelsapp.com/">
                      https://www.premiummodelsapp.com
                    </a>
                  </li>
                  <li>
                    <strong>Usage:</strong> means the entitlement and right of the Client to use the
                    Model’s image and/or voice:{" "}
                    <ul className="terms-list">
                      <li>
                        (a) across media (including but not limited to:{" "}
                        <ul className="terms-list">
                          <li>
                            (i) product packaging, labels, instructions, guides and related
                            material;
                          </li>
                          <li>(ii) point-of-sale and in-store marketing material;</li>
                          <li>
                            (iii) leaflets, flyers, newspaper, magazines, brochures and other print
                            marketing;
                          </li>
                          <li>(iv) website, email, e-brochures and social media; </li>
                          <li>(v) TV, cinema and in-flight commercials;</li>
                          <li>
                            (vi) billboard (print and digital), advertising boards and other public
                            marketing display areas; and
                          </li>
                          <li>(vii) music videos, corporate videos and promotional films);</li>
                        </ul>
                      </li>
                      <li>
                        {" "}
                        (b) over a specific period of time, as specified in the Modelling Job
                        Listing.
                      </li>
                    </ul>
                  </li>
                </ul>
              </p>

              <p>
                1.2 A reference to ‘User’, ‘you’ or ‘your’ shall include the Model or the Client, as
                the context so requires.
              </p>
            </div>
          </div>
          <div className="SCOPE terms-section">
            <h2> 2.SCOPE</h2>
            <p>
              2.1 The App is a mobile and web-based application providing a platform for models to
              create a portfolio and take bookings for Modeling Services. Clients seeking Modeling
              Services for marketing, instructional and other corporate and commercial purposes list
              these modeling jobs on the App and use the Platform to identify and book suitable
              models.
            </p>
            <p>
              2.2 You acknowledge and agree that:{" "}
              <ul className="terms-list">
                <li>(a) we are not a party to the Modeling Contract;</li>
                <li>(b) we are not an agent or partner of any party to the Modeling Contract;</li>
                <li>(c) we do not provide Services or function as a Model or a Client;</li>
                <li>
                  (d) we do not set prices for the Services or determine the Modeling Jobs posted on
                  the Platform by Clients; and
                </li>
                <li>
                  (e) all Services are provided by independent third party contractors who are not
                  employed by us or any of our affiliates.
                </li>
              </ul>
            </p>
            <p>
              2.3 . We will provide a customer services function as part of the Platform. You
              understand and agree that you will be available via email and telephone to promptly
              answer any enquiries from our customer service team relating to your provision or
              purchase of Modeling Services.
            </p>
            <p>
              2.4 We may make reference to you or your business in our marketing and sales materials
              including, without limitation, details of Modelling Jobs listed on our Platform,
              images or assets uploaded as part of a Model’s Portfolio, preferences, reviews or
              Modeling Jobs fulfilled.
            </p>
            <p>
              2.5 Although we use techniques that aim to verify the accuracy of the information
              provided by our Users, such verification is difficult and we cannot and do not
              confirm, and are not responsible for ensuring, the accuracy or truthfulness of User’s
              purported identities or the validity of the information which is provided to us
              through our Platform.
            </p>
            <p>
              2.6 The Booking Services include:{" "}
              <ul className="terms-list">
                <li>(a) listing Modeling Jobs;</li>
                <li>(b) listing Portfolio of Models</li>
                <li>
                  (c) providing a platform whereby Models and Clients can enter into Modeling
                  Contracts;
                </li>
                <li>(d) keeping a record of each Modeling Contract;</li>
                <li>
                  (e) remotely monitoring the performance of the Modeling Contract by the Model;
                </li>
                <li>
                  (f) receiving and dealing with feedback, questions and complaints relating to
                  Modeling Contracts, which may be made by email to premiummodelsapp.com. The Client
                  is encouraged to provide feedback if any of the Modeling Services provided by the
                  Model do not conform to their expectations; and
                </li>
                <li>(g) managing any lost property queries relating to Modeling Contracts.</li>
              </ul>
            </p>
            <p>
              2.7 By using any part of the Platform, you acknowledge and agree that:{" "}
              <ul className="terms-list">
                <li>
                  (a) internet transmissions are never completely private or secure and that any
                  information you send using any part of the Platform may be read or intercepted by
                  others, even if there is a special notice that a particular transmission is
                  encrypted;
                </li>
                <li>
                  (b) we do not warrant that your use of the Platform will be uninterrupted or
                  error-free; or that the Platform will meet your requirements; and{" "}
                </li>
                <li>
                  (c) we are not responsible for any delays, delivery failures, or any other loss or
                  damage resulting from the transfer of data over communications networks and
                  facilities, including the internet, in your use of the Platform.
                </li>
              </ul>
            </p>
            <p>
              2.8 Except as permitted by any local law, you agree:{" "}
              <ul className="terms-list">
                <li>
                  (a) not to copy, rent, lease, sub-license, loan, translate, merge, adapt, vary or
                  modify the Platform; and
                </li>
                <li>
                  (b) to comply with all technology control or export laws and regulations that
                  apply to the technology used or supported by the Platform.
                </li>
              </ul>
            </p>
          </div>
          <div className="YOUR ACCOUNT terms-section">
            <h2>3.YOUR ACCOUNT</h2>
            <p>
              3.1 In order use the Platform, you must register and maintain an account with the App.
              You must be at least 18 years old and must be able to enter into legally binding
              contracts. Below 18 years’ account will be managed by parents/guidance. If you are
              registering an Account for a business entity, you represent that you have the
              authority to legally bind that entity.
            </p>
            <p>
              3.2 When registering an Account, you will be required to submit certain personal
              information, such as your name, address, mobile phone number and age.
            </p>
            <p>
              3.3 You agree to maintain accurate, complete, and up-to-date information in your
              Account. If your registration or payment information changes at any time, you must
              promptly update your details in your Account. You acknowledge and accept that your
              failure to maintain accurate, complete, and up-to-date Account information, including
              having an invalid or expired payment method on file, may result in your inability to
              access and use the Platform. We reserve the right to temporarily or permanently
              suspend your Account if the information contained within it is incomplete or
              inaccurate.
            </p>
            <p>
              3.4 We may mark Model and Client Profiles as ‘verified’ if we deem that the Profile
              information submitted is accurate. We reserve the right to revoke the ‘verified’
              status of your Profile for any reason and without notice to yourself.
            </p>
            <p>
              3.5 You are solely responsible for all activity that occurs under your Account and for
              maintaining the confidentiality of your Account information and password.
            </p>
            <p>
              3.6 Unless otherwise permitted by us in writing, you may only possess one Account.
            </p>
            <p>3.7 Your Account is not transferable to another party.</p>
            <p>
              3.8 For security reasons, we reserve the right to request the following additional
              information from you (this list is non-exhaustive), including original documents, and
              to verify documents with issuing institutions.
              <div>
                <p>Identity</p>
                <p>We reserve the right to request the following proofs of identity:</p>{" "}
                <ul className="terms-list">
                  <ul>
                    (a) a copy of a Government issued ID (passport, driving license or national ID
                    card); and
                  </ul>
                  <ul>
                    (b) a copy of a recent utility bill showing your name and address (which must be
                    less than 3 months old).
                  </ul>
                </ul>
              </div>
            </p>
            <p>
              3.9 By creating an Account, you agree that we may send you informational text (SMS)
              messages and mobile push notifications as part of the normal business operation of
              your use of the Platform. You may opt-out of receiving text (SMS) messages and/or
              mobile push notifications from us at any time by sending an email to
              premiummodelsapp.com indicating that you no longer wish to receive such messages,
              along with the phone number of the mobile device receiving the messages. You
              acknowledge that opting out of receiving text (SMS) messages and/or push notifications
              may impact your use of the Platform.
            </p>
          </div>
          <div className="PROVISION OF SERVICES terms-section">
            <h2> 4. PROVISION OF SERVICES</h2>
            <p>4.1 Modeling Services are delivered by the Model during a Modeling Job.</p>
            <p>
              4.2 When a Client confirms a Model’s offer to provide Modeling Services in respect of
              any Modeling Job listed, the Model is contractually bound to perform the Modeling
              Services within and during the required delivery timeframe set out in the Modeling Job
              Listing. We will notify the Model of the booking confirmation via email or through the
              App.{" "}
            </p>
            <p>
              4.3 When a Client confirms the booking of Modeling Services, the Client is
              contractually bound to pay for the Modeling Services immediately and to provide
              adequate provision for the delivery of the Modeling Services outlined in the Modeling
              Job Listing.
            </p>
            <p>
              4.4 The Modeling Contract and any other contracts are made directly between the Model
              and Client and we have no liability whether in contract or tort for any issues,
              complaints, disputes or otherwise howsoever arising out of a transaction including any
              failure by the Model to supply the Modeling Services to the required standard or in
              accordance with any description in the Modeling Job Listing or otherwise.
            </p>
            <p>
              4.5 The provision of Modeling Services will be considered to be completed immediately
              if any one of the following events occur:
              <ul className="terms-list">
                <li>
                  (a) both the Client and the Model mark a booking as completed within the App;
                </li>
                <li>
                  (b) 24 hours have passed since the end of the booking date specified in the
                  Modeling Job Listing and no disputes have been raised; or
                </li>
                <li>
                  (c) in the event that no booking end date has been specified in the Modeling Job
                  Listing, 7 days have passed since the start of the booking date (as specified in
                  the Modeling Job Listing) and no disputes have been raised.
                </li>
              </ul>
            </p>
            <p>
              4.6 When the Modeling Job is complete, the Client and Model will be asked to provide
              qualitative feedback and a rating on one or more elements of satisfactory from 1-5 for
              the other party. This rating influences each User's ranking on the Platform. Both
              parties should complete the feedback honestly. Users must not falsify feedback,
              manipulate or coerce another User by threatening negative feedback or offer incentives
              in exchange for feedback. Any attempts of this nature should be reported immediately
              to us. Feedback comments that are reported to us as defamatory, abusive or offensive
              will be reviewed and may be removed at our discretion.
            </p>
            <p>
              4.7 Should the Model and Client agree to vary the Modeling Contract beyond those
              outlined in the original Modeling Job Listing, the Model and the Client agree to
              inform us of the variation immediately. The provision of Modeling Services and payment
              obligations for the Modeling Services shall apply to the varied Modeling Contract in
              all material respects.
            </p>
            <p>
              4.8 We may at any time change the way that we deliver and allow you to use the
              Platform including, without limitation, changing the format, altering the payment
              process, altering the job posting and filtering process or changing or removing the
              points or rating system. You agree to accept any new processes in order to maintain
              your Profile on our Platform.
            </p>
            <p>
              4.9 All Users must comply with all applicable consumer protection regulations relating
              to online trading.
            </p>
          </div>
          <div className="OBLIGATIONS OF MODELS terms-section">
            <h2>5. OBLIGATIONS OF MODELS</h2>
            <p>
              5.1 You must only create your Portfolio as a Model if you have the capability to
              provide Modeling Services immediately, in the form that they are represented in your
              Portfolio.
            </p>
            <p>
              5.2 You are required to provide full and accurate information about yourself as a
              Model, including, but not limited to, height and all physical measurements required in
              the Portfolio and preferences sections on the Platform. You must not provide
              misleading information regarding your skills and other attributes that may be integral
              to providing Modeling Services.
            </p>
            <p>
              5.3 We do not warrant or guarantee that the listing of your Portfolio will result in
              offers or bookings or that your Portfolio will appear in all searches in which you
              fulfil the search criteria.
            </p>
            <p>
              5.4 You acknowledge that we have no control over the requirements listed by Clients
              using the Platform.
            </p>
            <p>
              5.5 You must strive to deliver a high standard of work at all times and meet the needs
              of the Client. Specifically, you must ensure that:{" "}
              <ul className="terms-list">
                <li>
                  (a) you arrive at any agreed location in good time to commence the provision of
                  the Modeling Services at the start time specified in the Modeling Contract or as
                  otherwise agreed with the Client;
                </li>
                <li>(b) your Portfolio information and images represents you accurately;</li>
                <li>
                  (c) you reply promptly to any correspondence received from us or the Client,
                  through whatever means;
                </li>
                <li>
                  (d) you carry yourself with professionalism and act with a demeanor appropriate
                  for the context of the Modeling Job;
                </li>
                <li>(e) you meet the specified minimum requirements of the Modeling Job;</li>
                <li>
                  (f) you bring any appropriate props, clothing and hair and makeup provisions to
                  the Modeling Job, as set out in the Modeling Job Listing or otherwise;
                </li>
                <li>
                  (g) any queries or concerns about the Modeling Job are raised at least 24 hours
                  before the start time (as set out in the Modeling Job Listing or otherwise); and
                </li>
                <li>
                  (h) you check your emails and the App regularly to ensure you are up to date with
                  the details and schedule of Modeling Jobs and the latest bookings, listings and
                  updates.
                </li>
              </ul>
            </p>
            <p>
              5.6 You confirm that the Client can use any photograph, video, rushes, sound
              recording, still image or other media obtained from the Modeling Job immediately, in
              line with the agreed Usage.
            </p>
            <p>
              5.7 You are responsible for collecting evidence that you attended and completed the
              Modeling Job to the reasonable satisfaction of the Client. Failure to do this may
              leave you liable to a dispute over the completion of the Modeling Services.
            </p>
            <p>
              5.8 We reserve the right to charge you for any additional costs (including, without
              limitation, additional delivery costs and the costs of finding replacement Models for
              the Client) if you fail to provide the Modeling Services in accordance with the
              Modeling Contract.
            </p>
            <p>
              5.9 Repeated failure to supply Modeling Services on time or at all or to the required
              standard may lead to the suspension and/or termination of your Account.
            </p>
          </div>
          <div className="OBLIGATIONS OF CLIENTS terms-section">
            <h2> 6. OBLIGATIONS OF CLIENTS</h2>
            <p>
              6.1 You acknowledge and accept that:{" "}
              <ul className="terms-list">
                <li>
                  (a) Models will receive notifications of different Modeling Jobs based on their
                  personal information, characteristics, job preferences and your requirements;
                </li>
                <li>
                  (b) the Models available for any given Modeling Job will vary due to the Modeling
                  Job criteria listed and the characteristics and features of individual Models;
                </li>
                <li>
                  (c) your search results may comprise only of Models that fit the criteria you
                  specify. Upon requesting the availability of these Models, only those that are
                  able and willing to fulfil the Modeling Job listed will render their Modeling
                  Services available for booking; and
                </li>
                <li>
                  (d) we do not warrant, represent or guarantee the number of Models fitting the
                  Modeling Job criteria.
                </li>
              </ul>
            </p>
            <p>
              6.2 It is your responsibility to check the correctness of a Model’s Portfolio
              information before the accepting the Model’s offer to provide the Modeling Services.
            </p>
            <p>
              6.3 To improve the quality and presentation of your listings we may at any time change
              the details on your Profile or Modeling Job Listings without notice including, without
              limitation, making spelling and grammar corrections, removing duplicated content,
              updating contact details, providing more appropriate thumbnail images, updating
              location information, changing your categories, expanding your description and adding
              reference to your website.
            </p>
            <p>
              6.4 When listing the Modeling Job, you must identify any features or characteristic or
              criteria that is critical to the commercial objectives or general objectives of the
              Modeling Job. Once a Model has made an offer for a Modeling Job, you must double-check
              this information with the Model, through the App. We will not be responsible for any
              loss incurred as a result of booking a Model that does not conform to the needs of the
              Modeling Services or Modeling Job.
            </p>
            <p>
              6.5 You are responsible for the provision of all reasonable meal and beverage
              requirements of the Model (taking into account dietary requirements) whilst the Model
              is providing Modeling Services.
            </p>
            <p>
              6.6 You must ensure that the Model is treated with respect and professionalism and you
              must take all steps necessary to ensure that the safety, health and wellbeing of the
              Model is protected and maintained at all times whilst the Model is providing Modeling
              Services to you. Such steps shall include, without limitation:{" "}
              <ul className="terms-list">
                <li>
                  (a) ensuring that the venue and working conditions for the provision of Modelling
                  Services are safe and secure and that the Model can provide the Modeling Services
                  in compliance with all health and safety standards, regulations, codes and laws;
                </li>
                <li>(b) allowing the Model to take suitable and regular rest periods;</li>
                <li>
                  (c) ensuring that all people and organizations engaged by you in relation to the
                  Modeling Job are suitably qualified, experienced and professional;{" "}
                </li>
                <li>
                  (d) ensuring that no one imposes upon the Model any action or activity which is
                  either dangerous, degrading, unprofessional or demeaning to the Model;
                </li>
                <li>
                  (e) ensuring that the Modeling Services are delivered and the Model is treated in
                  accordance with The Association of Model Agents’ Code of Practice (as amended from
                  time to time); and
                </li>
                <li>(f) providing the Model with appropriate changing and dressing areas.</li>
              </ul>
            </p>
            <p>
              6.7 In using our Platform you agree that a Modeling Job is complete once satisfactory
              Modeling Services have been provided during the allotted time, specified in the
              Modeling Job Listing.
            </p>
            <p>
              6.8 You shall effect and maintain, throughout the continuance of this Agreement,
              insurance policies which provide appropriate coverage adequate enough to cover all
              liabilities and risks that may arise under this Agreement.
            </p>
          </div>
          <div className="USAGE terms-section">
            <h2> 7. USAGE </h2>

            <p>
              7.1 The permitted Usage of a Model’s image by a Client must be outlined in the
              Modeling Job Listing and will be agreed between the Model and the Client, upon
              confirmation of the Modeling Job, in the Modeling Contract.
            </p>
            <p>
              7.2 The payment for Usage is included in the Model Fee and is subject to the standard
              Booking Fee rate. Once the Modeling Services have been rendered as completed by the
              Model and the Model Fee has been paid to the Model, Client are granted the appropriate
              Usage rights for the Modeling Services based on the Modeling Contract. No Usage is
              permitted until payment is made to the Model in full.
            </p>
            <p>
              7.3 The Client is responsible for ensuring that all photographers and third parties
              present at Modeling Jobs are aware of this clause 7 and the Client shall procure that
              all third parties agree to this clause 7 before the Modeling Job commences.
            </p>
            <p>
              7.4 When a Model is booked for a test or experimental photography the Client is not
              entitled to use, or allow others to use, test and/or experimental photographs or test
              commercials for commercial purposes unless specific arrangements have been agreed to
              in the Modeling Job Listing.
            </p>
            <p>
              7.5 Use of the Model’s image beyond the permitted Usage will be in breach of the
              Modeling Contract and the Booker:
              <ul className="terms-list">
                <li>
                  (a) may be liable to pay additional fees in line with the Usage guidance provided
                  on the Site; and
                </li>
                <li>
                  (b) must contact us directly in order for us to extend the Client’s legal rights
                  and entitlement to use the Model’s image as required.
                </li>
              </ul>
            </p>
            <p>
              7.6 It is the Model’s responsibility to ensure images, graphics, video and/or other
              media containing the Model’s image or intellectual property are being used in line
              with the Usage agreed. The Model must inform us as soon as they become aware of any
              breach or infringement of the agreed Usage.
            </p>
          </div>
          <div className="PAYMENTS, FEES AND OTHER CHARGES terms-section">
            <h2>8. PAYMENTS, FEES AND OTHER CHARGES</h2>
            <p>
              8.1 We process payments from Clients and to Models using the Wallet on the platform
              and Paystack as the payment gateway.
            </p>
            <p>
              8.2 We may issue Users with invoices in electronic format by email and/or through the
              App.
            </p>
            <p>
              8.3 Payments from Client are due and payable immediately upon booking a Model for the
              Modeling Job. The Client shall pay the Model Fee and the Booking Fee using one of the
              accepted payment methods set out in clause 8.1. All payments made to the Model must be
              made through the App and are subject to a Booking Fee.
            </p>
            <p>
              8.4 When a booking is made, the Model Fee will be paid by the Client into a virtual
              wallet account. Notwithstanding clause 8.19, once the Modeling Job is complete in
              accordance with clause 4.5, when a job is done and the Client confirmed through the
              App then the Model will have access to the Fee.
            </p>
            <p>
              8.5 When payment is made to the Model:
              <ul className="terms-list">
                <li>
                  (a) the Client will confirm on the App after making payment, once it has
                  processed; and
                </li>
                <li>(b) the Model will also confirm once the payment to them has been made.</li>
              </ul>
            </p>
            <p>
              8.6 Models can only have access to move the payment from their wallet to bank account
              when Modeling Job has been completed.
            </p>
            <p>
              8.7 The daily rate is on based on an 8-hour day and, unless otherwise stated in the
              Modeling Job Listing, the period is 9am to 5pm with one hour for lunch (Full Day). A
              half-day is a 4-hour period with start and end times specified by the Client in the
              Modeling Job Listing (Half-Day).
            </p>
            <p>
              8.8 Any fees intended for travel expenses must be included in the Model Fee. No
              additional payment for travel expenses will be made to the Model unless unforeseen
              travel expenditure is incurred during the Modeling Job.
            </p>
            <p>
              8.9 We will do all that we reasonably can to ensure that all of the information you
              give us when paying is secure by using an encrypted secure payment mechanism. However,
              in the absence of negligence on our part, we will not be legally responsible to you
              for any loss that you may suffer if a third party gains unauthorized access to any
              information that you give us.
            </p>
            <p>
              8.10 All payments by credit card or debit card need to be authorized by the relevant
              card issuer. We may also need to use extra security steps via:{" "}
              <ul className="terms-list">
                <li>(a) Verified by Visaerified by Visa;</li>
                <li>(b) Mastercard®SecureCode TM.</li>
              </ul>
            </p>
            <p>
              8.11 We use third-party service providers including Paystack to process payments by
              Client and to transfer funds to Models. These third-party payment service providers
              are regulated and authorized to provide payment services in the countries where they
              operate. We may share your personal or transactional information with third-party
              payment service providers when it is necessary to process payments.
            </p>
            <p>
              8.12 If you do not fulfil your contractual obligations as a Model towards a Client
              (by, for example, not delivering Modeling Services at all or within the required
              delivery timeframe or by delivering incorrect, misrepresented or invalid Modeling
              Services), we reserve the right to charge you the following additional fees and other
              charges to cover our costs for resolving the issue, including finding replacement
              Models or issuing a refund to the Client:{" "}
              <ul className="terms-list">
                <li>
                  (a) a replacement fee which consists of the price of a comparable replacement
                  Model and their Modeling services. You accept that in this event the replacement
                  fee may be higher than the original sales price of your Modeling Services; and
                </li>
                <li>(b) a fee for any additional transport costs which may be incurred.</li>
              </ul>
            </p>
            <p>
              8.13 Unless otherwise stated, all fees and other charges:{" "}
              <ul className="terms-list">
                <li>(a) shall be payable in Naira;</li>
                <li>(b) are non-cancellable and non-refundable; and</li>
                <li>(c) are exclusive of value added tax.</li>
              </ul>
            </p>
            <p>
              8.14 All Models are responsible for determining whether VAT is due on your sale, and
              for collecting and remitting such taxes. Any applicable taxes must be included in the
              Model Fee.
            </p>
            <p>
              8.15 Payment (or attempt of) outside of the App is a breach of this Agreement unless
              we give prior express written consent. We reserve the right to temporarily or
              permanently suspend your Account if such payments (or attempts of) are made. Users
              must report attempts or offers to make payment outside of the App to us immediately.
              The Client may be liable for any direct or indirect loss of business and legal fees
              and expenses that we incur in recovering any fees paid outside of the App (Losses) and
              we reserve the right to use any funds held in the escrow account on behalf of the
              Client in order to recover such Losses. We will not mediate any disputes or be liable
              to the User for any loss of business caused as a result of breach of this clause.
            </p>
            <p>
              8.16 Any dispute over payment regarding the Model Fee, overtime or Usage must be
              brought to our attention as soon as you become aware of any discrepancy or dispute. In
              the event of a dispute being raised, payment will be postponed until the dispute is
              resolved.
            </p>
            <p>
              8.17 This Agreement will apply to any Modeling Job paid for using the App even if the
              Modeling Contract has been made outside of the Platform. In addition, it is the
              responsibility of both the Model and the Client to agree in writing the terms of the
              Modeling Contract should it differ from the PM App process set out in this Agreement.
            </p>
            <p>
              8.18 If you require a transaction within the Platform which involves a currency
              conversion, such conversion will be completed at a foreign exchange rate determined by
              an official institution, which is adjusted on a regular base. Exchange rate
              fluctuations are not under our control. A currency conversion fee of 2.5% will apply
              to every currency conversion. When a currency conversion is made by us, you will be
              shown the exchange rate that will be applied to the transaction before you proceed
              with authorizing the payment transaction. By accepting this transaction, you also
              agree to the exchange rate currency conversion terms.
            </p>
          </div>
          <div className="WARRANTIES terms-section">
            <h2>9. WARRANTIES</h2>
            <p>
              9.1 The Client warrants and represents to us that:{" "}
              <ul className="terms-list">
                <li>
                  (a) it has full capacity to enter into this Agreement and perform its obligations
                  under this Agreement;
                </li>
                <li>
                  (b) the Modeling Contract is executed by a duly authorize representative of the
                  Client;
                </li>
                <li>
                  (c) it will take all steps necessary to ensure that the Model is protected and
                  treated in accordance with all applicable laws, good industry practice and section
                  6.6 above;
                </li>
                <li>
                  (d) it has all necessary permits, licenses and consents to enter into and to
                  perform its obligations under this Agreement and such obligations shall be
                  performed in compliance with all applicable laws, enactments, orders, regulations,
                  and other similar instruments; and
                </li>
                <li>
                  (e) it will promptly disclose us by email all necessary information (including,
                  without limitation, the location and length of the Modeling Job and requirements
                  for any foreign travel) and details relating to the provision of the Modeling
                  Service to enable us to ensure that the Model is suitably prepared and able to
                  perform the Modeling Services. This information can be specified in the App when
                  providing a Model Job Listing.
                </li>
              </ul>
            </p>
            <p>
              9.2 The Model warrants and represents to us that:{" "}
              <ul className="terms-list">
                <li>
                  (a) it has full capacity to enter into this Agreement and perform its obligations
                  under this Agreement;
                </li>
                <li>
                  (b) it will take all necessary steps to ensure the anonymity of the Client and the
                  privacy of any personal or sensitive information disclosed during the Modeling Job
                  and respect the intellectual property and copyright ownership of the Client; and
                </li>
                <li>
                  (c) it has all necessary permits, licenses and consents to enter into and to
                  perform its obligations under this Agreement and such obligations shall be
                  performed in compliance with all applicable laws, enactments, orders, regulations,
                  and other similar instruments.
                </li>
              </ul>
            </p>
          </div>
          <div className="CANCELLATIONS, POSTPONEMENT AND OTHER EVENT CHANGES terms-section">
            <h2>10. CANCELLATIONS, POSTPONEMENT AND OTHER EVENT CHANGES</h2>
            <p>
              10.1 Cancellation of booking by the Model If the Model cancels a booking:
              <ul className="terms-list">
                <li>
                  (a) the Model will no longer be eligible to paid for the provision of Modeling
                  Services for that booking; and
                </li>
                <li>
                  (b) the Client will receive a full refund of the Model Fee if a suitable
                  replacement Model cannot be sourced
                  <p>
                    This is without prejudice to any claims or actions the Client may make against
                    the Model, under the Modeling Contract or otherwise, for any losses suffered in
                    connection with a cancellation by the Model.
                  </p>
                </li>
              </ul>
            </p>
            <p>
              10.2 Cancellation of booking by the Client
              <p>
                If the Modeling Job is cancelled by the Client within 24 hours of the Modeling Job
                Start Date, the Model Fee will not be refunded to the Client.
              </p>
              <p>
                If the Modeling Job is cancelled by the Client within 48 hours of the Modelling Job
                Start Date, 50% of the Model Fee will be refunded to the Client.
              </p>
              <p>
                The Client will not be entitled to a refund of the Model Fee if the cancellation is
                made after the Modeling Job Start Date. Cancellation timeframes exclude Saturdays,
                Sundays and bank and public holidays.
              </p>
            </p>
            <p>
              10.3 Postponement
              <p>
                If a Modeling Job is postponed, we will assist the Client and the Model on a
                case-by-case basis to attempt to resolve any issues and to rearrange the Modeling
                Job if possible. We must be notified of any postponement at least 48 hours before
                the Modeling Job Start Date, otherwise clause 10.2 will apply.
              </p>
            </p>
            <p>
              10.4 Other changes
              <p>
                We are not responsible for partial performances, venue or time changes. Partial or
                full refunds of the Model Fee may be applicable.
              </p>
            </p>
            <p>
              10.5 Weather related cancellations
              <p>
                If the Client fails to cancel the Modeling Job in time to prevent the Model’s
                attendance, the Client will not be entitled to a refund of the Model Fee. If the
                Client cancels before the Model has attended for the Modeling Job, the Client will
                not be entitled to a refund and any repayment of the Model Fee shall be in
                accordance with clause 10.2.
              </p>
            </p>
            <p>
              10.6 Impact of cancellations and refunds
              <p>
                Users are strictly discouraged from causing cancellations and refunds. Refunds and
                cancellations will impact Users as follows:
                <ul className="terms-list">
                  <li>
                    (a) where the Model is at fault for the refund (for example, due to no response,
                    poor quality of work or cancellation of the Modeling Job), it will negatively
                    impact their Model status, feedback and points;
                  </li>
                  <li>
                    (b) where the Client is found to be the cause for the refund (for example, an
                    early cancellation due to a change in their business need), it will negatively
                    impact their Client status and rankings; and
                  </li>
                  <li>
                    (c) multiple refunds attributed to a User will lead to temporary and/ or
                    permanent restrictions on their Account or suspension or deletion of their
                    Account (in our absolute discretion).
                  </li>
                </ul>
              </p>
            </p>
          </div>
          <div className="COMMUNICATING WITH US terms-section">
            <h2>11. COMMUNICATING WITH US</h2>
            <p>
              11.1 If you wish to contact us, please email: premiummodelsapp@gmail.com. We will
              respond as soon as possible on Mondays to Fridays between the hours of 9am to 5pm.
            </p>
            <p>
              11.2 If we need to contact you, we will do so via email to your registered email
              address or through the Platform.
            </p>
          </div>
          <div className="CONTENT & INTELLECTUAL PROPERTY RIGHTS terms-section">
            <h2> 12. CONTENT & INTELLECTUAL PROPERTY RIGHTS</h2>
            <p>
              12.1 When providing us with content, you grant us a non-exclusive, worldwide,
              perpetual (or for the duration of any copyright or other rights in such content),
              irrevocable, royalty-free, right to use the content and authorize us to exercise any
              and all copyright, trademark, publicity, database or other rights you have in or to
              the content in any media known now or in the future. Further, to the fullest extent
              permitted under applicable law, you waive your moral rights in the content and promise
              not to assert such rights against our assignees or us. We may offer catalogues of
              stock images, descriptions and product specifications, which are provided by
              third-parties (including Users). You may use catalogue content solely in connection
              with your Account.
            </p>
            <p>
              12.2 We cannot promise that descriptions contained in Profiles will always be accurate
              and up-to-date, and you agree that you will not hold us responsible for inaccuracies
              contained within any Profile. Descriptions may include copyrighted, trademarked or
              other proprietary materials. You agree not to remove any copyright, proprietary or
              identification markings included within the descriptions or create any derivative
              works bases on description content (other than by including them in listings).
            </p>
            <p>
              12.3 We respect intellectual property rights. If you find material on our Platform
              which is defamatory of you or infringes your copyright or other intellectual property
              rights, please notify us immediately. Please ensure that your notification contains
              your name and contact details and also sufficient details to enable us to investigate
              your complaint.
            </p>
            <p>
              12.4 All rights not expressly granted to the User under this Agreement are hereby
              reserved to us and/or the Model as appropriate. In particular, the Client acknowledges
              and agrees that we are the owner or license holder of all commercial rights and
              intellectual property rights relating to the Model and the Platform and the Client
              shall not be entitled to exploit or enter into any commercial or other agreement to
              exploit any rights relating to the Model or the Platform other than the rights
              specifically granted to the Booker under this Agreement.
            </p>
          </div>
          <div className="TERM AND TERMINATION terms-section">
            <h2> 13. TERM AND TERMINATION</h2>
            <p>
              13.1 This Agreement shall commence on the date that you register an Account with us or
              make an order or transact business using the Site, and will continue for an indefinite
              period unless terminated in accordance with these provisions.
            </p>
            <p>
              13.2 Without limiting our rights according to clause 16 we may terminate this
              Agreement at any time by giving at least thirty (30) days’ notice via email to your
              registered email address.
            </p>
            <p>
              13.3 Termination of this Agreement shall not affect the rights or liabilities of any
              party accrued prior to and including the date of termination or expiry and/or any
              terms intended expressly or by implication to survive termination or expiry.
            </p>
            <p>
              13.4 On termination for any reason you must immediately cease your use of the
              Platform.
            </p>
          </div>
          <div className="SITE CHANGES AND AVAILABILITY terms-section">
            <h2> 14. SITE CHANGES AND AVAILABILITY</h2>
            <p>
              14.1 We reserve the right at any time to modify or discontinue, temporarily or
              permanently, any part of the Platform with or without notice for any reason. We
              perform regularly scheduled maintenance and whilst we do our best to avoid customer
              impact, the Platform may be temporarily unavailable during maintenance periods
            </p>
            <p>
              14.2 We reserve the right to restrict the visibility of listings to Models on behalf
              of Bookers that are geographically located within a particular eligible target area.
            </p>
          </div>
          <div className="UNACCEPTABLE ACTIVITIES terms-section">
            <h2>15. UNACCEPTABLE ACTIVITIES</h2>
            <p>
              15.1 When using our Platform, you agree that you will not do any of the following:
              <ul className="terms-list">
                <li>
                  (a) use a Client or Model's personal data for any reason other than the delivery
                  or receipt of Modeling Services;
                </li>
                <li>
                  (b) post any content or material that:
                  <ul className="terms-list">
                    <li>
                      (i) is false, inaccurate, misleading, defamatory, libelous, unlawful, harmful,
                      threatening, obscene, infringing, harassing or racially or ethnically
                      offensive;
                    </li>
                    <li>(ii) facilitates illegal activity;</li>
                    <li>(iii) depicts sexually explicit images;</li>
                    <li>(iv) promotes unlawful violence;</li>
                    <li>
                      (v) is discriminatory based on race, gender, color, religious belief, sexual
                      orientation, disability; or
                    </li>
                    <li>
                      (vi) is otherwise illegal or causes damage or injury to any person or
                      property;
                    </li>
                  </ul>
                </li>
                <li>
                  (c) fail to fulfil your contractual obligations regarding the delivery or purchase
                  of Modelling Services;
                </li>
                <li>(d) use PM Networks without our prior written permission;</li>
                <li>
                  (e) copy, reproduce, reverse engineer, modify, create derivative works from,
                  distribute or publicly display any content (except for your information) or
                  software from our Platform without prior express written permission of us and the
                  appropriate third party, as applicable;
                </li>
                <li>
                  (f) use any robot, scraper or other automated means to access our Platform for any
                  purpose without our express written permission;
                </li>
                <li>
                  (g) take any action that imposes or may impose (to be determined in our sole
                  discretion) an unreasonable or disproportionately large load on our
                  infrastructure;
                </li>
                <li>
                  (h) interfere or attempt to interfere with the proper working of our Platform or
                  any activities conducted on or with our Platform; or
                </li>
                <li>
                  (i) bypass our robot exclusion headers, robots.txt rules or any other measures we
                  may use to prevent or restrict access to our Platform;
                </li>
                <li>
                  (j) use the Platform in any unlawful manner, for any unlawful purpose, or in any
                  manner inconsistent with this Agreement, or act fraudulently or maliciously, for
                  example, by hacking into or inserting malicious code, including viruses, or
                  harmful data, into the Platform;
                </li>
                <li>
                  (k) not infringe our intellectual property rights or those of any third party in
                  relation to your use of the Platform;
                </li>
                <li>
                  (l) not use the Platform in a way that could damage, disable, overburden, impair
                  or compromise our systems or security or interfere with other users; and
                </li>
                <li>
                  (m) not collect or harvest any information or data from the Platform or our
                  systems or attempt to decipher any transmissions to or from the servers running
                  the Platform.
                </li>
              </ul>
            </p>
            <p>
              15.2 You are responsible for everything that is done using your account. You must tell
              us as soon as possible if you believe anyone has access, or has been using your
              account.
            </p>
          </div>
          <div className="OFFENDING AGAINST THE AGREEMENT terms-section">
            <h2>16. OFFENDING AGAINST THE AGREEMENT</h2>
            <p>
              16.1 Without limiting other remedies, we may limit, or temporarily or permanently
              suspend, or terminate our services or your Account, or restrict or prohibit access to,
              and your activities on, our Platform, remove listings, delay or remove hosted content,
              remove any special status associated with an Account, reduce or eliminate any
              discounts, and take technical and legal steps to keep you from using our Platform if:
              <ul className="terms-list">
                <li>(a) we cannot verify or authenticate information you have provided;</li>
                <li>
                  (b) we have good reason to believe that you are creating problems or possible
                  legal liabilities;
                </li>
                <li>
                  (c) we have good reason to believe that you are violating this Agreement, our
                  policies, the law or are infringing the rights of third parties;
                </li>
                <li>
                  (d) we think that such restrictions will improve the security of the Site or
                  reduce our or another user's exposure to financial liabilities;
                </li>
                <li>
                  (e) you fail to make full payment of any fees due by the payment due date or upon
                  request;
                </li>
                <li>(f) you die;</li>
                <li>(g) you become bankrupt; or</li>
                <li>
                  (h) (where the User is a Company) you enter into administration or liquidation.
                </li>
              </ul>
            </p>
            <p>
              16.2 We reserve the right to report any activity that we believe to be illegal and we
              will respond to any verified requests relating to a criminal investigation from local
              and foreign law enforcement or regulatory agencies, other government officials or
              authorized third-parties.
            </p>
          </div>
          <div className="LIABILITY terms-section">
            <h2>17. LIABILITY</h2>
            <p>
              17.1 This clause 17 sets out our entire financial liability (including any liability
              for the acts or omissions of its employees, agents and sub-contractors) to you:{" "}
              <ul className="terms-list">
                <li>(a) arising under or in connection with this Agreement;</li>
                <li>
                  (b) in respect of any use made by you of the Platform or any part of it; and
                </li>
                <li>
                  (c) in respect of any representation, statement or tortious act or omission
                  (including negligence) arising under or in connection with this Agreement.
                </li>
              </ul>
            </p>
            <p>
              17.2 Except as expressly and specifically provided in this Agreement all warranties,
              representations, conditions and all other terms of any kind whatsoever implied by
              statute or common law are, to the fullest extent permitted by applicable law, excluded
              from this Agreement.
            </p>
            <p>
              17.3 Nothing in this agreement shall limit or exclude our liability for:{" "}
              <ul className="terms-list">
                <li>(a) for death or personal injury caused by our negligence;</li>
                <li>(b) for fraud or fraudulent misrepresentation; or</li>
                <li>(c) any other liability that cannot be excluded or limited by English law.</li>
              </ul>
            </p>
            <p>
              17.4 Subject to clause 17.2 and clause 17.3:
              <ul className="terms-list">
                <li>
                  (a) we shall not be liable whether in tort (including for negligence or breach of
                  statutory duty), contract, misrepresentation, restitution or otherwise for any
                  loss of profits, loss of business, depletion of goodwill and/or similar losses or
                  loss or corruption of data or information, or pure economic loss, or for any
                  special, indirect or consequential loss, costs, damages, charges or expenses
                  however arising under this Agreement; and
                </li>
                <li>
                  (b) our total aggregate liability in contract, tort (including negligence or
                  breach of statutory duty), misrepresentation, restitution or otherwise, arising in
                  connection with this Agreement shall be limited to the total fees paid by the User
                  for the Platform during the 3 months immediately preceding the date on which the
                  claim arose.{" "}
                </li>
              </ul>
            </p>
            <p>
              17.5 You accept sole responsibility for the legality of your actions under laws
              applying to you.
            </p>
          </div>
          <div className="DISPUTES & LEGAL DISPUTES terms-section">
            <h2>18. DISPUTES & LEGAL DISPUTES</h2>
            <p>
              18.1 Any cause for complaint must be reported to us by the User as soon as it arises.
            </p>
            <p>
              18.2 We encourage our Users to try and resolve any minor disagreements (i.e. day to
              day disagreements that don’t hold Models, Client or us liable for breach of contract)
              between themselves. Whilst we will use reasonable endeavors to ensure that the Model
              provides a satisfactory and efficient service to the Client, we cannot be held
              responsible for a Model's conduct or behavior whilst delivering the Modeling Services
              and in this regard we shall not be held liable for any costs, expenses or losses
              suffered as a consequence of the behavior or conduct of any Model.
            </p>
            <p>
              18.3 If Users are unable to resolve any disputes, we may provide dispute resolution on
              a case-by-case basis. We will consider reasonable requests to resolve the dispute
              through alternative dispute resolution procedures, such as mediation or arbitration,
              as alternatives to litigation. Any claim, dispute or matter arising under or in
              connection with this Agreement shall be governed and construed in all respects by the
              laws of Nigeria.
            </p>
            <p>
              18.4 Once a Modeling Job is deemed complete in accordance with clause 4.5, no dispute
              may be raised by either party regarding the Modeling Job.
            </p>
            <p>18.5 Details of all disputes must be logged in the App as evidence.</p>
            <p>
              18.6 If a dispute arises between you and us, or a dispute arises that may lead to a
              breach of this Agreement or the Modeling Contract, we strongly encourage you to first
              contact our customer service team directly via www.premiummodelsapp/contact to seek a
              resolution.
            </p>
            <p>
              18.7 In the event of us having to make a resolution decision, we will consider:{" "}
              <ul className="terms-list">
                <li>
                  (a) whether both parties are acting in good faith and have tried to resolve the
                  issue between themselves before contacting us; and
                </li>
                <li>
                  (b) whether the Modeling Job was delivered in accordance with the Agreement,
                  Modelling Contract or Modeling Job Listing, as appropriate.
                </li>
              </ul>
            </p>
            <p>
              18.8 In the event of us having to make a resolution decision on behalf of the parties,
              we will notify both parties within fourteen (14) days of the dispute. Any disputed
              fees will be dealt with in accordance with the decision and this Agreement. Our
              involvement in the dispute will come to an end once our decision has been communicated
              to both parties.
            </p>
            <p>
              18.9 We will not be responsible or involved in a dispute resolution capacity for any
              activity leading to loss, damage or liability of any form between the Model and Client
              outside of the allotted times stated in the Modeling Job Listing.
            </p>
          </div>
          <div className="RELEASE terms-section">
            <h2> 19. RELEASE</h2>
            <p>
              If you have a dispute with one or more Users, you release us (and our affiliates and
              subsidiaries, and our and their respective officers, directors, employees and agents)
              from claims, demands and damages (actual and consequential) of every kind and nature,
              known and unknown, arising out of or in any way connected with such disputes.
            </p>
          </div>
          <div className="INDEMNIFICATION terms-section">
            <h2>20. INDEMNIFICATION</h2>
            <p>
              You agree to indemnify and hold us and (if applicable) our parent, subsidiaries,
              affiliates, and our and their respective officers, directors, attorneys, agents,
              employees, licensors and suppliers (Indemnitees) harmless against any claim or demand
              and all liabilities, costs and expenses (including reasonable legal fees) incurred by
              us and (if applicable) any Indemnitees resulting from or arising out of any breach by
              you of this Agreement, your improper use of our Platform, and/or your violation of any
              law or the rights of a third party.
            </p>
          </div>
          <div className="CONTRACT AND AUTHORITY terms-section">
            <h2>21. CONTRACT AND AUTHORITY</h2>
            <p>
              21.1 All matters relating to the Modelling Services, the Modelling Job, Usage or Model
              Fees must be negotiated and agreed using the App.
            </p>
            <p>
              21.2 The Client shall not attempt to negotiate, nor allow others to negotiate, with
              Models directly, outside of the Platform. If the Booker or any third party acting on
              the Client’s behalf or connected with them obtains the Model's signature on any
              document or the Model's purported verbal or written agreement (including in digital
              form) to anything, such document will not be binding on us or the Model until it is
              agreed by us (such agreement to be determined in our absolute discretion).
            </p>
          </div>
          <div className="EVENTS OUTSIDE OUR CONTROL terms-section">
            <h2>22. EVENTS OUTSIDE OUR CONTROL</h2>
            <p>
              22.1 We will not be liable or responsible for any delay in performing or failure to
              perform any of our obligations under this Agreement which is due to any cause beyond
              out reasonable control and which is unknown to, and cannot reasonably be anticipated
              by us including, without limitation, fire, flood or catastrophe, acts of God,
              insurrection, workforce action, war or riots (Event Outside Our Control) and our
              obligations under this Agreement shall be suspended for so long as the Event Outside
              Our Control continues and to the extent that it is so delayed.
            </p>
          </div>
          <div className="INTERPRETATION OF AGREEMENT terms-section">
            <h2>23. INTERPRETATION OF AGREEMENT</h2>
            <p>
              23.1 This Agreement applies to every offer, quotation, acceptance, purchase order,
              confirmation order, specification and/or contract for the sale and supply of services
              or goods (including services ancillary thereto) by us and supersedes any other terms
              of the User and takes precedence over and overrides and excludes any other terms
              stipulated or incorporated or referred to by the User. The User acknowledges that
              there are no representations, statements or promises made or given by or on behalf of
              us outside of this Agreement which have induced the User to enter into this Agreement
              (which expression shall include any contract of which this Agreement forms part).
            </p>
            <p>
              23.2 If there is any conflict between any of the clauses in this Agreement and the
              Modelling Contract, Modelling Job Listing or other booking confirmation, the terms of
              this Agreement shall prevail without detriment to the remaining unaffected terms of
              the Modelling Contract, Modelling Job Listing or other booking confirmation.
            </p>
            <p>
              23.3 The Modelling Contract, Modelling Job Listing or other booking confirmation form
              part of this Agreement and shall have effect as if set out in full in the body of this
              Agreement.
            </p>
          </div>
          <div className="GENERAL PROVISIONS terms-section">
            <h2>24. GENERAL PROVISIONS</h2>
            <div>
              <h3>24.1 Website cookies</h3>
              <p>
                Like most interactive web sites, our Site uses cookies to enable us to retrieve User
                details for each visit. Cookies are used in some areas of our Site to enable the
                functionality of this area and ease of use for those people visiting. Some of our
                affiliate partners may also use cookies. By using our Site and Platform you accept
                that we and our affiliate partners use cookies.
              </p>
            </div>
            <div>
              <h3> 24.2 Confidentiality</h3>
              <p>
                We are registered under the Data Protection Act 1998 and as such, any information
                concerning the User and their records may be passed to third parties. However, User
                records are regarded as confidential and therefore will not be divulged to any third
                party, other than our manufacturer/supplier(s) and if legally required to do so to
                the appropriate authorities. Users have the right to request sight of, and copies of
                any and all User records we keep, on the proviso that we are given reasonable notice
                of such a request. Users are requested to retain copies of any literature issued in
                relation to the provision of our services. Where appropriate, we shall issue Users
                with appropriate written information, handouts or copies of records as part of an
                agreed contract, for the benefit of both parties. The parties agree to keep, and to
                instruct their agents, employees, advisers and sub-contractors with knowledge hereof
                to keep this Agreement strictly private and confidential and not to disclose any
                details relating to the same, subject to disclosure in the following circumstances;{" "}
                <ul className="terms-list">
                  <li>
                    (a) to enable enforcement of the party’s rights under these terms and
                    conditions; or
                  </li>
                  <li>(b) as required by any applicable law.</li>
                </ul>
              </p>
            </div>
            <div>
              <h3> 24.3 Log files</h3>
              <p>
                We use IP addresses to analyses trends, administer the site, track User’s movements
                and gather broad demographic information for aggregate use. IP addresses are not
                linked to personally identifiable information. Additionally, for systems
                administration, detecting usage patterns and troubleshooting purposes, our web
                servers automatically log standard access information including browser type, access
                times/open mail, URL requested and referral URL. This information is not shared with
                third parties and is used only within MODL Ltd on a need-to-know basis. Any
                individually identifiable information related to this data will never be used in any
                way different to that stated above without your explicit permission.
              </p>
            </div>
            <div>
              <h3>24.4 Links to and from the Site</h3>{" "}
              <p>
                If you create a link to a page of the Site, you do so at your own risk and the
                exclusions and limitations set out above will apply to your use of the Site by
                linking to it.
              </p>
              <p>
                We do not monitor or review the content of other parties’ websites which are linked
                to or from the Site. Opinions expressed or material appearing on such websites are
                not necessarily shared or endorsed by us and we should not be regarded as the
                publisher of such opinions or material. Please be aware that we are not responsible
                for the privacy practices or content of these websites. We encourage our Users to be
                aware when they leave our Site and to read the privacy statements of other website.
                You should evaluate the security and trustworthiness of any other site connected to
                this Site or accessed through this Site yourself, before disclosing any personal
                information. We will not accept any responsibility for any loss or damage in
                whatever manner, howsoever caused, resulting from your disclosure to third parties
                of personal information.
              </p>
            </div>
            <div>
              <h3>24.5 Unsolicited ideas</h3>
              <p>
                We do not accept or consider any unsolicited ideas of any kind including but not
                limited to: new product ideas, new service ideas, business improvements, designs,
                names, images, assets, text.
              </p>
              <p>
                We will own, and may make use of any unsolicited materials provided without
                restriction and for free without the need to acknowledge or compensate you.
              </p>
            </div>
            <div>
              <h3>24.6 Variation</h3>
              <p>
                We may periodically make changes to this Agreement and shall notify you by posting a
                revised version of the agreement on our Site and emailing you at your registered
                email address. The revised agreement will become effective 14 days following such
                notice and your continued use of our Platform will constitute acceptance of the
                revised agreement.
              </p>
            </div>
            <div>
              <h3>24.7 Waiver</h3>
              <p>
                No failure or delay by a party to exercise any right or remedy provided under this
                agreement or by law shall constitute a waiver of that or any other right or remedy,
                nor shall it prevent or restrict the further exercise of that or any other right or
                remedy. No single or partial exercise of such right or remedy shall prevent or
                restrict the further exercise of that or any other right or remedy.
              </p>
            </div>
            <div>
              <h3>24.8 Rights and Remedies</h3>
              <p>
                Except as expressly provided in this agreement, the rights and remedies provided
                under this agreement are in addition to, and not exclusive of, any rights or
                remedies provided by law.
              </p>
            </div>
            <div>
              <h3>24.9 Severance</h3>
              <p>
                If any provision (or part of a provision) of this agreement is found by any court or
                administrative body of competent jurisdiction to be invalid, unenforceable or
                illegal, the other provisions shall remain in force.
              </p>
              <p>
                If any invalid, unenforceable or illegal provision would be valid, enforceable or
                legal if some part of it were deleted, the provision shall apply with whatever
                modification is necessary to give effect to the commercial intention of the parties.
              </p>
            </div>
            <div>
              <h3>24.10 Entire agreement</h3>
              <p>
                This agreement, and any documents referred to in it, constitute the whole agreement
                between the parties and supersede any previous arrangement, understanding or
                agreement between them relating to the subject matter they cover.
              </p>
              <p>
                Each of the parties acknowledges and agrees that in entering into this agreement it
                does not rely on any undertaking, promise, assurance, statement, representation,
                warranty or understanding (whether in writing or not) of any person (whether party
                to this agreement or not) relating to the subject matter of this agreement, other
                than as expressly set out in this agreement.
              </p>
            </div>
            <div>
              <h3>24.11 Assignment</h3>
              <p>
                You shall not, without our prior written consent, assign, transfer, charge,
                sub-contract or deal in any other manner with all or any of its rights or
                obligations under this agreement.
              </p>
              <p>
                We may at any time assign, transfer, charge, sub-contract or deal in any other
                manner with all or any of our rights or obligations under this agreement.
              </p>
              <p>
                Nothing in this Agreement is intended or shall operate to create a partnership
                between the parties, or authorize either party to act as agent for the other, and
                neither party shall have the authority to act in the name of or on behalf of or
                otherwise to bind the other in any way.
              </p>
            </div>
            <div>
              <h3>24.12 Third party rights</h3>
              <p>
                This agreement does not confer any rights on any person or party (other than the
                parties to this agreement and, where applicable, their successors and permitted
                assigns) pursuant to the Contracts (Rights of Third Parties) Act 1999.
              </p>
            </div>
            <div>
              <h3> 24.13 Notices</h3>
              <p>
                Any notice required to be given under this agreement shall be in writing and sent to
                the User’s address as set out in their Account.
              </p>
              <p>
                Such notice may be given by, and will be deemed received:{" "}
                <ul className="terms-list">
                  <li>(a) by first-class post: two business days after posting;</li>
                  <li>(b) by airmail: seven business days after posting;</li>
                  <li>(c) by hand: on delivery;</li>
                  <li>
                    (d) by facsimile: on receipt of a successful transmission report from the
                    correct number; and
                  </li>
                  <li>
                    (e) by e-mail: on receipt of a delivery or read receipt mail from the correct
                    address.
                  </li>
                </ul>
              </p>
            </div>
            <div>
              <h3>24.14 Governing law and jurisdiction</h3>
              <p>
                This agreement and any dispute or claim arising out of or in connection with it or
                its subject matter or formation (including non-contractual disputes or claims) shall
                be governed by and construed in accordance with the law of Nigeria.
              </p>
              <p>
                Each party irrevocably agrees that the courts of Nigeria shall have exclusive
                jurisdiction to settle any dispute or claim arising out of or in connection with
                this agreement or its subject matter or formation (including non-contractual
                disputes or claims).
              </p>
            </div>
            <div className="terms-section">
              <h3>24.15 Use of personal data</h3>
              <p>24.15.1. If you are a Model;</p>
              <p>
                24.15.1.1. You grant us permission to share your personal data with Bookers. This
                includes, but is not limited to, your name, photographs, date of birth, contact
                email address, personal attributes and body dimensions, skills, minimum and maximum
                accepted day rates.
              </p>
              <p>
                24.15.1.2. We provide your personal data to Bookers to enable them to determine if
                your attributes and skills are relevant to their Modelling Job when deciding which
                model to book. We may provide them with your contact details so that once a booking
                is made both parties can contact each other to fulfil the Modelling Job.
              </p>
              <p>
                24.15.1.3. PM APP will not share your bank details with Clients or other Models.
              </p>
              <p>
                24.15.1.4. Our app allows you to specify minimum required day rates of pay, which
                default to standard values if you do not edit them. We use this information to
                automatically reject jobs on your behalf that offer less pay than what is specified.
              </p>
              <p>24.15.2. If you are a Client;</p>
              <p>
                24.15.2.1. You give us permission to share your personal data with Models. This
                includes, but is not limited to, your name, company name, contact details, job
                details, location.
              </p>
              <p>
                24.15.2.2. We provide your personal information to Models so that they have all the
                information they need to evaluate whether you are a Booker that they would like to
                work with and to ensure that they can contact you to fulfil your job.
              </p>
              <p>
                24.15.2.3.PM APP will not share your payment card information with Models or other
                Client.
              </p>
              <p>
                24.15.3. PM APP respects your right to be forgotten, so if you would like us to
                delete your personal information then simply email your request to
                premiummodelsapp@gmail.com along with proof of ownership of the personal information
                that you would like to delete. You may also use this email address to exercise your
                right to be informed, right of access, right to erasure, right to restrict
                processing, right to data portability, right to object, rights related to automated
                decision making including profiling.
              </p>
              <p>
                24.15.4. The ability to contact you is central to the provision of our services and
                in signing up for an account you must agree to allow us to contact you via email,
                phone, SMS, in-app messaging, post and push notifications for as long as you keep an
                active account with PM APP. Should you want to opt out of communications then you
                can do so by emailing premiummodelsapp@gmail.com and exercising your right to be
                forgotten.
              </p>
            </div>
          </div>
        </div>
        <div style={{ background: " rgb(29, 30, 43)" }} className="footer-copyright">
          <small>Copyright &copy; 2023 PM Networks.</small>
        </div>
      </>
    )
  );
}

export default Terms;
