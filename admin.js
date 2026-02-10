// 어드민 페이지 JavaScript

// 섹션 전환
function showSection(sectionName) {
    // 모든 섹션 숨기기
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // 선택된 섹션 보이기
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    
    // 사이드바 활성화 상태 변경
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`a[href="#${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // 페이지 타이틀 변경
    updatePageTitle(sectionName);
}

// 페이지 타이틀 업데이트
function updatePageTitle(sectionName) {
    const titles = {
        'dashboard': {
            title: '대시보드',
            subtitle: '전체 현황을 한눈에 확인하세요'
        },
        'artists': {
            title: '아티스트 관리',
            subtitle: '등록된 아티스트를 관리하세요'
        },
        'programs': {
            title: '프로그램 관리',
            subtitle: '교육 프로그램을 관리하세요'
        },
        'zoom-sessions': {
            title: 'Zoom 세션 관리',
            subtitle: '온라인 세션을 예약하고 관리하세요'
        },
        'students': {
            title: '학생 관리',
            subtitle: '등록된 학생을 관리하세요'
        },
        'content': {
            title: '컨텐츠 관리',
            subtitle: '교육 컨텐츠를 업로드하고 관리하세요'
        },
        'analytics': {
            title: '분석 및 리포트',
            subtitle: '데이터 분석과 통계를 확인하세요'
        },
        'settings': {
            title: '설정',
            subtitle: '시스템 설정을 관리하세요'
        }
    };
    
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    
    if (titles[sectionName]) {
        pageTitle.textContent = titles[sectionName].title;
        pageSubtitle.textContent = titles[sectionName].subtitle;
    }
}

// 아티스트 모달 열기
function openArtistModal() {
    const modal = document.getElementById('artistModal');
    modal.classList.add('active');
}

// 아티스트 모달 닫기
function closeArtistModal() {
    const modal = document.getElementById('artistModal');
    modal.classList.remove('active');
}

// Zoom 모달 열기
function openZoomModal() {
    const modal = document.getElementById('zoomModal');
    modal.classList.add('active');
}

// Zoom 모달 닫기
function closeZoomModal() {
    const modal = document.getElementById('zoomModal');
    modal.classList.remove('active');
}

// 모달 외부 클릭 시 닫기
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// 폼 제출 이벤트 처리
document.addEventListener('DOMContentLoaded', function() {
    // 아티스트 폼 제출
    const artistForm = document.querySelector('#artistModal form');
    if (artistForm) {
        artistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            
            // 여기서 실제로는 서버에 데이터를 전송합니다
            console.log('아티스트 추가:', Object.fromEntries(formData));
            
            // 성공 메시지 표시
            showNotification('아티스트가 성공적으로 추가되었습니다!', 'success');
            
            // 모달 닫기
            closeArtistModal();
            
            // 폼 초기화
            this.reset();
        });
    }
    
    // Zoom 세션 폼 제출
    const zoomForm = document.querySelector('#zoomModal form');
    if (zoomForm) {
        zoomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            console.log('Zoom 세션 생성:', Object.fromEntries(formData));
            
            showNotification('Zoom 세션이 성공적으로 생성되었습니다!', 'success');
            
            closeZoomModal();
            
            this.reset();
        });
    }
    
    // 실시간 검색 기능
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="검색"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('검색어:', searchTerm);
            // 실제 검색 로직 구현
        });
    });
    
    // 통계 애니메이션
    animateStats();
});

// 통계 카드 애니메이션
function animateStats() {
    const statCards = document.querySelectorAll('.stat-card h3');
    
    statCards.forEach(stat => {
        const targetText = stat.textContent;
        const targetNumber = parseInt(targetText.replace(/[^0-9]/g, ''));
        
        if (!isNaN(targetNumber)) {
            let current = 0;
            const increment = targetNumber / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetNumber) {
                    current = targetNumber;
                    clearInterval(timer);
                }
                
                // 숫자 포맷팅
                let formatted = Math.floor(current).toLocaleString('ko-KR');
                
                if (targetText.includes('₩')) {
                    formatted = '₩' + formatted + 'M';
                } else if (targetText.includes(',')) {
                    formatted = formatted.toLocaleString('ko-KR');
                }
                
                stat.textContent = formatted;
            }, 20);
        }
    });
}

// 알림 메시지 표시
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white transition-all transform translate-x-0 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 테이블 정렬
function sortTable(columnIndex) {
    const table = event.target.closest('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent;
        const bValue = b.cells[columnIndex].textContent;
        
        return aValue.localeCompare(bValue);
    });
    
    rows.forEach(row => tbody.appendChild(row));
}

// 데이터 내보내기
function exportData(format) {
    console.log(`데이터를 ${format} 형식으로 내보내기`);
    showNotification(`데이터가 ${format} 형식으로 내보내기되었습니다.`, 'success');
}

// 차트 생성 (Chart.js 사용 시)
function createChart(elementId, type, data) {
    // 실제 Chart.js 라이브러리를 사용할 때의 예시
    console.log(`차트 생성: ${elementId}, 타입: ${type}`);
}

// 필터 적용
function applyFilters() {
    const filters = {
        field: document.querySelector('select[placeholder*="분야"]')?.value,
        status: document.querySelector('select[placeholder*="상태"]')?.value
    };
    
    console.log('필터 적용:', filters);
    showNotification('필터가 적용되었습니다.', 'info');
}

// Zoom 링크 복사
function copyZoomLink(link) {
    navigator.clipboard.writeText(link || 'https://zoom.us/j/123456789').then(() => {
        showNotification('Zoom 링크가 클립보드에 복사되었습니다!', 'success');
    });
}

// 대량 작업
function bulkAction(action) {
    const checkedItems = document.querySelectorAll('input[type="checkbox"]:checked');
    
    if (checkedItems.length === 0) {
        showNotification('선택된 항목이 없습니다.', 'error');
        return;
    }
    
    console.log(`대량 작업 실행: ${action}, 선택된 항목 수: ${checkedItems.length}`);
    showNotification(`${action} 작업이 ${checkedItems.length}개 항목에 적용되었습니다.`, 'success');
}

// 데이터 새로고침
function refreshData() {
    console.log('데이터 새로고침');
    showNotification('데이터가 새로고침되었습니다.', 'success');
    
    // 로딩 애니메이션 표시
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50';
    loadingOverlay.innerHTML = `
        <div class="bg-white rounded-2xl p-8">
            <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
            <p class="mt-4 text-gray-700">데이터를 불러오는 중...</p>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        loadingOverlay.remove();
    }, 1000);
}

