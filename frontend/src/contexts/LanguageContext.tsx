import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation strings
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    donate: 'Donate',
    runningLine: 'Our mission is wide, but our immediate priority vision is Educational upliftment of marginalized & Feeding the child, old age segment & underprivileged. Support Diya Charitable Trust through your donations or volunteering.',
    // Hero
    heroWelcome: 'Welcome to Diya Charitable Trust (TN)',
    heroMotto: '-Humanity First-',
    heroTitle: 'Illuminating Lives Through Service',
    heroSubtitle: 'Empowering Communities, Building Hope',
    heroCta: 'Join Our Mission',
    // Mission
    missionTitle: 'Our Mission',
    missionDescription: 'At Diya Charitable Trust, we are a newly established NGO dedicated to serving society through comprehensive social welfare programs. Our mission is to illuminate lives and bring hope to underserved communities through education, healthcare, women\'s empowerment, and environmental sustainability. Like a diya (lamp) that dispels darkness, we strive to light up the path towards a better tomorrow for all.',
    // Contact
    contactTitle: 'Get in Touch',
    contactDescription: 'Join us in our mission to serve society. Whether you want to volunteer, donate, or partner with us, we would love to hear from you. Together, we can make a difference in the lives of those who need it most.',
    // Footer
    footerCopyright: '© 2035 by Diya Charitable Trust.',
    footerPoweredBy: 'Powered and secured by Wix',
    privacyPolicy: 'Privacy Policy',
    accessibilityStatement: 'Accessibility Statement',
    accessibilityStatementDesc: 'Diya Charitable Trust is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA standards. If you encounter any accessibility barriers on our website, please contact us at dctnow.ngo@gmail.com and we will work to address the issue.',
    cancellationRefundsPolicy: 'Cancellation & Refunds Policy',
    legalDisclaimerCompliance: 'Legal Disclaimer & Compliance',
    close: 'Close',
    // Privacy Policy
    privacyIntro: 'Diya Charitable Trust is committed to protecting the privacy and personal information of visitors, donors, volunteers, and beneficiaries of this website.',
    privacyInfoWeCollect: 'Information We Collect',
    privacyInfoWeCollectDesc: 'We may collect personal information such as name, email address, phone number, postal address, PAN details (for donation receipts), and payment-related information when you:\n\n• Make a donation\n• Register as a volunteer\n• Contact us through forms or email\n• Subscribe to updates or newsletters\n\nPayment information is processed through secure third-party payment gateways, and we do not store card or banking details on our servers.',
    privacyUseOfInfo: 'Use of Information',
    privacyUseOfInfoDesc: 'The information collected is used solely to:\n\n• Process donations and issue receipts\n• Communicate regarding programs, acknowledgements, and updates\n• Maintain statutory records as required by Indian law\n• Improve our services and outreach activities\n\nWe do not sell, rent, or trade personal information to any third party.',
    privacyDisclosure: 'Disclosure of Information',
    privacyDisclosureDesc: 'Personal information may be shared only:\n\n• With authorized service providers (payment gateways, auditors, IT services)\n• When required by law or government authorities\n\nAll such disclosures are made strictly on a need-to-know basis.',
    privacyDataSecurity: 'Data Security',
    privacyDataSecurityDesc: 'We take reasonable administrative and technical measures to safeguard personal data against unauthorized access, misuse, or disclosure.',
    privacyCookies: 'Cookies',
    privacyCookiesDesc: 'This website may use cookies to enhance user experience and analyze website traffic. Users may choose to disable cookies through their browser settings.',
    privacyThirdPartyLinks: 'Third-Party Links',
    privacyThirdPartyLinksDesc: 'Our website may contain links to external websites. We are not responsible for the privacy practices or content of such third-party sites.',
    privacyConsent: 'Consent',
    privacyConsentDesc: 'By using this website or submitting personal information, you consent to the collection and use of information in accordance with this Privacy Policy.',
    privacyUpdates: 'Updates to This Policy',
    privacyUpdatesDesc: 'This Privacy Policy may be updated from time to time. Any changes will be posted on this page.',
    privacyContact: 'Contact Information',
    privacyContactDesc: 'For any privacy-related concerns or requests, please contact us at:\nEmail: dctnow.ngo@gmail.com',
    // Cancellation & Refunds Policy
    cancellationPolicyDesc1: 'All donations, contributions, sponsorships, and payments made to Diya Charitable Trust are voluntary and non-refundable.',
    cancellationPolicyDesc2: 'Once a donation is processed, it cannot be cancelled, reversed, or refunded, as the funds are immediately allocated toward our charitable programs and welfare activities.',
    cancellationPolicyDesc3: 'In case of duplicate transactions, technical errors, or incorrect amounts debited, donors may write to us within 7 days of the transaction with valid proof. Genuine cases will be reviewed, and refunds—if approved - will be processed within a reasonable time.',
    cancellationPolicyDesc4: 'The Trust reserves the right to decline any refund request that does not meet the above conditions.',
    cancellationPolicyDesc5: 'By making a donation on this website, the donor agrees to this policy.\n\nFor any concerns, please contact: dctnow.ngo@gmail.com',
    // Legal Disclaimer & Compliance
    legalDisclaimerDesc1: 'Diya Charitable Trust is a charitable trust registered under the Indian Trusts Act, 1882. The Trust operates on a not-for-profit basis and is committed to social welfare activities including education, nutrition, healthcare, and community development.',
    legalDisclaimerDesc2: 'All donations received are utilized solely for the objectives of the Trust. No part of the income or property of the Trust is distributed to trustees, members, or any private individual, except as reasonable compensation for services rendered in furtherance of its charitable objectives.',
    legalDisclaimerDesc3: 'Donations are voluntary and non-refundable. Issuance of donation receipts and tax benefits, if applicable, shall be subject to prevailing laws.\nTax exemption under Section 80G of the Income Tax Act, 1961 is available. Donors are advised to consult their tax advisors for confirmation of eligibility.',
    legalDisclaimerDesc4: 'At this moment until FCRA Registration Process Completion, Trust does not accept foreign contributions unless expressly permitted under the Foreign Contribution (Regulation) Act, 2010.',
    legalDisclaimerDesc5: 'All content published on this website—including text, images, logos, and materials—is the intellectual property of Diya Charitable Trust, unless otherwise stated. Unauthorized use, reproduction, or distribution is prohibited.',
    legalDisclaimerDesc6: 'While every effort is made to ensure accuracy, the Trust shall not be held liable for any errors, omissions, or outcomes arising from the use of information on this website.',
    legalDisclaimerDesc7: 'By accessing or using this website, you agree to be bound by these terms and conditions.',
    // Mission additional
    missionQuestion1: 'Have you ever felt the sting of hunger born out of extreme poverty - Even sudden urban poverty due to misfortune so deep that you couldn\'t share your struggles with anyone because of family dignity? Have you faced the stress of losing a job, along with the emotional turmoil it brings to you and your family? Have you experienced loneliness or depression from being left behind in the race for success or from the challenges that come with age? Or the pain of missing someone, something, or the helplessness of being unable to meet the needs of your loved ones?',
    missionComfort: 'We are here to be a comforting presence - A healing hand to support you, uplift you, and help you move forward.',
    missionInvitation: 'If you, the reader, feel blessed by God, live in comfort, and feel protected, we invite you to spare your time to join us as a Volunteer (OR) contribute by Donating even a small part of your abundance. Remember, what goes around comes around in multiples!',
    missionAnonymous: 'Our every outreach would be anonymous. None outside would know except professional volunteers! Reach out to us through whatsapp on 9342767239, you may not get instant replies but for sure we will reach out to you !',
    missionActions: 'It doesn\'t matter who we are ! Let our actions speak !!',
    volunteer: 'Volunteer',
    ourCompliance: 'OUR COMPLIANCE',
    // Donation
    needSupport: 'NEED SUPPORT - DONATE',
    forCorpusFund: '(For Corpus Fund)',
    taxBenefit: 'Get Tax Benefit (Under 80G)',
    taxBenefitDesc: 'Donations are eligible for Section 80G exemption. Just share your PAN on our',
    taxBenefitDescAfter: 'after donating.',
    whatsapp: 'WhatsApp',
    lifeIsEcho: 'LIFE IS AN ECHO',
    echo1: 'What you send out comes back. What you sow you reap.',
    echo2: 'What you give you get. What you see in others exists in you.',
    donorInfo: 'Donor Information & Contribution',
    donorName: 'Donor Name *',
    phoneNumber: 'Phone Number *',
    emailAddress: 'Email Address *',
    selectAmount: 'Select Donation Amount (INR)',
    otherAmount: 'Other Amount',
    enterCustomAmount: 'Enter custom amount',
    donationType: 'Donation Type',
    oneTimeDonation: 'One-Time Donation',
    monthlyDonation: 'Monthly Donation',
    monthlyDonationNote: 'Your donation will be automatically deducted every month from the date of registration.',
    upiIdForAutoDebit: 'UPI ID for Auto-Debit',
    upiAutoDebitNote: 'Enter your UPI ID (e.g., yourname@paytm, yourname@ybl) to enable automatic monthly donations. Similar to JioStar subscription, your payment will be debited automatically each month.',
    proceedPayment: 'Proceed to Payment',
    directPayment: 'Direct Payment Details',
    scanPay: 'Scan & Pay (UPI)',
    upiQr: 'UPI QR',
    upiPlaceholder: '[Placeholder for Trust\'s UPI QR Code Image]',
    upiId: 'UPI ID',
    copy: 'Copy',
    copied: 'Copied!',
    bankTransfer: 'Bank Transfer Details',
    accountName: 'Account Name',
    bankName: 'Bank Name',
    accountNumber: 'Account Number',
    ifscCode: 'IFSC Code',
    transactionNote: '*Please share transaction details via email/WhatsApp for 80G receipt.*',
    corporateSponsors: 'OUR CORPORATE & GOVERNMENT SPONSORS',
    underCSR: 'UNDER CSR INITIATIVES',
    corporatePartner: 'Corporate Partner',
    anticipatingCSR: 'Anticipating Your CSR Sponsorship here.',
    metricsImpact: 'METRICS & IMPACT AREAS',
    educationYouth: 'Education & Youth',
    elderlyCare: 'Elderly Care',
    womenFamilies: 'Women & Families',
    emergencyRelief: 'Emergency Relief',
    willBeShared: '-- Will be Shared with program sponsors --',
    // Property Donation
    anAppeal: 'An Appeal !',
    propertyDonationPara1: 'As a charitable organisation, our work is sustained solely through donations and sponsorships. To establish clusters of education and feeding centres, access to suitable space is essential.',
    propertyDonationPara2: 'If you are philanthropically inclined and your circumstances permit, we invite you to donate land or property to the Trust and create a lasting legacy. The property will be dedicated exclusively to the common good, and your contribution will be honoured for generations to come.',
    propertyDonationNote: 'Kindly note that the property must be non-ancestral and free from encumbrances.',
    propertyDonationContact: 'Please message us to initiate the legal process.',
    // Community Feedback
    communityFeedback: 'Community Feedback',
    // Process
    ourProcess: 'Our Process',
    joinUs: 'Join Us',
    // Impact Stats
    ourImpact: 'Our Impact',
    impactDescription: 'Since our inception, we have been making a meaningful difference in the lives of countless individuals and communities.',
    childrenEducated: 'Children Educated',
    childrenEducatedDesc: 'Providing quality education to underprivileged children',
    healthcareCamps: 'Healthcare Camps',
    healthcareCampsDesc: 'Organizing medical camps in rural areas',
    womenEmpowered: 'Women Empowered',
    womenEmpoweredDesc: 'Training women in vocational skills',
    villagesReached: 'Villages Reached',
    villagesReachedDesc: 'Extending our services to remote communities',
    joinMakingDifference: 'Join Us in Making a Difference',
    joinMakingDifferenceDesc: 'Every contribution, no matter how small, helps us reach more people and create lasting change in communities.',
    donateNow: 'Donate Now',
    // Annathanam
    annathanam: 'Annathanam',
    annathanamQuote: 'Annadhanam is not charity - it\'s service.',
    annathanamDesc1: 'You don\'t give food to someone; you serve food to God through them.',
    annathanamDesc2: 'In many traditions, it\'s said:',
    annathanamQuote2: 'The one who eats is God in disguise.',
    annathanamDesc3: 'You need to experience extreme hunger due to abject poverty to realise Annadhan ! Well apart from abject poverty, many hesitate to seek help due to pride and self-respect - such as displaced students, children of daily labourers, labourers themselves, orphaned nomads, or even those who earn a small income but still struggle to make ends meet.',
    annathanamDesc4: 'If our Annadhan can ease their burden and help them move up the economic ladder, then why not? We serve food beyond caste creed gender or religion to anyone who walks in without pride !',
    lunchMassFeeding: 'Lunch (Mass Feeding Per Day)',
    // Primary Activities
    primaryActivitiesTitle: 'Our Primary Activities & Impact Areas',
    buddingMinds: 'Budding Minds',
    buddingMindsDesc: 'Bridging school dropout gaps, skill training, and psychological counseling for underprivileged youth.',
    youthLeap: 'Youth Leap',
    youthLeapDesc: 'Skill training, psychological counseling, and placement support specifically designed for youth empowerment.',
    vulnerableWomenFamilies: 'Vulnerable Women & Families',
    vulnerableWomenFamiliesDesc: 'Skill training, job placement, and self-help group formation focused on economic stability for women.',
    oldAgeCare: 'Old Age Care',
    oldAgeCareDesc: 'Foster Child-Grandparent Program, Palliative care, counseling, and accessible healthcare services for the elderly community.',
    supportSustainability: 'Environment & Sustainability',
    supportSustainabilityDesc: 'Awareness campaigns and sustainability efforts for long-term community resilience.',
    explore: 'Explore',
    // Volunteer Form
    volunteerSignUp: 'Volunteer Sign Up Form',
    personalInformation: 'Personal Information',
    firstName: 'First Name *',
    gender: 'Gender',
    selectGender: 'Select gender',
    male: 'Male',
    female: 'Female',
    nonBinary: 'Non-Binary',
    preferNotToSay: 'Prefer Not To Say',
    enterFirstName: 'Enter your first name',
    volunteerPreferences: 'Volunteer Preferences',
    eventSetup: 'Event Setup',
    registrationDesk: 'Registration Desk',
    hospitalityGuestServices: 'Hospitality/Guest Services',
    workshopFacilitation: 'Workshop Facilitation',
    marketingPromotion: 'Marketing/Promotion',
    fundraising: 'Fundraising',
    generalSupport: 'General Support',
    teaching: 'Teaching',
    availability: 'Availability',
    morning: 'Morning (8am-12pm)',
    afternoon: 'Afternoon (12pm-5pm)',
    evening: 'Evening (5pm-9pm)',
    weekdays: 'Weekdays',
    weekends: 'Weekends',
    flexibleSchedule: 'Flexible Schedule',
    additionalComments: 'Additional Comments',
    tellUsWhy: 'Tell us why you want to volunteer',
    enterAdditionalNotes: 'Enter any additional notes, skills, or specific time constraints...',
    submitVolunteerApplication: 'Submit Volunteer Application',
    sending: 'Sending...',
    volunteerTerms: 'By submitting, you agree to our volunteer terms and conditions.',
    volunteerTermsTitle: 'It\'s Time to Count Yourself In',
    volunteerTermsSubtitle: '"Unity is strength" when there is collaboration and teamwork, marvelous things can happen. Volunteer your time where it makes the most difference:',
    volunteerTermsContent: 'Our team will identify your unique skill sets, abilities, passions, talents and interests and match you with a suitable project where you can make the most difference.',
    volunteerTermsOpportunities: 'Wide range of opportunities:',
    volunteerTermsOpportunitiesDesc: 'We have a wide range of opportunities for virtual and in person, counselling, teaching, vocational training, creative arts, sports training, career guidance, awareness campaigning, community development, village upliftment, beach clean ups, lake restoration, animal welfare, creative content development among others where your skill sets, connections and personality can create a lasting impact in your community.',
    volunteerTermsMedia: 'While Volunteering we might take photos, videos and written feedback/ experience for our use.',
    volunteerTermsBelongings: 'Please ensure that you take care of all your belongings like money, baggage and personal things during your volunteering.',
    volunteerTermsLiability: 'We will not be responsible for any kind of Lost/Theft of your money, baggage and personal things during your volunteering period.',
    volunteerTermsConfidential: 'Your activity may involve knowing certain information about us, about the subjects and task entrusted to you. Such information as acquired shall be treated as "confidential information" and you agree not to share such information with anyone unless required by law with our prior permission.',
    volunteerTermsConduct: 'As a volunteer it is important to be in such a way as to create a safe, supportive, learning environment for yourself and for others around us. Hence, we request you not to engage in any disruptive speech or behaviour.',
    volunteerTermsSubstances: 'Smoking, drinking alcohol or consuming any hallucinogenic or banned drug is strictly not allowed.',
    volunteerTermsStandards: 'You agree to conduct all volunteering activities with high standards and good taste, and will do nothing to cause detriment to our reputation or goodwill.',
    volunteerTermsDocumentation: 'You agree to provide all the details and documentation as may be required for the purpose of your registration as a volunteer.',
    volunteerTermsForceMajeure: 'In the event of a "Force Majeure Event," which includes, but is not limited to, governmental restrictions, riots, terrorist attacks, epidemics, quarantine, pandemics, natural disasters such as earthquakes, tempests, floods, lightning, or acts of God, we reserve the right to cancel the Program.',
    volunteerTermsCancellation: 'You will be informed if Your volunteering is canceled, and you must adjust your travel plans in light of that information.',
    volunteerTermsCancellationLiability: 'We will not be responsible for any loss and/or damage, of whatever nature, you may incur as a result of the cancellation of Your volunteering.',
    volunteerTermsConsent: 'You give your consent to us for the collection and use of your personal information that you have provided to us while registering in connection with volunteering. We may use your information to send details of any further volunteering opportunities that may come in future.',
    volunteerTermsFinal: 'Diya Charitable Trust will not be responsible for any damages intentional or unintentional whatsoever be the case & hence you are advised to act with maturity and take ownership for actions.',
    acceptTerms: 'I have read and agree to the Terms & Conditions',
    acceptTermsRequired: 'You must accept the terms and conditions to submit your application.',
    // Footer
    contactUs: 'Contact Us',
    generalInquiries: 'General Inquiries',
    emergency: 'Emergency',
    officeLocation: 'Office Location',
    officeHours: 'Office Hours',
    mondayFriday: 'Monday - Friday: 9:00 AM - 6:00 PM',
    saturday: 'Saturday: 10:00 AM - 4:00 PM',
    sunday: 'Sunday: Closed',
    quickLinks: 'Quick Links',
    legal: 'Legal',
    followUs: 'Follow Us',
    india: 'India',
    // Community Feedback Testimonials
    testimonial1Quote: 'Diya Charitable Trust has transformed our community by providing free education to our children. They truly light up lives!',
    testimonial1Author: 'Vijaya',
    testimonial2Quote: 'The healthcare camps organized by Diya Charitable Trust have been a blessing for our village. We are forever grateful.',
    testimonial2Author: 'Kannan',
    testimonial3Quote: 'Through their women empowerment programs, I learned skills that helped me start my own business. Thank you Diya Charitable Trust!',
    testimonial3Author: 'Kaviya',
  },
  ta: {
    // Header
    donate: 'நன்கொடை',
    runningLine: 'எங்கள் பணி பரந்தது, ஆனால் எங்களின் உடனடி முன்னுரிமை பார்வை விளிம்புநிலை மக்களின் கல்வி முன்னேற்றம் மற்றும் குழந்தை, முதியோர் பிரிவு மற்றும் வறியோருக்கு உணவளித்தல். உங்கள் நன்கொடைகள் அல்லது தன்னார்வலர் மூலம் Diya Charitable Trust-ஐ ஆதரிக்கவும்.',
    // Hero
    heroWelcome: 'தீயா அறக்கட்டளை (TN) உங்களை வரவேற்கிறது',
    heroMotto: '-மனிதாபிமானம் முதலில்-',
    heroTitle: 'சேவையின் வழியே வாழ்க்கையை ஒளிரச் செய்தல்',
    heroSubtitle: '',
    heroCta: 'எங்கள் பணியில் இணையுங்கள்',
    // Mission
    missionTitle: 'எங்கள் பணி',
    missionDescription: 'டியா சாரிட்டி, விரிவான சமூக நலத் திட்டங்கள் மூலம் சமூகத்திற்கு சேவை செய்வதற்காக அர்ப்பணிக்கப்பட்ட புதிதாக நிறுவப்பட்ட அறக்கட்டளை. கல்வி, சுகாதாரம், பெண்கள் அதிகாரமளித்தல் மற்றும் சுற்றுச்சூழல் நிலைத்தன்மை ஆகியவற்றின் வழியே குறைந்த வசதியுள்ள சமூகங்களின் வாழ்க்கையை ஒளிரச் செய்து, நம்பிக்கையை விதைப்பதே எங்கள் பணி. இருளைப் போக்கும் தீபம் போல, அனைவருக்கும் ஒரு சிறந்த நாளைக்கான பாதையை ஒளிரச் செய்ய நாங்கள் முயற்சிக்கிறோம்.',
    // Contact
    contactTitle: 'தொடர்பு கொள்ளுங்கள்',
    contactDescription: 'சமூகத்திற்கு சேவை செய்யும் எங்கள் பணியில் எங்களுடன் இணையுங்கள். நீங்கள் தன்னார்வலராக இருக்க விரும்பினாலும், நன்கொடை அளிக்க விரும்பினாலும் அல்லது எங்களுடன் கூட்டாளியாக இருக்க விரும்பினாலும், உங்களிடமிருந்து கேட்க விரும்புகிறோம். ஒன்றாக, அதிகம் தேவைப்படுபவர்களின் வாழ்க்கையில் ஒரு வித்தியாசத்தை உருவாக்கலாம்.',
    // Footer
    footerCopyright: '© 2035 டியா சாரிட்டி மூலம்.',
    footerPoweredBy: 'Wix மூலம் இயக்கப்பட்டது மற்றும் பாதுகாக்கப்பட்டது',
    privacyPolicy: 'தனியுரிமைக் கொள்கை',
    accessibilityStatement: 'அணுகல்தன்மை அறிக்கை',
    accessibilityStatementDesc: 'தீயா அறக்கட்டளை மாற்றுத்திறனாளிகள் உட்பட அனைவருக்கும் டிஜிட்டல் அணுகலை உறுதிசெய்ய அர்ப்பணிக்கப்பட்டுள்ளது. நாங்கள் தொடர்ந்து அனைவருக்கும் பயனர் அனுபவத்தை மேம்படுத்தி தொடர்புடைய அணுகல் தரங்களைப் பயன்படுத்துகிறோம். வலை உள்ளடக்க அணுகல் வழிகாட்டுதல்கள் (WCAG) 2.1 நிலை AA தரங்களுக்கு இணங்க நாங்கள் நோக்கமாகக் கொண்டுள்ளோம். எங்கள் வலைத்தளத்தில் எந்த அணுகல் தடைகளையும் நீங்கள் எதிர்கொண்டால், தயவுசெய்து dctnow.ngo@gmail.com இல் எங்களைத் தொடர்பு கொள்ளவும், நாங்கள் பிரச்சினையைத் தீர்ப்போம்.',
    cancellationRefundsPolicy: 'ரத்துசெய்தல் & பணத்திரும்பப்பெறுதல் கொள்கை',
    legalDisclaimerCompliance: 'சட்ட விலக்கு & இணக்கம்',
    close: 'மூடு',
    // Privacy Policy
    privacyIntro: 'Diya Charitable Trust இந்த வலைத்தளத்தின் பார்வையாளர்கள், நன்கொடையாளர்கள், தன்னார்வலர்கள் மற்றும் பயனாளிகளின் தனியுரிமை மற்றும் தனிப்பட்ட தகவல்களைப் பாதுகாக்க அர்ப்பணிக்கப்பட்டுள்ளது.',
    privacyInfoWeCollect: 'நாங்கள் சேகரிக்கும் தகவல்',
    privacyInfoWeCollectDesc: 'நீங்கள் நன்கொடை அளிக்கும்போது, தன்னார்வலராக பதிவு செய்யும்போது, படிவங்கள் அல்லது மின்னஞ்சல் மூலம் எங்களைத் தொடர்பு கொள்ளும்போது, அல்லது புதுப்பிப்புகள் அல்லது செய்திமடல்களுக்கு குழுசேரும் போது பெயர், மின்னஞ்சல் முகவரி, தொலைபேசி எண், அஞ்சல் முகவரி, PAN விவரங்கள் (நன்கொடை ரசீதுகளுக்கு), மற்றும் பணம் தொடர்பான தகவல்கள் போன்ற தனிப்பட்ட தகவல்களை நாங்கள் சேகரிக்கலாம்.\n\nபணம் தொடர்பான தகவல்கள் பாதுகாப்பான மூன்றாம் தரப்பு பணம் கேட்வேக்கள் மூலம் செயலாக்கப்படுகின்றன, மேலும் நாங்கள் எங்கள் சர்வர்களில் அட்டை அல்லது வங்கி விவரங்களை சேமிக்கவில்லை.',
    privacyUseOfInfo: 'தகவலின் பயன்பாடு',
    privacyUseOfInfoDesc: 'சேகரிக்கப்பட்ட தகவல் பின்வருவனவற்றிற்கு மட்டுமே பயன்படுத்தப்படுகிறது:\n\n• நன்கொடைகளை செயலாக்குதல் மற்றும் ரசீதுகளை வழங்குதல்\n• திட்டங்கள், அங்கீகாரங்கள் மற்றும் புதுப்பிப்புகள் குறித்து தொடர்பு கொள்ளுதல்\n• இந்திய சட்டத்தால் தேவைப்படும் சட்டப்பூர்வ பதிவுகளை பராமரித்தல்\n• எங்கள் சேவைகள் மற்றும் வெளியீட்டு நடவடிக்கைகளை மேம்படுத்துதல்\n\nநாங்கள் எந்த மூன்றாம் தரப்பிற்கும் தனிப்பட்ட தகவல்களை விற்கவோ, வாடகைக்கு விடவோ அல்லது வர்த்தகம் செய்யவோ மாட்டோம்.',
    privacyDisclosure: 'தகவல் வெளிப்படுத்தல்',
    privacyDisclosureDesc: 'தனிப்பட்ட தகவல்கள் பின்வரும் சந்தர்ப்பங்களில் மட்டுமே பகிரப்படும்:\n\n• அங்கீகரிக்கப்பட்ட சேவை வழங்குநர்களுடன் (பணம் கேட்வேக்கள், தணிக்கையாளர்கள், IT சேவைகள்)\n• சட்டத்தால் அல்லது அரசாங்க அதிகாரிகளால் தேவைப்படும்போது\n\nஇத்தகைய அனைத்து வெளிப்படுத்தல்களும் கண்டிப்பாக தேவைக்கேற்ப அடிப்படையில் செய்யப்படுகின்றன.',
    privacyDataSecurity: 'தரவு பாதுகாப்பு',
    privacyDataSecurityDesc: 'அங்கீகரிக்கப்படாத அணுகல், தவறான பயன்பாடு அல்லது வெளிப்படுத்தலுக்கு எதிராக தனிப்பட்ட தரவுகளை பாதுகாக்க நாங்கள் நியாயமான நிர்வாக மற்றும் தொழில்நுட்ப நடவடிக்கைகளை எடுக்கிறோம்.',
    privacyCookies: 'குக்கீகள்',
    privacyCookiesDesc: 'பயனர் அனுபவத்தை மேம்படுத்தவும் வலைத்தள போக்குவரத்தை பகுப்பாய்வு செய்யவும் இந்த வலைத்தளம் குக்கீகளைப் பயன்படுத்தலாம். பயனர்கள் தங்கள் உலாவி அமைப்புகள் மூலம் குக்கீகளை முடக்க தேர்வு செய்யலாம்.',
    privacyThirdPartyLinks: 'மூன்றாம் தரப்பு இணைப்புகள்',
    privacyThirdPartyLinksDesc: 'எங்கள் வலைத்தளத்தில் வெளிப்புற வலைத்தளங்களுக்கான இணைப்புகள் இருக்கலாம். அத்தகைய மூன்றாம் தரப்பு தளங்களின் தனியுரிமை நடைமுறைகள் அல்லது உள்ளடக்கத்திற்கு நாங்கள் பொறுப்பல்ல.',
    privacyConsent: 'சம்மதம்',
    privacyConsentDesc: 'இந்த வலைத்தளத்தைப் பயன்படுத்துவதன் மூலம் அல்லது தனிப்பட்ட தகவல்களை சமர்ப்பிப்பதன் மூலம், இந்த தனியுரிமைக் கொள்கைக்கு ஏற்ப தகவல்களின் சேகரிப்பு மற்றும் பயன்பாட்டிற்கு நீங்கள் சம்மதிக்கிறீர்கள்.',
    privacyUpdates: 'இந்த கொள்கையின் புதுப்பிப்புகள்',
    privacyUpdatesDesc: 'இந்த தனியுரிமைக் கொள்கை அவ்வப்போது புதுப்பிக்கப்படலாம். எந்தவிதமான மாற்றங்களும் இந்த பக்கத்தில் வெளியிடப்படும்.',
    privacyContact: 'தொடர்பு தகவல்',
    privacyContactDesc: 'தனியுரிமை தொடர்பான எந்த கவலைகள் அல்லது கோரிக்கைகளுக்கும், தயவுசெய்து எங்களைத் தொடர்பு கொள்ளவும்:\nமின்னஞ்சல்: dctnow.ngo@gmail.com',
    // Cancellation & Refunds Policy
    cancellationPolicyDesc1: 'Diya Charitable Trust-க்கு செய்யப்படும் அனைத்து நன்கொடைகள், பங்களிப்புகள், நிதியளிப்புகள் மற்றும் கொடுப்பனவுகள் தன்னார்வமானவை மற்றும் பணத்திரும்பப்பெற முடியாதவை.',
    cancellationPolicyDesc2: 'நன்கொடை செயலாக்கப்பட்டவுடன், அது ரத்து செய்யப்படவோ, மாற்றப்படவோ அல்லது பணத்திரும்பப்பெறப்படவோ முடியாது, ஏனெனில் நிதிகள் உடனடியாக எங்கள் அறப்பணி திட்டங்கள் மற்றும் நலன்புரி நடவடிக்கைகளுக்கு ஒதுக்கப்படுகின்றன.',
    cancellationPolicyDesc3: 'நகல் பரிவர்த்தனைகள், தொழில்நுட்ப பிழைகள் அல்லது தவறான தொகைகள் வசூலிக்கப்பட்டால், நன்கொடையாளர்கள் பரிவர்த்தனையிலிருந்து 7 நாட்களுக்குள் செல்லுபடியாகும் ஆதாரத்துடன் எங்களுக்கு எழுதலாம். உண்மையான வழக்குகள் மதிப்பாய்வு செய்யப்படும், மேலும் அனுமதிக்கப்பட்டால் பணத்திரும்பப்பெறுதல் நியாயமான நேரத்திற்குள் செயலாக்கப்படும்.',
    cancellationPolicyDesc4: 'மேலே உள்ள நிபந்தனைகளை பூர்த்தி செய்யாத எந்த பணத்திரும்பப்பெறுதல் கோரிக்கையையும் நிராகரிக்க Trust-க்கு உரிமை உள்ளது.',
    cancellationPolicyDesc5: 'இந்த வலைத்தளத்தில் நன்கொடை செய்வதன் மூலம், நன்கொடையாளர் இந்த கொள்கைக்கு ஒப்புக்கொள்கிறார்.\n\nஎந்த கவலைகளுக்கும், தயவுசெய்து தொடர்பு கொள்ளவும்: dctnow.ngo@gmail.com',
    // Legal Disclaimer & Compliance
    legalDisclaimerDesc1: 'Diya Charitable Trust என்பது இந்திய Trusts Act, 1882-ன் கீழ் பதிவு செய்யப்பட்ட ஒரு அறக்கட்டளை. Trust இலாப நோக்கற்ற அடிப்படையில் செயல்படுகிறது மற்றும் கல்வி, ஊட்டச்சத்து, சுகாதாரம் மற்றும் சமூக மேம்பாடு உட்பட சமூக நலன்புரி நடவடிக்கைகளுக்கு அர்ப்பணிக்கப்பட்டுள்ளது.',
    legalDisclaimerDesc2: 'பெறப்பட்ட அனைத்து நன்கொடைகளும் Trust-ன் நோக்கங்களுக்காக மட்டுமே பயன்படுத்தப்படுகின்றன. Trust-ன் வருமானம் அல்லது சொத்தின் எந்த பகுதியும் அறப்பணி நோக்கங்களை முன்னேற்றுவதற்காக வழங்கப்பட்ட சேவைகளுக்கு நியாயமான இழப்பீடு தவிர, Trustees, உறுப்பினர்கள் அல்லது எந்த தனிப்பட்ட நபருக்கும் விநியோகிக்கப்படாது.',
    legalDisclaimerDesc3: 'நன்கொடைகள் தன்னார்வமானவை மற்றும் பணத்திரும்பப்பெற முடியாதவை. நன்கொடை ரசீதுகள் மற்றும் வரி நன்மைகள், பொருந்துமானால், நடைமுறையில் உள்ள சட்டங்களுக்கு உட்பட்டது.\nIncome Tax Act, 1961-ன் Section 80G-ன் கீழ் வரி விலக்கு கிடைக்கிறது. தகுதியை உறுதிப்படுத்த நன்கொடையாளர்கள் தங்கள் வரி ஆலோசகர்களைக் கலந்தாலோசிக்க அறிவுறுத்தப்படுகிறார்கள்.',
    legalDisclaimerDesc4: 'தற்போது FCRA பதிவு செயல்முறை நிறைவடையும் வரை, Foreign Contribution (Regulation) Act, 2010-ன் கீழ் வெளிப்படையாக அனுமதிக்கப்படாத வரை, Trust வெளிநாட்டு பங்களிப்புகளை ஏற்காது.',
    legalDisclaimerDesc5: 'இந்த வலைத்தளத்தில் வெளியிடப்பட்ட அனைத்து உள்ளடக்கமும்—உரை, படங்கள், லோகோக்கள் மற்றும் பொருட்கள் உட்பட—வேறுவிதமாக குறிப்பிடப்படாவிட்டால், Diya Charitable Trust-ன் அறிவுசார் சொத்து. அங்கீகரிக்கப்படாத பயன்பாடு, பிரதியெடுத்தல் அல்லது விநியோகம் தடைசெய்யப்பட்டுள்ளது.',
    legalDisclaimerDesc6: 'துல்லியத்தை உறுதிப்படுத்த அனைத்து முயற்சிகளும் மேற்கொள்ளப்பட்ட போதிலும், இந்த வலைத்தளத்தில் உள்ள தகவல்களின் பயன்பாட்டிலிருந்து எழும் எந்த பிழைகள், தவறுகள் அல்லது விளைவுகளுக்கும் Trust பொறுப்பல்ல.',
    legalDisclaimerDesc7: 'இந்த வலைத்தளத்தை அணுகுவதன் மூலம் அல்லது பயன்படுத்துவதன் மூலம், நீங்கள் இந்த விதிமுறைகள் மற்றும் நிபந்தனைகளால் கட்டுப்படுத்தப்படுவதற்கு ஒப்புக்கொள்கிறீர்கள்.',
    // Mission additional
    missionQuestion1: 'அதீத வறுமையால் உண்டாகும் பசியின் வலியை நீங்கள் ஒருபோதும் உணர்ந்திருக்கிறீர்களா? அல்லது துரதிர்ஷ்டம் காரணமாக திடீரென நகர்ப்புற வறுமையில் சிக்கி, குடும்பத்தின் மரியாதைக்காக உங்கள் துயரங்களை யாரிடமும் பகிர முடியாத நிலையை எதிர்கொண்டிருக்கிறீர்களா? வேலை இழப்பால் ஏற்படும் மன அழுத்தத்தையும், அதனால் உங்களுக்கும் உங்கள் குடும்பத்திற்கும் வரும் மனவேதனையையும் அனுபவித்திருக்கிறீர்களா? வெற்றியின் ஓட்டத்தில் பின்னால் தள்ளப்பட்டதால், அல்லது வயதுடன் வரும் சவால்களால் தனிமை, மனச்சோர்வு ஆகியவற்றை சந்தித்திருக்கிறீர்களா? யாரையோ, எதையோ இழந்த வலி, அல்லது உங்கள் அன்புக்குரியவர்களின் தேவைகளை பூர்த்தி செய்ய முடியாத உதவியற்ற நிலையை அனுபவித்திருக்கிறீர்களா?',
    missionComfort: 'அத்தகைய தருணங்களில் — நாங்கள் உங்களுக்கு ஆறுதலாக இருக்க, உங்களைத் தாங்கி நிற்க, முன்னே செல்ல உதவ இருக்கிறோம்.',
    missionInvitation: 'இந்த செய்தியை வாசிக்கும் நீங்கள், வசதியாக வாழ்பவர், பாதுகாப்புடன் இருப்பவர் என்று உணர்ந்தால் — தயவுசெய்து உங்கள் நேரத்தை ஒதுக்கி தன்னார்வலராக எங்களுடன் இணையவும் அல்லது உங்கள் வளத்திலிருந்து சிறிய அளவு நன்கொடையாக பங்களிக்கவும். நினைவில் கொள்ளுங்கள் — நீங்கள் வழங்குவது பல மடங்காக உங்களிடம் திரும்பி வரும்!',
    missionAnonymous: 'எங்களின் ஒவ்வொரு சேவை முயற்சியும் முழுமையாக அடையாளம் வெளிப்படாமல் (Anonymous) மேற்கொள்ளப்படும். தொழில்முறை தன்னார்வலர்கள் தவிர வேறு யாருக்கும் இது தெரியாது. WhatsApp மூலம் 9342767239 என்ற எண்ணில் எங்களை தொடர்பு கொள்ளலாம். உடனடி பதில் கிடைக்காவிட்டாலும், நிச்சயமாக நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.',
    missionActions: 'நாங்கள் யார் என்பது முக்கியமல்ல! எங்கள் செயல்களே எங்களைப் பேசட்டும்!',
    volunteer: 'தன்னார்வலர்',
    ourCompliance: 'எங்கள் இணக்கம்',
    // Donation
    needSupport: 'ஆதரவு தேவை — நன்கொடை',
    forCorpusFund: '(மூலதன நிதிக்காக)',
    taxBenefit: 'வரி சலுகை பெறுங்கள் (80G பிரிவின் கீழ்)',
    taxBenefitDesc: 'நன்கொடைகள் வருமான வரி சட்டத்தின் 80G பிரிவின் கீழ் வரிவிலக்கு பெற தகுதியானவை. நன்கொடை வழங்கிய பிறகு, 80G ரசீது பெற உங்கள் PAN எண்ணை WhatsApp மூலம் எங்களுடன் பகிரவும்.',
    taxBenefitDescAfter: '',
    whatsapp: 'WhatsApp',
    lifeIsEcho: 'வாழ்க்கை ஒரு எதிரொலி',
    echo1: 'நீங்கள் உலகிற்கு அனுப்புவது மீண்டும் உங்களிடமே திரும்பி வரும். நீங்கள் விதைப்பதே அறுவடை ஆகும்.',
    echo2: 'நீங்கள் அளிப்பதே உங்களுக்கு கிடைக்கும். மற்றவர்களில் நீங்கள் காண்பது, உங்களுள் இருப்பதின் பிரதிபலிப்பே.',
    donorInfo: 'நன்கொடையாளர் தகவல் மற்றும் பங்களிப்பு',
    donorName: 'நன்கொடையாளர் பெயர் *',
    phoneNumber: 'தொலைபேசி எண் *',
    emailAddress: 'மின்னஞ்சல் முகவரி *',
    selectAmount: 'நன்கொடை தொகையைத் தேர்ந்தெடுக்கவும் (INR)',
    otherAmount: 'மற்ற தொகை',
    enterCustomAmount: 'தனிப்பயன் தொகையை உள்ளிடவும்',
    donationType: 'நன்கொடை வகை',
    oneTimeDonation: 'ஒரு முறை நன்கொடை',
    monthlyDonation: 'மாதாந்திர நன்கொடை',
    monthlyDonationNote: 'பதிவு செய்த தேதியிலிருந்து ஒவ்வொரு மாதமும் உங்கள் நன்கொடை தானாகவே வசூலிக்கப்படும்.',
    upiIdForAutoDebit: 'தானியங்கி பணம் எடுப்பதற்கான UPI ID',
    upiAutoDebitNote: 'தானியங்கி மாதாந்திர நன்கொடைகளை இயக்க உங்கள் UPI ID ஐ உள்ளிடவும் (எ.கா., yourname@paytm, yourname@ybl). JioStar சந்தா போன்றது, உங்கள் பணம் ஒவ்வொரு மாதமும் தானாகவே வசூலிக்கப்படும்.',
    proceedPayment: 'கட்டணத்திற்குத் தொடரவும்',
    directPayment: 'நேரடி கட்டண விவரங்கள்',
    scanPay: 'ஸ்கேன் & பே (UPI)',
    upiQr: 'UPI QR',
    upiPlaceholder: '[Trust இன் UPI QR குறியீட்டு படத்திற்கான பிளேஸ்ஹோல்டர்]',
    upiId: 'UPI ID',
    copy: 'நகலெடு',
    copied: 'நகலெடுக்கப்பட்டது!',
    bankTransfer: 'வங்கி பரிமாற்ற விவரங்கள்',
    accountName: 'கணக்கு பெயர்',
    bankName: 'வங்கி பெயர்',
    accountNumber: 'கணக்கு எண்',
    ifscCode: 'IFSC குறியீடு',
    transactionNote: '*80G ரசீதுக்கு மின்னஞ்சல்/WhatsApp மூலம் பரிவர்த்தனை விவரங்களைப் பகிர்ந்து கொள்ளவும்.*',
    corporateSponsors: 'எங்கள் கார்ப்பரேட் & அரசாங்க நிதியளிப்பாளர்கள்',
    underCSR: 'CSR முன்முயற்சிகளின் கீழ்',
    corporatePartner: 'கார்ப்பரேட் பங்காளி',
    anticipatingCSR: 'உங்கள் CSR நிதியளிப்பை இங்கே எதிர்பார்த்துக்கொண்டிருக்கிறோம்.',
    metricsImpact: 'மெட்ரிக்ஸ் & தாக்க பகுதிகள்',
    educationYouth: 'கல்வி & இளைஞர்கள்',
    elderlyCare: 'முதியோர் பராமரிப்பு',
    womenFamilies: 'பெண்கள் & குடும்பங்கள்',
    emergencyRelief: 'அவசர நிவாரணம்',
    willBeShared: '-- திட்ட நிதியளிப்பாளர்களுடன் பகிரப்படும் --',
    // Property Donation
    anAppeal: 'ஒரு வேண்டுகோள்!',
    propertyDonationPara1: 'ஒரு அறக்கட்டளை அமைப்பாக, எங்கள் பணி முழுமையாக நன்கொடைகள் மற்றும் நிதியளிப்புகள் மூலம் நடைபெறுகிறது. கல்வி மற்றும் உணவு மையங்களின் குழுக்களை நிறுவ, பொருத்தமான இடத்திற்கான அணுகல் அவசியம்.',
    propertyDonationPara2: 'நீங்கள் தாராள மனப்பான்மை கொண்டவராகவும், உங்கள் சூழ்நிலைகள் அனுமதிக்குமானால், நாங்கள் உங்களை அறக்கட்டளை நிலம் அல்லது சொத்தை நன்கொடையாக வழங்கி நீடித்த மரபை உருவாக்க அழைக்கிறோம். சொத்து பிரத்தியேகமாக பொதுநலனுக்காக அர்ப்பணிக்கப்படும், மேலும் உங்கள் பங்களிப்பு தலைமுறைகளுக்கு கெளரவிக்கப்படும்.',
    propertyDonationNote: 'சொத்து பாரம்பரியமற்றதாகவும், கடன்களிலிருந்து விடுபட்டதாகவும் இருக்க வேண்டும் என்பதை நினைவில் கொள்ளவும்.',
    propertyDonationContact: 'சட்ட செயல்முறையைத் தொடங்க எங்களுக்கு செய்தி அனுப்பவும்.',
    // Community Feedback
    communityFeedback: 'சமூக கருத்து',
    // Process
    ourProcess: 'எங்கள் செயல்முறை',
    joinUs: 'எங்களுடன் சேருங்கள்',
    // Impact Stats
    ourImpact: 'எங்கள் தாக்கம்',
    impactDescription: 'எங்கள் தொடக்கத்திலிருந்து, எண்ணற்ற தனிநபர்கள் மற்றும் சமூகங்களின் வாழ்க்கையில் அர்த்தமுள்ள மாற்றத்தை உருவாக்கி வருகிறோம்.',
    childrenEducated: 'குழந்தைகள் கல்வி',
    childrenEducatedDesc: 'வசதியற்ற குழந்தைகளுக்கு தரமான கல்வி வழங்குதல்',
    healthcareCamps: 'சுகாதார முகாம்கள்',
    healthcareCampsDesc: 'கிராமப்புற பகுதிகளில் மருத்துவ முகாம்கள் ஏற்பாடு செய்தல்',
    womenEmpowered: 'பெண்கள் அதிகாரமளிக்கப்பட்டனர்',
    womenEmpoweredDesc: 'பெண்களுக்கு தொழில்முறை திறன்கள் பயிற்சி',
    villagesReached: 'கிராமங்கள் அடைந்தன',
    villagesReachedDesc: 'தொலைதூர சமூகங்களுக்கு எங்கள் சேவைகளை விரிவாக்குதல்',
    joinMakingDifference: 'வித்தியாசத்தை உருவாக்க எங்களுடன் இணையுங்கள்',
    joinMakingDifferenceDesc: 'ஒவ்வொரு பங்களிப்பும், எவ்வளவு சிறியதாக இருந்தாலும், அதிகமான மக்களை அடையவும் சமூகங்களில் நீடித்த மாற்றத்தை உருவாக்கவும் எங்களுக்கு உதவுகிறது.',
    donateNow: 'இப்போது நன்கொடை',
    // Annathanam
    annathanam: 'அன்னதானம்',
    annathanamQuote: 'அன்னதானம் தானம் அல்ல - அது சேவை.',
    annathanamDesc1: 'நீ ஒருவருக்கு உணவு வழங்குவதில்லை; அவரின் வழியாக இறைவனுக்கே அன்னம் அர்ப்பணிக்கிறாய்.',
    annathanamDesc2: 'பல ஆன்மிக மரபுகளில் இப்படியாக கூறப்படுகிறது:',
    annathanamQuote2: 'உணவு உண்ணுபவன் இறைவன் வேடம் தரித்தவனே.',
    annathanamDesc3: 'அன்னதானத்தின் உண்மையான பெருமையை உணர, கொடிய வறுமையால் உண்டாகும் கடும் பசியை ஒருவர் அனுபவித்திருக்க வேண்டும். ஆனால் வறுமை மட்டும் காரணமல்ல; அகந்தை, சுயமரியாதை, சமூகக் கட்டுப்பாடுகள் போன்ற காரணங்களால் பலர் உதவி நாடுவதையே தயங்குகின்றனர். இடம்பெயர்ந்த மாணவர்கள், தினக்கூலி தொழிலாளர்களின் பிள்ளைகள், தாங்களே உழைத்து வாழும் தொழிலாளர்கள், பெற்றோரை இழந்த இடம்பெயரும் மக்களுடைய பிள்ளைகள், குறைந்த வருமானம் இருந்தும் வாழ்க்கைச் சுமையைச் சுமப்பவர்கள் — இவர்கள் அனைவரும் இதற்கு சாட்சிகள்.',
    annathanamDesc4: 'எங்களின் அன்னதானம் அவர்களின் வாழ்க்கைச் சுமையை ஓரளவு குறைத்து, பொருளாதார முன்னேற்றத்திற்கு ஒரு அடிக்கல்லாக அமையுமானால், அதனைச் செய்வது எங்கள் கடமையல்லவா? ஜாதி, மதம், பாலினம், இனம் என்ற எந்த வேற்றுமையும் இன்றி, அகந்தையற்ற மனதுடன் எங்களை அணுகும் யாவருக்கும் அன்புடன் அன்னம் வழங்குவதே எங்கள் சேவை.',
    lunchMassFeeding: 'மதிய உணவு (ஒரு நாளில் பெருமளவு உணவு வழங்கல்)',
    // Primary Activities
    primaryActivitiesTitle: 'எங்கள் முதன்மை செயல்பாடுகள் & தாக்க பகுதிகள்',
    buddingMinds: 'முளைக்கும் மனங்கள்',
    buddingMindsDesc: 'பள்ளி கைவிடும் இடைவெளிகளை இணைத்தல், திறன் பயிற்சி, மற்றும் வசதியற்ற இளைஞர்களுக்கு உளவியல் ஆலோசனை.',
    youthLeap: 'இளைஞர் தாவல்',
    youthLeapDesc: 'இளைஞர் அதிகாரமளிப்புக்காக குறிப்பாக வடிவமைக்கப்பட்ட திறன் பயிற்சி, உளவியல் ஆலோசனை, மற்றும் வேலைவாய்ப்பு ஆதரவு.',
    vulnerableWomenFamilies: 'எளிதில் பாதிக்கப்படும் பெண்கள் & குடும்பங்கள்',
    vulnerableWomenFamiliesDesc: 'பெண்களுக்கான பொருளாதார நிலைத்தன்மையில் கவனம் செலுத்தும் திறன் பயிற்சி, வேலைவாய்ப்பு, மற்றும் சுய உதவி குழு உருவாக்கம்.',
    oldAgeCare: 'முதியோர் பராமரிப்பு',
    oldAgeCareDesc: 'பாலர்-பாட்டி திட்டம், பராமரிப்பு சிகிச்சை, ஆலோசனை, மற்றும் முதியோர் சமூகத்திற்கான அணுகக்கூடிய சுகாதார சேவைகள்.',
    supportSustainability: 'சூழல் & நிலைத்தன்மை',
    supportSustainabilityDesc: 'நீண்ட கால சமூக நிலைத்தன்மைக்கான விழிப்புணர்வு பிரச்சாரங்கள் மற்றும் நிலைத்தன்மை முயற்சிகள்.',
    explore: 'ஆராயவும்',
    // Volunteer Form
    volunteerSignUp: 'தன்னார்வலர் பதிவு படிவம்',
    personalInformation: 'தனிப்பட்ட தகவல்',
    firstName: 'முதல் பெயர் *',
    gender: 'பாலினம்',
    selectGender: 'பாலினத்தைத் தேர்ந்தெடுக்கவும்',
    male: 'ஆண்',
    female: 'பெண்',
    nonBinary: 'இருபாலினம் அல்லாத',
    preferNotToSay: 'சொல்ல விரும்பவில்லை',
    enterFirstName: 'உங்கள் முதல் பெயரை உள்ளிடவும்',
    volunteerPreferences: 'தன்னார்வலர் விருப்பங்கள்',
    eventSetup: 'நிகழ்வு அமைப்பு',
    registrationDesk: 'பதிவு மேசை',
    hospitalityGuestServices: 'விருந்தோம்பல்/விருந்தினர் சேவைகள்',
    workshopFacilitation: 'பட்டறை வசதி',
    marketingPromotion: 'சந்தைப்படுத்தல்/விளம்பரம்',
    fundraising: 'நிதி திரட்டல்',
    generalSupport: 'பொது ஆதரவு',
    teaching: 'கற்பித்தல்',
    availability: 'கிடைக்கும் நேரம்',
    morning: 'காலை (8am-12pm)',
    afternoon: 'மதியம் (12pm-5pm)',
    evening: 'மாலை (5pm-9pm)',
    weekdays: 'வார நாட்கள்',
    weekends: 'வார இறுதி',
    flexibleSchedule: 'நெகிழ்வான அட்டவணை',
    additionalComments: 'கூடுதல் கருத்துகள்',
    tellUsWhy: 'நீங்கள் ஏன் தன்னார்வலராக இருக்க விரும்புகிறீர்கள் என்பதை எங்களிடம் சொல்லுங்கள்',
    enterAdditionalNotes: 'கூடுதல் குறிப்புகள், திறன்கள் அல்லது குறிப்பிட்ட நேர கட்டுப்பாடுகளை உள்ளிடவும்...',
    submitVolunteerApplication: 'தன்னார்வலர் விண்ணப்பத்தை சமர்ப்பிக்கவும்',
    sending: 'அனுப்புகிறது...',
    volunteerTerms: 'சமர்ப்பிப்பதன் மூலம், நீங்கள் எங்கள் தன்னார்வலர் விதிமுறைகள் மற்றும் நிபந்தனைகளுக்கு ஒப்புக்கொள்கிறீர்கள்.',
    volunteerTermsTitle: 'உங்களை எண்ணுவதற்கான நேரம்',
    volunteerTermsSubtitle: '"ஒற்றுமைதான் வலிமை" — ஒத்துழைப்பு மற்றும் குழுப்பணி இருக்கும்போது, அற்புதமான விஷயங்கள் நடக்கும். அதிக மாற்றத்தை ஏற்படுத்தக்கூடிய இடத்தில் உங்கள் நேரத்தை தன்னார்வலராக வழங்குங்கள்:',
    volunteerTermsContent: 'எங்கள் குழு உங்கள் தனித்துவமான திறன் தொகுப்புகள், திறன்கள், ஆர்வங்கள், திறமைகள் மற்றும் ஆர்வங்களை அடையாளம் கண்டு, நீங்கள் அதிக மாற்றத்தை ஏற்படுத்தக்கூடிய பொருத்தமான திட்டத்துடன் பொருத்துவோம்.',
    volunteerTermsOpportunities: 'விரிவான வாய்ப்புகள்:',
    volunteerTermsOpportunitiesDesc: 'மெய்நிகர் மற்றும் நேரில், ஆலோசனை, கற்பித்தல், தொழில் பயிற்சி, படைப்பு கலைகள், விளையாட்டு பயிற்சி, தொழில் வழிகாட்டுதல், விழிப்புணர்வு பிரச்சாரம், சமூக மேம்பாடு, கிராம மேம்பாடு, கடற்கரை சுத்தம், ஏரி மீட்பு, விலங்கு நலன், படைப்பு உள்ளடக்க மேம்பாடு உட்பட பல்வேறு வாய்ப்புகள் உள்ளன, அங்கு உங்கள் திறன் தொகுப்புகள், இணைப்புகள் மற்றும் ஆளுமை உங்கள் சமூகத்தில் நீடித்த தாக்கத்தை ஏற்படுத்தும்.',
    volunteerTermsMedia: 'தன்னார்வலராக இருக்கும்போது, நாங்கள் எங்கள் பயன்பாட்டிற்காக புகைப்படங்கள், வீடியோக்கள் மற்றும் எழுதப்பட்ட கருத்து/அனுபவத்தை எடுக்கலாம்.',
    volunteerTermsBelongings: 'தயவுசெய்து உங்கள் தன்னார்வலராக இருக்கும்போது பணம், ச baggage ஜம் மற்றும் தனிப்பட்ட விஷயங்கள் போன்ற உங்கள் அனைத்து சொத்துக்களையும் நீங்கள் கவனித்துக்கொள்கிறீர்கள் என்பதை உறுதிப்படுத்தவும்.',
    volunteerTermsLiability: 'உங்கள் தன்னார்வலர் காலத்தில் உங்கள் பணம், ச baggage ஜம் மற்றும் தனிப்பட்ட விஷயங்களின் எந்தவிதமான இழப்பு/திருட்டுக்கும் நாங்கள் பொறுப்பல்ல.',
    volunteerTermsConfidential: 'உங்கள் செயல்பாடு எங்களைப் பற்றிய, உங்களுக்கு ஒப்படைக்கப்பட்ட பாடங்கள் மற்றும் பணிகளைப் பற்றிய சில தகவல்களை அறிய உள்ளடக்கியிருக்கலாம். இத்தகைய தகவல்கள் "ரகசிய தகவல்" எனக் கருதப்படும் மற்றும் சட்டத்தால் தேவைப்படாத வரை எங்கள் முன் அனுமதியுடன் யாருடனும் பகிர்ந்து கொள்ளாதீர்கள்.',
    volunteerTermsConduct: 'தன்னார்வலராக, உங்களுக்கும் எங்களைச் சுற்றியுள்ள மற்றவர்களுக்கும் பாதுகாப்பான, ஆதரவான, கற்றல் சூழலை உருவாக்கும் வகையில் இருக்க வேண்டும். எனவே, எந்தவிதமான சீர்குலைக்கும் பேச்சு அல்லது நடத்தையில் ஈடுபட வேண்டாம் என்று கேட்டுக்கொள்கிறோம்.',
    volunteerTermsSubstances: 'புகைபிடித்தல், மது அருந்துதல் அல்லது எந்தவிதமான மாயத்திரவியம் அல்லது தடைசெய்யப்பட்ட மருந்தை உட்கொள்வது கண்டிப்பாக அனுமதிக்கப்படாது.',
    volunteerTermsStandards: 'அனைத்து தன்னார்வலர் செயல்பாடுகளையும் உயர் தரங்கள் மற்றும் நல்ல சுவையுடன் நடத்துவதற்கு நீங்கள் ஒப்புக்கொள்கிறீர்கள், மேலும் எங்கள் புகழ் அல்லது நல்லெண்ணத்திற்கு தீங்கு விளைவிக்க எதுவும் செய்ய மாட்டீர்கள்.',
    volunteerTermsDocumentation: 'தன்னார்வலராக உங்கள் பதிவுக்கு தேவையான அனைத்து விவரங்கள் மற்றும் ஆவணங்களையும் வழங்குவதற்கு நீங்கள் ஒப்புக்கொள்கிறீர்கள்.',
    volunteerTermsForceMajeure: '"பல வலிமை நிகழ்வு" நிகழ்வில், இதில் அரசாங்க கட்டுப்பாடுகள், கலகங்கள், பயங்கரவாத தாக்குதல்கள், தொற்றுநோய்கள், தனிமைப்படுத்தல், தொற்றுநோய்கள், நிலநடுக்கங்கள், புயல்கள், வெள்ளம், மின்னல் போன்ற இயற்கை பேரழிவுகள் அல்லது கடவுளின் செயல்கள் ஆகியவை அடங்கும், நாங்கள் திட்டத்தை ரத்து செய்ய உரிமை கொண்டுள்ளோம்.',
    volunteerTermsCancellation: 'உங்கள் தன்னார்வலர் ரத்து செய்யப்பட்டால் உங்களுக்கு தெரிவிக்கப்படும், மேலும் அந்த தகவலைக் கருத்தில் கொண்டு நீங்கள் உங்கள் பயணத் திட்டங்களை சரிசெய்ய வேண்டும்.',
    volunteerTermsCancellationLiability: 'உங்கள் தன்னார்வலர் ரத்து செய்வதன் விளைவாக நீங்கள் எந்தவிதமான இழப்பு மற்றும்/அல்லது சேதத்தையும், எந்த தன்மையிலும், நாங்கள் பொறுப்பல்ல.',
    volunteerTermsConsent: 'தன்னார்வலருடன் தொடர்புடைய பதிவு செய்யும்போது நீங்கள் எங்களுக்கு வழங்கிய உங்கள் தனிப்பட்ட தகவல்களின் சேகரிப்பு மற்றும் பயன்பாட்டிற்கு நீங்கள் உங்கள் சம்மதத்தை வழங்குகிறீர்கள். எதிர்காலத்தில் வரக்கூடிய மேலும் தன்னார்வலர் வாய்ப்புகளின் விவரங்களை அனுப்ப நாங்கள் உங்கள் தகவலைப் பயன்படுத்தலாம்.',
    volunteerTermsFinal: 'Diya Charitable Trust எந்தவிதமான சேதங்களுக்கும் வேண்டுமென்றே அல்லது தற்செயலாகவே எந்த வழக்கிலும் பொறுப்பல்ல, எனவே நீங்கள் முதிர்ச்சியுடன் செயல்படவும், செயல்களுக்கு உரிமையை எடுத்துக்கொள்ளவும் அறிவுறுத்தப்படுகிறீர்கள்.',
    acceptTerms: 'நான் விதிமுறைகள் & நிபந்தனைகளைப் படித்து ஒப்புக்கொள்கிறேன்',
    acceptTermsRequired: 'உங்கள் விண்ணப்பத்தை சமர்ப்பிக்க நீங்கள் விதிமுறைகள் மற்றும் நிபந்தனைகளை ஏற்க வேண்டும்.',
    // Footer
    contactUs: 'எங்களைத் தொடர்பு கொள்ளுங்கள்',
    generalInquiries: 'பொது விசாரணைகள்',
    emergency: 'அவசரகால',
    officeLocation: 'அலுவலக இடம்',
    officeHours: 'அலுவலக நேரங்கள்',
    mondayFriday: 'திங்கள் - வெள்ளி: 9:00 AM - 6:00 PM',
    saturday: 'சனிக்கிழமை: 10:00 AM - 4:00 PM',
    sunday: 'ஞாயிற்றுக்கிழமை: மூடப்பட்டது',
    quickLinks: 'விரைவு இணைப்புகள்',
    legal: 'சட்டம்',
    followUs: 'எங்களைப் பின்தொடரவும்',
    india: 'இந்தியா',
    // Community Feedback Testimonials
    testimonial1Quote: 'டியா சாரிட்டி எங்கள் குழந்தைகளுக்கு இலவச கல்வி வழங்குவதன் மூலம் எங்கள் சமூகத்தை மாற்றியுள்ளது. அவர்கள் உண்மையில் வாழ்க்கையை ஒளிரச் செய்கிறார்கள்!',
    testimonial1Author: 'விஜயா',
    testimonial2Quote: 'டியா சாரிட்டி ஏற்பாடு செய்த சுகாதார முகாம்கள் எங்கள் கிராமத்திற்கு ஒரு ஆசீர்வாதமாக இருந்துள்ளன. நாங்கள் என்றென்றும் நன்றியுள்ளவர்கள்.',
    testimonial2Author: 'கண்ணன்',
    testimonial3Quote: 'அவர்களின் பெண்கள் அதிகாரமளித்தல் திட்டங்கள் மூலம், நான் என் சொந்த வணிகத்தைத் தொடங்க உதவிய திறன்களைக் கற்றுக்கொண்டேன். நன்றி டியா சாரிட்டி!',
    testimonial3Author: 'கவியா',
  },
};

const languageNames: Record<Language, string> = {
  en: 'English',
  ta: 'Tamil',
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ta')) {
      return savedLanguage;
    }
    // Default to English
    return 'en';
  });

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language);
    // Update document language attribute
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const getLanguageName = (code: Language): string => {
  return languageNames[code];
};

