import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'hi';

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
    // Hero
    heroWelcome: 'Welcome to Diya Charitable Trust (TN)',
    heroMotto: '-Humanity First-',
    heroTitle: 'Illuminating Lives Through Service',
    heroSubtitle: 'Empowering Communities, Building Hope',
    heroCta: 'Join Our Mission',
    // Mission
    missionTitle: 'Our Mission',
    missionDescription: 'At Diya Charity, we are a newly established NGO dedicated to serving society through comprehensive social welfare programs. Our mission is to illuminate lives and bring hope to underserved communities through education, healthcare, women\'s empowerment, and environmental sustainability. Like a diya (lamp) that dispels darkness, we strive to light up the path towards a better tomorrow for all.',
    // Contact
    contactTitle: 'Get in Touch',
    contactDescription: 'Join us in our mission to serve society. Whether you want to volunteer, donate, or partner with us, we would love to hear from you. Together, we can make a difference in the lives of those who need it most.',
    // Footer
    footerCopyright: '© 2035 by Diya Charity.',
    footerPoweredBy: 'Powered and secured by Wix',
    privacyPolicy: 'Privacy Policy',
    accessibilityStatement: 'Accessibility Statement',
    // Mission additional
    missionQuestion1: 'Have you ever felt the sting of hunger born out of extreme poverty - Even sudden urban poverty due to misfortune so deep that you couldn\'t share your struggles with anyone because of family dignity? Have you faced the stress of losing a job, along with the emotional turmoil it brings to you and your family? Have you experienced loneliness or depression from being left behind in the race for success or from the challenges that come with age? Or the pain of missing someone, something, or the helplessness of being unable to meet the needs of your loved ones?',
    missionComfort: 'We are here to be a comforting presence - A healing hand to support you, uplift you, and help you move forward.',
    missionInvitation: 'If you, the reader, feel blessed by God, live in comfort, and feel protected, we invite you to spare your time to join us as a Volunteer (OR) contribute by Donating even a small part of your abundance. Remember, what goes around comes around in multiples!',
    missionAnonymous: 'Our every outreach would be anonymous. None outside would know except professional volunteers! Reach out to us through whatsapp on 1234567890, you may not get instant replies but for sure we will reach out to you !',
    missionActions: 'It doesn\'t matter who we are ! Let our actions speak !!',
    volunteer: 'Volunteer',
    ourCompliance: 'OUR COMPLIANCE',
    // Donation
    needSupport: 'NEED SUPPORT - DONATE',
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
    proceedPayment: 'Proceed to Payment',
    directPayment: 'Direct Payment Details',
    scanPay: 'Scan & Pay (UPI)',
    upiQr: 'UPI QR',
    upiPlaceholder: '[Placeholder for Trust\'s UPI QR Code Image]',
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
    willBeShared: '---------- Will be Shared with program sponsors -------------',
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
    // Primary Activities
    primaryActivitiesTitle: 'Our Primary Activities & Impact Areas',
    buddingMinds: 'Budding Minds',
    buddingMindsDesc: 'Bridging school dropout gaps, skill training, and job placement assistance for underprivileged youth.',
    youthLeap: 'Youth Leap',
    youthLeapDesc: 'Skill training, psychological counseling, and placement support specifically designed for youth empowerment.',
    vulnerableWomenFamilies: 'Vulnerable Women & Families',
    vulnerableWomenFamiliesDesc: 'Skill training, job placement, and self-help group formation focused on economic stability for women.',
    oldAgeCare: 'Old Age Care',
    oldAgeCareDesc: 'Palliative care, counseling, and accessible healthcare services for the elderly community.',
    supportSustainability: 'Support & Sustainability',
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
    testimonial1Quote: 'Diya Charity has transformed our community by providing free education to our children. They truly light up lives!',
    testimonial1Author: 'Vijaya',
    testimonial2Quote: 'The healthcare camps organized by Diya Charity have been a blessing for our village. We are forever grateful.',
    testimonial2Author: 'Kannan',
    testimonial3Quote: 'Through their women empowerment programs, I learned skills that helped me start my own business. Thank you Diya Charity!',
    testimonial3Author: 'Kaviya',
  },
  ta: {
    // Header
    donate: 'நன்கொடை',
    // Hero
    heroWelcome: 'Diya Charitable Trust (TN) உங்களை வரவேற்கிறது',
    heroMotto: '-மனிதாபிமானம் முதலில்-',
    heroTitle: 'சேவை மூலம் வாழ்க்கையை ஒளிரச் செய்தல்',
    heroSubtitle: 'சமூகங்களை அதிகாரப்படுத்துதல், நம்பிக்கையை உருவாக்குதல்',
    heroCta: 'எங்கள் பணியில் சேரவும்',
    // Mission
    missionTitle: 'எங்கள் பணி',
    missionDescription: 'டியா சாரிட்டியில், நாங்கள் விரிவான சமூக நலநலத் திட்டங்கள் மூலம் சமூகத்திற்கு சேவை செய்வதற்காக அர்ப்பணிக்கப்பட்ட புதிதாக நிறுவப்பட்ட NGO ஆகும். கல்வி, சுகாதாரம், பெண்கள் அதிகாரமளித்தல் மற்றும் சுற்றுச்சூழல் நிலைத்தன்மை மூலம் குறைந்த வசதியுள்ள சமூகங்களுக்கு வாழ்க்கையை ஒளிரச் செய்து நம்பிக்கையைக் கொண்டு வருவதே எங்கள் பணி. இருளைப் போக்கும் தீபம் போல, அனைவருக்கும் ஒரு சிறந்த நாளைக்கான பாதையை ஒளிரச் செய்ய நாங்கள் முயற்சிக்கிறோம்.',
    // Contact
    contactTitle: 'தொடர்பு கொள்ளுங்கள்',
    contactDescription: 'சமூகத்திற்கு சேவை செய்யும் எங்கள் பணியில் எங்களுடன் சேரவும். நீங்கள் தன்னார்வலராக இருக்க விரும்பினாலும், நன்கொடை அளிக்க விரும்பினாலும் அல்லது எங்களுடன் கூட்டாளியாக இருக்க விரும்பினாலும், உங்களிடமிருந்து கேட்க விரும்புகிறோம். ஒன்றாக, அதிகம் தேவைப்படுபவர்களின் வாழ்க்கையில் ஒரு வித்தியாசத்தை ஏற்படுத்தலாம்.',
    // Footer
    footerCopyright: '© 2035 டியா சாரிட்டி மூலம்.',
    footerPoweredBy: 'Wix மூலம் இயக்கப்பட்டது மற்றும் பாதுகாக்கப்பட்டது',
    privacyPolicy: 'தனியுரிமைக் கொள்கை',
    accessibilityStatement: 'அணுகல்தன்மை அறிக்கை',
    // Mission additional
    missionQuestion1: 'தீவிர வறுமையால் ஏற்படும் பசியின் குத்தலை நீங்கள் எப்போதாவது உணர்ந்திருக்கிறீர்களா - குடும்ப கண்ணியம் காரணமாக உங்கள் போராட்டங்களை யாருடனும் பகிர்ந்து கொள்ள முடியாத அளவுக்கு துரதிர்ஷ்டம் காரணமாக திடீர் நகர்ப்புற வறுமை? வேலையை இழப்பதால் ஏற்படும் மன அழுத்தத்தையும், அது உங்களுக்கும் உங்கள் குடும்பத்திற்கும் கொண்டு வரும் உணர்ச்சி குழப்பத்தையும் நீங்கள் எதிர்கொண்டிருக்கிறீர்களா? வெற்றிக்கான பந்தயத்தில் பின்தங்கியதால் அல்லது வயதுடன் வரும் சவால்களால் ஏற்படும் தனிமை அல்லது மனச்சோர்வை நீங்கள் அனுபவித்திருக்கிறீர்களா? அல்லது யாரையோ, எதையோ இழப்பதால் ஏற்படும் வலி அல்லது உங்கள் அன்புக்குரியவர்களின் தேவைகளை பூர்த்தி செய்ய முடியாததால் ஏற்படும் உதவியற்ற நிலை?',
    missionComfort: 'நாங்கள் இங்கே ஒரு ஆறுதல் அளிக்கும் இருப்பு - உங்களை ஆதரிக்க, உங்களை உயர்த்த, மற்றும் முன்னேற உதவும் ஒரு குணப்படுத்தும் கை.',
    missionInvitation: 'நீங்கள், வாசகர், கடவுளால் ஆசீர்வதிக்கப்பட்டவர் என்று உணர்ந்தால், வசதியாக வாழ்கிறீர்கள், மற்றும் பாதுகாக்கப்பட்டவர் என்று உணர்ந்தால், தன்னார்வலராக எங்களுடன் சேர நேரத்தை ஒதுக்குமாறு அல்லது உங்கள் செழுமையின் ஒரு சிறிய பகுதியையும் நன்கொடையாக பங்களிக்குமாறு அழைக்கிறோம். நினைவில் கொள்ளுங்கள், சுற்றி வருவது பெருக்கங்களில் வரும்!',
    missionAnonymous: 'எங்கள் ஒவ்வொரு வெளியீடும் அநாமதேயமாக இருக்கும். தொழில்முறை தன்னார்வலர்களைத் தவிர வேறு யாருக்கும் தெரியாது! 1234567890 என்ற whatsapp மூலம் எங்களைத் தொடர்பு கொள்ளுங்கள், நீங்கள் உடனடி பதில்களைப் பெறாமல் போகலாம் ஆனால் நிச்சயமாக நாங்கள் உங்களைத் தொடர்பு கொள்வோம்!',
    missionActions: 'நாங்கள் யார் என்பது முக்கியமல்ல! எங்கள் செயல்கள் பேசட்டும் !!',
    volunteer: 'தன்னார்வலர்',
    ourCompliance: 'எங்கள் இணக்கம்',
    // Donation
    needSupport: 'ஆதரவு தேவை - நன்கொடை',
    taxBenefit: 'வரி நன்மை பெறுங்கள் (80G கீழ்)',
    taxBenefitDesc: 'நன்கொடைகள் பிரிவு 80G விலக்குக்கு தகுதியானவை. நன்கொடை அளித்த பிறகு எங்கள்',
    taxBenefitDescAfter: 'இல் உங்கள் PAN ஐ பகிர்ந்து கொள்ளுங்கள்.',
    whatsapp: 'WhatsApp',
    lifeIsEcho: 'வாழ்க்கை ஒரு எதிரொலி',
    echo1: 'நீங்கள் அனுப்புவது திரும்ப வரும். நீங்கள் விதைப்பது நீங்கள் அறுவடை செய்வீர்கள்.',
    echo2: 'நீங்கள் கொடுப்பது நீங்கள் பெறுவீர்கள். மற்றவர்களில் நீங்கள் பார்க்கும் விஷயம் உங்களில் உள்ளது.',
    donorInfo: 'நன்கொடையாளர் தகவல் மற்றும் பங்களிப்பு',
    donorName: 'நன்கொடையாளர் பெயர் *',
    phoneNumber: 'தொலைபேசி எண் *',
    emailAddress: 'மின்னஞ்சல் முகவரி *',
    selectAmount: 'நன்கொடை தொகையைத் தேர்ந்தெடுக்கவும் (INR)',
    otherAmount: 'மற்ற தொகை',
    enterCustomAmount: 'தனிப்பயன் தொகையை உள்ளிடவும்',
    proceedPayment: 'கட்டணத்திற்கு தொடரவும்',
    directPayment: 'நேரடி கட்டண விவரங்கள்',
    scanPay: 'ஸ்கேன் & பே (UPI)',
    upiQr: 'UPI QR',
    upiPlaceholder: '[Trust இன் UPI QR குறியீட்டு படத்திற்கான பிளேஸ்ஹோல்டர்]',
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
    willBeShared: '---------- திட்ட நிதியளிப்பாளர்களுடன் பகிரப்படும் -------------',
    // Community Feedback
    communityFeedback: 'சமூக கருத்து',
    // Process
    ourProcess: 'எங்கள் செயல்முறை',
    joinUs: 'எங்களுடன் சேருங்கள்',
    // Impact Stats
    ourImpact: 'எங்கள் தாக்கம்',
    impactDescription: 'எங்கள் தொடக்கத்திலிருந்து, எண்ணற்ற தனிநபர்கள் மற்றும் சமூகங்களின் வாழ்க்கையில் அர்த்தமுள்ள மாற்றத்தை ஏற்படுத்தி வருகிறோம்.',
    childrenEducated: 'குழந்தைகள் கல்வி',
    childrenEducatedDesc: 'வசதியற்ற குழந்தைகளுக்கு தரமான கல்வி வழங்குதல்',
    healthcareCamps: 'சுகாதார முகாம்கள்',
    healthcareCampsDesc: 'கிராமப்புற பகுதிகளில் மருத்துவ முகாம்கள் ஏற்பாடு செய்தல்',
    womenEmpowered: 'பெண்கள் அதிகாரமளிக்கப்பட்டனர்',
    womenEmpoweredDesc: 'பெண்களுக்கு தொழில்முறை திறன்கள் பயிற்சி',
    villagesReached: 'கிராமங்கள் அடைந்தன',
    villagesReachedDesc: 'தொலைதூர சமூகங்களுக்கு எங்கள் சேவைகளை விரிவாக்குதல்',
    joinMakingDifference: 'வித்தியாசத்தை ஏற்படுத்த எங்களுடன் சேருங்கள்',
    joinMakingDifferenceDesc: 'ஒவ்வொரு பங்களிப்பும், எவ்வளவு சிறியதாக இருந்தாலும், அதிகமான மக்களை அடையவும் சமூகங்களில் நீடித்த மாற்றத்தை உருவாக்கவும் எங்களுக்கு உதவுகிறது.',
    donateNow: 'இப்போது நன்கொடை',
    // Annathanam
    annathanam: 'அன்னதானம்',
    annathanamQuote: 'அன்னதானம் அறப்பணி அல்ல - அது சேவை.',
    annathanamDesc1: 'நீங்கள் ஒருவருக்கு உணவு கொடுப்பதில்லை; நீங்கள் அவர்கள் மூலம் கடவுளுக்கு உணவு பரிமாறுகிறீர்கள்.',
    annathanamDesc2: 'பல மரபுகளில், கூறப்படுகிறது:',
    annathanamQuote2: 'உண்பவர் மாறுவேடத்தில் கடவுள்.',
    annathanamDesc3: 'அன்னதானத்தை உணர நீங்கள் தீவிர வறுமையால் ஏற்படும் தீவிர பசியை அனுபவிக்க வேண்டும்! தீவிர வறுமையைத் தவிர, பெருமை மற்றும் சுயமரியாதை காரணமாக பலர் உதவி கேட்க தயங்குகிறார்கள் - இடம்பெயர்ந்த மாணவர்கள், தினசரி தொழிலாளர்களின் குழந்தைகள், தொழிலாளர்கள் தங்களை, அனாதை நாடோடிகள், அல்லது சிறிய வருமானம் ஈட்டினாலும் இன்னும் முன்னேற போராடுபவர்கள் போன்றவர்கள்.',
    annathanamDesc4: 'எங்கள் அன்னதானம் அவர்களின் சுமையை குறைத்து பொருளாதார ஏணியில் மேலே செல்ல உதவ முடியும் என்றால், ஏன் இல்லை? நாங்கள் சாதி சமயம் பாலினம் அல்லது மதத்தைத் தாண்டி பெருமை இல்லாமல் நுழையும் எவருக்கும் உணவு பரிமாறுகிறோம்!',
    // Primary Activities
    primaryActivitiesTitle: 'எங்கள் முதன்மை செயல்பாடுகள் & தாக்க பகுதிகள்',
    buddingMinds: 'முளைக்கும் மனங்கள்',
    buddingMindsDesc: 'பள்ளி கைவிடும் இடைவெளிகளை இணைத்தல், திறன் பயிற்சி, மற்றும் வசதியற்ற இளைஞர்களுக்கு வேலை வைப்பு உதவி.',
    youthLeap: 'இளைஞர் தாவல்',
    youthLeapDesc: 'இளைஞர் அதிகாரமளிப்புக்காக குறிப்பாக வடிவமைக்கப்பட்ட திறன் பயிற்சி, உளவியல் ஆலோசனை, மற்றும் வைப்பு ஆதரவு.',
    vulnerableWomenFamilies: 'எளிதில் பாதிக்கப்படும் பெண்கள் & குடும்பங்கள்',
    vulnerableWomenFamiliesDesc: 'பெண்களுக்கான பொருளாதார நிலைத்தன்மையில் கவனம் செலுத்தும் திறன் பயிற்சி, வேலை வைப்பு, மற்றும் சுய உதவி குழு உருவாக்கம்.',
    oldAgeCare: 'முதியோர் பராமரிப்பு',
    oldAgeCareDesc: 'முதியோர் சமூகத்திற்கான பராமரிப்பு சிகிச்சை, ஆலோசனை, மற்றும் அணுகக்கூடிய சுகாதார சேவைகள்.',
    supportSustainability: 'ஆதரவு & நிலைத்தன்மை',
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
  hi: {
    // Header
    donate: 'दान करें',
    // Hero
    heroWelcome: 'Diya Charitable Trust (TN) में आपका स्वागत है',
    heroMotto: '-मानवता सर्वोपरि-',
    heroTitle: 'सेवा के माध्यम से जीवन को रोशन करना',
    heroSubtitle: 'समुदायों को सशक्त बनाना, आशा का निर्माण करना',
    heroCta: 'हमारे मिशन में शामिल हों',
    // Mission
    missionTitle: 'हमारा मिशन',
    missionDescription: 'दीया चैरिटी में, हम एक नव स्थापित NGO हैं जो व्यापक सामाजिक कल्याण कार्यक्रमों के माध्यम से समाज की सेवा के लिए समर्पित हैं। हमारा मिशन शिक्षा, स्वास्थ्य सेवा, महिला सशक्तिकरण और पर्यावरणीय स्थिरता के माध्यम से वंचित समुदायों के जीवन को रोशन करना और आशा लाना है। एक दीया (दीपक) की तरह जो अंधकार को दूर करता है, हम सभी के लिए एक बेहतर कल का मार्ग प्रशस्त करने का प्रयास करते हैं।',
    // Contact
    contactTitle: 'संपर्क करें',
    contactDescription: 'समाज की सेवा करने के हमारे मिशन में हमसे जुड़ें। चाहे आप स्वयंसेवक बनना चाहते हों, दान करना चाहते हों, या हमारे साथ साझेदारी करना चाहते हों, हम आपसे सुनना पसंद करेंगे। एक साथ, हम उन लोगों के जीवन में एक अंतर ला सकते हैं जिन्हें इसकी सबसे अधिक आवश्यकता है।',
    // Footer
    footerCopyright: '© 2035 दीया चैरिटी द्वारा।',
    footerPoweredBy: 'Wix द्वारा संचालित और सुरक्षित',
    privacyPolicy: 'गोपनीयता नीति',
    accessibilityStatement: 'पहुंच योग्यता विवरण',
    // Mission additional
    missionQuestion1: 'क्या आपने कभी अत्यधिक गरीबी से उत्पन्न भूख की पीड़ा महसूस की है - यहां तक कि दुर्भाग्य के कारण अचानक शहरी गरीबी इतनी गहरी कि आप अपने संघर्षों को परिवार की गरिमा के कारण किसी के साथ साझा नहीं कर सके? क्या आपने नौकरी खोने के तनाव का सामना किया है, साथ ही वह भावनात्मक उथल-पुथल जो यह आपके और आपके परिवार के लिए लाता है? क्या आपने सफलता की दौड़ में पीछे रह जाने या उम्र के साथ आने वाली चुनौतियों से अकेलापन या अवसाद का अनुभव किया है? या किसी को, किसी चीज को याद करने का दर्द, या अपने प्रियजनों की जरूरतों को पूरा करने में असमर्थ होने की असहायता?',
    missionComfort: 'हम यहां एक सांत्वना देने वाली उपस्थिति हैं - आपका समर्थन करने, आपको उठाने और आगे बढ़ने में मदद करने के लिए एक उपचार करने वाला हाथ।',
    missionInvitation: 'यदि आप, पाठक, ईश्वर द्वारा आशीर्वादित महसूस करते हैं, आराम से रहते हैं, और सुरक्षित महसूस करते हैं, तो हम आपको स्वयंसेवक के रूप में हमसे जुड़ने के लिए अपना समय देने के लिए आमंत्रित करते हैं (या) अपनी प्रचुरता का एक छोटा सा हिस्सा भी दान करके योगदान करते हैं। याद रखें, जो चारों ओर जाता है वह गुणकों में वापस आता है!',
    missionAnonymous: 'हमारा हर आउटरीच गुमनाम होगा। पेशेवर स्वयंसेवकों को छोड़कर बाहर किसी को पता नहीं चलेगा! 1234567890 पर whatsapp के माध्यम से हमसे संपर्क करें, आपको तत्काल उत्तर नहीं मिल सकते हैं लेकिन निश्चित रूप से हम आपसे संपर्क करेंगे!',
    missionActions: 'हम कौन हैं इससे कोई फर्क नहीं पड़ता! हमारे कार्य बोलें !!',
    volunteer: 'स्वयंसेवक',
    ourCompliance: 'हमारी अनुपालन',
    // Donation
    needSupport: 'समर्थन की आवश्यकता - दान करें',
    taxBenefit: 'कर लाभ प्राप्त करें (80G के तहत)',
    taxBenefitDesc: 'दान धारा 80G छूट के लिए पात्र हैं। दान करने के बाद हमारे',
    taxBenefitDescAfter: 'पर अपना PAN साझा करें।',
    whatsapp: 'WhatsApp',
    lifeIsEcho: 'जीवन एक प्रतिध्वनि है',
    echo1: 'जो आप भेजते हैं वह वापस आता है। जो आप बोते हैं वही आप काटते हैं।',
    echo2: 'जो आप देते हैं वही आपको मिलता है। दूसरों में जो आप देखते हैं वह आप में मौजूद है।',
    donorInfo: 'दाता जानकारी और योगदान',
    donorName: 'दाता का नाम *',
    phoneNumber: 'फोन नंबर *',
    emailAddress: 'ईमेल पता *',
    selectAmount: 'दान राशि चुनें (INR)',
    otherAmount: 'अन्य राशि',
    enterCustomAmount: 'कस्टम राशि दर्ज करें',
    proceedPayment: 'भुगतान के लिए आगे बढ़ें',
    directPayment: 'प्रत्यक्ष भुगतान विवरण',
    scanPay: 'स्कैन और भुगतान (UPI)',
    upiQr: 'UPI QR',
    upiPlaceholder: '[ट्रस्ट के UPI QR कोड छवि के लिए प्लेसहोल्डर]',
    bankTransfer: 'बैंक ट्रांसफर विवरण',
    accountName: 'खाता नाम',
    bankName: 'बैंक का नाम',
    accountNumber: 'खाता संख्या',
    ifscCode: 'IFSC कोड',
    transactionNote: '*80G रसीद के लिए ईमेल/WhatsApp के माध्यम से लेनदेन विवरण साझा करें।*',
    corporateSponsors: 'हमारे कॉर्पोरेट और सरकारी प्रायोजक',
    underCSR: 'CSR पहल के तहत',
    corporatePartner: 'कॉर्पोरेट भागीदार',
    anticipatingCSR: 'आपके CSR प्रायोजन की प्रतीक्षा कर रहे हैं।',
    metricsImpact: 'मेट्रिक्स और प्रभाव क्षेत्र',
    educationYouth: 'शिक्षा और युवा',
    elderlyCare: 'वृद्ध देखभाल',
    womenFamilies: 'महिलाएं और परिवार',
    emergencyRelief: 'आपातकालीन राहत',
    willBeShared: '---------- कार्यक्रम प्रायोजकों के साथ साझा किया जाएगा -------------',
    // Community Feedback
    communityFeedback: 'समुदाय प्रतिक्रिया',
    // Process
    ourProcess: 'हमारी प्रक्रिया',
    joinUs: 'हमसे जुड़ें',
    // Impact Stats
    ourImpact: 'हमारा प्रभाव',
    impactDescription: 'हमारी स्थापना के बाद से, हम अनगिनत व्यक्तियों और समुदायों के जीवन में सार्थक अंतर ला रहे हैं।',
    childrenEducated: 'बच्चे शिक्षित',
    childrenEducatedDesc: 'वंचित बच्चों को गुणवत्तापूर्ण शिक्षा प्रदान करना',
    healthcareCamps: 'स्वास्थ्य शिविर',
    healthcareCampsDesc: 'ग्रामीण क्षेत्रों में चिकित्सा शिविर आयोजित करना',
    womenEmpowered: 'महिलाएं सशक्त',
    womenEmpoweredDesc: 'महिलाओं को व्यावसायिक कौशल में प्रशिक्षण',
    villagesReached: 'गांव पहुंचे',
    villagesReachedDesc: 'दूरस्थ समुदायों तक अपनी सेवाओं का विस्तार',
    joinMakingDifference: 'अंतर लाने में हमसे जुड़ें',
    joinMakingDifferenceDesc: 'हर योगदान, चाहे वह कितना भी छोटा क्यों न हो, हमें अधिक लोगों तक पहुंचने और समुदायों में स्थायी परिवर्तन लाने में मदद करता है।',
    donateNow: 'अभी दान करें',
    // Annathanam
    annathanam: 'अन्नदान',
    annathanamQuote: 'अन्नदान दान नहीं है - यह सेवा है।',
    annathanamDesc1: 'आप किसी को खाना नहीं देते; आप उनके माध्यम से भगवान को खाना परोसते हैं।',
    annathanamDesc2: 'कई परंपराओं में, कहा जाता है:',
    annathanamQuote2: 'जो खाता है वह भगवान है जो छुपा हुआ है।',
    annathanamDesc3: 'अन्नदान को महसूस करने के लिए आपको अत्यधिक गरीबी के कारण अत्यधिक भूख का अनुभव करने की आवश्यकता है! अत्यधिक गरीबी के अलावा, कई लोग गर्व और आत्म-सम्मान के कारण मदद मांगने से हिचकिचाते हैं - जैसे विस्थापित छात्र, दैनिक मजदूरों के बच्चे, मजदूर खुद, अनाथ खानाबदोश, या वे भी जो छोटी आय कमाते हैं लेकिन फिर भी गुजारा करने के लिए संघर्ष करते हैं।',
    annathanamDesc4: 'यदि हमारा अन्नदान उनके बोझ को कम कर सकता है और उन्हें आर्थिक सीढ़ी पर चढ़ने में मदद कर सकता है, तो क्यों नहीं? हम जाति, पंथ, लिंग या धर्म से परे किसी भी व्यक्ति को बिना गर्व के खाना परोसते हैं!',
    // Primary Activities
    primaryActivitiesTitle: 'हमारी प्राथमिक गतिविधियाँ और प्रभाव क्षेत्र',
    buddingMinds: 'उभरते दिमाग',
    buddingMindsDesc: 'स्कूल ड्रॉपआउट अंतराल को पाटना, कौशल प्रशिक्षण, और वंचित युवाओं के लिए नौकरी प्लेसमेंट सहायता।',
    youthLeap: 'युवा छलांग',
    youthLeapDesc: 'युवा सशक्तिकरण के लिए विशेष रूप से डिज़ाइन किया गया कौशल प्रशिक्षण, मनोवैज्ञानिक परामर्श, और प्लेसमेंट सहायता।',
    vulnerableWomenFamilies: 'कमजोर महिलाएं और परिवार',
    vulnerableWomenFamiliesDesc: 'महिलाओं के लिए आर्थिक स्थिरता पर केंद्रित कौशल प्रशिक्षण, नौकरी प्लेसमेंट, और स्वयं सहायता समूह गठन।',
    oldAgeCare: 'वृद्ध देखभाल',
    oldAgeCareDesc: 'बुजुर्ग समुदाय के लिए पैलिएटिव केयर, परामर्श, और सुलभ स्वास्थ्य सेवाएं।',
    supportSustainability: 'समर्थन और स्थिरता',
    supportSustainabilityDesc: 'दीर्घकालिक सामुदायिक लचीलापन के लिए जागरूकता अभियान और स्थिरता प्रयास।',
    explore: 'अन्वेषण करें',
    // Volunteer Form
    volunteerSignUp: 'स्वयंसेवक पंजीकरण फॉर्म',
    personalInformation: 'व्यक्तिगत जानकारी',
    firstName: 'पहला नाम *',
    gender: 'लिंग',
    selectGender: 'लिंग चुनें',
    male: 'पुरुष',
    female: 'महिला',
    nonBinary: 'नॉन-बाइनरी',
    preferNotToSay: 'कहना पसंद नहीं',
    enterFirstName: 'अपना पहला नाम दर्ज करें',
    volunteerPreferences: 'स्वयंसेवक वरीयताएं',
    eventSetup: 'इवेंट सेटअप',
    registrationDesk: 'पंजीकरण डेस्क',
    hospitalityGuestServices: 'आतिथ्य/अतिथि सेवाएं',
    workshopFacilitation: 'कार्यशाला सुविधा',
    marketingPromotion: 'मार्केटिंग/प्रचार',
    fundraising: 'फंडरेजिंग',
    generalSupport: 'सामान्य सहायता',
    teaching: 'शिक्षण',
    availability: 'उपलब्धता',
    morning: 'सुबह (8am-12pm)',
    afternoon: 'दोपहर (12pm-5pm)',
    evening: 'शाम (5pm-9pm)',
    weekdays: 'सप्ताह के दिन',
    weekends: 'सप्ताहांत',
    flexibleSchedule: 'लचीला कार्यक्रम',
    additionalComments: 'अतिरिक्त टिप्पणियां',
    tellUsWhy: 'हमें बताएं कि आप स्वयंसेवक क्यों बनना चाहते हैं',
    enterAdditionalNotes: 'कोई अतिरिक्त नोट्स, कौशल, या विशिष्ट समय बाधाएं दर्ज करें...',
    submitVolunteerApplication: 'स्वयंसेवक आवेदन जमा करें',
    sending: 'भेज रहे हैं...',
    volunteerTerms: 'जमा करके, आप हमारी स्वयंसेवक शर्तों और नियमों से सहमत हैं।',
    // Footer
    contactUs: 'संपर्क करें',
    generalInquiries: 'सामान्य पूछताछ',
    emergency: 'आपातकाल',
    officeLocation: 'कार्यालय स्थान',
    officeHours: 'कार्यालय समय',
    mondayFriday: 'सोमवार - शुक्रवार: 9:00 AM - 6:00 PM',
    saturday: 'शनिवार: 10:00 AM - 4:00 PM',
    sunday: 'रविवार: बंद',
    quickLinks: 'त्वरित लिंक',
    legal: 'कानूनी',
    followUs: 'हमें फॉलो करें',
    india: 'भारत',
    // Community Feedback Testimonials
    testimonial1Quote: 'डिया चैरिटी ने हमारे बच्चों को मुफ्त शिक्षा प्रदान करके हमारे समुदाय को बदल दिया है। वे वास्तव में जीवन को रोशन करते हैं!',
    testimonial1Author: 'विजया',
    testimonial2Quote: 'डिया चैरिटी द्वारा आयोजित स्वास्थ्य शिविर हमारे गांव के लिए एक वरदान रहे हैं। हम हमेशा आभारी हैं।',
    testimonial2Author: 'कन्नन',
    testimonial3Quote: 'उनके महिला सशक्तिकरण कार्यक्रमों के माध्यम से, मैंने ऐसे कौशल सीखे जिन्होंने मुझे अपना व्यवसाय शुरू करने में मदद की। धन्यवाद डिया चैरिटी!',
    testimonial3Author: 'कविया',
  },
};

const languageNames: Record<Language, string> = {
  en: 'English',
  ta: 'Tamil',
  hi: 'Hindi',
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ta' || savedLanguage === 'hi')) {
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

