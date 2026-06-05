import './index.css';

interface DocxElement {
  type: 'paragraph' | 'table';
  text?: string;
  rows?: string[][];
}

interface Lesson {
  id: number;
  number: string;
  title: string;
  shortDesc: string;
  hoverImg: string;
  elements: DocxElement[];
  images: string[];
}

interface Player {
  number: string;
  name: string;
  role: string;
  quote: string;
  img: string;
}

const nbaPlayers: Player[] = [
  {
    number: "23",
    name: "LeBron James",
    role: "The King / Leadership",
    quote: "Mọi người đều muốn làm việc nhóm cho đến khi phải gánh chịu trách nhiệm của cả đội.",
    img: "/lebron_moment.jpg"
  },
  {
    number: "30",
    name: "Stephen Curry",
    role: "The Chef / Precision",
    quote: "Tôi không bao giờ sợ ném hỏng. Bạn chỉ hỏng 100% những cú ném mà bạn không thực hiện.",
    img: "/curry_moment.jpg"
  },
  {
    number: "23",
    name: "Michael Jordan",
    role: "The G.O.A.T / High Standards",
    quote: "Tôi có thể chấp nhận thất bại, nhưng tôi không thể chấp nhận việc không cố gắng.",
    img: "/jordan_moment.jpg"
  },
  {
    number: "24",
    name: "Kobe Bryant",
    role: "Mamba Mentality / Craftsmanship",
    quote: "Sự cống hiến hết mình cho công việc sẽ biến bạn trở thành một nghệ sĩ thực thụ.",
    img: "/kobe_moment.jpg"
  },
  {
    number: "07",
    name: "Kevin Durant",
    role: "The Slim Reaper / Pure Skill",
    quote: "Sự chăm chỉ sẽ đánh bại tài năng khi tài năng không chịu làm việc chăm chỉ.",
    img: "/durant_moment.jpg"
  }
];

let lessonsData: Lesson[] = [];

