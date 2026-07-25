"use client"

import { useEffect, useState } from "react"

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)
  const fullText = "靳海营"

  useEffect(() => {
    const animateText = (element: Element) => {
      const text = element.textContent || ""
      const words = text.split(" ")
      let html = ""
      let totalChars = 0

      words.forEach((word, wordIndex) => {
        const letters = word.split("")
        letters.forEach((letter) => {
          const delay = totalChars * 0.03
          html += `<span class="letter-blur" style="animation-delay: ${delay}s">${letter}</span>`
          totalChars++
        })
        if (wordIndex < words.length - 1) {
          html += " "
          totalChars++
        }
      })

      element.innerHTML = html
    }

    const textElements = document.querySelectorAll(
      ".hero-bio, .section-title, .contact-section h2",
    )
    textElements.forEach((el) => {
      if (!el.classList.contains("animated")) {
        animateText(el)
        el.classList.add("animated")
      }
    })

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const typingSpeed = isDeleting ? 80 : 150
    const pauseDuration = 2000

    const timer = setTimeout(() => {
      if (!isDeleting && typedText.length < fullText.length) {
        setTypedText(fullText.substring(0, typedText.length + 1))
      } else if (isDeleting && typedText.length > 0) {
        setTypedText(fullText.substring(0, typedText.length - 1))
      } else if (!isDeleting && typedText.length === fullText.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration)
      } else if (isDeleting && typedText.length === 0) {
        setIsDeleting(false)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [typedText, isDeleting])

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <div className="logo">靳海营</div>
            <div className="nav-links">
              <a href="#about">个人信息</a>
              <a href="#education">教育背景</a>
              <a href="#skills">技能证书</a>
              <a href="#portfolio">作品集</a>
              <a href="#internship">实习经历</a>
            </div>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="切换菜单"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
            <div className="social-icons desktop-only">
              <a href="#" aria-label="微信">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M8.691 2.646C5.283 2.646 2.5 5.25 2.5 8.5c0 1.636.72 3.13 1.876 4.178l-.49 1.822 2.12-.94A6.4 6.4 0 0 0 8.69 14.854c.34 0 .672-.03 1-.08a5.56 5.56 0 0 1-.063-.824c0-2.878 2.478-5.214 5.535-5.214.3 0 .594.024.882.068C15.443 5.18 12.396 2.646 8.691 2.646zm-2.4 3.5a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm4.8 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zM15.163 9.728c-2.63 0-4.763 1.96-4.763 4.372 0 2.413 2.133 4.372 4.763 4.372a5.1 5.1 0 0 0 1.504-.225l1.56.69-.36-1.34c.85-.776 1.356-1.86 1.356-3.042 0-2.413-2.133-4.372-4.763-4.372h-.297zm-1.7 2.6a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4zm3.4 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z"/>
                </svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-links">
              <a href="#about" onClick={handleLinkClick}>个人信息</a>
              <a href="#education" onClick={handleLinkClick}>教育背景</a>
              <a href="#skills" onClick={handleLinkClick}>技能证书</a>
              <a href="#portfolio" onClick={handleLinkClick}>作品集</a>
              <a href="#internship" onClick={handleLinkClick}>实习经历</a>
              <div className="mobile-menu-social">
                <a href="#" aria-label="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* 个人信息 */}
        <section id="about" className="hero animate-on-scroll">
          <div className="container">
            <div className="hero-layout">
              <div className="hero-vertical-name">
                {typedText}
                <span className="typing-cursor">|</span>
              </div>
              <div className="hero-content-wrapper">
                <div className="hero-image-container animate-on-scroll">
                  <div className="hero-image-bg"></div>
                  <img src="/images/me-02.jpg" alt="个人照片" className="hero-image" />
                </div>
                <div className="hero-content">
                  <span className="hero-role">电子商务专业</span>
                  <div className="hero-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    辽宁 · 营口
                  </div>
                  <p className="hero-bio">
                    毕业于大连东软信息学院电子商务专业,本人在校期间扎实学习专业基础,可熟练运用WPS Office办公软件。曾在妙手ERP插件上完成对亚马逊平台产品的采集和发布;运营美甲店账号,独立布景拍摄,制作团购商品主图。设计H5页面趣味测试和APP的UI交互界面。
                  </p>
                <div className="contact-box">
                  <span>邮箱</span>
                  <span>Jinhaiying@163.com</span>
                </div>
                <div className="contact-box">
                  <span>手机</span>
                  <span>18340782361</span>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee-wrapper">
          <div className="marquee-content">
            <div className="marquee-text">
              <span>电子商务</span>
              <span className="marquee-dot">·</span>
              <span>新媒体运营</span>
              <span className="marquee-dot">·</span>
              <span>社交媒体运营</span>
              <span className="marquee-dot">·</span>
              <span>新媒体运营</span>
              <span className="marquee-dot">·</span>
              <span>跨境电商</span>
              <span className="marquee-dot">·</span>
              <span>电商内容营销</span>
              <span className="marquee-dot">·</span>
            </div>
            <div className="marquee-text" aria-hidden="true">
              <span>电商数据分析</span>
              <span className="marquee-dot">·</span>
              <span>短视频内容策划</span>
              <span className="marquee-dot">·</span>
              <span>电商平台</span>
              <span className="marquee-dot">·</span>
              <span>淘宝抖音小红书</span>
              <span className="marquee-dot">·</span>
              <span>AI视觉化</span>
              <span className="marquee-dot">·</span>
              <span>创造无限可能</span>
              <span className="marquee-dot">·</span>
            </div>
          </div>
        </div>

        {/* 教育背景 */}
        <section id="education" className="section">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <h2 className="section-title">教育背景</h2>
            </div>
            <div className="timeline">
              <div className="timeline-item animate-on-scroll">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3 className="timeline-title">大连职业技术学院</h3>
                    <span className="timeline-date">2021.9 - 2024.6</span>
                  </div>
                  <div className="timeline-subtitle">国际经济与贸易专业</div>
                  <p className="timeline-desc">
                    主修课程：国际商务英语、统计学、经济学、国际贸易实务
                  </p>
                  <div className="timeline-tags">
                    <span className="timeline-tag">省优秀毕业生</span>
                    <span className="timeline-tag">市政府奖学金</span>
                  </div>
                </div>
              </div>

              <div className="timeline-item animate-on-scroll">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3 className="timeline-title">大连东软信息学院</h3>
                    <span className="timeline-date">2025.9 - 至今</span>
                  </div>
                  <div className="timeline-subtitle">电子商务专业</div>
                  <p className="timeline-desc">
                    主修课程:网络营销、电子商务视觉设计、高级网页制作、python、数据库与数据仓库、POWERBI、SPSS
                  </p>
                  <div className="timeline-tags">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 技能证书 */}
        <section id="skills" className="section skills-section">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <h2 className="section-title">技能证书</h2>
            </div>
            <div className="skills-wrapper">
              <div className="skills-columns">
                <div className="skill-column animate-on-scroll">
                  <h3 className="skill-column-title">CET-4</h3>
                  <div className="skill-list">
                    <div className="skill-item">
                      <span className="skill-name">证书名称</span>
                      <span className="skill-value">大学英语四级</span>
                    </div>
                    <div className="skill-item">
                      <span className="skill-name">颁发机构</span>
                      <span className="skill-value">教育部考试中心</span>
                    </div>
                    <div className="skill-item">
                      <span className="skill-name">获得时间</span>
                      <span className="skill-value">2026年2月</span>
                    </div>
                  </div>
                </div>
                <div className="skill-column animate-on-scroll">
                  <h3 className="skill-column-title">计算机二级</h3>
                  <div className="skill-list">
                    <div className="skill-item">
                      <span className="skill-name">证书名称</span>
                      <span className="skill-value">全国计算机等级考试二级</span>
                    </div>
                    <div className="skill-item">
                      <span className="skill-name">考核科目</span>
                      <span className="skill-value">WPS Office高级应用</span>
                    </div>
                    <div className="skill-item">
                      <span className="skill-name">获得时间</span>
                      <span className="skill-value">2026年5月</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 作品集 */}
        <section id="portfolio" className="section">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <h2 className="section-title">作品集</h2>
            </div>
            <div className="accordion">
              <div className="accordion-item">
                <button className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 0 ? null : 0)}>
                  <span>团购封面</span>
                  <svg className={`accordion-icon ${activeAccordion === 0 ? 'rotated' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className={`accordion-content ${activeAccordion === 0 ? 'open' : ''}`}>
                  <div className="accordion-scroll-container">
                    <img src="/images/tuangou1.jpg" alt="团购图片1" className="accordion-image" onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('loaded')} />
                    <img src="/images/tuangou2.jpg" alt="团购图片2" className="accordion-image" onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('loaded')} />
                    <img src="/images/tuangou3.jpg" alt="团购图片3" className="accordion-image" onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('loaded')} />
                    <img src="/images/tuangou4.jpg" alt="团购图片4" className="accordion-image" onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('loaded')} />
                    <img src="/images/tuangou5.jpg" alt="团购图片5" className="accordion-image" onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('loaded')} />
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 1 ? null : 1)}>
                  <span>布景图片</span>
                  <svg className={`accordion-icon ${activeAccordion === 1 ? 'rotated' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className={`accordion-content ${activeAccordion === 1 ? 'open' : ''}`}>
                  <div className="accordion-scroll-container">
                    <img src="/images/bujing1.jpg" alt="布景图片1" className="accordion-image" onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('loaded')} />
                    <img src="/images/bujing2.jpg" alt="布景图片2" className="accordion-image" onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('loaded')} />
                    <img src="/images/bujing3.jpg" alt="布景图片3" className="accordion-image" onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('loaded')} />
                    <img src="/images/bujing4.jpg" alt="布景图片4" className="accordion-image" onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('loaded')} />
                    
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 2 ? null : 2)}>
                  <span>项目视频</span>
                  <svg className={`accordion-icon ${activeAccordion === 2 ? 'rotated' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className={`accordion-content ${activeAccordion === 2 ? 'open' : ''}`}>
                  <div className="video-grid-container">
                    <div className="video-grid-item">
                      <video className="video-grid-video" controls playsInline onPlay={(e) => {
                        document.querySelectorAll<HTMLVideoElement>('.video-grid-video').forEach(v => {
                          if (v !== e.currentTarget) v.pause();
                        });
                      }}>
                        <source src="/videos/meijia1.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <div className="video-grid-item">
                      <video className="video-grid-video" controls playsInline onPlay={(e) => {
                        document.querySelectorAll<HTMLVideoElement>('.video-grid-video').forEach(v => {
                          if (v !== e.currentTarget) v.pause();
                        });
                      }}>
                        <source src="/videos/meijia2.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <div className="video-grid-item">
                      <video className="video-grid-video" controls playsInline onPlay={(e) => {
                        document.querySelectorAll<HTMLVideoElement>('.video-grid-video').forEach(v => {
                          if (v !== e.currentTarget) v.pause();
                        });
                      }}>
                        <source src="/videos/meijia3.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <div className="video-grid-item">
                      <video className="video-grid-video" controls playsInline onPlay={(e) => {
                        document.querySelectorAll<HTMLVideoElement>('.video-grid-video').forEach(v => {
                          if (v !== e.currentTarget) v.pause();
                        });
                      }}>
                        <source src="/videos/meijia4.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-header" onClick={() => setActiveAccordion(activeAccordion === 3 ? null : 3)}>
                  <span>H5设计</span>
                  <svg className={`accordion-icon ${activeAccordion === 3 ? 'rotated' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className={`accordion-content ${activeAccordion === 3 ? 'open' : ''}`}>
                  <div className="accordion-scroll-container">
                    <img src="/images/H5cover.jpg" alt="H5设计1" className="accordion-image" onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('loaded')} />
                    <img src="/images/H5QRCode.png" alt="H5设计2" className="accordion-image" onLoad={(e) => (e.currentTarget as HTMLImageElement).classList.add('loaded')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 实习经历 */}
        <section id="internship" className="section internship-section">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <h2 className="section-title">实习经历</h2>
            </div>
            <div className="internship-list">
              <div className="internship-item animate-on-scroll">
                <div className="internship-header">
                  <div className="internship-company">
                    <h3>调色师</h3>
                    <span className="internship-role">商品营销实习生</span>
                  </div>
                  <div className="internship-meta">
                    <span className="internship-date">2024.7 - 2024.8</span>
                    <span className="internship-location">营口</span>
                  </div>
                </div>
                <div className="internship-body">
                  <ul className="internship-tasks">
                    <li>负责美妆货品商家、库存盘点，完成商品陈列优化</li>
                    <li>接待到店顾客，挖掘消费需求，推荐适配产品，锻炼用户洞察与客户沟通能力</li>
                    <li>协助门店开展促销活动，联动线上营销策略</li>
                  </ul>
                 
                
                </div>
              </div>

              <div className="internship-item animate-on-scroll">
                <div className="internship-header">
                  <div className="internship-company">
                    <h3>斯荻美术培训学校</h3>
                    <span className="internship-role">助教实习生</span>
                  </div>
                  <div className="internship-meta">
                    <span className="internship-date">2026.1 - 2026.3</span>
                    <span className="internship-location">营口</span>
                  </div>
                </div>
                <div className="internship-body">
                  <ul className="internship-tasks">
                    <li>担任小学语文、英语学科助教,完成1-6年纪课业辅导</li>
                    <li>搜集课堂素材和学习案例,用于机构新媒体、家长社群宣传，助力线上招生</li>
                  </ul>
                 
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="logo">靳海营</div>
            <div className="footer-contact">
              <span className="contact-label">邮箱</span>
              <span className="contact-value">Jinhaiying@163.com</span>
              <span className="contact-divider">|</span>
              <span className="contact-label">手机</span>
              <span className="contact-value">18340782361</span>
            </div>
          </div>
          <nav className="footer-nav">
            <a href="#about">个人信息</a>
            <a href="#education">教育背景</a>
            <a href="#skills">技能证书</a>
            <a href="#portfolio">作品集</a>
            <a href="#internship">实习经历</a>
          </nav>
          <div className="footer-bottom">
            <p className="copyright">&copy; 2026 靳海营. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
