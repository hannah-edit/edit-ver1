# Git 사용 가이드 - Edit 프로젝트

## 📝 일상적인 Git 사용법

### 1. 코드 수정 후 업로드 (일반적인 작업 흐름)

```bash
cd /Users/hannah/Desktop/Hannah/cursor

# 1단계: 변경사항 확인
git status

# 2단계: 변경된 파일 추가
git add .

# 3단계: 커밋 (메시지 작성)
git commit -m "feat: 새로운 기능 추가"

# 4단계: GitHub에 푸시
git push
```

**더 이상 토큰을 입력할 필요 없습니다!** ✅

---

## 🔐 보안 권장사항

### 현재 방식의 문제점
토큰이 평문으로 저장되어 보안에 취약합니다.

### 해결 방법 1: Git Credential Helper (추천)

```bash
# macOS에서 Keychain에 안전하게 저장
git config --global credential.helper osxkeychain

# Remote URL에서 토큰 제거
git remote set-url origin https://github.com/hannah-edit/edit-ver1.git

# 다음 push 시 토큰 입력 (한 번만)
git push
# Username: hannah-edit
# Password: [토큰 입력]
```

이후부터는 **자동으로 인증**됩니다! 🔒

---

### 해결 방법 2: SSH 키 사용 (가장 안전)

#### SSH 키 생성
```bash
# 1. SSH 키 생성
ssh-keygen -t ed25519 -C "your_email@example.com"
# Enter 3번 (기본 위치, 비밀번호 없음)

# 2. 공개 키 복사
cat ~/.ssh/id_ed25519.pub
```

#### GitHub에 SSH 키 등록
1. https://github.com/settings/keys 접속
2. **"New SSH key"** 클릭
3. Title: `Mac - Edit Project`
4. Key: 복사한 공개 키 붙여넣기
5. **"Add SSH key"** 클릭

#### Git Remote를 SSH로 변경
```bash
cd /Users/hannah/Desktop/Hannah/cursor

git remote set-url origin git@github.com:hannah-edit/edit-ver1.git

# 테스트
git push
```

**완전 자동 인증!** 🚀

---

## 📚 자주 사용하는 Git 명령어

### 변경사항 확인
```bash
git status              # 현재 상태 확인
git diff                # 변경 내용 상세 확인
git log --oneline -5    # 최근 5개 커밋 보기
```

### 파일 추가/제외
```bash
git add .                      # 모든 변경사항 추가
git add index.html script.js   # 특정 파일만 추가
git reset HEAD file.txt        # 추가 취소
```

### 커밋
```bash
# 간단한 커밋
git commit -m "fix: 버그 수정"

# 상세한 커밋 메시지
git commit -m "feat: 새로운 계산기 기능

- 환율 실시간 업데이트 추가
- UI 개선
- 버그 수정"
```

### GitHub와 동기화
```bash
git pull            # GitHub에서 최신 코드 가져오기
git push            # 내 코드를 GitHub에 올리기
git push -f         # 강제 푸시 (주의!)
```

---

## 🎯 커밋 메시지 규칙

프로젝트에서 사용하는 커밋 메시지 형식:

```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅 (기능 변경 없음)
refactor: 코드 리팩토링
test: 테스트 추가
chore: 기타 작업 (빌드, 설정 등)
```

### 예시
```bash
git commit -m "feat: AI 챗봇 응답 개선"
git commit -m "fix: 계산기 소수점 오류 수정"
git commit -m "docs: README 업데이트"
git commit -m "style: 코드 정리 및 포맷팅"
```

---

## 🔄 브랜치 작업 (고급)

### 새 기능 개발 시
```bash
# 새 브랜치 생성 및 이동
git checkout -b feature/new-calculator

# 작업 후 커밋
git add .
git commit -m "feat: 새로운 계산기 추가"

# GitHub에 브랜치 푸시
git push -u origin feature/new-calculator

# main 브랜치로 돌아가기
git checkout main

# 브랜치 병합
git merge feature/new-calculator
```

---

## 🚨 문제 해결

### 1. 푸시가 거부될 때
```bash
# 최신 코드 가져오고 병합
git pull --rebase
git push
```

### 2. 잘못된 커밋을 되돌리고 싶을 때
```bash
# 마지막 커밋 취소 (변경사항은 유지)
git reset --soft HEAD~1

# 마지막 커밋 완전 취소 (변경사항도 삭제)
git reset --hard HEAD~1
```

### 3. 특정 파일만 이전 버전으로 되돌리기
```bash
git checkout HEAD -- filename.html
```

### 4. 모든 변경사항 버리기
```bash
git reset --hard HEAD
```

---

## 📖 일상 작업 플로우 요약

### 매일 작업 시작 시
```bash
cd /Users/hannah/Desktop/Hannah/cursor
git pull  # 최신 코드 받기
```

### 작업 완료 후
```bash
git add .
git commit -m "feat: 작업 내용 설명"
git push
```

**끝!** 정말 간단하죠? 😊

---

## 💡 유용한 팁

### 1. Git 별칭(Alias) 설정
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.cm commit
git config --global alias.br branch

# 이제 짧게 사용 가능
git st    # git status
git cm -m "메시지"  # git commit -m
```

### 2. 마지막 커밋 메시지 수정
```bash
git commit --amend -m "수정된 커밋 메시지"
```

### 3. 특정 파일 무시하기
`.gitignore`에 추가:
```
# 개인 설정 파일
config.local.js
.env.local

# 테스트 파일
test/
```

---

## 🎓 더 공부하기

- **GitHub 공식 가이드**: https://docs.github.com
- **Git 기초**: https://git-scm.com/book/ko/v2
- **GitHub Desktop**: GUI로 쉽게 사용 (https://desktop.github.com)

---

**Happy Coding!** 🚀✨
