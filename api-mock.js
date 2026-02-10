// Mock API - 실제 백엔드 구현 전 테스트용 데이터

// 아티스트 데이터
const mockArtists = [
    {
        id: 1,
        name: "김아트",
        email: "kim@art.com",
        field: "현대미술, 회화",
        studentCount: 42,
        rating: 4.9,
        status: "active",
        bio: "현대미술 작가로 20년 경력. 파슨스 디자인 스쿨 졸업",
        profileImage: "/images/artists/kim.jpg",
        expertise: ["회화", "현대미술", "포트폴리오 리뷰"],
        education: [
            { school: "Parsons School of Design", degree: "MFA", year: 2005 }
        ],
        exhibitions: [
            { title: "Modern Perspectives", location: "서울 갤러리", year: 2023 }
        ]
    },
    {
        id: 2,
        name: "이디자인",
        email: "lee@design.com",
        field: "산업디자인, UX",
        studentCount: 38,
        rating: 4.8,
        status: "active",
        bio: "산업디자이너 및 UX 전문가. RCA 졸업",
        profileImage: "/images/artists/lee.jpg",
        expertise: ["산업디자인", "UX/UI", "디자인 씽킹"],
        education: [
            { school: "Royal College of Art", degree: "MA", year: 2010 }
        ]
    },
    {
        id: 3,
        name: "박조각",
        email: "park@sculpture.com",
        field: "조각, 설치미술",
        studentCount: 25,
        rating: 4.7,
        status: "active",
        bio: "현대 조각가. 국내외 다수 전시 참여",
        profileImage: "/images/artists/park.jpg",
        expertise: ["조각", "설치미술", "공공미술"],
        education: [
            { school: "Rhode Island School of Design", degree: "MFA", year: 2012 }
        ]
    }
];

// 프로그램 데이터
const mockPrograms = [
    {
        id: 1,
        title: "포트폴리오 마스터클래스",
        description: "세계 Top 10 미대 합격생의 노하우",
        instructor: "김아트",
        instructorId: 1,
        type: "online",
        duration: "8주",
        price: 500000,
        currency: "KRW",
        level: "intermediate",
        category: "portfolio",
        maxStudents: 30,
        enrolledStudents: 23,
        startDate: "2026-03-01",
        schedule: "매주 토요일 14:00-16:00",
        syllabus: [
            "Week 1: 포트폴리오 기획",
            "Week 2: 작품 선정 및 구성",
            "Week 3-6: 작품 제작 및 피드백",
            "Week 7-8: 최종 포트폴리오 완성"
        ],
        status: "open",
        thumbnail: "/images/programs/portfolio.jpg"
    },
    {
        id: 2,
        title: "파인아트 집중 과정",
        description: "현대미술 작가와의 8주 프로젝트",
        instructor: "김아트",
        instructorId: 1,
        type: "online",
        duration: "8주",
        price: 1200000,
        currency: "KRW",
        level: "advanced",
        category: "fine-art",
        maxStudents: 10,
        enrolledStudents: 8,
        startDate: "2026-03-15",
        schedule: "매주 목요일 19:00-22:00",
        status: "open",
        thumbnail: "/images/programs/fine-art.jpg"
    },
    {
        id: 3,
        title: "디자인 씽킹 워크샵",
        description: "산업 디자이너와의 실전 프로젝트",
        instructor: "이디자인",
        instructorId: 2,
        type: "online",
        duration: "4주",
        price: 800000,
        currency: "KRW",
        level: "beginner",
        category: "design",
        maxStudents: 25,
        enrolledStudents: 20,
        startDate: "2026-02-20",
        schedule: "매주 화요일 18:00-21:00",
        status: "open",
        thumbnail: "/images/programs/design-thinking.jpg"
    }
];

// Zoom 세션 데이터
const mockZoomSessions = [
    {
        id: 1,
        title: "포트폴리오 리뷰",
        instructor: "김아트",
        instructorId: 1,
        programId: 1,
        date: "2026-02-10",
        time: "14:00",
        duration: 2,
        maxParticipants: 30,
        currentParticipants: 18,
        status: "ongoing",
        zoomLink: "https://zoom.us/j/123456789",
        meetingId: "123 456 789",
        passcode: "edit2026",
        recordingEnabled: true,
        description: "1-3주차 학생들의 포트폴리오 중간 리뷰"
    },
    {
        id: 2,
        title: "디자인 씽킹 워크샵",
        instructor: "이디자인",
        instructorId: 2,
        programId: 3,
        date: "2026-02-11",
        time: "10:00",
        duration: 3,
        maxParticipants: 25,
        currentParticipants: 20,
        status: "scheduled",
        zoomLink: "https://zoom.us/j/987654321",
        meetingId: "987 654 321",
        passcode: "design26",
        recordingEnabled: true,
        description: "실전 프로젝트 시작 및 팀 빌딩"
    },
    {
        id: 3,
        title: "조각 기법 특강",
        instructor: "박조각",
        instructorId: 3,
        date: "2026-02-12",
        time: "15:00",
        duration: 2,
        maxParticipants: 15,
        currentParticipants: 12,
        status: "scheduled",
        zoomLink: "https://zoom.us/j/555666777",
        meetingId: "555 666 777",
        passcode: "sculpt26",
        recordingEnabled: false,
        description: "현대 조각 기법 및 재료 탐구"
    }
];