// Helper to format DOCX elements & images to clean HTML
function formatLessonHTML(lesson: Lesson): string {
  let contentHTML = '';

  lesson.elements.forEach(el => {
    if (el.type === 'paragraph' && el.text) {
      const text = el.text.trim();
      
      // Determine if heading
      const isHeading1 = /^[IVXLCDM]+\.\s/i.test(text); // Roman numerals (e.g. I. Mở đầu)
      const isHeading2 = /^\d+\.\s/i.test(text); // Numbered (e.g. 1. Cấu hình)
      const isHeading3 = /^[a-z]\)\s/i.test(text); // Bullet-like (e.g. a) Thiết lập)
      
      const isSpecialHeading = text.startsWith('BÁO CÁO') || 
                               text.startsWith('Chủ đề:') || 
                               text.startsWith('Mục tiêu') || 
                               text.startsWith('Nhiệm vụ') || 
                               text.startsWith('Nhận định cá nhân') || 
                               text.startsWith('Tác vụ ') ||
                               text.startsWith('Giai đoạn') ||
                               text.startsWith('Kết quả') ||
                               text.startsWith('Quy trình ') ||
                               text.startsWith('Ưu:') ||
                               text.startsWith('Nhược:');

      if (isHeading1) {
        contentHTML += `<h3 style="font-size: 1.4rem; color: var(--text-primary); margin-top: 35px; margin-bottom: 15px; font-weight: 700; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">${text}</h3>`;
      } else if (isHeading2 || isSpecialHeading) {
        contentHTML += `<h4 style="font-size: 1.15rem; color: var(--text-primary); margin-top: 25px; margin-bottom: 10px; font-weight: 600;">${text}</h4>`;
      } else if (isHeading3) {
        contentHTML += `<h5 style="font-size: 1.05rem; color: var(--text-primary); margin-top: 15px; margin-bottom: 8px; font-weight: 600;">${text}</h5>`;
      } else if (
        text.startsWith('git ') || 
        text.startsWith('ssh-keygen') || 
        text.startsWith('ssh-ed25519') ||
        text.startsWith('A high-quality 3D') ||
        text.startsWith('A modern 3D') ||
        text.startsWith('3D isometric icon') ||
        text.startsWith('Leonardo.AI') ||
        text.startsWith('Google Gemini') ||
        text.startsWith('Prompt ')
      ) {
        contentHTML += `<div class="prompt-box">${text}</div>`;
      } else {
        contentHTML += `<p style="margin-bottom: 15px; line-height: 1.7;">${text}</p>`;
      }
    } else if (el.type === 'table' && el.rows && el.rows.length > 0) {
      contentHTML += `<table>`;
      el.rows.forEach((row, rIdx) => {
        contentHTML += `<tr>`;
        row.forEach(cell => {
          const cellContent = cell.replace(/\n/g, '<br>');
          if (rIdx === 0) {
            contentHTML += `<th>${cellContent}</th>`;
          } else {
            contentHTML += `<td>${cellContent}</td>`;
          }
        });
        contentHTML += `</tr>`;
      });
      contentHTML += `</table>`;
    }
  });

  // Append image gallery at the bottom
  if (lesson.images && lesson.images.length > 0) {
    contentHTML += `
      <div class="modal-gallery">
        <h4 class="modal-gallery-title">Hình ảnh đính kèm báo cáo (${lesson.images.length})</h4>
        <div class="modal-images-grid">
          ${lesson.images.map(imgUrl => `
            <div class="modal-img-card">
              <a href="${imgUrl}" target="_blank">
                <img src="${imgUrl}" alt="Assignment report screenshot" loading="lazy" />
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="overlay-meta-row no-print" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
      <div class="overlay-meta" style="margin-bottom: 0;">Bài tập ${lesson.number}</div>
      <button onclick="window.print()" class="print-pdf-btn" style="background: var(--accent-orange); color: #ffffff; border: none; padding: 6px 12px; font-family: var(--font-display); font-size: 0.9rem; font-weight: 700; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 3px 3px 0 var(--court-dark); border: 1.5px solid var(--court-dark); transition: transform 0.1s;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
        XUẤT PDF
      </button>
    </div>
    <h2 class="overlay-title">${lesson.title}</h2>
    <div class="overlay-content print-report-container">
      ${contentHTML}
    </div>
  `;
}

// Shot clock animation/timer logic
function initShotClock() {
  const clockEl = document.getElementById('shot-clock-val');
  if (!clockEl) return;
  
  let timeLeft = 24;
  const widget = document.querySelector('.scoreboard-widget');
  
  setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) {
      timeLeft = 24;
      if (widget) {
        widget.classList.add('buzzer-flash');
        setTimeout(() => {
          widget.classList.remove('buzzer-flash');
        }, 1500);
      }
    }
    clockEl.textContent = timeLeft.toString().padStart(2, '0');
  }, 1000);
}

// Main initialization
async function init() {
  try {
    // Fetch DOCX extracted database from public
    const res = await fetch('/lessons.json');
    if (!res.ok) throw new Error("Failed to fetch lessons.json");
    lessonsData = await res.json();
    
    renderApp();
    initShotClock();
    setupCursorTrail();
    setupScrollReveals();
    setupOverlayModal();
  } catch (err) {
    console.error("Initialization error:", err);
    // Render backup message
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
      <div style="padding: 100px; text-align: center; font-family: sans-serif;">
        <h2>Có lỗi tải dữ liệu từ folder BaiTap</h2>
        <p>Vui lòng kiểm tra file public/lessons.json có tồn tại hay không.</p>
      </div>
    `;
  }
}

