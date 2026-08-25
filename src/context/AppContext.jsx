import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'

import {
  PROJECTS,
  NOTIFICATIONS,
  COMPLAINTS,
  STATUS_STEPS,
} from '../data/mockData'

const AppContext = createContext(null)

/*
|--------------------------------------------------------------------------
| TRANSLATIONS
|--------------------------------------------------------------------------
*/

const TRANSLATIONS = {
  en: {
    // Navigation
    home: 'Home',
    report: 'Report an Issue',
    track: 'Track a Complaint',
    map: 'Community Map',
    participate: 'Participate',
    transparency: 'Transparency',
    howItWorks: 'How It Works',

    // Account
    signIn: 'Sign in',
    signOut: 'Sign out',
    dashboard: 'Dashboard',

    // Common
    chooseLanguage: 'Choose language',
    toggleDarkMode: 'Toggle dark mode',
    go: 'Go',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    search: 'Search',
    loading: 'Loading...',
    noResults: 'No results found',

    // Landing
    tellUsWhatsWrong: "Tell us what's wrong.",
    rightPlace: "We'll help get it to the right place.",
    civicDescription:
      'CivicSathi is an AI-assisted civic grievance platform. Report issues the way you would describe them to a neighbour, track resolutions with real evidence, and vote on which local projects deserve funding.',
    reportAnIssue: 'Report an Issue',
    trackAComplaint: 'Track a Complaint',
    complaints: 'Complaints',
    departments: 'Departments',
    categories: 'Categories',
    languages: 'Languages',

    howComplaintMoves: 'How a complaint moves',
    sixSteps:
      'Six steps, from a photo on your phone to a completed repair.',

    reportStep: 'Report',
    understandStep: 'Understand',
    groupStep: 'Group',
    routeStep: 'Route',
    trackStep: 'Track',
    participateStep: 'Participate',

    whatMakesDifferent: 'What makes it different',

    recentlyReported: 'Recently reported',
    viewAll: 'View all',

    // Report
    reportIssueTitle: 'Report an Issue',
    reportIssueDescription:
      'Tell us what is wrong. You can describe the problem in your own words.',
    issueTitle: 'Issue title',
    description: 'Description',
    location: 'Location',
    category: 'Category',
    priority: 'Priority',
    uploadEvidence: 'Upload evidence',
    submitComplaint: 'Submit Complaint',

    // Track
    trackComplaintTitle: 'Track a Complaint',
    complaintId: 'Complaint ID',
    status: 'Status',
    submitted: 'Submitted',
    underReview: 'Under Review',
    assigned: 'Assigned',
    workInProgress: 'Work in Progress',
    resolved: 'Resolved',
    closed: 'Closed',

    // Map
    communityMapTitle: 'Community Map',
    communityMapDescription:
      'Explore reported issues and see what is happening in your community.',

    // Participate
    participateTitle: 'Participate',
    participateDescription:
      'Vote on local projects and help decide what should be built next.',
    vote: 'Vote',
    votes: 'Votes',
    voted: 'Voted',

    // Transparency
    transparencyTitle: 'Transparency',
    transparencyDescription:
      'See how complaints are handled and how public projects are progressing.',

    // How it works
    howItWorksTitle: 'How It Works',
    howItWorksDescription:
      'CivicSathi connects citizens with the departments responsible for solving local problems.',

    // Login
    loginTitle: 'Sign in to CivicSathi',
    name: 'Name',
    continue: 'Continue',

    // Dashboard
    dashboardTitle: 'Your Dashboard',
    myComplaints: 'My Complaints',
    notifications: 'Notifications',
    noNotifications: 'No notifications',

    // Toasts
    voteCounted:
      'Your vote has been counted. Thank you for participating.',
    signedInAs: 'Signed in as',
    movedToNextStage: 'moved to the next stage.',
  },

  hi: {
    // Navigation
    home: 'होम',
    report: 'समस्या की रिपोर्ट करें',
    track: 'शिकायत ट्रैक करें',
    map: 'सामुदायिक मानचित्र',
    participate: 'भाग लें',
    transparency: 'पारदर्शिता',
    howItWorks: 'यह कैसे काम करता है',

    // Account
    signIn: 'साइन इन',
    signOut: 'साइन आउट',
    dashboard: 'डैशबोर्ड',

    // Common
    chooseLanguage: 'भाषा चुनें',
    toggleDarkMode: 'डार्क मोड बदलें',
    go: 'जाएँ',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    close: 'बंद करें',
    back: 'वापस',
    next: 'आगे',
    search: 'खोजें',
    loading: 'लोड हो रहा है...',
    noResults: 'कोई परिणाम नहीं मिला',

    // Landing
    tellUsWhatsWrong: 'हमें बताएं कि क्या गलत है।',
    rightPlace: 'हम इसे सही जगह तक पहुंचाने में मदद करेंगे।',
    civicDescription:
      'CivicSathi एक AI-सहायित नागरिक शिकायत प्लेटफ़ॉर्म है। अपनी समस्या को अपने शब्दों में बताएं, समाधान को वास्तविक प्रमाण के साथ ट्रैक करें और तय करें कि किन स्थानीय परियोजनाओं को फंडिंग मिलनी चाहिए।',
    reportAnIssue: 'समस्या की रिपोर्ट करें',
    trackAComplaint: 'शिकायत ट्रैक करें',
    complaints: 'शिकायतें',
    departments: 'विभाग',
    categories: 'श्रेणियाँ',
    languages: 'भाषाएँ',

    howComplaintMoves: 'शिकायत कैसे आगे बढ़ती है',
    sixSteps:
      'आपके फोन की तस्वीर से लेकर समस्या के समाधान तक छह चरण।',

    reportStep: 'रिपोर्ट',
    understandStep: 'समझना',
    groupStep: 'समूह बनाना',
    routeStep: 'सही विभाग',
    trackStep: 'ट्रैक करना',
    participateStep: 'भागीदारी',

    whatMakesDifferent: 'इसे अलग क्या बनाता है',

    recentlyReported: 'हाल ही में रिपोर्ट की गई समस्याएँ',
    viewAll: 'सभी देखें',

    // Report
    reportIssueTitle: 'समस्या की रिपोर्ट करें',
    reportIssueDescription:
      'हमें बताएं कि क्या गलत है। आप समस्या को अपने शब्दों में बता सकते हैं।',
    issueTitle: 'समस्या का शीर्षक',
    description: 'विवरण',
    location: 'स्थान',
    category: 'श्रेणी',
    priority: 'प्राथमिकता',
    uploadEvidence: 'प्रमाण अपलोड करें',
    submitComplaint: 'शिकायत जमा करें',

    // Track
    trackComplaintTitle: 'शिकायत ट्रैक करें',
    complaintId: 'शिकायत आईडी',
    status: 'स्थिति',
    submitted: 'जमा किया गया',
    underReview: 'समीक्षा में',
    assigned: 'सौंपा गया',
    workInProgress: 'काम चल रहा है',
    resolved: 'समाधान किया गया',
    closed: 'बंद किया गया',

    // Map
    communityMapTitle: 'सामुदायिक मानचित्र',
    communityMapDescription:
      'रिपोर्ट की गई समस्याओं को देखें और जानें कि आपके समुदाय में क्या हो रहा है।',

    // Participate
    participateTitle: 'भाग लें',
    participateDescription:
      'स्थानीय परियोजनाओं के लिए वोट करें और तय करने में मदद करें कि आगे क्या बनाया जाना चाहिए।',
    vote: 'वोट करें',
    votes: 'वोट',
    voted: 'वोट दिया गया',

    // Transparency
    transparencyTitle: 'पारदर्शिता',
    transparencyDescription:
      'देखें कि शिकायतों को कैसे संभाला जा रहा है और सार्वजनिक परियोजनाएँ कैसे आगे बढ़ रही हैं।',

    // How it works
    howItWorksTitle: 'यह कैसे काम करता है',
    howItWorksDescription:
      'CivicSathi नागरिकों को स्थानीय समस्याओं को हल करने के लिए जिम्मेदार विभागों से जोड़ता है।',

    // Login
    loginTitle: 'CivicSathi में साइन इन करें',
    name: 'नाम',
    continue: 'जारी रखें',

    // Dashboard
    dashboardTitle: 'आपका डैशबोर्ड',
    myComplaints: 'मेरी शिकायतें',
    notifications: 'सूचनाएँ',
    noNotifications: 'कोई सूचना नहीं',

    // Toasts
    voteCounted:
      'आपका वोट दर्ज कर लिया गया है। भाग लेने के लिए धन्यवाद।',
    signedInAs: 'इस नाम से साइन इन किया गया:',
    movedToNextStage: 'अगले चरण में भेज दिया गया।',
  },

  or: {
    // Navigation
    home: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
    report: 'ସମସ୍ୟା ରିପୋର୍ଟ କରନ୍ତୁ',
    track: 'ଅଭିଯୋଗ ଟ୍ରାକ୍ କରନ୍ତୁ',
    map: 'ସମୁଦାୟ ମାନଚିତ୍ର',
    participate: 'ଅଂଶଗ୍ରହଣ କରନ୍ତୁ',
    transparency: 'ସ୍ୱଚ୍ଛତା',
    howItWorks: 'ଏହା କିପରି କାମ କରେ',

    // Account
    signIn: 'ସାଇନ୍ ଇନ୍',
    signOut: 'ସାଇନ୍ ଆଉଟ୍',
    dashboard: 'ଡ୍ୟାସବୋର୍ଡ',

    // Common
    chooseLanguage: 'ଭାଷା ବାଛନ୍ତୁ',
    toggleDarkMode: 'ଡାର୍କ ମୋଡ୍ ବଦଳାନ୍ତୁ',
    go: 'ଯାଆନ୍ତୁ',
    submit: 'ଦାଖଲ କରନ୍ତୁ',
    cancel: 'ବାତିଲ୍ କରନ୍ତୁ',
    save: 'ସଞ୍ଚୟ କରନ୍ତୁ',
    close: 'ବନ୍ଦ କରନ୍ତୁ',
    back: 'ପଛକୁ',
    next: 'ପରବର୍ତ୍ତୀ',
    search: 'ଖୋଜନ୍ତୁ',
    loading: 'ଲୋଡ୍ ହେଉଛି...',
    noResults: 'କୌଣସି ଫଳାଫଳ ମିଳିଲା ନାହିଁ',

    // Landing
    tellUsWhatsWrong: 'କଣ ଭୁଲ୍ ଅଛି ଆମକୁ କୁହନ୍ତୁ।',
    rightPlace: 'ଆମେ ଏହାକୁ ସଠିକ୍ ସ୍ଥାନକୁ ପହଞ୍ଚାଇବାରେ ସାହାଯ୍ୟ କରିବୁ।',
    civicDescription:
      'CivicSathi ହେଉଛି ଏକ AI-ସହାୟିତ ନାଗରିକ ଅଭିଯୋଗ ପ୍ଲାଟଫର୍ମ। ନିଜ ଭାଷାରେ ସମସ୍ୟା ରିପୋର୍ଟ କରନ୍ତୁ, ପ୍ରକୃତ ପ୍ରମାଣ ସହିତ ସମାଧାନକୁ ଟ୍ରାକ୍ କରନ୍ତୁ ଏବଂ କେଉଁ ସ୍ଥାନୀୟ ପ୍ରକଳ୍ପକୁ ଅର୍ଥ ମିଳିବ ତାହାରେ ଭୋଟ୍ ଦିଅନ୍ତୁ।',
    reportAnIssue: 'ସମସ୍ୟା ରିପୋର୍ଟ କରନ୍ତୁ',
    trackAComplaint: 'ଅଭିଯୋଗ ଟ୍ରାକ୍ କରନ୍ତୁ',
    complaints: 'ଅଭିଯୋଗ',
    departments: 'ବିଭାଗ',
    categories: 'ଶ୍ରେଣୀ',
    languages: 'ଭାଷା',

    howComplaintMoves: 'ଏକ ଅଭିଯୋଗ କିପରି ଆଗକୁ ବଢ଼େ',
    sixSteps:
      'ଆପଣଙ୍କ ଫୋନର ଫଟୋରୁ ସମସ୍ୟା ସମାଧାନ ପର୍ଯ୍ୟନ୍ତ ଛଅଟି ପଦକ୍ଷେପ।',

    reportStep: 'ରିପୋର୍ଟ',
    understandStep: 'ବୁଝିବା',
    groupStep: 'ଗୋଷ୍ଠୀକରଣ',
    routeStep: 'ସଠିକ୍ ବିଭାଗ',
    trackStep: 'ଟ୍ରାକ୍',
    participateStep: 'ଅଂଶଗ୍ରହଣ',

    whatMakesDifferent: 'ଏହାକୁ କଣ ଭିନ୍ନ କରେ',

    recentlyReported: 'ସମ୍ପ୍ରତି ରିପୋର୍ଟ ହୋଇଥିବା ସମସ୍ୟା',
    viewAll: 'ସମସ୍ତ ଦେଖନ୍ତୁ',

    // Report
    reportIssueTitle: 'ସମସ୍ୟା ରିପୋର୍ଟ କରନ୍ତୁ',
    reportIssueDescription:
      'କଣ ଭୁଲ୍ ଅଛି ଆମକୁ କୁହନ୍ତୁ। ଆପଣ ନିଜ ଶବ୍ଦରେ ସମସ୍ୟା ବର୍ଣ୍ଣନା କରିପାରିବେ।',
    issueTitle: 'ସମସ୍ୟାର ଶୀର୍ଷକ',
    description: 'ବିବରଣୀ',
    location: 'ସ୍ଥାନ',
    category: 'ଶ୍ରେଣୀ',
    priority: 'ପ୍ରାଥମିକତା',
    uploadEvidence: 'ପ୍ରମାଣ ଅପଲୋଡ୍ କରନ୍ତୁ',
    submitComplaint: 'ଅଭିଯୋଗ ଦାଖଲ କରନ୍ତୁ',

    // Track
    trackComplaintTitle: 'ଅଭିଯୋଗ ଟ୍ରାକ୍ କରନ୍ତୁ',
    complaintId: 'ଅଭିଯୋଗ ID',
    status: 'ସ୍ଥିତି',
    submitted: 'ଦାଖଲ ହୋଇଛି',
    underReview: 'ସମୀକ୍ଷା ଚାଲିଛି',
    assigned: 'ଦାୟିତ୍ୱ ଦିଆଯାଇଛି',
    workInProgress: 'କାମ ଚାଲିଛି',
    resolved: 'ସମାଧାନ ହୋଇଛି',
    closed: 'ବନ୍ଦ ହୋଇଛି',

    // Map
    communityMapTitle: 'ସମୁଦାୟ ମାନଚିତ୍ର',
    communityMapDescription:
      'ରିପୋର୍ଟ ହୋଇଥିବା ସମସ୍ୟାଗୁଡ଼ିକୁ ଦେଖନ୍ତୁ ଏବଂ ଆପଣଙ୍କ ସମୁଦାୟରେ କଣ ଘଟୁଛି ଜାଣନ୍ତୁ।',

    // Participate
    participateTitle: 'ଅଂଶଗ୍ରହଣ କରନ୍ତୁ',
    participateDescription:
      'ସ୍ଥାନୀୟ ପ୍ରକଳ୍ପଗୁଡ଼ିକ ପାଇଁ ଭୋଟ୍ ଦିଅନ୍ତୁ ଏବଂ ପରବର୍ତ୍ତୀରେ କଣ ନିର୍ମାଣ ହେବ ତାହା ନିର୍ଣ୍ଣୟ କରିବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ।',
    vote: 'ଭୋଟ୍ ଦିଅନ୍ତୁ',
    votes: 'ଭୋଟ୍',
    voted: 'ଭୋଟ୍ ଦିଆଯାଇଛି',

    // Transparency
    transparencyTitle: 'ସ୍ୱଚ୍ଛତା',
    transparencyDescription:
      'ଅଭିଯୋଗଗୁଡ଼ିକ କିପରି ପରିଚାଳିତ ହେଉଛି ଏବଂ ସାର୍ବଜନୀନ ପ୍ରକଳ୍ପଗୁଡ଼ିକ କିପରି ଆଗକୁ ବଢ଼ୁଛି ଦେଖନ୍ତୁ।',

    // How it works
    howItWorksTitle: 'ଏହା କିପରି କାମ କରେ',
    howItWorksDescription:
      'CivicSathi ନାଗରିକମାନଙ୍କୁ ସ୍ଥାନୀୟ ସମସ୍ୟା ସମାଧାନ ପାଇଁ ଦାୟୀ ବିଭାଗଗୁଡ଼ିକ ସହିତ ଯୋଡ଼େ।',

    // Login
    loginTitle: 'CivicSathi ରେ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ',
    name: 'ନାମ',
    continue: 'ଜାରି ରଖନ୍ତୁ',

    // Dashboard
    dashboardTitle: 'ଆପଣଙ୍କ ଡ୍ୟାସବୋର୍ଡ',
    myComplaints: 'ମୋର ଅଭିଯୋଗ',
    notifications: 'ବିଜ୍ଞପ୍ତି',
    noNotifications: 'କୌଣସି ବିଜ୍ଞପ୍ତି ନାହିଁ',

    // Toasts
    voteCounted:
      'ଆପଣଙ୍କ ଭୋଟ୍ ଗଣନା କରାଯାଇଛି। ଅଂଶଗ୍ରହଣ କରିଥିବାରୁ ଧନ୍ୟବାଦ।',
    signedInAs: 'ଏହି ନାମରେ ସାଇନ୍ ଇନ୍ କରାଯାଇଛି:',
    movedToNextStage: 'ପରବର୍ତ୍ତୀ ପର୍ଯ୍ୟାୟକୁ ପଠାଯାଇଛି।',
  },
}

