// 메인 랜딩페이지 JavaScript

// 스크롤 애니메이션
document.addEventListener('DOMContentLoaded', function() {
    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 스크롤 시 네비게이션 그림자 효과
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-xl');
        } else {
            nav.classList.remove('shadow-xl');
        }
    });

    // 통계 카운터 애니메이션
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stat-number');
    if (statsSection) {
        observer.observe(statsSection.parentElement);
    }

    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // 숫자 포맷팅
                let formatted = Math.floor(current);
                if (stat.textContent.includes('+')) {
                    formatted = formatted + '+';
                }
                if (stat.textContent.includes('%')) {
                    formatted = formatted + '%';
                }
                if (stat.textContent.includes('₩')) {
                    formatted = '₩' + formatted;
                }
                
                stat.textContent = formatted;
            }, 16);
        });
    }

    // AI 챗봇 시뮬레이션
    const aiButtons = document.querySelectorAll('[href*="ai"]');
    aiButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('AI') || this.textContent.includes('어드바이저')) {
                e.preventDefault();
                openAIChatModal();
            }
        });
    });

    // 계산기 버튼 이벤트
    const calculatorButtons = document.querySelectorAll('#calculator button');
    calculatorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const calculatorType = this.closest('.bg-gradient-to-br').querySelector('h3').textContent;
            openCalculatorModal(calculatorType);
        });
    });

    // 졸업생과 대화하기 버튼
    const alumniButton = document.querySelector('button:has-text("졸업생과 대화하기")');
    if (alumniButton) {
        alumniButton.addEventListener('click', function() {
            openAlumniModal();
        });
    }
    
    // 프로그램 동적 로드
    loadPrograms();
});

