
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Layers, 
  Sparkles, 
  Target, 
  Lock, 
  ChevronRight, 
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

// --- Components ---

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="glass-card p-10 rounded-3xl hover:border-burgundy/60 transition-all duration-500 group">
    <div className="w-14 h-14 bg-burgundy/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-burgundy/20 transition-colors border border-burgundy/10">
      <div className="text-burgundy">{icon}</div>
    </div>
    <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-burgundy-light transition-colors">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm md:text-base">{description}</p>
  </div>
);

const Scenario: React.FC<{ title: string; content: string; author: string }> = ({ title, content, author }) => (
  <div className="glass-card p-8 rounded-2xl border-l-4 border-l-burgundy/40 hover:border-l-burgundy transition-all bg-white/[0.01]">
    <h4 className="font-bold text-lg mb-3 text-burgundy-light">{title}</h4>
    <p className="text-gray-200 italic mb-5 leading-relaxed">"{content}"</p>
    <p className="text-xs text-gray-500 font-medium">— {author}</p>
  </div>
);

const ComingSoonModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4" onClick={onClose}>
    <div className="glass-card rounded-3xl p-10 max-w-md w-full border-burgundy/30 shadow-3xl bg-black/90" onClick={(e) => e.stopPropagation()}>
      <div className="text-center space-y-6">
        <div className="text-6xl">⚙️</div>
        <h3 className="text-2xl font-bold tracking-tight">서비스 준비 중입니다</h3>
        <p className="text-gray-400 leading-relaxed">
          더 나은 경험을 위해 파묘 팀이 열심히 개발하고 있어요.
        </p>
        <button
          onClick={onClose}
          className="w-full px-8 py-4 bg-burgundy hover:bg-burgundy-light rounded-2xl font-bold transition-all active:scale-95"
        >
          확인
        </button>
      </div>
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-burgundy/10' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-burgundy rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-burgundy/30">P</div>
          <span className="text-2xl font-black tracking-tighter uppercase text-white">pamyo</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 font-semibold text-sm text-gray-400">
          <button onClick={() => scrollToSection('features')} className="hover:text-burgundy-light transition-colors">기능</button>
          <button onClick={() => scrollToSection('scenarios')} className="hover:text-burgundy-light transition-colors">스토리</button>
          <button onClick={() => scrollToSection('why')} className="hover:text-burgundy-light transition-colors">차별점</button>
          <button onClick={() => (window as any).showComingSoon?.()} className="bg-burgundy text-white px-6 py-2.5 rounded-full hover:bg-burgundy-light transition-all active:scale-95 shadow-lg shadow-burgundy/20 cta-glow">
            지금 시작하기
          </button>
        </div>

        <button className="md:hidden text-white hover:text-burgundy transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black absolute top-full left-0 right-0 p-8 flex flex-col gap-6 border-b border-burgundy/10 animate-fade-in shadow-2xl">
          <button onClick={() => scrollToSection('features')} className="text-lg font-medium text-gray-300 hover:text-burgundy text-left">기능</button>
          <button onClick={() => scrollToSection('scenarios')} className="text-lg font-medium text-gray-300 hover:text-burgundy text-left">스토리</button>
          <button onClick={() => scrollToSection('why')} className="text-lg font-medium text-gray-300 hover:text-burgundy text-left">차별점</button>
          <button onClick={() => (window as any).showComingSoon?.()} className="bg-burgundy text-white px-5 py-4 rounded-2xl font-bold active:scale-95">내 메모 파묘하러 가기</button>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    (window as any).showComingSoon = () => setShowComingSoon(true);
    return () => {
      delete (window as any).showComingSoon;
    };
  }, []);

  useEffect(() => {
    const texts = ["지난주 시험 범위가 뭐였지?", "어제 떠올랐던 기획 아이디어", "회의록에서 언급된 수치 찾아줘"];
    let textIdx = 0;
    let charIdx = 0;
    let timeout: any;

    const type = () => {
      if (charIdx < texts[textIdx].length) {
        setSearchQuery(texts[textIdx].substring(0, charIdx + 1));
        charIdx++;
        timeout = setTimeout(type, 80);
      } else {
        setTimeout(() => { erase(); }, 2500);
      }
    };

    const erase = () => {
      if (charIdx > 0) {
        setSearchQuery(texts[textIdx].substring(0, charIdx - 1));
        charIdx--;
        timeout = setTimeout(erase, 40);
      } else {
        textIdx = (textIdx + 1) % texts.length;
        timeout = setTimeout(type, 500);
      }
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen selection:bg-burgundy selection:text-white">
      {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-burgundy/10 blur-[150px] rounded-full -z-10"></div>
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card text-[11px] font-bold tracking-[0.2em] text-burgundy-light uppercase mb-4 border-burgundy/30">
            <Sparkles size={14} className="text-burgundy" /> <span>Deep Discovery AI</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1.05]">
            파묘, <br />
            <span className="gradient-text">찾던 것이 나왔다</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
            묻어두기만 했던 수많은 기록들. <br className="hidden md:block" />
            이제 AI가 맥락을 이해하고 당신의 생각을 다시 깨워냅니다.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
            <button onClick={() => setShowComingSoon(true)} className="w-full sm:w-auto px-10 py-5 bg-burgundy hover:bg-burgundy-light rounded-2xl font-bold text-lg shadow-2xl shadow-burgundy/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cta-glow">
              지금 파묘 시작하기 <ChevronRight size={20} />
            </button>
            <button onClick={() => setShowComingSoon(true)} className="w-full sm:w-auto px-10 py-5 glass-card hover:bg-white/5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 border-white/10">
              체험해보기
            </button>
          </div>

          <div className="mt-20 md:mt-32 relative max-w-3xl mx-auto">
            <div className="glass-card rounded-[2.5rem] p-6 md:p-10 shadow-3xl relative z-10 border-burgundy/20 bg-black/40">
              <div className="flex items-center gap-4 bg-black/60 p-5 rounded-2xl border border-burgundy/30 shadow-inner">
                <Search className="text-burgundy" size={22} />
                <span className="text-left text-gray-200 font-semibold text-lg tracking-tight">
                  {searchQuery}<span className="text-burgundy animate-pulse font-light">|</span>
                </span>
              </div>
              <div className="mt-8 flex flex-col gap-4">
                <div className="bg-burgundy/10 p-6 rounded-2xl text-left border border-burgundy/20 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-burgundy rounded-full animate-ping"></div>
                    <p className="font-bold text-burgundy-light text-sm uppercase tracking-wider">AI 파묘 결과</p>
                  </div>
                  <p className="text-gray-200 leading-relaxed font-medium text-sm md:text-base">
                    지난 5월 '전략 기획' 폴더에 저장하신 메모에 따르면, <br />
                    찾으시는 내용은 <b className="text-burgundy-light">"사용자 경험의 본질적 가치"</b> 세션에 기록되어 있습니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-burgundy/20 blur-3xl rounded-full floating"></div>
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-burgundy/10 blur-[100px] rounded-full floating" style={{ animationDelay: '2.5s' }}></div>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="py-32 px-8 bg-white/[0.01] border-y border-white/[0.03]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
              기록은 쌓이는데,<br />
              <span className="text-gray-600">기억은 파묻히나요?</span>
            </h2>
            <div className="space-y-10 mt-16">
              {[
                { title: "검색의 한계", desc: "제목이 기억나지 않으면 영영 찾을 수 없는 죽은 메모들" },
                { title: "정리의 피로", desc: "분류하고 태그를 다느라 정작 기록할 에너지를 다 써버린 어제" },
                { title: "파편화된 정보", desc: "텍스트 조각들이 서로 연결되지 못하고 흩어져 있는 상태" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-burgundy/10 flex items-center justify-center text-burgundy font-bold border border-burgundy/30 group-hover:bg-burgundy group-hover:text-white transition-all">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl mb-2 tracking-tight group-hover:text-burgundy transition-colors">{item.title}</h4>
                    <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-[#151515] to-[#050505] rounded-[3rem] p-12 border border-burgundy/10 flex flex-col justify-center items-center text-center space-y-10 shadow-2xl">
               <div className="w-24 h-24 bg-burgundy/5 rounded-3xl flex items-center justify-center border border-burgundy/20">
                <Target className="text-burgundy/60" size={48} />
               </div>
               <p className="text-2xl text-gray-300 font-medium leading-relaxed px-4">
                중요한 건 폴더 위치가 아닙니다.<br />
                <span className="text-white border-b-2 border-burgundy/50">메모에 담긴 '맥락'과 '본질'입니다.</span>
               </p>
               <div className="w-20 h-px bg-burgundy/30"></div>
               <p className="text-burgundy-light font-black text-xl tracking-widest uppercase">Discover the depth</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Features Section */}
      <section id="features" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
             <h2 className="text-4xl md:text-5xl font-black tracking-tight">본질에 집중한 기능</h2>
             <p className="text-gray-500 text-lg">복잡한 기능은 덜어내고, 오직 당신의 기록을 위해 설계했습니다.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Layers size={28} />}
              title="맥락 기반 분류"
              description="폴더를 수동으로 만들 필요가 없습니다. AI가 내용의 깊이를 읽고 자동으로 의미를 연결합니다."
            />
            <FeatureCard 
              icon={<Search size={28} />}
              title="의미 기반 검색"
              description="'지난주 기획안'처럼 모호한 검색어도 찰떡같이 알아듣습니다. 키워드보다 맥락이 중요하니까요."
            />
            <FeatureCard 
              icon={<Target size={28} />}
              title="개인 맞춤 학습"
              description="당신이 기록하는 방식과 관심사를 학습하여, 시간이 갈수록 당신의 사고방식에 더 가까워집니다."
            />
            <FeatureCard 
              icon={<Lock size={28} />}
              title="철저한 보안"
              description="모든 기록은 강력하게 암호화됩니다. 오직 당신만이 자신의 소중한 생각들을 파묘할 수 있습니다."
            />
          </div>
        </div>
      </section>

      {/* 4. App Screenshots Section */}
      <section className="py-32 px-8 bg-gradient-to-b from-black to-black/95">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">실제로 이렇게 작동합니다</h2>
            <p className="text-gray-400 text-xl">당신의 메모가 AI로 재탄생하는 과정을 직접 확인하세요</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Screenshot 1 - AI 검색 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-burgundy to-burgundy/50 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative glass-card rounded-3xl p-6 bg-black/60 border-burgundy/20">
                <div className="aspect-[9/19] bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden mb-6 flex items-center justify-center border border-burgundy/10">
                  <img src="/screenshots/ai-search.png" alt="AI 자연어 검색" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-burgundy-light">🔍 자연어 AI 검색</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  "청소한거 공지 찾아줘"처럼 자연스러운 말로 검색하면 AI가 맥락을 이해하고 정확한 메모를 찾아줍니다.
                </p>
              </div>
            </div>

            {/* Screenshot 2 - 폴더 & 태그 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-burgundy to-burgundy/50 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative glass-card rounded-3xl p-6 bg-black/60 border-burgundy/20">
                <div className="aspect-[9/19] bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden mb-6 flex items-center justify-center border border-burgundy/10">
                  <img src="/screenshots/folders.png" alt="스마트 폴더 & 태그" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-burgundy-light">📁 스마트 폴더 & 태그</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  AI가 자동으로 메모를 주제별로 분류하고 관련 태그를 생성합니다. 수동 정리는 이제 그만.
                </p>
              </div>
            </div>

            {/* Screenshot 3 - 메모 상세 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-burgundy to-burgundy/50 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative glass-card rounded-3xl p-6 bg-black/60 border-burgundy/20">
                <div className="aspect-[9/19] bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden mb-6 flex items-center justify-center border border-burgundy/10">
                  <img src="/screenshots/memo-detail.png" alt="메모 상세 보기" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-burgundy-light">📝 깔끔한 메모 관리</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  폴더와 태그가 자동으로 연결되어 있어 관련된 메모들을 한눈에 탐색할 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm">
              ✨ 더 많은 기능들이 곧 공개됩니다
            </p>
          </div>
        </div>
      </section>

      {/* 5. Scenarios Section */}
      <section id="scenarios" className="py-32 px-8 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">당신의 일상이 파묘되는 순간</h2>
            <p className="text-gray-400 text-xl">파묘와 함께하는 사용자들의 생생한 기록입니다.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <Scenario 
              title="시험 기간, 흩어진 정보를 한눈에"
              content="시험 전날 '강조하셨던 부분 요약해줘'라고 했더니 수업 시간의 메모, 친구에게 받은 사진 내용까지 다 합쳐서 알려주더라고요. 진짜 말도 안 돼요."
              author="대학생 이OO 님"
            />
            <Scenario 
              title="회의실에서의 즉석 비서"
              content="갑자기 예전 프로젝트 데이터가 필요했는데, 파묘한테 물어보니까 1초 만에 파일 링크랑 작년 코멘트를 뽑아줬어요. 정리를 따로 안 했는데도 말이죠."
              author="기획자 김OO 님"
            />
            <Scenario 
              title="책 읽으며 남기는 짧은 영감"
              content="아이디어가 떠오를 때마다 그냥 한 줄씩 적어요. 나중에 '영감 받은 문구들 보여줘' 하면 파묘가 알아서 무드별로 묶어줍니다. 정리가 즐거워졌어요."
              author="작가 박OO 님"
            />
            <Scenario 
              title="정리가 귀찮은 프로 기록러"
              content="그냥 생각나는 대로 다 적어두기만 해요. 나중에 필요한 것만 쏙쏙 찾아주니까, 정리에 쓰던 시간이 아예 사라졌습니다. 너무 홀가분해요."
              author="마케터 정OO 님"
            />
          </div>
        </div>
      </section>

      {/* 6. Why Pamyo Section */}
      <section id="why" className="py-32 md:py-48 px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">왜 파묘여야 하는가?</h2>
          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <div className="text-7xl font-black text-burgundy">0%</div>
              <p className="text-xl font-bold tracking-tight">정리 스트레스 제로</p>
              <p className="text-gray-500 leading-relaxed">기록하는 즐거움만 남기고<br />분류의 고통은 걷어냅니다.</p>
            </div>
            <div className="space-y-4">
              <div className="text-7xl font-black text-burgundy">1초</div>
              <p className="text-xl font-bold tracking-tight">지체 없는 파묘</p>
              <p className="text-gray-500 leading-relaxed">복잡한 필터링 대신<br />대화하듯 바로 찾습니다.</p>
            </div>
            <div className="space-y-4">
              <div className="text-7xl font-black text-burgundy">∞</div>
              <p className="text-xl font-bold tracking-tight">무한한 확정</p>
              <p className="text-gray-500 leading-relaxed">잠들어 있던 생각이<br />새로운 가치로 이어집니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto glass-card rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden border-burgundy/20 shadow-3xl bg-black/60">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-burgundy/10 blur-[120px] -z-10 rounded-full"></div>
          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
            지금, 당신의 기억을 <br className="md:hidden" />
            <span className="text-burgundy">파묘</span>해보세요.
          </h2>
          <p className="text-gray-300 text-xl mb-16 max-w-2xl mx-auto font-medium">
            매일 쏟아지는 정보들 속에서 길을 잃지 않도록. <br />
            파묘가 당신의 가장 든든한 기록 비서가 되어드릴게요.
          </p>
          <div className="flex flex-col items-center gap-6">
             <button onClick={() => setShowComingSoon(true)} className="px-12 py-6 bg-burgundy text-white hover:bg-burgundy-light rounded-[2rem] font-bold text-2xl shadow-2xl shadow-burgundy/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 cta-glow">
              무료로 시작하기 <ArrowRight size={24} />
            </button>
            <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
              <Lock size={14} className="text-burgundy/60" />
              <span>개인 데이터 보호 기능 탑재</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-burgundy rounded flex items-center justify-center font-bold text-sm">P</div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white">pamyo</span>
          </div>
          <div className="flex gap-10 text-gray-500 text-sm font-semibold">
            <a href="#" className="hover:text-burgundy transition-colors">이용약관</a>
            <a href="#" className="hover:text-burgundy transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-burgundy transition-colors">도움말</a>
            <a href="#" className="hover:text-burgundy transition-colors">문의하기</a>
          </div>
          <p className="text-gray-600 text-xs font-medium tracking-wide">© 2024 PAMYO AI. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