// 프로필 이미지 미리보기
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const preview = document.getElementById('image-preview');
            if (preview) {
                preview.src = e.target.result;
                preview.classList.remove('hidden');
            }
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// 드래그 앤 드롭 파일 업로드
function setupDragDrop() {
    const dropZones = document.querySelectorAll('.drop-zone');
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('border-purple-500', 'bg-purple-50');
        });
        
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('border-purple-500', 'bg-purple-50');
        });
        
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('border-purple-500', 'bg-purple-50');
            
            const files = e.dataTransfer.files;
            console.log('업로드된 파일:', files);
            showNotification(`${files.length}개 파일이 업로드되었습니다.`, 'success');
        });
    });
}

// 프로그램 관리 함수들
function loadPrograms() {
    if (!window.MockAPI) return;
    
    MockAPI.getPrograms().then(programs => {
        const tbody = document.getElementById('programs-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = programs.map(program => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <div>
                        <p class="font-semibold">${program.title}</p>
                        <p class="text-sm text-gray-500">${program.description}</p>
                    </div>
                </td>
                <td class="px-6 py-4">${program.instructor}</td>
                <td class="px-6 py-4">${program.duration}</td>
                <td class="px-6 py-4">
                    <span class="text-gray-900">${program.enrolledStudents}/${program.maxStudents}명</span>
                </td>
                <td class="px-6 py-4">₩${program.price.toLocaleString()}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded-full text-xs ${
                        program.status === 'open' ? 'bg-green-100 text-green-700' :
                        program.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                    }">
                        ${program.status === 'open' ? '모집중' : program.status === 'ongoing' ? '진행중' : '마감'}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <button onclick="editProgram(${program.id})" class="text-blue-600 hover:text-blue-800 mr-3">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteProgram(${program.id})" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    });
}

function openProgramModal(programId = null) {
    const modal = document.getElementById('programModal');
    const form = document.getElementById('programForm');
    const title = document.getElementById('program-modal-title');
    
    if (programId) {
        title.textContent = '프로그램 수정';
        // 프로그램 데이터 로드
        MockAPI.getProgramById(programId).then(program => {
            document.getElementById('program-id').value = program.id;
            document.getElementById('program-title').value = program.title;
            document.getElementById('program-description').value = program.description;
            document.getElementById('program-instructor').value = program.instructor;
            document.getElementById('program-duration').value = program.duration;
            document.getElementById('program-price').value = program.price;
            document.getElementById('program-max-students').value = program.maxStudents;
            document.getElementById('program-start-date').value = program.startDate;
            document.getElementById('program-schedule').value = program.schedule;
            document.getElementById('program-category').value = program.category;
            document.getElementById('program-level').value = program.level;
            document.getElementById('program-status').value = program.status;
        });
    } else {
        title.textContent = '새 프로그램 추가';
        form.reset();
    }
    
    modal.classList.add('active');
}

function closeProgramModal() {
    const modal = document.getElementById('programModal');
    modal.classList.remove('active');
}

function editProgram(id) {
    openProgramModal(id);
}

function deleteProgram(id) {
    if (confirm('정말 이 프로그램을 삭제하시겠습니까?')) {
        MockAPI.deleteProgram(id).then(() => {
            showNotification('프로그램이 삭제되었습니다.', 'success');
            loadPrograms();
        }).catch(err => {
            showNotification('삭제 중 오류가 발생했습니다.', 'error');
        });
    }
}

// 프로그램 폼 제출
document.addEventListener('DOMContentLoaded', function() {
    const programForm = document.getElementById('programForm');
    if (programForm) {
        programForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const programData = {
                id: document.getElementById('program-id').value || Date.now(),
                title: document.getElementById('program-title').value,
                description: document.getElementById('program-description').value,
                instructor: document.getElementById('program-instructor').value,
                duration: document.getElementById('program-duration').value,
                price: parseInt(document.getElementById('program-price').value),
                maxStudents: parseInt(document.getElementById('program-max-students').value) || 30,
                enrolledStudents: 0,
                startDate: document.getElementById('program-start-date').value,
                schedule: document.getElementById('program-schedule').value,
                category: document.getElementById('program-category').value,
                level: document.getElementById('program-level').value,
                status: document.getElementById('program-status').value,
                type: 'online',
                currency: 'KRW'
            };
            
            if (document.getElementById('program-id').value) {
                // 수정
                MockAPI.updateProgram(programData.id, programData).then(() => {
                    showNotification('프로그램이 수정되었습니다!', 'success');
                    closeProgramModal();
                    loadPrograms();
                });
            } else {
                // 추가
                MockAPI.createProgram(programData).then(() => {
                    showNotification('프로그램이 추가되었습니다!', 'success');
                    closeProgramModal();
                    loadPrograms();
                });
            }
        });
    }
    
    // 프로그램 섹션이 보일 때 데이터 로드
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.id === 'programs-section' && !mutation.target.classList.contains('hidden')) {
                loadPrograms();
            }
        });
    });
    
    const programsSection = document.getElementById('programs-section');
    if (programsSection) {
        observer.observe(programsSection, { attributes: true, attributeFilter: ['class'] });
    }
    
    // 학생 섹션이 보일 때 데이터 로드
    const studentsObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.id === 'students-section' && !mutation.target.classList.contains('hidden')) {
                loadStudents();
            }
        });
    });
    
    const studentsSection = document.getElementById('students-section');
    if (studentsSection) {
        studentsObserver.observe(studentsSection, { attributes: true, attributeFilter: ['class'] });
    }
});