// 학생 데이터
const mockStudents = [
    {
        id: 1,
        name: "김민지",
        email: "minji@email.com",
        phone: "010-1234-5678",
        targetSchools: ["Parsons School of Design", "FIT", "Pratt Institute"],
        targetMajor: "Fashion Design",
        status: "active",
        enrolledPrograms: [1, 2],
        portfolioProgress: 60,
        counselingSessions: 5,
        joinedDate: "2026-01-15",
        lastActivity: "2026-02-09",
        notes: "포트폴리오 진행 순조로움. 추가 멘토링 필요"
    },
    {
        id: 2,
        name: "이준호",
        email: "junho@email.com",
        phone: "010-2345-6789",
        targetSchools: ["Royal College of Art", "Central Saint Martins"],
        targetMajor: "Graphic Design",
        status: "active",
        enrolledPrograms: [3],
        portfolioProgress: 40,
        counselingSessions: 3,
        joinedDate: "2026-01-20",
        lastActivity: "2026-02-08",
        notes: "디자인 씽킹 워크샵 참여 중"
    },
    {
        id: 3,
        name: "박서윤",
        email: "seoyun@email.com",
        phone: "010-3456-7890",
        targetSchools: ["Rhode Island School of Design", "Yale School of Art"],
        targetMajor: "Fine Arts",
        status: "active",
        enrolledPrograms: [2],
        portfolioProgress: 75,
        counselingSessions: 8,
        joinedDate: "2025-12-10",
        lastActivity: "2026-02-10",
        notes: "RISD 지원 준비 중. 포트폴리오 거의 완성"
    }
];

// 대시보드 통계 데이터
const mockDashboardStats = {
    totalStudents: 5247,
    studentGrowth: 12,
    activeArtists: 523,
    artistGrowth: 8,
    monthlySessions: 1832,
    sessionGrowth: 24,
    monthlyRevenue: 84000000,
    revenueGrowth: 18,
    recentEnrollments: [
        { name: "김민지", school: "파슨스 지원", time: "2시간 전" },
        { name: "이준호", school: "RCA 지원", time: "5시간 전" },
        { name: "박서윤", school: "RISD 지원", time: "1일 전" }
    ],
    upcomingSessions: [
        {
            title: "포트폴리오 리뷰",
            instructor: "김아트 작가",
            time: "오늘 14:00 - 16:00",
            status: "진행중"
        },
        {
            title: "디자인 씽킹 워크샵",
            instructor: "이디자인 교수",
            time: "내일 10:00 - 12:00",
            status: "예정"
        }
    ]
};

// 성공 사례 데이터
const mockSuccessStories = [
    {
        id: 1,
        name: "김서연",
        school: "Parsons School of Design",
        major: "패션 디자인",
        year: 2025,
        story: "온라인으로 시작해서 뉴욕으로 전환했어요. 비용도 절약하고 준비 시간도 충분히 가질 수 있었습니다.",
        photo: "/images/alumni/kim-seoyeon.jpg",
        portfolio: "https://seoyeon.portfolio.com",
        linkedIn: "https://linkedin.com/in/seoyeon",
        interview: {
            q1: "Edit을 선택한 이유는?",
            a1: "AI 기반 포트폴리오 분석과 현역 작가님들의 멘토링이 큰 도움이 되었습니다.",
            q2: "가장 기억에 남는 순간은?",
            a2: "파슨스 합격 통보를 받았을 때 가장 먼저 Edit 컨설턴트님께 연락했어요."
        }
    },
    {
        id: 2,
        name: "이준호",
        school: "Royal College of Art",
        major: "그래픽 디자인",
        year: 2024,
        story: "AI 포트폴리오 분석 덕분에 약점을 보완하고 합격할 수 있었습니다. 정말 획기적이었어요.",
        photo: "/images/alumni/lee-junho.jpg",
        portfolio: "https://junho.design",
        linkedIn: "https://linkedin.com/in/junho"
    },
    {
        id: 3,
        name: "박지민",
        school: "Rhode Island School of Design",
        major: "순수미술",
        year: 2025,
        story: "현역 작가님과의 1:1 멘토링이 제 작품 세계를 완전히 바꿔놓았습니다. 감사합니다!",
        photo: "/images/alumni/park-jimin.jpg",
        portfolio: "https://jimin.art",
        linkedIn: "https://linkedin.com/in/jimin"
    }
];