function renderApp() {
  const appEl = document.querySelector<HTMLDivElement>('#app')!;
  appEl.innerHTML = `
    <header>
      <div class="logo-wrap">
        <a href="#" class="court-logo">HN <span></span> COURT</a>
      </div>
      <div class="scoreboard-widget">
        <div class="score-board">
          <div class="scoreboard-sec">
            <span class="scoreboard-label">HOME</span>
            <span class="scoreboard-num led-amber">79</span>
          </div>
          <div class="scoreboard-sec">
            <span class="scoreboard-label">PERIOD</span>
            <span class="scoreboard-num led-red">7</span>
          </div>
          <div class="scoreboard-sec">
            <span class="scoreboard-label">AWAY</span>
            <span class="scoreboard-num led-amber">25</span>
          </div>
        </div>
        <div class="shot-clock-box">
          <span class="scoreboard-label">SHOT CLOCK</span>
          <span class="shot-clock-num led-red" id="shot-clock-val">24</span>
        </div>
      </div>
    </header>

    <main>
      <!-- HERO SECTION -->
      <section class="hero-sec">
        <div class="hero-container">
          <div class="hero-left">
            <div class="hero-sub">
              <span>AI ENGINEER</span>
              <span class="dot"></span>
              <span>BALLER</span>
            </div>
            
            <div class="hero-title-container">
              <h1 class="display-title hero-display-line">HOÀNG NAM</h1>
              <h1 class="display-title hero-display-line h-accent">
                COURT <span class="italic-serif text-orange">of</span> CODE
              </h1>
            </div>

            <p class="hero-desc">
              Tôi là một <a href="#" class="hover-trigger" data-hover-img="/lebron_moment.jpg">developer</a> đam mê AI tại UET VNU và đồng thời là một <a href="#" class="hover-trigger" data-hover-img="/lebron_moment.jpg">baller</a> chuyên nghiệp trên sân bóng. Dự án này là nơi lưu trữ toàn bộ hành trình rèn luyện kỹ năng số học đường và tư duy Mamba của tôi.
            </p>
          </div>
          <div class="hero-right">
            <!-- Empty right column to let LeBron James in the background image shine through -->
          </div>
        </div>
      </section>

      <!-- PORTFOLIO SECTION -->
      <section class="portfolio-sec" id="projects">
        <!-- Scroll-Based Majestic NBA Player Watermark Backgrounds -->
        <div class="portfolio-bg-wrap">
          <div class="portfolio-bg-img active" style="background-image: url('/lebron_moment.jpg')"></div>
          <div class="portfolio-bg-img" style="background-image: url('/curry_moment.jpg')"></div>
          <div class="portfolio-bg-img" style="background-image: url('/durant_moment.jpg')"></div>
          <div class="portfolio-bg-img" style="background-image: url('/kobe_moment.jpg')"></div>
          <div class="portfolio-bg-img" style="background-image: url('/jordan_moment.jpg')"></div>
          <div class="portfolio-bg-img" style="background-image: url('/lebron_record.jpg')"></div>
        </div>

        <div class="sec-header">
          <h2 class="display-title sec-title">CNS JOURNAL</h2>
          <div class="sec-subtitle">
            Nhật ký làm bài học phần Nhập môn Công nghệ số & Trí tuệ nhân tạo
          </div>
        </div>

        <div class="timeline-wrap">
          <div class="timeline-line"></div>
          <div class="timeline-items">
            ${lessonsData.map(lesson => `
              <div class="lesson-card" data-id="${lesson.id}">
                <div class="card-connector"></div>
                <div class="card-inner ticket-style">
                  <div class="ticket-stub">
                    <span class="ticket-label">SEC</span>
                    <span class="ticket-val">25</span>
                    <span class="ticket-label">ROW</span>
                    <span class="ticket-val">02</span>
                    <span class="ticket-label">SEAT</span>
                    <span class="ticket-val">79</span>
                    <div class="ticket-stub-circle"></div>
                  </div>
                  <div class="ticket-divider"></div>
                  <div class="ticket-body">
                    <div class="card-number">${lesson.number}</div>
                    <h3 class="card-title">${lesson.title}</h3>
                    <p class="card-summary">${lesson.shortDesc}</p>
                    <div class="card-btn-row">
                      <div class="card-btn">
                        Xem chi tiết bài làm
                        <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
                      </div>
                      <div class="ticket-barcode" title="MSSV: 25020279">
                        <div class="barcode-line w-2"></div>
                        <div class="barcode-line w-1"></div>
                        <div class="barcode-line w-3"></div>
                        <div class="barcode-line w-1"></div>
                        <div class="barcode-line w-2"></div>
                        <div class="barcode-line w-1"></div>
                        <div class="barcode-line w-4"></div>
                        <div class="barcode-line w-1"></div>
                        <div class="barcode-line w-2"></div>
                        <span class="barcode-text">25020279</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- PLAYGROUND SECTION -->
      <section class="playground-sec">
        <div class="sec-header">
          <h2 class="display-title sec-title">COURT MENTORS</h2>
          <div class="sec-subtitle">
            Những triết lý bóng rổ ảnh hưởng trực tiếp đến tư duy lập trình của tôi
          </div>
        </div>
        <p class="playground-desc">
          Trong lập trình cũng như bóng rổ, sự chính xác của một cú ném 3 điểm hay sự kiên trì luyện tập hàng đêm đều tạo nên sự khác biệt. Dưới đây là những huyền thoại truyền cảm hứng cho tôi:
        </p>
        
        <div class="nba-grid">
          ${nbaPlayers.map(player => `
            <div class="player-card hover-trigger" data-hover-img="${player.img}">
              <div class="player-img-wrap">
                <img src="${player.img}" alt="${player.name}" />
              </div>
              <div class="player-info">
                <div class="player-number">#${player.number}</div>
                <h3 class="player-name">${player.name}</h3>
                <div class="player-role">${player.role}</div>
                <p class="player-quote">"${player.quote}"</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- TỔNG KẾT VÀ ĐÁNH GIÁ BẢN THÂN -->
      <section class="reflection-sec" style="background: var(--bg-card); padding: 80px 0; border-top: 1px solid var(--border-light);">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
          <div class="sec-header">
            <h2 class="display-title sec-title">TỔNG KẾT & ĐÁNH GIÁ</h2>
            <div class="sec-subtitle">Nhìn nhận bản thân và lộ trình phát triển chuyên môn học thuật</div>
          </div>
          
          <div class="reflection-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 40px;">
            <div class="reflection-col card-inner" style="background: rgba(255,102,0,0.02); border: 1.5px solid var(--border-light); padding: 30px; border-radius: 8px;">
              <h3 style="font-size: 1.35rem; color: var(--text-orange); margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid var(--text-orange); padding-bottom: 8px;">
                ĐÁNH GIÁ BẢN THÂN
              </h3>
              <p style="margin-bottom: 15px; font-weight: 600; font-style: italic;">
                "Xuyên suốt dự án, tôi đã chuyển dịch mạnh mẽ từ một người sử dụng công nghệ thụ động sang vai trò 'người điều phối' linh hoạt và có trách nhiệm. Cụ thể:"
              </p>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; padding: 0;">
                <li style="display: flex; gap: 8px; align-items: flex-start;">
                  <span style="color: var(--text-orange); font-weight: bold;">•</span>
                  <span>Chuyển đổi tư duy làm việc (Kết hợp làm việc nhóm)</span>
                </li>
                <li style="display: flex; gap: 8px; align-items: flex-start;">
                  <span style="color: var(--text-orange); font-weight: bold;">•</span>
                  <span>Làm chủ công nghệ AI ( không phụ thuộc)</span>
                </li>
                <li style="display: flex; gap: 8px; align-items: flex-start;">
                  <span style="color: var(--text-orange); font-weight: bold;">•</span>
                  <span>Nâng tầm tư duy phản biện & Liêm chính học thuật( xây dựng nguyên tắc rõ ràng của bản thân)</span>
                </li>
              </ul>
            </div>

            <div class="reflection-col card-inner" style="background: rgba(255,102,0,0.02); border: 1.5px solid var(--border-light); padding: 30px; border-radius: 8px;">
              <h3 style="font-size: 1.35rem; color: var(--text-orange); margin-bottom: 20px; font-weight: 700; border-bottom: 2px solid var(--text-orange); padding-bottom: 8px;">
                LỘ TRÌNH PHÁT TRIỂN
              </h3>
              <p style="margin-bottom: 15px; font-weight: 600; font-style: italic;">
                "Ngoài ra tôi còn tích hợp trực tiếp vào lộ trình phát triển chuyên môn sắp tới:"
              </p>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; padding: 0;">
                <li style="display: flex; gap: 8px; align-items: flex-start;">
                  <span style="color: var(--text-orange); font-weight: bold;">•</span>
                  <span>Tối ưu hóa học tập và nghiên cứu chuyên sâu (kĩ năng viết promt nâng cao)</span>
                </li>
                <li style="display: flex; gap: 8px; align-items: flex-start;">
                  <span style="color: var(--text-orange); font-weight: bold;">•</span>
                  <span>Thúc đẩy quy trình phát triển phần mềm: (Áp dụng tư duy quản trị dự án trực quan (Trello) và tổ chức dữ liệu đám mây vào quá trình phối hợp thiết kế kiến trúc hệ thống, xây dựng các ứng dụng Client-Server hoặc triển khai mã nguồn đa luồng, đảm bảo tính đồng bộ và hiệu suất cao)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="footer-top">
        <div class="display-title footer-logo">HN<br><span class="text-orange">25020279</span></div>
        <div class="social-links">
          <a href="https://www.facebook.com/nam.hoang.944935#" target="_blank" class="hover-trigger" data-hover-img="/lebron_moment.jpg">FACEBOOK</a>
          <a href="https://github.com/kduongnguyen07" target="_blank" class="hover-trigger" data-hover-img="/jordan_moment.jpg">GITHUB</a>
          <a href="mailto:nam.hoang@gmail.com" class="hover-trigger" data-hover-img="/curry_moment.jpg">EMAIL</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2026 Hoàng Nam. Built with Vite & Passion.</div>
        <div>Designed for K70 IT UET VNU</div>
      </div>
    </footer>

    <!-- DETAIL OVERLAY MODAL -->
    <div class="detail-overlay" id="detail-overlay">
      <div class="overlay-panel">
        <button class="close-btn" id="close-overlay">
          <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div id="overlay-inject-content"></div>
      </div>
    </div>
  `;
}

function setupCursorTrail() {
  const cursor = document.getElementById('custom-cursor') as HTMLDivElement;
  const cursorImg = document.getElementById('cursor-player-img') as HTMLImageElement;

  let targetX = 0;
  let targetY = 0;
  let currX = 0;
  let currY = 0;

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // Physics animation loop
  function animateCursor() {
    const dx = targetX - currX;
    const dy = targetY - currY;
    
    currX += dx * 0.12;
    currY += dy * 0.12;

    let tilt = dx * 0.08;
    tilt = Math.min(Math.max(tilt, -15), 15);

    cursor.style.left = `${currX}px`;
    cursor.style.top = `${currY}px`;
    
    if (cursor.classList.contains('hovering')) {
      cursor.style.transform = `translate(-50%, -50%) rotate(${tilt}deg)`;
    } else {
      const rollAngle = currX * 0.4;
      cursor.style.transform = `translate(-50%, -50%) rotate(${rollAngle}deg)`;
    }

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover triggers setup
  function bindHoverTriggers() {
    const hoverTriggers = document.querySelectorAll('.hover-trigger');
    hoverTriggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', (e) => {
        const target = e.currentTarget as HTMLElement;
        const imgUrl = target.getAttribute('data-hover-img');
        if (imgUrl) {
          cursorImg.src = imgUrl;
          cursor.classList.add('hovering');
        }
      });

      trigger.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
      });
    });

    const lessonCards = document.querySelectorAll('.lesson-card');
    lessonCards.forEach((card) => {
      const lessonId = parseInt(card.getAttribute('data-id') || '1');
      const lesson = lessonsData.find(l => l.id === lessonId);
      
      if (lesson) {
        card.addEventListener('mouseenter', () => {
          cursorImg.src = lesson.hoverImg;
          cursor.classList.add('hovering');
        });
        
        card.addEventListener('mouseleave', () => {
          cursor.classList.remove('hovering');
        });
      }
    });
  }

  bindHoverTriggers();
}