// 학생 관리 함수들
function loadStudents() {
    if (!window.MockAPI) return;
    
    MockAPI.getStudents().then(students => {
        const tbody = document.getElementById('students-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = students.map(student => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <div>
                        <p class="font-semibold">${student.name}</p>
                        <p class="text-sm text-gray-500">${student.email}</p>
                        <p class="text-sm text-gray-400">${student.phone}</p>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <div class="flex flex-wrap gap-1">
                        ${student.targetSchools.slice(0, 2).map(school => `
                            <span class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">${school}</span>
                        `).join('')}
                        ${student.targetSchools.length > 2 ? `
                            <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">+${student.targetSchools.length - 2}</span>
                        ` : ''}
                    </div>
                </td>
                <td class="px-6 py-4">${student.targetMajor}</td>
                <td class="px-6 py-4">
                    <div>
                        <div class="flex items-center mb-1">
                            <span class="text-sm font-semibold">${student.portfolioProgress}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-purple-600 rounded-full h-2" style="width: ${student.portfolioProgress}%"></div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4">${student.counselingSessions}회</td>
                <td class="px-6 py-4">${new Date(student.joinedDate).toLocaleDateString('ko-KR')}</td>
                <td class="px-6 py-4">
                    <button onclick="viewStudent(${student.id})" class="text-blue-600 hover:text-blue-800 mr-3" title="상세보기">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="contactStudent(${student.id})" class="text-green-600 hover:text-green-800" title="연락하기">
                        <i class="fas fa-envelope"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    });
}

function viewStudent(id) {
    MockAPI.getStudentById(id).then(student => {
        alert(`학생 상세 정보\n\n이름: ${student.name}\n목표 학교: ${student.targetSchools.join(', ')}\n진행률: ${student.portfolioProgress}%\n노트: ${student.notes}`);
    });
}

function contactStudent(id) {
    MockAPI.getStudentById(id).then(student => {
        window.location.href = `mailto:${student.email}`;
    });
}

function exportStudents() {
    showNotification('학생 데이터를 엑셀로 다운로드하는 중...', 'info');
    setTimeout(() => {
        showNotification('다운로드가 완료되었습니다!', 'success');
    }, 1500);
}

// 실시간 데이터 업데이트 시뮬레이션
setInterval(() => {
    // 실제 환경에서는 WebSocket이나 Server-Sent Events를 사용
    console.log('실시간 데이터 체크...');
}, 30000); // 30초마다

// 권한 확인
function checkPermission(action) {
    // 실제로는 서버에서 권한을 확인해야 합니다
    const userRole = 'admin'; // 예시
    
    const permissions = {
        'admin': ['create', 'read', 'update', 'delete'],
        'manager': ['create', 'read', 'update'],
        'viewer': ['read']
    };
    
    return permissions[userRole]?.includes(action) || false;
}

console.log('Edit 어드민 대시보드 - 로드 완료');