let toastId = 0

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [language, setLanguageState] = useState('en')

  const [user, setUser] = useState(null)

  const [projects, setProjects] = useState(PROJECTS)
  const [votedProjects, setVotedProjects] = useState({})

  const [notifications, setNotifications] =
    useState(NOTIFICATIONS)

  const [complaints, setComplaints] =
    useState(COMPLAINTS)

  const [toasts, setToasts] = useState([])

  /*
  |--------------------------------------------------------------------------
  | TRANSLATION FUNCTION
  |--------------------------------------------------------------------------
  */

  const t = useCallback(
    (key) => {
      return (
        TRANSLATIONS[language]?.[key] ??
        TRANSLATIONS.en[key] ??
        key
      )
    },
    [language],
  )

  /*
  |--------------------------------------------------------------------------
  | LANGUAGE
  |--------------------------------------------------------------------------
  */

  const setLanguage = useCallback((newLanguage) => {
    if (
      newLanguage !== 'en' &&
      newLanguage !== 'hi' &&
      newLanguage !== 'or'
    ) {
      return
    }

    setLanguageState(newLanguage)
  }, [])

  /*
  |--------------------------------------------------------------------------
  | STATUS TRANSLATION
  |--------------------------------------------------------------------------
  */

  const tStatus = useCallback(
    (status) => {
      const statusMap = {
        en: {
          Submitted: 'Submitted',
          'Under Review': 'Under Review',
          Assigned: 'Assigned',
          'Work in Progress': 'Work in Progress',
          Resolved: 'Resolved',
          Closed: 'Closed',
        },

        hi: {
          Submitted: 'जमा किया गया',
          'Under Review': 'समीक्षा में',
          Assigned: 'सौंपा गया',
          'Work in Progress': 'काम चल रहा है',
          Resolved: 'समाधान किया गया',
          Closed: 'बंद किया गया',
        },

        or: {
          Submitted: 'ଦାଖଲ ହୋଇଛି',
          'Under Review': 'ସମୀକ୍ଷା ଚାଲିଛି',
          Assigned: 'ଦାୟିତ୍ୱ ଦିଆଯାଇଛି',
          'Work in Progress': 'କାମ ଚାଲିଛି',
          Resolved: 'ସମାଧାନ ହୋଇଛି',
          Closed: 'ବନ୍ଦ ହୋଇଛି',
        },
      }

      return (
        statusMap[language]?.[status] ||
        statusMap.en[status] ||
        status
      )
    },
    [language],
  )

  /*
  |--------------------------------------------------------------------------
  | THEME
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark',
    )
  }, [theme])

  /*
  |--------------------------------------------------------------------------
  | TOASTS
  |--------------------------------------------------------------------------
  */

  const pushToast = useCallback(
    (message, tone = 'default') => {
      const id = ++toastId

      setToasts((current) => [
        ...current,
        {
          id,
          message,
          tone,
        },
      ])

      setTimeout(() => {
        setToasts((current) =>
          current.filter(
            (toast) => toast.id !== id,
          ),
        )
      }, 3600)
    },
    [],
  )

  const dismissToast = useCallback((id) => {
    setToasts((current) =>
      current.filter(
        (toast) => toast.id !== id,
      ),
    )
  }, [])

  /*
  |--------------------------------------------------------------------------
  | PROJECT VOTING
  |--------------------------------------------------------------------------
  */

  const voteProject = useCallback(
    (projectId) => {
      if (votedProjects[projectId]) {
        return
      }

      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? {
                ...project,
                votes: project.votes + 1,
              }
            : project,
        ),
      )

      setVotedProjects((prev) => ({
        ...prev,
        [projectId]: true,
      }))

      pushToast(
        t('voteCounted'),
        'success',
      )
    },
    [votedProjects, pushToast, t],
  )

  /*
  |--------------------------------------------------------------------------
  | NOTIFICATIONS
  |--------------------------------------------------------------------------
  */

  const markNotificationsRead =
    useCallback(() => {
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          read: true,
        })),
      )
    }, [])

  /*
  |--------------------------------------------------------------------------
  | COMPLAINTS
  |--------------------------------------------------------------------------
  */

  const addComplaint = useCallback(
    (complaint) => {
      setComplaints((prev) => [
        complaint,
        ...prev,
      ])
    },
    [],
  )

  const supportComplaint = useCallback(
    (complaintId) => {
      setComplaints((prev) =>
        prev.map((complaint) =>
          complaint.id === complaintId
            ? {
                ...complaint,
                supportCount:
                  complaint.supportCount + 1,
              }
            : complaint,
        ),
      )
    },
    [],
  )

  /*
  |--------------------------------------------------------------------------
  | ADVANCE COMPLAINT STATUS
  |--------------------------------------------------------------------------
  */

  const advanceComplaintStatus =
    useCallback(
      (complaintId, note) => {
        setComplaints((prev) =>
          prev.map((complaint) => {
            if (
              complaint.id !== complaintId
            ) {
              return complaint
            }

            const currentIndex =
              STATUS_STEPS.indexOf(
                complaint.status,
              )

            if (
              currentIndex === -1 ||
              currentIndex >=
                STATUS_STEPS.length - 1
            ) {
              return complaint
            }

            const nextStatus =
              STATUS_STEPS[
                currentIndex + 1
              ]

            const entry = {
              step: nextStatus,
              date: new Date()
                .toISOString()
                .slice(0, 10),
              note:
                note ||
                `Updated to "${nextStatus}" by the department officer.`,
            }

            return {
              ...complaint,

              status: nextStatus,

              timeline: [
                ...complaint.timeline,
                entry,
              ],

              evidence:
                nextStatus === 'Resolved'
                  ? {
                      ...complaint.evidence,
                      resolution:
                        complaint.evidence
                          ?.resolution ||
                        'uploaded',
                    }
                  : nextStatus ===
                      'Work in Progress'
                    ? {
                        ...complaint.evidence,
                        progress:
                          complaint.evidence
                            ?.progress ||
                          'uploaded',
                      }
                    : complaint.evidence,
            }
          }),
        )

        pushToast(
          `${complaintId} ${t(
            'movedToNextStage',
          )}`,
          'success',
        )
      },
      [pushToast, t],
    )

  /*
  |--------------------------------------------------------------------------
  | LOGIN
  |--------------------------------------------------------------------------
  */

  const login = useCallback(
    (name, role) => {
      setUser({
        name,
        role,
      })

      pushToast(
        `${t('signedInAs')} ${name}.`,
        'success',
      )
    },
    [pushToast, t],
  )

  /*
  |--------------------------------------------------------------------------
  | LOGOUT
  |--------------------------------------------------------------------------
  */

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  /*
  |--------------------------------------------------------------------------
  | CONTEXT VALUE
  |--------------------------------------------------------------------------
  */

  const value = {
    // Theme
    theme,
    setTheme,

    // Language
    language,
    setLanguage,
    t,
    tStatus,

    // User
    user,
    login,
    logout,

    // Projects
    projects,
    voteProject,
    votedProjects,

    // Notifications
    notifications,
    markNotificationsRead,

    // Complaints
    complaints,
    addComplaint,
    supportComplaint,
    advanceComplaintStatus,
    //Toasts
    toasts,
    pushToast,
    dismissToast,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

/*
|--------------------------------------------------------------------------
| USE APP HOOK
|--------------------------------------------------------------------------
*/

export function useApp() {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error(
      'useApp must be used within AppProvider',
    )
  }

  return context
}