// 프로그램 동적 로드 함수
function loadPrograms() {
    if (!window.MockAPI) {
        console.log('MockAPI not loaded yet');
        return;
    }
    
    MockAPI.getPrograms().then(programs => {
        const programsContainer = document.querySelector('#programs .grid');
        if (!programsContainer) {
            console.log('Programs container not found');
            return;
        }
        
        // 프로그램 색상 테마 (실제 색상값 사용)
        const themes = [
            { 
                bg: 'linear-gradient(to bottom right, rgb(196 181 253), rgb(129 140 248))',
                headerBg: 'linear-gradient(to bottom right, rgb(192 132 252), rgb(129 140 248))',
                border: '#e9d5ff',
                btnBg: '#9333ea',
                btnHover: '#7e22ce',
                textColor: '#9333ea'
            },
            { 
                bg: 'linear-gradient(to bottom right, rgb(251 207 232), rgb(253 164 175))',
                headerBg: 'linear-gradient(to bottom right, rgb(244 114 182), rgb(251 113 133))',
                border: '#fce7f3',
                btnBg: '#db2777',
                btnHover: '#be185d',
                textColor: '#db2777'
            },
            { 
                bg: 'linear-gradient(to bottom right, rgb(191 219 254), rgb(165 243 252))',
                headerBg: 'linear-gradient(to bottom right, rgb(96 165 250), rgb(34 211 238))',
                border: '#dbeafe',
                btnBg: '#2563eb',
                btnHover: '#1d4ed8',
                textColor: '#2563eb'
            }
        ];
        
        // 모집중인 프로그램만 표시 (최대 3개)
        const openPrograms = programs.filter(p => p.status === 'open').slice(0, 3);
        
        programsContainer.innerHTML = openPrograms.map((program, index) => {
            const theme = themes[index % themes.length];
            const isPopular = program.enrolledStudents >= program.maxStudents * 0.7;
            
            return `
                <div class="rounded-2xl overflow-hidden card-hover border" style="background: ${theme.bg}; border-color: ${theme.border}">
                    <div class="h-48 relative" style="background: ${theme.headerBg}">
                        ${isPopular ? `
                        <div class="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                            인기
                        </div>` : ''}
                    </div>
                    <div class="p-6">
                        <h3 class="text-2xl font-bold mb-2">${program.title}</h3>
                        <p class="text-gray-600 mb-4">${program.description}</p>
                        <div class="flex items-center mb-4 text-sm text-gray-500">
                            <i class="fas fa-${program.type === 'online' ? 'video' : 'users'} mr-2"></i>
                            <span>${program.type === 'online' ? '실시간 Zoom 세션' : '오프라인 수업'}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-2xl font-bold" style="color: ${theme.textColor}">₩${program.price.toLocaleString()}</span>
                            <a href="program-detail.html?id=${program.id}" class="text-white px-6 py-2 rounded-full transition" 
                               style="background-color: ${theme.btnBg}"
                               onmouseover="this.style.backgroundColor='${theme.btnHover}'"
                               onmouseout="this.style.backgroundColor='${theme.btnBg}'">
                                자세히 보기
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        console.log(`${openPrograms.length}개의 프로그램이 로드되었습니다.`);
    }).catch(err => {
        console.error('프로그램 로드 실패:', err);
    });
}

// AI 챗봇 모달 열기
function openAIChatModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div class="p-6 border-b flex justify-between items-center gradient-bg text-white rounded-t-2xl">
                <div>
                    <h3 class="text-2xl font-bold">AI 아트 어드바이저</h3>
                    <p class="text-purple-100 text-sm">무엇이든 물어보세요</p>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="text-white hover:text-gray-200">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <div class="flex-1 overflow-y-auto p-6 space-y-4" id="chat-messages">
                <div class="flex items-start">
                    <div class="w-10 h-10 gradient-bg rounded-full flex items-center justify-center mr-3">
                        <i class="fas fa-robot text-white"></i>
                    </div>
                    <div class="bg-purple-50 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                        <p>안녕하세요! 저는 Edit의 AI 어드바이저입니다. 미술 유학에 대해 궁금한 점이 있으신가요?</p>
                    </div>
                </div>
            </div>
            
            <div class="p-6 border-t">
                <div class="flex space-x-2">
                    <input type="text" id="chat-input" placeholder="메시지를 입력하세요..." 
                        class="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        onkeypress="if(event.key === 'Enter') sendAIMessage()">
                    <button onclick="sendAIMessage()" class="gradient-bg text-white px-6 py-3 rounded-full hover:shadow-lg transition">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                    <button onclick="quickQuestion('어떤 미술대학이 좋을까요?')" class="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-100 transition">
                        어떤 미술대학이 좋을까요?
                    </button>
                    <button onclick="quickQuestion('포트폴리오는 어떻게 준비하나요?')" class="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-100 transition">
                        포트폴리오는 어떻게 준비하나요?
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// AI 메시지 전송
function sendAIMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatMessages = document.getElementById('chat-messages');
    
    // 사용자 메시지 추가
    const userMessage = document.createElement('div');
    userMessage.className = 'flex items-start justify-end';
    userMessage.innerHTML = `
        <div class="bg-purple-600 text-white rounded-2xl rounded-tr-none p-4 max-w-[80%]">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(userMessage);
    
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // AI 응답 시뮬레이션
    setTimeout(() => {
        const aiResponse = getAIResponse(message);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'flex items-start';
        aiMessage.innerHTML = `
            <div class="w-10 h-10 gradient-bg rounded-full flex items-center justify-center mr-3">
                <i class="fas fa-robot text-white"></i>
            </div>
            <div class="bg-purple-50 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                <p>${aiResponse}</p>
            </div>
        `;
        chatMessages.appendChild(aiMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// 빠른 질문
function quickQuestion(question) {
    document.getElementById('chat-input').value = question;
    sendAIMessage();
}

// AI 응답 생성 (고급 시뮬레이션)
function getAIResponse(message) {
    const messageLower = message.toLowerCase();
    
    // 키워드 기반 응답 데이터베이스
    const responses = {
        // 학교 관련
        '미술대학|학교|유학|대학교': {
            keywords: ['미술대학', '학교', '유학', '대학', '진학', 'school', 'university'],
            response: '🎨 세계 Top 10 미술대학을 추천해드릴게요:\n\n미국: Parsons, RISD, Yale, Pratt, SVA\n영국: RCA, UAL, Central Saint Martins\n\n회원님의 관심 분야(회화/디자인/사진 등)를 말씀해주시면, 더 구체적으로 추천해드릴 수 있습니다! 😊'
        },
        // 포트폴리오 관련
        '포트폴리오|작품': {
            keywords: ['포트폴리오', '작품', 'portfolio', '준비', '구성'],
            response: '📁 포트폴리오 준비 가이드:\n\n✅ 작품 수: 15-20점 (학교마다 상이)\n✅ 구성: 다양한 매체와 기법 활용\n✅ 핵심: 당신만의 예술적 비전과 일관성\n✅ 필수: Artist Statement 작성\n\n저희 AI 포트폴리오 분석 서비스로 무료 진단을 받아보세요!'
        },
        // 학비 관련
        '학비|비용|돈|가격': {
            keywords: ['학비', '비용', '돈', '가격', '경비', 'cost', 'tuition'],
            response: '💰 국가별 평균 학비 (연간):\n\n🇺🇸 미국: $40,000-60,000\n🇬🇧 영국: $25,000-40,000\n🇫🇷 프랑스: $10,000-15,000\n🇩🇪 독일: 거의 무료!\n\n장학금으로 30-50% 절감 가능합니다.\n상세 계산은 저희 학비 계산기를 이용해보세요! 🧮'
        },
        // 장학금 관련
        '장학금|지원|후원': {
            keywords: ['장학금', '지원', '후원', 'scholarship', '재정'],
            response: '🏆 장학금 종류:\n\n1️⃣ 성적 우수 장학금 (Merit-based)\n2️⃣ 재정 지원 장학금 (Need-based)\n3️⃣ 다양성 장학금 (Diversity)\n4️⃣ 특정 재능 장학금\n\nGPA 3.5 이상 + 우수 포트폴리오면\n합격률 75% 이상입니다! 💪\n\n장학금 예측기로 확률을 확인해보세요!'
        },
        // 전공 관련
        '전공|과정|분야': {
            keywords: ['전공', '과정', '분야', '전문', 'major', 'course'],
            response: '🎭 인기 미술 전공:\n\n🎨 순수미술: 회화, 조각, 판화\n🖌️ 디자인: 그래픽, 제품, UX/UI\n👗 패션: 디자인, 마케팅, 텍스타일\n📷 미디어: 사진, 영상, 애니메이션\n\n어떤 분야에 관심이 있으신가요?\n각 분야별 추천 학교를 알려드릴게요!'
        },
        // AI 분석 관련
        'ai|인공지능|분석': {
            keywords: ['ai', '인공지능', '분석', 'artificial'],
            response: '🤖 AI 포트폴리오 분석 서비스:\n\n✨ 5,000개 이상의 합격 포트폴리오 학습\n✨ 작품별 강점/약점 분석\n✨ 합격 확률 예측 (정확도 87%)\n✨ 맞춤형 개선 제안\n\n첫 분석은 무료입니다!\n지금 바로 시작해보시겠어요?'
        },
        // 준비 기간 관련
        '기간|시간|언제': {
            keywords: ['기간', '시간', '언제', '얼마나', 'when', 'how long'],
            response: '⏰ 유학 준비 타임라인:\n\n📅 1년 전: 학교 리서치, 포트폴리오 시작\n📅 9개월 전: 포트폴리오 집중 제작\n📅 6개월 전: 영어 시험 (TOEFL/IELTS)\n📅 3개월 전: 지원서 준비, 추천서\n📅 원서 마감: 대부분 12-1월\n\n빠를수록 좋습니다! 지금 시작하세요 🚀'
        },
        // 프로그램 관련
        '프로그램|강의|수업': {
            keywords: ['프로그램', '강의', '수업', 'program', 'course'],
            response: '📚 Edit 인기 프로그램:\n\n⭐ 포트폴리오 마스터클래스 (8주)\n⭐ 파인아트 집중 과정 (8주)\n⭐ 디자인 씽킹 워크샵 (4주)\n\n모든 프로그램은:\n✅ 실시간 Zoom 세션\n✅ 1:1 맞춤 피드백\n✅ 현역 작가 멘토링\n\n어떤 프로그램이 궁금하신가요?'
        },
        // 합격률 관련
        '합격|확률|가능성': {
            keywords: ['합격', '확률', '가능성', 'acceptance', 'admit'],
            response: '📊 Edit 학생 합격 통계:\n\n✅ 전체 합격률: 98%\n✅ Top 10 미대: 87%\n✅ 장학금 수혜율: 65%\n\n성공 비결:\n1. 체계적인 포트폴리오 준비\n2. AI 기반 약점 분석\n3. 전문가 1:1 멘토링\n\n회원님도 충분히 가능합니다! 💪'
        },
        // 영어/토플 관련
        '영어|토플|ielts|toefl': {
            keywords: ['영어', '토플', 'toefl', 'ielts', 'english'],
            response: '📝 영어 시험 요구 사항:\n\n🇺🇸 미국: TOEFL 80-100 / IELTS 6.5-7.5\n🇬🇧 영국: IELTS 6.5-7.0\n\n💡 Tip:\n- 미술 전공은 일반 전공보다 요구 점수가 낮음\n- 일부 학교는 조건부 입학 가능\n- 영어가 부족해도 일단 도전하세요!\n\nIELTS 준비 프로그램도 있습니다 📚'
        }
    };
    
    // 인사말
    if (messageLower.match(/안녕|hi|hello|처음|반가|헬로/)) {
        return '안녕하세요! 👋\n\nEdit AI 어드바이저입니다. 미술 유학에 대한 모든 것을 도와드릴게요!\n\n궁금하신 점을 편하게 물어보세요:\n• 학교 추천이 필요하신가요?\n• 포트폴리오 준비 방법은?\n• 학비나 장학금 정보는?\n• 합격 확률을 알고 싶으신가요?';
    }
    
    // 감사 표현
    if (messageLower.match(/감사|고마워|thank|thanks/)) {
        return '천만에요! 😊\n\n더 궁금하신 점이 있으시면 언제든지 물어보세요.\n\n전문 컨설턴트와 1:1 상담을 원하시면\n"상담 신청" 버튼을 눌러주세요!';
    }
    
    // 키워드 매칭
    for (let category in responses) {
        const data = responses[category];
        for (let keyword of data.keywords) {
            if (messageLower.includes(keyword)) {
                return data.response;
            }
        }
    }
    
    // 복합 질문 감지
    if (messageLower.length > 50) {
        return '자세한 질문 감사합니다! 🙏\n\n회원님의 상황에 맞는 정확한 답변을 위해\n전문 컨설턴트와 1:1 상담을 추천드립니다.\n\n무료 상담은 언제든 가능하며,\n평균 30분 이내 응답드립니다!\n\n지금 바로 신청하시겠어요?';
    }
    
    // 기본 응답
    const defaultResponses = [
        '흥미로운 질문이네요! 🤔\n\n더 구체적으로 말씀해주시면\n정확한 답변을 드릴 수 있어요.\n\n예: "파슨스 합격을 위한 포트폴리오는?"\n"영국 유학 비용은 얼마나 되나요?"',
        '좋은 질문입니다!\n\n이런 키워드로 물어보시면\n더 자세한 정보를 드릴 수 있어요:\n\n💡 학교, 포트폴리오, 학비\n💡 장학금, 전공, 프로그램',
        '회원님의 꿈을 응원합니다! ✨\n\n맞춤형 답변을 위해\n전문 컨설턴트와 상담을 추천드립니다.\n\n1:1 무료 상담 신청하시겠어요?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// 계산기 모달 열기
function openCalculatorModal(type) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    let calculatorContent = '';
    
    if (type.includes('학비')) {
        calculatorContent = `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">국가 선택</label>
                    <select class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>미국</option>
                        <option>영국</option>
                        <option>프랑스</option>
                        <option>독일</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">학위 과정</label>
                    <select class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>학사 (4년)</option>
                        <option>석사 (2년)</option>
                        <option>박사 (4-6년)</option>
                    </select>
                </div>
                <div class="bg-purple-50 rounded-lg p-4 mt-4">
                    <p class="text-sm text-gray-600">예상 총 학비</p>
                    <p class="text-3xl font-bold text-purple-600 mt-2">₩160,000,000</p>
                    <p class="text-xs text-gray-500 mt-1">약 $120,000 (환율 기준)</p>
                </div>
            </div>
        `;
    } else if (type.includes('생활비')) {
        calculatorContent = `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">도시 선택</label>
                    <select class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>뉴욕</option>
                        <option>런던</option>
                        <option>파리</option>
                        <option>베를린</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">거주 형태</label>
                    <select class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>기숙사</option>
                        <option>원룸</option>
                        <option>쉐어하우스</option>
                    </select>
                </div>
                <div class="bg-blue-50 rounded-lg p-4 mt-4">
                    <p class="text-sm text-gray-600">월 예상 생활비</p>
                    <p class="text-3xl font-bold text-blue-600 mt-2">₩2,500,000</p>
                    <p class="text-xs text-gray-500 mt-1">숙박비, 식비, 교통비 포함</p>
                </div>
            </div>
        `;
    }
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-md w-full p-8">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold">${type}</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            ${calculatorContent}
            <button onclick="this.closest('.fixed').remove()" class="w-full mt-6 gradient-bg text-white py-3 rounded-lg hover:shadow-lg transition">
                상세 상담 받기
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 졸업생 모달 열기
function openAlumniModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold">졸업생과 대화하기</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-2xl"></i>
                </button>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div class="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 bg-purple-200 rounded-full mr-4"></div>
                        <div>
                            <h4 class="font-bold text-lg">김서연</h4>
                            <p class="text-gray-600 text-sm">Parsons School of Design</p>
                            <p class="text-purple-600 text-sm">패션 디자인 전공</p>
                        </div>
                    </div>
                    <p class="text-gray-700 text-sm mb-4">
                        온라인으로 시작해서 뉴욕으로 전환했어요. 비용도 절약하고 준비 시간도 충분히 가질 수 있었습니다.
                    </p>
                    <button class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                        대화 신청하기
                    </button>
                </div>
                
                <div class="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 bg-pink-200 rounded-full mr-4"></div>
                        <div>
                            <h4 class="font-bold text-lg">이준호</h4>
                            <p class="text-gray-600 text-sm">Royal College of Art</p>
                            <p class="text-pink-600 text-sm">그래픽 디자인 전공</p>
                        </div>
                    </div>
                    <p class="text-gray-700 text-sm mb-4">
                        AI 포트폴리오 분석 덕분에 약점을 보완하고 합격할 수 있었습니다. 정말 획기적이었어요.
                    </p>
                    <button class="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">
                        대화 신청하기
                    </button>
                </div>
                
                <div class="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 bg-blue-200 rounded-full mr-4"></div>
                        <div>
                            <h4 class="font-bold text-lg">박지민</h4>
                            <p class="text-gray-600 text-sm">Rhode Island School of Design</p>
                            <p class="text-blue-600 text-sm">순수미술 전공</p>
                        </div>
                    </div>
                    <p class="text-gray-700 text-sm mb-4">
                        현역 작가님과의 1:1 멘토링이 제 작품 세계를 완전히 바꿔놓았습니다. 감사합니다!
                    </p>
                    <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        대화 신청하기
                    </button>
                </div>
                
                <div class="border rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 bg-green-200 rounded-full mr-4"></div>
                        <div>
                            <h4 class="font-bold text-lg">최민수</h4>
                            <p class="text-gray-600 text-sm">Central Saint Martins</p>
                            <p class="text-green-600 text-sm">제품 디자인 전공</p>
                        </div>
                    </div>
                    <p class="text-gray-700 text-sm mb-4">
                        Edit의 체계적인 프로그램 덕분에 꿈의 학교에 합격할 수 있었어요. 적극 추천합니다!
                    </p>
                    <button class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                        대화 신청하기
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 모바일 메뉴 토글
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

console.log('Edit 미술 유학 플랫폼 - 메인 페이지 로드 완료');
