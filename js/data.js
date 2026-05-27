const PORTFOLIO_DATA = {
  personal: {
    name: "Adekunle Feranmi",
    title: "Cybersecurity Consultant · Penetration Tester · Security Educator",
    tagline: "Breaking systems to build better ones.",
    location: "Ilorin, Kwara, Nigeria",
    email: "adekunleferanmi080@gmail.com",
    phone: "+234 816 555 7650",
    linkedin: "https://linkedin.com/in/lordz-fedora",
    github: "https://github.com/adekunle-feranmi",
    twitter: "@Lordfedora1",
    whatsapp: "+2348165557650",
    availability: "Available for freelance engagements, security consulting, advisory and educational roles.",
    summary: "Cybersecurity Consultant and Instructor with 5+ years of experience spanning penetration testing, threat analysis, security architecture, and end-to-end cybersecurity training. Founder of HackerTreats and CIO at Cyber Secured Africa. Proficient in industry-standard offensive and defensive tools including Kali Linux, Metasploit, Burp Suite, Splunk, and Wireshark."
  },
  stats: [
    { value: "5+", label: "Years Experience" },
    { value: "30+", label: "Clients Secured" },
    { value: "100+", label: "Vulns Discovered" },
    { value: "130+", label: "Students Taught" },
    { value: "16", label: "Personal Projects" }
  ],
  experience: [
    {
      id: "exp1",
      title: "Moderator & Technical Mentor",
      company: "H4ckerTreats (Founder)",
      period: "Nov 2025 – Present",
      location: "Remote",
      bullets: [
        "Led technical guidance for 10+ interns, achieving a 60% successful project completion rate.",
        "Created a library of 20+ cybersecurity tutorial documents and CTF walkthroughs used as primary training materials.",
        "Moderated forum discussions resolving ~80% of weekly technical queries on cryptography and exploit development."
      ]
    },
    {
      id: "exp2",
      title: "Cybersecurity Instructor",
      company: "MalHUB",
      period: "May 2024 – Present",
      location: "Ilorin, Kwara State",
      bullets: [
        "Developed comprehensive cybersecurity curriculum covering risk assessment, threat mitigation, and incident response; achieved 95% student certification pass rate across three cohorts.",
        "Increased student proficiency by 30% through hands-on labs using Wireshark, Kali Linux, Metasploit, TheHarvester, and Nmap.",
        "Collaborated with industry professionals to keep course content aligned with the latest cybersecurity trends."
      ]
    },
    {
      id: "exp3",
      title: "Chief Information Officer (CIO)",
      company: "Cyber Secured Africa",
      period: "Jun 2023 – Present",
      location: "Ghana (Remote)",
      bullets: [
        "Oversee development and implementation of cybersecurity strategies, improving organizational security posture by 50%.",
        "Lead a team of 15 cybersecurity professionals, ensuring alignment with industry best practices.",
        "Manage IT infrastructure and security protocols, reducing downtime by 30% and achieving 100% regulatory compliance."
      ]
    },
    {
      id: "exp4",
      title: "Cybersecurity Specialist",
      company: "MX Cyber",
      period: "Jan 2025 – Jul 2025",
      location: "Nigeria",
      bullets: [
        "Developed Cryptex Lock — a multifactor cryptography tool enforcing time constraints, location radius, and advanced attribute-based access control.",
        "Engineered temporal, geographic, and attribute-based encryption restrictions to strengthen message security."
      ]
    },
    {
      id: "exp5",
      title: "Cybersecurity Instructor",
      company: "Kuagi Resources",
      period: "Aug 2024 – Oct 2024",
      location: "Ilorin, Kwara State",
      bullets: [
        "Designed and delivered cybersecurity training for 41 students covering ethical hacking, network security, and threat analysis.",
        "Developed hands-on labs using Kali Linux, Metasploit, and pfSense; guided students through vulnerability assessments and penetration testing."
      ]
    },
    {
      id: "exp6",
      title: "Cybersecurity Instructor · Penetration Testing",
      company: "Class1",
      period: "Sep 2023 – Apr 2024",
      location: "Remote",
      bullets: [
        "Designed training programs achieving a 95% certification success rate among 16 participants.",
        "Delivered advanced penetration testing training: vulnerability assessment, exploitation, and post-exploitation phases.",
        "Guided participants using Metasploit, Nmap, and Burp Suite for ethical hacking and security testing."
      ]
    },
    {
      id: "exp7",
      title: "Security Analyst",
      company: "WebOpt",
      period: "Apr 2023 – Nov 2023",
      location: "Ilorin, Nigeria",
      bullets: [
        "Implemented security measures reducing incident reports by 35%.",
        "Collaborated with development teams on secure system integrations, improving client satisfaction by 20%."
      ]
    }
  ],
  projects: [
    {
      id: "proj1",
      type: "TOOL",
      title: "Cryptex Lock",
      description: "A multifactor cryptography tool integrating time constraints, location radius, and advanced attribute-based restrictions for adaptive message security and access control.",
      tags: ["Python", "Cryptography", "Access Control"],
      link: "",
      featured: true,
      progress: []
    },
    {
      id: "proj2",
      type: "TOOL",
      title: "ReconBot",
      description: "Python tool for automated subdomain enumeration, port scanning, and CVE correlation — streamlining the reconnaissance phase of penetration testing engagements.",
      tags: ["Python", "OSINT", "Automation"],
      link: "",
      featured: false,
      progress: []
    },
    {
      id: "proj3",
      type: "TOOL",
      title: "Akid Global Security Toolset",
      description: "Built 37 offensive and defensive security tools in Python, C#, C++, Java, and HTML for an organizational client.",
      tags: ["Python", "C#", "OSINT", "Automation", "C++", "Java", "HTML"],
      link: "",
      featured: true,
      progress: []
    },
    {
      id: "proj4",
      type: "CTF WRITEUP",
      title: "HackTheBox — Forest Machine",
      description: "Full Active Directory exploitation walkthrough covering Kerberoasting and AS-REP roasting techniques.",
      tags: ["AD", "Kerberos", "Windows"],
      link: "",
      featured: false,
      progress: []
    },
    {
      id: "proj5",
      type: "ENGAGEMENT",
      title: "Web App Pentest — FinTech Client",
      description: "Full-scope penetration test uncovering IDOR, broken authentication, and sensitive data exposure vulnerabilities.",
      tags: ["OWASP", "API", "Auth"],
      link: "",
      featured: false,
      progress: []
    }
  ],
  coursework: {
    title: "Masters Level Cybersecurity Courses",
    description: "Took 15 cybersecurity master courses in both the technical and non-technical fields of cybersecurity on behalf of individuals who gave access to their resources.",
    courses: [
      "Organizational Resilience",
      "Ethical Hacking",
      "Cybersecurity Program Management",
      "Cyber Management and Policy Capstone",
      "Enterprise Cybersecurity",
      "Law Regulation and Compliance",
      "Human Factors in Cybersecurity",
      "Cybersecurity Governance",
      "Cyber Risk Management",
      "Cybersecurity Defense Strategies",
      "Foundations of Cybersecurity Management"
    ]
  },
  skills: {
    "Offensive Security": ["Metasploit", "Burp Suite", "Nmap", "SQLMap", "Hydra", "Kali Linux"],
    "Defensive Security": ["Splunk", "Wazuh", "Zeek", "Suricata", "Snort", "IDS/IPS", "SIEM"],
    "Forensics & Analysis": ["Wireshark", "Autopsy", "Volatility", "FTK Imager", "Tcpdump", "AlienVault"],
    "Cloud & Infrastructure": ["AWS Security", "Azure Defender", "Kubernetes", "Terraform"],
    "Languages & Scripting": ["Python", "Bash", "PowerShell", "Go", "C#", "C++", "Java"],
    "Frameworks & Concepts": ["Threat Modelling", "Incident Response", "Risk Management", "OWASP", "Zero Trust"]
  },
  certifications: [
    { name: "Cyber Job Simulation", issuer: "Deloitte", year: "2025" },
    { name: "Ethical Hacker", issuer: "H4ckerTreats", year: "2025" },
    { name: "Junior Cybersecurity Analyst", issuer: "Cisco Networking Academy", year: "2024" },
    { name: "Network Fundamentals", issuer: "Cisco Skills for All", year: "2024" },
    { name: "Networking Basics", issuer: "Cisco Networking Academy", year: "2024" },
    { name: "Introduction to Cybersecurity", issuer: "Coursera / Infosec", year: "2023" },
    { name: "Certificate of Participation — NCSAM23", issuer: "Cybersecurity Education Initiative", year: "2023" }
  ],
  research: [
    { title: "Zero Trust Architecture in SMEs", year: "2024", description: "Analysis of ZTA implementation challenges in small and medium enterprises." },
    { title: "Phishing Campaign Analysis 2023", year: "2023", description: "Study of phishing vectors targeting financial institutions in West Africa." }
  ],
  education: [
    {
      degree: "B.Sc. Information Technology (Minor: Telecommunication Science)",
      school: "University of Ilorin",
      location: "Kwara State, Nigeria",
      period: "Expected 2026"
    }
  ]
};

// Save to localStorage so admin changes persist
function loadData() {
  const saved = localStorage.getItem('portfolio_data');
  if (saved) {
    try { return JSON.parse(saved); } catch(e) {}
  }
  return PORTFOLIO_DATA;
}

function saveData(data) {
  localStorage.setItem('portfolio_data', JSON.stringify(data));
}