function setupScrollReveals() {
  const lessonCards = document.querySelectorAll('.lesson-card');
  const bgImages = document.querySelectorAll('.portfolio-bg-img');

  const observerOptions = {
    root: null,
    threshold: 0.25, // trigger when 25% visible
    rootMargin: '-20% 0px -40% 0px' // focus on center area of screen
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Slide in lesson card
        entry.target.classList.add('in-view');
        
        // Transition watermark background images
        const lessonId = parseInt(entry.target.getAttribute('data-id') || '1');
        const bgIndex = lessonId - 1; // 0-indexed
        
        bgImages.forEach((bg, idx) => {
          if (idx === bgIndex) {
            bg.classList.add('active');
          } else {
            bg.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  lessonCards.forEach(card => {
    observer.observe(card);
  });
}

function setupOverlayModal() {
  const overlay = document.getElementById('detail-overlay') as HTMLDivElement;
  const overlayContent = document.getElementById('overlay-inject-content') as HTMLDivElement;
  const closeBtn = document.getElementById('close-overlay') as HTMLButtonElement;

  function openLessonDetail(id: number) {
    const lesson = lessonsData.find(l => l.id === id);
    if (lesson) {
      overlayContent.innerHTML = formatLessonHTML(lesson);
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLessonDetail() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Click on cards opens modal
  const lessonCards = document.querySelectorAll('.lesson-card');
  lessonCards.forEach(card => {
    const inner = card.querySelector('.card-inner') as HTMLDivElement;
    const id = parseInt(card.getAttribute('data-id') || '1');
    inner.addEventListener('click', () => openLessonDetail(id));
  });

  closeBtn.addEventListener('click', closeLessonDetail);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeLessonDetail();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeLessonDetail();
    }
  });
}



// Start app
init();