// 계산기 데이터
const mockCalculatorData = {
    tuitionFees: {
        USA: {
            undergraduate: { min: 30000, max: 60000, avg: 45000 },
            graduate: { min: 35000, max: 70000, avg: 50000 }
        },
        UK: {
            undergraduate: { min: 20000, max: 40000, avg: 30000 },
            graduate: { min: 25000, max: 50000, avg: 35000 }
        },
        France: {
            undergraduate: { min: 5000, max: 15000, avg: 10000 },
            graduate: { min: 8000, max: 20000, avg: 12000 }
        },
        Germany: {
            undergraduate: { min: 0, max: 5000, avg: 2000 },
            graduate: { min: 0, max: 8000, avg: 3000 }
        }
    },
    livingCosts: {
        "New York": { rent: 1500, food: 500, transport: 120, misc: 300 },
        "London": { rent: 1200, food: 400, transport: 150, misc: 250 },
        "Paris": { rent: 1000, food: 350, transport: 80, misc: 200 },
        "Berlin": { rent: 800, food: 300, transport: 90, misc: 180 }
    },
    scholarships: {
        merit: { min: 5000, max: 30000, avg: 15000 },
        needBased: { min: 10000, max: 40000, avg: 20000 },
        diversity: { min: 5000, max: 25000, avg: 12000 }
    }
};

// Mock API 함수들
const MockAPI = {
    // 아티스트 관련
    getArtists: () => Promise.resolve(mockArtists),
    getArtistById: (id) => Promise.resolve(mockArtists.find(a => a.id === id)),
    createArtist: (data) => {
        const newArtist = { ...data, id: mockArtists.length + 1 };
        mockArtists.push(newArtist);
        return Promise.resolve(newArtist);
    },
    updateArtist: (id, data) => {
        const index = mockArtists.findIndex(a => a.id === id);
        if (index !== -1) {
            mockArtists[index] = { ...mockArtists[index], ...data };
            return Promise.resolve(mockArtists[index]);
        }
        return Promise.reject(new Error('Artist not found'));
    },
    deleteArtist: (id) => {
        const index = mockArtists.findIndex(a => a.id === id);
        if (index !== -1) {
            mockArtists.splice(index, 1);
            return Promise.resolve({ success: true });
        }
        return Promise.reject(new Error('Artist not found'));
    },

    // 프로그램 관련
    getPrograms: () => Promise.resolve(mockPrograms),
    getProgramById: (id) => Promise.resolve(mockPrograms.find(p => p.id === id)),
    createProgram: (data) => {
        const newProgram = { ...data, id: mockPrograms.length + 1, enrolledStudents: 0 };
        mockPrograms.push(newProgram);
        return Promise.resolve(newProgram);
    },
    updateProgram: (id, data) => {
        const index = mockPrograms.findIndex(p => p.id === id);
        if (index !== -1) {
            mockPrograms[index] = { ...mockPrograms[index], ...data };
            return Promise.resolve(mockPrograms[index]);
        }
        return Promise.reject(new Error('Program not found'));
    },
    deleteProgram: (id) => {
        const index = mockPrograms.findIndex(p => p.id === id);
        if (index !== -1) {
            mockPrograms.splice(index, 1);
            return Promise.resolve({ success: true });
        }
        return Promise.reject(new Error('Program not found'));
    },
    
    // Zoom 세션 관련
    getSessions: () => Promise.resolve(mockZoomSessions),
    getSessionById: (id) => Promise.resolve(mockZoomSessions.find(s => s.id === id)),
    createSession: (data) => {
        const newSession = { ...data, id: mockZoomSessions.length + 1 };
        mockZoomSessions.push(newSession);
        return Promise.resolve(newSession);
    },
    
    // 학생 관련
    getStudents: () => Promise.resolve(mockStudents),
    getStudentById: (id) => Promise.resolve(mockStudents.find(s => s.id === id)),
    
    // 대시보드 통계
    getDashboardStats: () => Promise.resolve(mockDashboardStats),
    
    // 성공 사례
    getSuccessStories: () => Promise.resolve(mockSuccessStories),
    
    // 계산기 데이터
    getCalculatorData: () => Promise.resolve(mockCalculatorData),
    
    // AI 챗봇
    sendChatMessage: (message) => {
        // 간단한 AI 응답 시뮬레이션
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    message: `AI 응답: ${message}에 대한 답변입니다.`,
                    timestamp: new Date().toISOString()
                });
            }, 1000);
        });
    }
};

// 전역으로 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockAPI;
} else {
    window.MockAPI = MockAPI;
}
