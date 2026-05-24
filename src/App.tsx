import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Sparkles, 
  Moon, 
  Sun, 
  CreditCard, 
  History, 
  ShieldAlert, 
  User as UserIcon, 
  LogOut, 
  Play, 
  Pause, 
  Mic, 
  Send, 
  CheckCircle, 
  Cpu, 
  Copy, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  BarChart2, 
  Users, 
  Check, 
  X, 
  TrendingUp, 
  Globe, 
  Image as ImageIcon,
  Volume2,
  Lock,
  RefreshCw,
  Wand2
} from 'lucide-react';

// ==========================================
// STATIC CONSTANTS & TAROT CARDS
// ==========================================

const TAROT_DECK = [
  { name: 'The Magician (Nhà Ảo Thuật)', upright: 'Khởi đầu mới, ý chí tự chủ, sáng tạo tinh thần.', reversed: 'Sức mạnh thao túng, tài năng lãng phí, mưu đồ.', img: '🧙‍♂️' },
  { name: 'The High Priestess (Nữ Linh Mục)', upright: 'Trực giác nhạy bén, thế giới tiềm thức thần bí.', reversed: 'Bí mật bị tiết lộ, định kiến nông nổi, hời hợt.', img: '🌙' },
  { name: 'The Empress (Nữ Hoàng)', upright: 'Sự sinh sôi nảy nở, sung túc dồi dào, mẫu tính.', reversed: 'Sự áp đặt, thiếu sáng tạo, hao tổn tiền tài.', img: '👑' },
  { name: 'The Emperor (Hoàng Đế)', upright: 'Kỷ luật thép, quyền lực tối cao, tính hệ thống.', reversed: 'Độc đoán bảo thủ, yếu thế, mất kiểm soát.', img: '🏰' },
  { name: 'The Hierophant (Thầy Tư Tế)', upright: 'Đức tin truyền thống, giáo dục trí tuệ, sự hòa hợp.', reversed: 'Phá vỡ quy tắc, giáo điều phi lý, nổi loạn.', img: '⛪' },
  { name: 'The Lovers (Tình Nhân)', upright: 'Sự dung hòa tình cảm, lựa chọn định mệnh, hòa hợp.', reversed: 'Mất cân bằng, mâu thuẫn nội tâm, chia rẽ lứa đôi.', img: '💖' },
  { name: 'The Chariot (Chiến Xa)', upright: 'Nghị lực vươn lên, kiểm soát bản thân, thắng lợi.', reversed: 'Thiếu định hướng, mất đà, thất bại tạm thời.', img: '🛡️' },
  { name: 'Justice (Công Lý)', upright: 'Sự công bằng khách quan, nhân quả phân minh, chân lý.', reversed: 'Thiếu công bằng, thành kiến, sai lệch phán xét.', img: '⚖️' },
  { name: 'The Hermit (Ẩn Sĩ)', upright: 'Sự chiêm nghiệm nội tâm, tìm kiếm chân lý, đơn độc.', reversed: 'Sự cô lập tiêu cực, nghi ngại, bướng bỉnh.', img: '🏔️' },
  { name: 'Wheel of Fortune (Bánh Xe Số Phận)', upright: 'Vận may gõ cửa, chu kỳ thịnh suy, bước ngoặt.', reversed: 'Rủi ro khách quan, kháng cự số phận, xui xẻo.', img: '🎡' },
];

const ZODIAC_DATA = [
  {
    id: 'aries',
    name: 'Bạch Dương (Aries)',
    range: '21/03 - 19/04',
    planet: 'Sao Hỏa (Mars)',
    element: 'Lửa (Fire)',
    luckyNumbers: '1, 9, 21',
    luckyColor: 'Đỏ, Hồng',
    icon: '♈',
    traits: 'Tiên phong dũng cảm, quyết đoán và luôn tràn trề nhiệt huyết bùng cháy. Thích hành động nhanh gọn, tuy nhiên đôi khi còn bộc phát, thiếu kiên nhẫn.',
    insight: 'Lửa thiêng Bạch Dương hôm nay bùng cháy mãnh liệt khí cát từ sao Thiên Vương. Thích hợp để quyết định các việc trọng đại ở thế giới vật lý và dấn thân giải mã tương lai.',
    energy: 92,
    love: 80,
    career: 95
  },
  {
    id: 'taurus',
    name: 'Kim Ngưu (Taurus)',
    range: '20/04 - 20/05',
    planet: 'Sao Kim (Venus)',
    element: 'Đất (Earth)',
    luckyNumbers: '2, 6, 15',
    luckyColor: 'Xanh Lục, Vàng',
    icon: '♉',
    traits: 'Kiên trì vững chãi, thực tế chính trực, yêu chuộng nghệ thuật hòa bình và sự ổn định dài lâu. Thích tích lũy lâu dài, đôi khi hơi cứng đầu bảo thủ.',
    insight: 'Từ trường Kim Ngưu hôm nay mang tính ổn định vững chãi, rất thích hợp để bạn nạp linh cốt, tịnh tâm và tích lũy tiền tài của tiên tri tài chính.',
    energy: 85,
    love: 90,
    career: 88
  },
  {
    id: 'gemini',
    name: 'Song Tử (Gemini)',
    range: '21/05 - 21/06',
    planet: 'Sao Thủy (Mercury)',
    element: 'Khí (Air)',
    luckyNumbers: '3, 5, 12',
    luckyColor: 'Vàng Chanh, Trắng',
    icon: '♊',
    traits: 'Cực kỳ linh hoạt, mẫn tiệp sắc bén, ham tìm tòi khám phá và cực kỳ có tài giao tế hùng biện. Dẫu vậy thỉnh thoảng dễ thay đổi nhanh chóng, thiếu kiên trì.',
    insight: 'Chòm sao đang chủ quản tiết khí hiện tại! Năng lực lĩnh ngộ trực giác đạt mức tối cao tuyệt đỉnh. Các quẻ giải Tarot hôm nay cho bạn có độ tương sinh hoàn hảo 99.8%.',
    energy: 98,
    love: 94,
    career: 97
  },
  {
    id: 'cancer',
    name: 'Cự Giải (Cancer)',
    range: '22/06 - 22/07',
    planet: 'Mặt Trăng (Moon)',
    element: 'Nước (Water)',
    luckyNumbers: '2, 7, 18',
    luckyColor: 'Bạc, Ngọc Trai',
    icon: '♋',
    traits: 'Giàu cảm xúc thâm trầm, nhạy cảm ấm áp, mang trực giác phi thường thấu suốt và luôn hết lòng che chở gia đình. Có lúc dễ do dự, u sầu bế tắc.',
    insight: 'Luồng linh khí của Mặt Trăng đang chiếu rọi điềm lành sâu lắng vào cung mệnh Cự Giải. Thắp nến tịnh thất giúp bạn thanh lọc, hanh thông đầu óc và hóa giải túc trái.',
    energy: 80,
    love: 95,
    career: 75
  },
  {
    id: 'leo',
    name: 'Sư Tử (Leo)',
    range: '23/07 - 22/08',
    planet: 'Mặt Trời (Sun)',
    element: 'Lửa (Fire)',
    luckyNumbers: '1, 4, 11',
    luckyColor: 'Vàng Kim, Cam rực rỡ',
    icon: '♌',
    traits: 'Quy tụ tố chất thủ lĩnh hào sảng, quảng đại vị tha, cực kỳ tự tin và phong độ sáng tạo kiêu hùng. Tuy thế thỉnh thoảng hơi kiêu ngạo, thích cái tôi trung tâm.',
    insight: 'Hào quang bừng sáng từ Sư Tử thu hút vạn sự, dũng khí ngời ngời. Nhận được lực cát tương tài từ tinh tú đại cát, tiền tài và may mắn gõ cửa rộn ràng.',
    energy: 94,
    love: 82,
    career: 99
  },
  {
    id: 'virgo',
    name: 'Xử Nữ (Virgo)',
    range: '23/08 - 22/09',
    planet: 'Sao Thủy (Mercury)',
    element: 'Đất (Earth)',
    luckyNumbers: '5, 8, 14',
    luckyColor: 'Xám Khói, Lam Nhạt',
    icon: '♍',
    traits: 'Tư duy logic sắc sảo phân minh, cẩn thận chu đáo tỉ mỉ hiếm thấy, luôn siêng năng tìm kiếm giải pháp hoàn hảo. Song lạm dụng có lúc quá cầu toàn phán xét.',
    insight: 'Xử Nữ nhận sóng từ trường cân bằng hoàn mỹ, suy nghĩ sắc sảo thấu suốt. Vô cùng phù hợp để chiêm bái bản đồ sao Tử Vi phân tích cặn kẽ thăng trầm sắp tới.',
    energy: 88,
    love: 85,
    career: 91
  },
  {
    id: 'libra',
    name: 'Thiên Bình (Libra)',
    range: '23/09 - 23/10',
    planet: 'Sao Kim (Venus)',
    element: 'Khí (Air)',
    luckyNumbers: '6, 9, 23',
    luckyColor: 'Hồng Đào, Xanh Lam',
    icon: '♎',
    traits: 'Hiền hòa thanh lịch dĩ hòa vi quý, tôn thờ công bằng mỹ lệ và cực tinh tế duyên dáng trong đối ngoại. Nhược điểm thỉnh thoảng hay đắn đo do dự, thiếu dứt khoát.',
    insight: 'Tinh cầu bảo hộ tương sinh giúp Thiên Bình thu nhận vạn cát lành trong tình cảm và các quyết sách cộng tác. Hãy mở rộng tịnh thất tâm hồn để đón cát khí tinh tú.',
    energy: 85,
    love: 96,
    career: 84
  },
  {
    id: 'scorpio',
    name: 'Thiên Yết (Scorpio)',
    range: '24/10 - 22/11',
    planet: 'Sao Diêm Vương (Pluto)',
    element: 'Nước (Water)',
    luckyNumbers: '3, 4, 19',
    luckyColor: 'Đỏ Thẫm, Đen Huyền',
    icon: '♏',
    traits: 'Chứa đựng nội lực huyền bí sâu xa, trực giác sắc bén phi thường lý tính, trung thành quyết liệt với lý tưởng. Có điểm hơi đa nghi và tính chiếm hữu cao.',
    insight: 'Năng lực trực giác huyền bí của Bọ Cạp đang trỗi dậy cực độ. Thao tác lọc bài hay gieo quẻ giải hạn trong thời gian này sẽ linh ứng lạ thường, bách phát bách trúng.',
    energy: 91,
    love: 89,
    career: 92
  },
  {
    id: 'sagittarius',
    name: 'Nhân Mã (Sagittarius)',
    range: '23/11 - 21/12',
    planet: 'Sao Mộc (Jupiter)',
    element: 'Lửa (Fire)',
    luckyNumbers: '5, 7, 20',
    luckyColor: 'Tím Khói, Xanh Biển',
    icon: '♐',
    traits: 'Lạc quan phơi phới, khao khát tự do mãnh liệt, hướng ngoại rộng mở thích tò mò phiêu lưu. Nhược điểm đôi khi bồn chồn thiếu kiên nhẫn, quá bộc trực.',
    insight: 'Sao Mộc đại cát đại lợi đang soi đường dẫn lối cho Nhân Mã thăng hoa. Tư duy vượt giới hạn giúp bạn khai thông bế tắc lâu năm trong luân xa tài lộc.',
    energy: 93,
    love: 87,
    career: 96
  },
  {
    id: 'capricorn',
    name: 'Ma Kết (Capricorn)',
    range: '22/12 - 19/01',
    planet: 'Sao Thổ (Saturn)',
    element: 'Đất (Earth)',
    luckyNumbers: '4, 10, 22',
    luckyColor: 'Nâu Cát, Xanh Rêu',
    icon: '♑',
    traits: 'Kiên định bền chí, có khát vọng lớn lao, có ý thức kỷ luật trách nhiệm và tinh thần tổ chức ưu việt vượt trội. Đôi khi hơi cứng nhắc lạnh lùng.',
    insight: 'Sức mạnh kỷ luật vững bền của Thổ tinh trang trọng hộ thân cho Ma Kết. Các nỗ lực giải quẻ tài chính mang tính hệ thống sẽ sinh tài vượng khí to lớn.',
    energy: 89,
    love: 78,
    career: 94
  },
  {
    id: 'aquarius',
    name: 'Bảo Bình (Aquarius)',
    range: '20/01 - 18/02',
    planet: 'Sao Thiên Vương (Uranus)',
    element: 'Khí (Air)',
    luckyNumbers: '7, 11, 16',
    luckyColor: 'Lam Sáng, Xám Bạc',
    icon: '♒',
    traits: 'Sáng tạo tiên phong đột phá, tôn trọng cá tính độc lập dũng mãnh, đầy hoài bão nhân đạo công ích. Đi đôi với phong thái đôi lúc thu mình xa cách lập dị.',
    insight: 'Mạng lưới thiên hà truyền dẫn ý tưởng khai sáng độc đáo trực tiếp vào tâm thức Bảo Bình. Thích hợp đi đầu trong công nghệ tài chính tâm linh đột phá.',
    energy: 87,
    love: 81,
    career: 90
  },
  {
    id: 'pisces',
    name: 'Song Ngư (Pisces)',
    range: '19/02 - 20/03',
    planet: 'Sao Hải Vương (Neptune)',
    element: 'Nước (Water)',
    luckyNumbers: '3, 9, 25',
    luckyColor: 'Trắng Sữa, Tím Huyền Thần',
    icon: '♓',
    traits: 'Ngập tràn trí tưởng tượng mộng mơ dịu dàng, tấm lòng bác ái lương thiện dạt dào thấu cảm sâu sắc. Song lại hay nhạy cảm dễ tổn thương mơ màng.',
    insight: 'Không gian tâm linh rộng mở rước an lành dồi dào về cho Song Ngư. Khả năng kết nối tinh tú cực mạnh giúp cuộc sống thăng hoa, cát tường hỷ lạc vây quanh.',
    energy: 82,
    love: 99,
    career: 80
  }
];

export default function App() {
  // Authentication & Session state
  const [token, setToken] = useState<string | null>(localStorage.getItem('mystic_token'));
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string; role: string } | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState('');

  // Captcha Minigame state
  const [captchaValue, setCaptchaValue] = useState(0);
  const [targetCaptchaValue, setTargetCaptchaValue] = useState(75);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  // Main navigation view: 'landing' | 'checkout' | 'ritual' | 'oracles' | 'history' | 'admin'
  const [currentView, setCurrentView] = useState<'landing' | 'checkout' | 'ritual' | 'oracles' | 'history' | 'admin'>('landing');

  // Checkout and Pricing selected services
  const [selectedService, setSelectedService] = useState<'tarot' | 'horoscope' | 'ai_daily' | 'ai_weekly' | 'ai_monthly' | 'love' | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'usdt' | 'bank'>('usdt');
  const [activePayment, setActivePayment] = useState<any>(null);
  const [bankTransfers, setBankTransfers] = useState<any[]>([]);

  // Interaction logs / UI message arrays
  const [aiPersonaTab, setAiPersonaTab] = useState<'tarot' | 'astrology' | 'coach' | 'love'>('tarot');
  const [teaserInput, setTeaserInput] = useState('');
  const [teaserOutput, setTeaserOutput] = useState('');
  const [teaserLoading, setTeaserLoading] = useState(false);

  // Active Reading Inputs
  const [tarotSelectedCards, setTarotSelectedCards] = useState<number[]>([]);
  const [tarotFlipped, setTarotFlipped] = useState<boolean[]>([]);
  const [birthDetails, setBirthDetails] = useState({
    date: '1995-10-24',
    time: '21:15',
    location: 'Hà Nội'
  });
  const [oracleQuery, setOracleQuery] = useState('');
  const [readingOutput, setReadingOutput] = useState('');
  const [readingLoading, setReadingLoading] = useState(false);
  const [unlockedTarot, setUnlockedTarot] = useState(false);
  const [unlockedAstro, setUnlockedAstro] = useState(false);
  const [unlockedLove, setUnlockedLove] = useState(false);

  // Donation Dialog Toggles
  const [showDonationInfo, setShowDonationInfo] = useState(false);

  // Relationship Custom Inputs (boitinhyeu.vn concept)
  const [lovePartner1, setLovePartner1] = useState('');
  const [lovePartner2, setLovePartner2] = useState('');
  const [loveDob1, setLoveDob1] = useState('2000-11-17');
  const [loveDob2, setLoveDob2] = useState('2002-05-20');
  const [loveStatus, setLoveStatus] = useState('dating'); // dating, married, crush, complicated

  // Subscription Details & Countdown tick states
  const [isRenewalCheckout, setIsRenewalCheckout] = useState(false);
  const [tarotSubStatus, setTarotSubStatus] = useState<{
    unlocked: boolean;
    expired: boolean;
    canRenew: boolean;
    timeLeftMs: number;
    renewTimeLeftMs: number;
    payment: any;
  } | null>(null);

  const [astroSubStatus, setAstroSubStatus] = useState<{
    unlocked: boolean;
    expired: boolean;
    canRenew: boolean;
    timeLeftMs: number;
    renewTimeLeftMs: number;
    payment: any;
  } | null>(null);

  const [loveSubStatus, setLoveSubStatus] = useState<{
    unlocked: boolean;
    expired: boolean;
    canRenew: boolean;
    timeLeftMs: number;
    renewTimeLeftMs: number;
    payment: any;
    usedCount?: number;
    paidCount?: number;
  } | null>(null);

  const [freeTurnsLeft, setFreeTurnsLeft] = useState<number>(3);
  const [aiSubStatus, setAiSubStatus] = useState<{
    unlocked: boolean;
    hasActiveSub: boolean;
    timeLeftMs: number;
    payment: any;
    freeTurnsLeft: number;
    totalUsed: number;
  } | null>(null);

  // Interval hook to tick down remaining time values
  useEffect(() => {
    const timer = setInterval(() => {
      setTarotSubStatus(prev => {
        if (!prev) return null;
        const nextTimeLeft = Math.max(0, prev.timeLeftMs - 1000);
        const nextRenewTimeLeft = Math.max(0, prev.renewTimeLeftMs - 1000);
        return {
          ...prev,
          timeLeftMs: nextTimeLeft,
          renewTimeLeftMs: nextRenewTimeLeft,
          unlocked: nextTimeLeft > 0,
          expired: nextTimeLeft <= 0,
          canRenew: nextTimeLeft <= 0 && nextRenewTimeLeft > 0
        };
      });
      setAstroSubStatus(prev => {
        if (!prev) return null;
        const nextTimeLeft = Math.max(0, prev.timeLeftMs - 1000);
        const nextRenewTimeLeft = Math.max(0, prev.renewTimeLeftMs - 1000);
        return {
          ...prev,
          timeLeftMs: nextTimeLeft,
          renewTimeLeftMs: nextRenewTimeLeft,
          unlocked: nextTimeLeft > 0,
          expired: nextTimeLeft <= 0,
          canRenew: nextTimeLeft <= 0 && nextRenewTimeLeft > 0
        };
      });
      setAiSubStatus(prev => {
        if (!prev) return null;
        const nextTimeLeft = Math.max(0, prev.timeLeftMs - 1000);
        return {
          ...prev,
          timeLeftMs: nextTimeLeft,
          unlocked: nextTimeLeft > 0
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (ms: number) => {
    if (ms <= 0) return "00:00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')} giờ : ${minutes.toString().padStart(2, '0')} phút : ${seconds.toString().padStart(2, '0')} giây`;
  };

  // Voice Speech & TTS Playback audio
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [ttsLoading, setTtsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Notification popup toasts
  const [toast, setToast] = useState<{ text: string; mode: 'success' | 'info' | 'error' } | null>(null);

  // 🛡️ HB AI CHAT WIDGET STATES AND HANDLER
  const [isHbChatOpen, setIsHbChatOpen] = useState(false);
  const [hbMessages, setHbMessages] = useState<Array<{ role: 'user' | 'model'; message: string }>>([
    { role: 'model', message: 'Xin chào! Tôi là HB AI - Tổng đài Trí Tuệ Nhân Tạo Cao Cấp siêu thông minh của Mystic. Tôi ở đây để hỗ trợ bạn tất cả câu hỏi về các gói giải quẻ Tarot, Tử Vi, cách thanh toán kích hoạt, cũng như bất kỳ thắc mắc tri thức nào khác trên đời! Bạn muốn khám phá điều gì hôm nay?' }
  ]);
  const [hbInput, setHbInput] = useState('');
  const [hbLoading, setHbLoading] = useState(false);

  // Admin section details
  const [adminStats, setAdminStats] = useState<any>({ totalRevenue: 0, usersCount: 0, salesCount: 0, tarotSales: 0, horoscopeSales: 0, logs: [] });
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [adminTransfers, setAdminTransfers] = useState<any[]>([]);
  const [momoSimulateLoading, setMomoSimulateLoading] = useState(false);

  // Parallax stars
  const starsArray = useRef(Array.from({ length: 45 }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    size: Math.random() > 0.6 ? 'w-1.5 h-1.5' : 'w-0.5 h-0.5'
  })));

  // Location restriction simulation values
  const [userLocation, setUserLocation] = useState({ city: 'Hồ Chí Minh', ip: '113.161.44.205', inVN: true });
  const [detectedLocation, setDetectedLocation] = useState<string>('HANOI, VIETNAM (VND)');
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(() => !sessionStorage.getItem('mystic_welcome_dismissed'));
  const [showFounderOverlay, setShowFounderOverlay] = useState<boolean>(() => !sessionStorage.getItem('mystic_founder_dismissed'));
  const [welcomeCountdown, setWelcomeCountdown] = useState<number>(10);
  const [selectedZodiacSign, setSelectedZodiacSign] = useState<string>('gemini');

  // Auto-close welcome modal after 10 seconds or manual dismiss
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showWelcomeModal) {
      setWelcomeCountdown(10); // reset countdown
      interval = setInterval(() => {
        setWelcomeCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowWelcomeModal(false);
            sessionStorage.setItem('mystic_welcome_dismissed', 'true');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showWelcomeModal]);

  // Live Location Detection
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          if (data.city && data.country_name) {
            const countryStr = data.country_name.toUpperCase();
            const cityStr = data.city.toUpperCase();
            const currencyStr = data.currency ? ` (${data.currency})` : ' (VND)';
            setDetectedLocation(`${cityStr}, ${countryStr}${currencyStr}`);
            setUserLocation({
              city: data.city,
              ip: data.ip || '113.161.44.205',
              inVN: data.country_code === 'VN'
            });
            return;
          }
        }
      } catch (err) {
        console.warn('IP Geolocation failed, trying standard Geolocation API', err);
      }

      // Browser Geolocation API Fallback
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
              if (geoResponse.ok) {
                const geoData = await geoResponse.json();
                const city = geoData.address.city || geoData.address.town || geoData.address.village || 'VỊ TRÍ CỦA BẠN';
                const country = geoData.address.country || 'VIETNAM';
                setDetectedLocation(`${city.toUpperCase()}, ${country.toUpperCase()} (VND)`);
                setUserLocation(prev => ({ ...prev, city: city }));
              } else {
                setDetectedLocation('HANOI, VIETNAM (VND)');
              }
            } catch (fallbackErr) {
              setDetectedLocation('HANOI, VIETNAM (VND)');
            }
          },
          () => {
            setDetectedLocation('HANOI, VIETNAM (VND)');
          }
        );
      }
    };

    detectLocation();
  }, []);

  // Load User Data and states on Mount
  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    }
  }, [token]);

  // Handle toast timers
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Check locks when currentUser or view shifts
  useEffect(() => {
    if (currentUser) {
      checkServiceUnlocks();
    }
  }, [currentUser, currentView]);

  // Reset Captcha on Auth Mode change
  useEffect(() => {
    setCaptchaValue(0);
    setIsCaptchaVerified(false);
    // Generate a random target position between 55 and 85
    setTargetCaptchaValue(Math.floor(Math.random() * 30) + 55);
  }, [authMode]);

  const showToast = (text: string, mode: 'success' | 'info' | 'error' = 'info') => {
    setToast({ text, mode });
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('mystic_token');
    setToken(null);
    setCurrentUser(null);
    setCurrentView('landing');
    setUnlockedTarot(false);
    setUnlockedAstro(false);
    setUnlockedLove(false);
    setLoveSubStatus(null);
    showToast('Đã đăng xuất tài khoản', 'info');
  };

  const checkServiceUnlocks = async () => {
    if (!token) return;
    try {
      const resTarot = await fetch('/api/payments/verify/tarot', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataTarot = await resTarot.json();
      setTarotSubStatus(dataTarot);
      setUnlockedTarot(dataTarot.unlocked);

      const resAstro = await fetch('/api/payments/verify/horoscope', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataAstro = await resAstro.json();
      setAstroSubStatus(dataAstro);
      setUnlockedAstro(dataAstro.unlocked);

      const resLove = await fetch('/api/payments/verify/love', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataLove = await resLove.json();
      setLoveSubStatus(dataLove);
      setUnlockedLove(dataLove.unlocked);

      const resAiSub = await fetch('/api/payments/verify/ai_sub', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataAiSub = await resAiSub.json();
      setAiSubStatus(dataAiSub);
      setFreeTurnsLeft(dataAiSub.freeTurnsLeft);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!authEmail || !authPassword) {
      setAuthError('Vui lòng điền đầy đủ tài khoản & mật khẩu');
      return;
    }
    if (!isCaptchaVerified) {
      setAuthError('Vui lòng hoàn thành minigame trượt hình để xác minh!');
      return;
    }
    const path = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || 'Xảy ra lỗi xác thực');
        return;
      }
      localStorage.setItem('mystic_token', data.token);
      setToken(data.token);
      setCurrentUser(data.user);
      setAuthEmail('');
      setAuthPassword('');
      showToast(authMode === 'login' ? 'Đăng nhập thành công' : 'Đăng ký tài khoản thành công', 'success');
      
      // If we had a selected service, proceed to checkout
      if (selectedService) {
        setCurrentView('checkout');
      }
    } catch (err) {
      setAuthError('Không thể kết nối đến máy chủ');
    }
  };

  // Teaser Free preview for anonymous guests
  const handleTeaserPreview = async () => {
    if (!teaserInput.trim()) {
      showToast('Hãy nhập câu hỏi thắc mắc của bạn', 'error');
      return;
    }
    setTeaserLoading(true);
    setTeaserOutput('');
    try {
      const res = await fetch('/api/ai/teaser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceType: 'tarot', promptInput: teaserInput }),
      });
      const data = await res.json();
      if (res.ok) {
        setTeaserOutput(data.teaser);
      } else {
        showToast(data.error || 'Lỗi bốc quẻ thử nghiệm', 'error');
      }
    } catch (err) {
      showToast('Lỗi đường mòn kết nối chiêm tinh', 'error');
    } finally {
      setTeaserLoading(false);
    }
  };

  // Handler for HB AI Super Assistant
  const handleSendHbMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!hbInput.trim() || hbLoading) return;

    const userMsg = hbInput.trim();
    setHbInput('');
    
    const updatedMessages = [...hbMessages, { role: 'user' as const, message: userMsg }];
    setHbMessages(updatedMessages);
    setHbLoading(true);

    try {
      const res = await fetch('/api/ai/hb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: updatedMessages })
      });

      const data = await res.json();
      if (res.ok) {
        setHbMessages(prev => [...prev, { role: 'model', message: data.reply }]);
      } else {
        setHbMessages(prev => [...prev, { role: 'model', message: `⚠️ Có lỗi: ${data.error || 'HB AI đang thiền định'}` }]);
      }
    } catch (err) {
      console.error(err);
      setHbMessages(prev => [...prev, { role: 'model', message: '⚠️ Sóng kết nối vũ trụ bị gián đoạn. Vui lòng kiểm tra kết nối mạng và thử lại.' }]);
    } finally {
      setHbLoading(false);
    }
  };

  const resetHbChat = () => {
    setHbMessages([
      { role: 'model', message: 'Xin chào! Tôi là HB AI - Tổng đài Trí Tuệ Nhân Tạo Cao Cấp siêu thông minh của Mystic. Tôi ở đây để hỗ trợ bạn tất cả câu hỏi về các gói giải quẻ Tarot, Tử Vi, cách thanh toán kích hoạt, cũng như bất kỳ thắc mắc tri thức nào khác trên đời! Bạn muốn khám phá điều gì hôm nay?' }
    ]);
    showToast('Tịnh hóa chuỗi đàm thoại với HB AI thành công!', 'success');
  };

  // Launch service checkout
  const triggerServicePurchase = (type: 'tarot' | 'horoscope' | 'ai_daily' | 'ai_weekly' | 'ai_monthly' | 'love') => {
    setSelectedService(type);
    setIsRenewalCheckout(false);
    if (!token) {
      showToast('Vui lòng đăng nhập hoặc tạo tài khoản để thực hiện thanh toán', 'info');
      // Scroll to login box
      document.getElementById('auth-box')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      createPayment(type, false);
    }
  };

  const triggerServiceRenewal = (type: 'tarot' | 'horoscope') => {
    setSelectedService(type);
    setIsRenewalCheckout(true);
    if (!token) {
      showToast('Vui lòng đăng nhập hoặc tạo tài khoản để thực hiện thanh toán', 'info');
      document.getElementById('auth-box')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      createPayment(type, true);
    }
  };

  const createPayment = async (type: 'tarot' | 'horoscope' | 'ai_daily' | 'ai_weekly' | 'ai_monthly' | 'love', isRenewal: boolean) => {
    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ method: selectedPaymentMethod, serviceType: type, isRenewal }),
      });
      const data = await res.json();
      if (res.ok) {
        setActivePayment(data.payment);
        setCurrentView('checkout');
        if (isRenewal) {
          showToast('Khởi tạo hóa đơn GIA HẠN thành công (Đã giảm 150K!)', 'success');
        } else {
          showToast('Khởi tạo hóa đơn chiêm tinh thành công', 'success');
        }
      } else {
        showToast(data.error || 'Không thể tạo đơn hàng', 'error');
      }
    } catch {
      showToast('Lỗi mạng thanh toán', 'error');
    }
  };

  // Switch payment system methods dynamically
  const switchPaymentMethod = async (method: 'usdt' | 'bank') => {
    setSelectedPaymentMethod(method);
    if (selectedService && token) {
      try {
        const res = await fetch('/api/payments/create', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ method, serviceType: selectedService, isRenewal: isRenewalCheckout }),
        });
        const data = await res.json();
        if (res.ok) {
          setActivePayment(data.payment);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Copy bank transfer info helper
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Đã sao chép ${label}`, 'success');
  };

  // Webhook sandbox sim for immediate unlock
  const handleSimulatePaymentSuccess = async () => {
    if (!activePayment) return;
    setMomoSimulateLoading(true);
    try {
      const res = await fetch('/api/payments/momo-ipn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderCode: activePayment.orderCode, 
          status: 'success',
          transitionId: 'SIM-' + Math.random().toString(36).substr(2, 9).toUpperCase()
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast('MoMo xác minh thành công! Giao dịch hợp lệ.', 'success');
        // Let's go to the sacred cosmic unlock ritual
        setTimeout(() => {
          setMomoSimulateLoading(false);
          setCurrentView('ritual');
        }, 1500);
      } else {
        showToast(data.error || 'Simulate MoMo failed', 'error');
        setMomoSimulateLoading(false);
      }
    } catch {
      showToast('Lỗi giả lập', 'error');
      setMomoSimulateLoading(false);
    }
  };

  // Mock Submit Bank Receipt (it registers as pending transfer)
  const handleSubmitBankTransferReceipt = () => {
    showToast('Hệ thống đã ghi nhận yêu cầu chuyển khoản. Đang chờ quản trị viên xác minh tài khoản.', 'success');
    setCurrentView('landing');
  };

  // Execute payment status check manually
  const checkPaymentStatus = async () => {
    if (!activePayment) return;
    try {
      const res = await fetch(`/api/payments/status/${activePayment.orderCode}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        if (data.status === 'success') {
          showToast('Cổng thanh toán xác nhận thành công!', 'success');
          setCurrentView('ritual');
        } else {
          showToast('Hóa đơn chưa được thanh toán thành công. Vui lòng kiểm tra lại.', 'info');
        }
      }
    } catch {
      showToast('Không kiểm tra được trạng thái hóa đơn', 'error');
    }
  };

  // Unlock Ritual Screen Timeout triggers Oracle Dashboard
  const completeRitualToOracles = () => {
    checkServiceUnlocks();
    if (selectedService === 'tarot') {
      setAiPersonaTab('tarot');
    } else if (selectedService === 'horoscope') {
      setAiPersonaTab('astrology');
    }
    setCurrentView('oracles');
    setReadingOutput('');
  };

  // AI Tarot Interactivity
  const selectTarotCard = (index: number) => {
    if (tarotSelectedCards.length >= 3) {
      showToast('Bạn đã bốc đủ 3 lá bài phân tích', 'info');
      return;
    }
    if (tarotSelectedCards.includes(index)) return;
    
    const nextArr = [...tarotSelectedCards, index];
    setTarotSelectedCards(nextArr);
    
    // Simulate interactive flip
    const flippArr = [...tarotFlipped];
    flippArr[index] = true;
    setTarotFlipped(flippArr);

    showToast(`Đã bốc lá thứ ${nextArr.length}: ${TAROT_DECK[index].name}`, 'success');
  };

  const resetTarotSelection = () => {
    setTarotSelectedCards([]);
    setTarotFlipped(Array(10).fill(false));
  };

  // Premium AI Reading Handler (Vetted via lock checking)
  const handleGenerateAIReading = async () => {
    let cardString = '';
    
    if (aiPersonaTab === 'tarot') {
      if (tarotSelectedCards.length < 3) {
        showToast('Bạn phải bốc đủ 3 lá bài để bắt đầu giải mật', 'error');
        return;
      }
      cardString = tarotSelectedCards.map(i => TAROT_DECK[i].name).join(', ');
    }

    if (aiPersonaTab === 'love') {
      if (!lovePartner1.trim() || !lovePartner2.trim()) {
        showToast('Vui lòng điền đầy đủ danh tính hai bên bản chủ để tơ hồng hóa hợp', 'error');
        return;
      }
    }

    setReadingLoading(true);
    setReadingOutput('');
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
    setAudioUrl(null);

    // Validate if the service is unlocked
    let isServiceUnlocked = false;
    const isBypass = currentUser?.role === 'admin';

    if (aiPersonaTab === 'tarot') {
      isServiceUnlocked = unlockedTarot;
    } else if (aiPersonaTab === 'astrology') {
      isServiceUnlocked = unlockedAstro;
    } else if (aiPersonaTab === 'love') {
      isServiceUnlocked = unlockedLove;
    } else if (aiPersonaTab === 'coach') {
      isServiceUnlocked = !!aiSubStatus?.unlocked || freeTurnsLeft > 0;
    }

    if (!isServiceUnlocked && !isBypass) {
      if (aiPersonaTab === 'coach') {
        showToast('Thí chủ đã sử dụng hết 3 lượt đàm thoại miễn phí của trợ lý tịnh thất. Vui lòng đăng ký gói Siêu AI Vô Hạn (Nhật Linh/Thất Tinh/Nguyệt Tướng) để kết nối.', 'error');
      } else {
        showToast('Dịch vụ này bị khóa. Vui lòng thanh toán dâng lễ để kích hoạt.', 'error');
      }
      setReadingLoading(false);
      return;
    }

    try {
      const lovePrompt = `Đối tượng 1: ${lovePartner1} (sinh ngày ${loveDob1}), Đối tượng 2: ${lovePartner2} (sinh ngày ${loveDob2}), Trạng thái duyên số: ${loveStatus === 'dating' ? 'Đang hẹn hò, tìm hiểu' : loveStatus === 'married' ? 'Đã thành kính kết hôn' : loveStatus === 'crush' ? 'Đơm hoa đơn phương / Thương thầm' : 'Mối quan hệ phức tạp/Trắc trở'}. Nội dung cụ thể cần giải đáp hoặc cầu tự: "${oracleQuery || 'Xem tình duyên hòa hợp thâm sâu giữa 2 người'}"`;

      const res = await fetch('/api/ai/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceType: aiPersonaTab,
          promptInput: aiPersonaTab === 'coach' ? (oracleQuery || 'Hãy cho tôi một câu sấm truyền từ tinh đẩu') : aiPersonaTab === 'love' ? lovePrompt : `Giải mật quẻ quỷ chi tiết cho tôi`,
          birthDetails: aiPersonaTab === 'astrology' ? birthDetails : null,
          cardConfiguration: aiPersonaTab === 'tarot' ? cardString : null
        })
      });
      const data = await res.json();
      if (res.ok) {
        setReadingOutput(data.reading);
        showToast('Hội đồng tiên tri đã tìm ra thông điệp cho bạn!', 'success');
        // Instantly refresh remaining free turns on successful read
        checkServiceUnlocks();
      } else {
        showToast(data.error || 'Trục trặc đường mòn chiêm tinh', 'error');
      }
    } catch {
      showToast('Không thể kết nối đến tiên tri tối cao', 'error');
    } finally {
      setReadingLoading(false);
    }
  };

  // True Server-Side Gemini TTS narration conversion
  const handleGenerateTTSAudio = async () => {
    if (!readingOutput) return;
    setTtsLoading(true);
    try {
      const res = await fetch('/api/ai/tts', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: readingOutput, type: aiPersonaTab }),
      });
      const data = await res.json();
      if (res.ok && data.audioData) {
        // Decode base64 bytes dynamically into a playable sound element
        const pcmData = data.audioData;
        const sndUrl = `data:audio/wav;base64,${pcmData}`;
        setAudioUrl(sndUrl);
        setIsPlayingAudio(true);
        showToast('Tiên tri bắt đầu thuyết minh bài báo oai hùng...', 'success');
      } else {
        showToast(data.error || 'Lỗi khởi dựng giọng nói tiên tri', 'error');
      }
    } catch (err) {
      showToast('Hệ thống giọng nói Capicorn đang bận', 'error');
    } finally {
      setTtsLoading(false);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        setIsPlayingAudio(false);
      });
    }
  }, [audioUrl]);

  const toggleAudioPlayback = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  // Speech input implementation (Vietnam & English languages)
  const triggerVoiceSpeechInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Trình duyệt của bạn không hỗ trợ công cụ nhận diện giọng nói Web Speech', 'error');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecording(true);
    showToast('Đang thu âm thầm tế lễ... Vui lòng nói vào micro bằng tiếng Việt.', 'info');

    recognition.start();

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setOracleQuery(text);
      if (currentView === 'landing') {
        setTeaserInput(text);
      }
      showToast('Đã ghi nhận lời thờ kính của bạn!', 'success');
      setIsRecording(false);
    };

    recognition.onerror = () => {
      showToast('Không nghe rõ lời hành khất. Vui lòng nói lại rõ hơn.', 'error');
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  // Load Admin statistical layouts
  const loadAdminDatabase = async () => {
    try {
      const resStats = await fetch('/api/admin/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataStats = await resStats.json();
      setAdminStats(dataStats);

      const resUsers = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataUsers = await resUsers.json();
      setAdminUsers(dataUsers.users);

      const resTransfers = await fetch('/api/admin/bank-transfers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dataTransfer = await resTransfers.json();
      setAdminTransfers(dataTransfer.transfers);
    } catch {
      showToast('Lỗi tải cơ sở dữ liệu quản trị', 'error');
    }
  };

  // Admin approves manual transfers trigger
  const handleApproveBankTransfer = async (orderCode: string, action: 'success' | 'failed') => {
    try {
      const res = await fetch(`/api/admin/bank-transfers/${orderCode}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        showToast(action === 'success' ? 'Đã phê chuẩn chuyển khoản thành công!' : 'Đã từ chối chuyển khoản này!', 'success');
        loadAdminDatabase();
        checkServiceUnlocks();
      } else {
        showToast('Lỗi phê chuẩn hóa đơn', 'error');
      }
    } catch {
      showToast('Không kết nối được dịch vụ phê chuẩn', 'error');
    }
  };

  // Admin change role
  const handleChangeUserRole = async (userId: string, currentRole: string) => {
    try {
      const nextRole = currentRole === 'admin' ? 'user' : 'admin';
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: nextRole })
      });
      if (res.ok) {
        showToast('Cập nhật quyền hạn thành công', 'success');
        loadAdminDatabase();
      }
    } catch {
      showToast('Lỗi phân quyền', 'error');
    }
  };

  return (
    <div id="mystic-saas-root" className="min-h-screen relative overflow-x-hidden bg-[#050507] text-[#e0e0e0] font-sans flex flex-col selection:bg-[#C8A24A]/30">
      
      {/* FOUNDER HB FLOATING BANNER ON INITIAL ACCESS */}
      {showFounderOverlay && (
        <div className="fixed bottom-24 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-40 animate-slideIn">
          <div className="relative rounded-3xl border border-[#C8A24A]/50 bg-[#090d16]/95 p-6 overflow-hidden shadow-[0_10px_50px_rgba(200,162,74,0.35)] text-left">
            {/* Close button */}
            <button 
              onClick={() => {
                sessionStorage.setItem('mystic_founder_dismissed', 'true');
                setShowFounderOverlay(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white hover:scale-110 transition-all cursor-pointer p-1 rounded-full bg-white/5 border border-white/10 z-20"
              title="Đóng banner chào mừng"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Decorative backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,162,74,0.15)_0%,transparent_60%)] pointer-events-none"></div>
            
            <div className="absolute top-4 left-6 text-[9px] font-mono text-amber-500/25 select-none pointer-events-none animate-pulse">☾ CHIÊM TINH THUYẾT THÁC ☽</div>

            {/* Content info */}
            <div className="space-y-3 relative z-10 pt-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-[#C8A24A] text-[9px] font-extrabold uppercase tracking-widest leading-none">
                <Sparkles className="w-3 h-3 animate-pulse" /> SÁNG LẬP VIÊN TỐI CAO
              </div>
              
              <h3 className="text-xl font-serif text-white italic tracking-tight font-extrabold leading-tight">
                Gặp Gỡ Minh Chủ <span className="text-[#C8A24A] not-italic font-sans font-black underline decoration-amber-400/50 underline-offset-4">HB</span>
              </h3>
              
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                Xin chào! Tôi là <strong>HB</strong> - nhà sáng lập và kỹ sư thiết kế chính của hệ sinh thái <strong>Mystic HB</strong>. Trạm dừng chân tâm linh số hóa này được đốn ngộ dựa trên tình yêu mãnh liệt của tôi dành cho công nghệ lập trình, trí tuệ nhân tạo thế hệ mới phối hợp cùng các bộ môn học thuật đông tây cổ xưa như Chiêm tinh hoàng đạo, Bản đồ sao phong thủy và 22 Lá bài Tarot ẩn chính. Mystic HB chính là chiếc chìa khóa đa chiều mở lối, giúp kết nối trường cảm ứng sinh mệnh vô tận của bạn với cõi tinh tú bao la.
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 font-mono text-[9px] text-slate-400">
                <span className="flex items-center gap-1 text-amber-400/90"><Check className="w-2.5 h-2.5 text-amber-400" /> Sáng lập bởi: HB</span>
                <span className="flex items-center gap-1 text-emerald-400"><Check className="w-2.5 h-2.5 text-emerald-400" /> Bản mộc chiêm tinh: {userLocation.city}</span>
              </div>
              
              <div className="pt-2">
                <button 
                  onClick={() => {
                    setShowWelcomeModal(true);
                    sessionStorage.setItem('mystic_founder_dismissed', 'true');
                    setShowFounderOverlay(false);
                  }}
                  className="w-full text-center text-[10px] font-bold text-slate-950 font-mono tracking-wider bg-gradient-to-r from-amber-500 to-yellow-400 py-2 rounded-xl hover:from-white hover:to-white transition-all cursor-pointer shadow-[0_0_15px_rgba(200,162,74,0.2)]"
                >
                  [ KHỞI ĐỘNG HIỆU ỨNG CHIÊM TINH 🔮 ]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SPIRITUAL WELCOME MODAL */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-lg p-4 animate-fadeIn">
          {/* Constellation background overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,20,53,0.35)_0%,transparent_80%)]"></div>
          <div className="absolute inset-0 pointer-events-none opacity-20">
            {starsArray.current.map((star, i) => (
              <div 
                key={`welcome-star-${i}`} 
                className={`absolute rounded-full bg-yellow-100/80 ${star.size}`}
                style={{ top: star.top, left: star.left }}
              />
            ))}
          </div>

          <div className="max-w-md w-full rounded-3xl border border-[#C8A24A]/45 bg-[#090d16]/95 p-8 relative overflow-hidden shadow-[0_0_60px_rgba(200,162,74,0.25)] animate-scaleIn">
            {/* Spinning space orbits background */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="w-96 h-96 rounded-full border border-dashed border-[#C8A24A] animate-[spin_120s_linear_infinite] absolute -top-10 -left-10"></div>
              <div className="w-80 h-80 rounded-full border border-double border-white/20 animate-[spin_90s_linear_infinite] absolute -bottom-10 -right-10"></div>
            </div>

            {/* Glowing top graphic indicator */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#C8A24A]/30 to-[#a88439]/10 flex items-center justify-center border border-[#C8A24A]/40 shadow-[0_0_20px_rgba(200,162,74,0.2)] animate-pulse">
                  <Sparkles className="w-8 h-8 text-[#C8A24A]" />
                </div>
                <div className="absolute -top-1 -left-1 text-xs text-yellow-500 animate-pulse">✦</div>
                <div className="absolute -bottom-1 -right-1 text-xs text-yellow-500 animate-pulse" style={{ animationDelay: '1s' }}>✦</div>
              </div>
            </div>

            {/* Title / Welcome details */}
            <h3 className="text-center text-xs font-mono uppercase tracking-[0.3em] text-[#C8A24A] mb-2 leading-none">
              ✦ Linh Đài Thuyết Thác Tối Cao ✦
            </h3>
            <h2 className="text-center font-serif text-2xl font-black text-white italic tracking-tight mb-4 flex items-center justify-center gap-1.5">
              Chào Mừng Bản Chủ <span className="text-[#C8A24A] not-italic font-sans underline decoration-dotted underline-offset-8">HB</span>
            </h2>

            {/* Introduction paragraph */}
            <p className="text-xs text-slate-300 leading-relaxed text-center font-sans max-w-sm mx-auto mb-6">
              Bạn đang bước vào tịnh thất tâm linh số của nhà sáng lập <span className="text-[#C8A24A] font-bold">HB</span>, nơi hội tụ trọn vẹn tinh hoa Chiêm tinh hoàng đạo, Bản đồ sao cổ xưa và những tinh túy kỳ bách tiên tri của Linh đài học Tây phương.
            </p>

            {/* Magical checklists */}
            <div className="bg-[#03060a]/80 border border-white/5 rounded-2xl p-4 mb-6 space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Compass className="w-4.5 h-4.5 text-[#C8A24A] shrink-0 mt-0.5 animate-pulse" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-200">Trạm Tinh Tú Hoàng Đạo</p>
                  <p className="text-[10px] text-slate-400 font-mono leading-normal">Bản đồ sao mệnh bàn tối ưu hóa để giải mã hành trình định mệnh chân thực.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Moon className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-200">Bói Bài Tây Chiêm Nghiệm AI</p>
                  <p className="text-[10px] text-slate-400 font-mono leading-normal">Sự giao thoa hoàn mỹ giữa 22 Bí thuật Tarot chính thống và Kỹ nghệ Trí tuệ Nhân tạo hiện đại.</p>
                </div>
              </div>
            </div>

            {/* Confirm Enter Sanctuary */}
            <div className="space-y-3">
              <button 
                onClick={() => {
                  sessionStorage.setItem('mystic_welcome_dismissed', 'true');
                  setShowWelcomeModal(false);
                }}
                className="w-full relative group overflow-hidden py-3 px-6 rounded-xl bg-[#C8A24A] hover:bg-white text-slate-950 font-bold text-xs tracking-[0.1em] uppercase shadow-[0_0_30px_rgba(200,162,74,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2 border border-yellow-200/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5 font-bold">
                  Bước Vào Thánh Điện Chiêm Tinh <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              {/* Auto close counter */}
              <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-mono">
                <span className="animate-spin text-[#C8A24A] text-xs">⏳</span>
                <span>Tự động đóng và vào trang sau <strong className="text-amber-400 animate-pulse">{welcomeCountdown} giây</strong> hoặc đóng thủ công tức thì</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BACKGROUND PARTICLE STARLIGHT & AMBIENT GLOW SHAPES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-[#C8A24A] opacity-5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#4a1a6b] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_50%_40%,#1e1435_0%,transparent_70%)] animate-pulse duration-[8000ms]"></div>
        
        {/* Floating Astrological Constellation symbols in background */}
        <div className="absolute top-[15%] left-[8%] text-amber-500/10 text-4xl select-none animate-pulse" style={{ animation: 'float-mystic 18s infinite ease-in-out', animationDelay: '0s' }}>♊</div>
        <div className="absolute top-[35%] right-[12%] text-violet-500/10 text-5xl select-none animate-pulse" style={{ animation: 'float-mystic 22s infinite ease-in-out', animationDelay: '2s' }}>♏</div>
        <div className="absolute bottom-[20%] left-[15%] text-amber-500/5 text-6xl select-none animate-pulse" style={{ animation: 'float-mystic 26s infinite ease-in-out', animationDelay: '4s' }}>♐</div>
        <div className="absolute bottom-[40%] right-[8%] text-indigo-400/10 text-4xl select-none animate-pulse" style={{ animation: 'float-mystic 20s infinite ease-in-out', animationDelay: '1s' }}>♋</div>
        <div className="absolute top-[60%] left-[25%] text-yellow-500/5 text-5xl select-none animate-pulse" style={{ animation: 'float-mystic 24s infinite ease-in-out', animationDelay: '3s' }}>♌</div>
        <div className="absolute top-[80%] right-[30%] text-purple-400/10 text-4xl select-none animate-pulse" style={{ animation: 'float-mystic 16s infinite ease-in-out', animationDelay: '5s' }}>♓</div>

        {starsArray.current.map((star, i) => (
          <div 
            key={i} 
            className={`absolute rounded-full bg-yellow-200/90 ${star.size}`}
            style={{
              top: star.top,
              left: star.left,
              animation: `pulse 3s infinite ease-in-out`,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>

      {/* AUDIO NATIVE CONTROLLER */}
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onEnded={() => setIsPlayingAudio(false)} 
          className="hidden"
        />
      )}

      {/* TOAST SYSTEM POPUP */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border border-yellow-500/20 bg-[#0c101b]/95 shadow-2xl backdrop-blur-md animate-bounce">
          <div className={`w-3 h-3 rounded-full ${toast.mode === 'success' ? 'bg-green-500' : toast.mode === 'error' ? 'bg-red-500' : 'bg-yellow-500 animate-ping'}`} />
          <span className="text-sm font-medium text-slate-200">{toast.text}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-[#050507]/90 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
          <div className="flex flex-col">
            <span className="text-[#C8A24A] text-[10px] font-semibold tracking-[0.3em] uppercase mb-1 leading-none">Cosmic Intelligence</span>
            <h1 className="text-3xl font-serif text-white tracking-tight italic leading-tight">Mystic</h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col text-right">
            <div className="text-[9px] uppercase tracking-widest text-white/40 mb-1 leading-none">Location Detection</div>
            <div className="flex items-center gap-1.5 font-mono text-xs text-[#e0e0e0]">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></div>
              <span>{detectedLocation}</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-6">
          <button 
            onClick={() => setCurrentView('landing')} 
            className={`text-sm hover:text-amber-300 transition-colors ${currentView === 'landing' ? 'text-[#C8A24A] font-medium' : 'text-slate-400'}`}
          >
            Trang Chủ
          </button>
          
          {token && (
            <button 
              onClick={() => {
                checkServiceUnlocks();
                setCurrentView('oracles');
              }} 
              className={`text-sm hover:text-amber-300 transition-colors ${currentView === 'oracles' ? 'text-[#C8A24A] font-medium' : 'text-slate-400'}`}
            >
              Hành Tế Chiêm Tinh
            </button>
          )}

          {token && (
            <button 
              onClick={() => {
                checkServiceUnlocks();
                setCurrentView('subscriptions');
              }} 
              className={`text-sm hover:text-amber-300 transition-colors ${currentView === 'subscriptions' ? 'text-[#C8A24A] font-medium' : 'text-slate-400'}`}
            >
              Quản lý Gói Dịch Vụ
            </button>
          )}

          {currentUser?.role === 'admin' && (
            <button 
              onClick={() => {
                loadAdminDatabase();
                setCurrentView('admin');
              }}
              className="px-3.5 py-1.5 rounded-lg border border-red-500/30 bg-red-950/20 text-red-300 text-xs font-semibold hover:bg-red-950/40 transition-all flex items-center gap-1"
            >
              <Cpu className="w-3.5 h-3.5" />
              Bàn Quản Trị
            </button>
          )}

          {currentUser ? (
            <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
              <div className="flex flex-col text-right">
                <span className="text-xs text-slate-400 font-mono">Tài khoản</span>
                <span className="text-xs font-medium text-[#C8A24A] max-w-[130px] truncate">{currentUser.email}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 hover:text-red-400 transition-all cursor-pointer"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <a 
              href="#auth-box" 
              className="px-4 py-2 text-xs rounded-lg font-medium text-slate-900 bg-amber-400 hover:bg-[#C8A24A] transition-all font-serif"
            >
              Kết Nối Thiên Cơ
            </a>
          )}
        </nav>
      </div>
    </header>

      {/* CONTAINER CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 z-10 flex flex-col justify-center">

        {/* 1. LANDING OFFICE VIEWS */}
        {currentView === 'landing' && (
          <div className="space-y-16 py-8">
            
            {/* STUNNING TWO COLUMN SPLIT */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: INTERACTIVE LỊCH HOÀNG ĐẠO */}
              <div className="lg:col-span-4 bg-[#090d16]/90 p-6 rounded-3xl border border-[#C8A24A]/30 shadow-[0_0_35px_rgba(200,162,74,0.15)] backdrop-blur-xl relative overflow-hidden space-y-6">
                {/* Celestial decorative overlays */}
                <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full border border-dashed border-[#C8A24A]/10 animate-[spin_80s_infinite_linear] pointer-events-none"></div>
                <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full border border-white/5 animate-[spin_50s_infinite_linear] pointer-events-none"></div>
                
                <div className="flex items-center gap-2.5 border-b border-white/10 pb-4 relative z-10 select-none">
                  <div className="w-9 h-9 rounded-full bg-[#C8A24A]/15 border border-[#C8A24A]/35 flex items-center justify-center text-lg text-[#C8A24A] animate-pulse">
                    🔮
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8A24A]">LỊCH HOÀNG ĐẠO</h4>
                    <p className="text-[10px] text-slate-400 font-mono">24/05/2026 ✦ Tiết Khí Song Tử</p>
                  </div>
                </div>

                {/* Selection Controls */}
                <div className="space-y-2 relative z-10">
                  <label className="text-[9.5px] font-mono uppercase tracking-wider text-slate-400 block font-bold">Tìm Kiếm Cung Mệnh Tinh Không:</label>
                  <select 
                    value={selectedZodiacSign}
                    onChange={(e) => setSelectedZodiacSign(e.target.value)}
                    className="w-full bg-[#03060a] border border-slate-800 focus:border-[#C8A24A]/60 rounded-xl px-3 outline-none py-2.5 text-xs text-slate-200 cursor-pointer font-serif transition-colors"
                  >
                    {ZODIAC_DATA.map((sign) => (
                      <option key={sign.id} value={sign.id} className="bg-[#090d16]">
                        {sign.icon} {sign.name} ({sign.range})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dynamic Sign Render */}
                {(() => {
                  const activeSign = ZODIAC_DATA.find(s => s.id === selectedZodiacSign) || ZODIAC_DATA[2];
                  return (
                    <div className="space-y-5 relative z-10 animate-fadeIn">
                      
                      {/* Sign Banner */}
                      <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#C8A24A]/25 via-amber-950/40 to-slate-900/55 border border-[#C8A24A]/40 flex items-center justify-center text-3xl text-amber-200 shadow-xl shrink-0">
                          {activeSign.icon}
                        </div>
                        <div className="text-left space-y-0.5">
                          <h4 className="text-sm font-bold font-serif text-white">{activeSign.name}</h4>
                          <p className="text-[9.5px] font-mono text-amber-400/90 tracking-wide uppercase">Sao Chủ: {activeSign.planet}</p>
                          <p className="text-[9.5px] font-mono text-slate-400">Ngũ Hành: {activeSign.element}</p>
                        </div>
                      </div>

                      {/* Sign Characteristics and traits */}
                      <div className="space-y-1.5 p-3.5 rounded-2xl bg-[#090d16]/40 border border-[#C8A24A]/25 text-left text-xs text-slate-300">
                        <span className="text-[8.5px] uppercase tracking-widest font-mono text-[#C8A24A] font-extrabold block">✦ ĐẶC TRƯNG TÍNH CÁCH ✦</span>
                        <p className="leading-relaxed font-serif text-[11px] italic text-amber-100/90">{activeSign.traits || "Cung hoàng đạo sở hữu năng lượng vũ trụ huyền diệu, mang bản tính độc đáo của hệ sao thiên thể."}</p>
                      </div>

                      {/* Daily Tarot Forecast */}
                      <div className="space-y-1.5 p-4 rounded-2xl bg-gradient-to-br from-amber-500/[0.03] to-transparent border border-yellow-500/10">
                        <span className="text-[9px] uppercase tracking-widest font-mono text-[#C8A24A] font-extrabold block text-left">✦ Sấm Truyền Phương Vị Hôm Nay ✦</span>
                        <p className="text-xs text-slate-300 font-serif leading-relaxed italic text-left">"{activeSign.insight}"</p>
                      </div>

                      {/* Stats numbers */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div className="bg-[#03060a]/60 border border-slate-800/60 rounded-xl p-2.5 text-center">
                          <p className="text-slate-500 uppercase text-[8px] tracking-wider font-semibold">Túc Số Cát Tường</p>
                          <p className="text-amber-400 font-bold text-xs mt-0.5">{activeSign.luckyNumbers}</p>
                        </div>
                        <div className="bg-[#03060a]/60 border border-slate-800/60 rounded-xl p-2.5 text-center">
                          <p className="text-slate-500 uppercase text-[8px] tracking-wider font-semibold">Sắc Bản Mệnh</p>
                          <p className="text-slate-300 font-bold text-[9px] mt-0.5 truncate">{activeSign.luckyColor}</p>
                        </div>
                      </div>

                      {/* Graphic progress metrics */}
                      <div className="space-y-3.5 pt-2 border-t border-slate-800/80">
                        <div className="space-y-1 text-left">
                          <div className="flex justify-between text-[9px] font-mono">
                            <span className="text-slate-400 uppercase tracking-widest">Sinh Lực Tinh Anh</span>
                            <span className="text-amber-400 font-bold">{activeSign.energy}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#03060a] rounded-full overflow-hidden border border-white/5 p-[1px]">
                            <div className="h-full rounded-full bg-gradient-to-r from-yellow-600 to-amber-400 animate-pulse" style={{ width: `${activeSign.energy}%` }}></div>
                          </div>
                        </div>

                        <div className="space-y-1 text-left">
                          <div className="flex justify-between text-[9px] font-mono">
                            <span className="text-indigo-400 uppercase tracking-widest">Chỉ Số Tình Duyên</span>
                            <span className="text-indigo-400 font-bold">{activeSign.love}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#03060a] rounded-full overflow-hidden border border-white/5 p-[1px]">
                            <div className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500" style={{ width: `${activeSign.love}%` }}></div>
                          </div>
                        </div>

                        <div className="space-y-1 text-left">
                          <div className="flex justify-between text-[9px] font-mono">
                            <span className="text-emerald-400 uppercase tracking-widest">Tài Lộc Càn Khôn</span>
                            <span className="text-emerald-400 font-bold">{activeSign.career}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#03060a] rounded-full overflow-hidden border border-white/5 p-[1px]">
                            <div className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-400 animate-pulse" style={{ width: `${activeSign.career}%` }}></div>
                          </div>
                        </div>
                      </div>

                      {/* Info footer */}
                      <div className="text-[10px] text-center text-slate-500 font-serif border-t border-slate-800/40 pt-3">
                        Hệ sao tương ứng tọa độ địa phương <span className="text-emerald-400 font-mono font-bold block mt-1">{userLocation.city}</span>
                      </div>

                    </div>
                  );
                })()}

              </div>

              {/* RIGHT COLUMN: GORGEOUS WELCOME BANNER + LUXURY HERO */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* CELESTIAL CONSTELLATION INTERACTIVE MAP */}
                <div className="relative rounded-3xl border border-[#C8A24A]/30 bg-gradient-to-br from-[#0c1221]/95 to-[#050810]/95 p-6 overflow-hidden shadow-[0_0_40px_rgba(200,162,74,0.08)]">
                  {/* Glowing nebulae */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-[#C8A24A]/5 to-indigo-500/10 blur-3xl pointer-events-none"></div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                    {/* Rotatable Astrological Wheel Graphic */}
                    <div className="relative shrink-0 w-44 h-44 flex items-center justify-center rounded-full border border-[#C8A24A]/25 bg-slate-950/40 p-2 shadow-[0_0_30px_rgba(200,162,74,0.05)] group">
                      {/* Dashed outer orbit */}
                      <div className="absolute inset-2 rounded-full border border-dashed border-[#C8A24A]/30 animate-[spin_100s_linear_infinite]"></div>
                      {/* Double line ring */}
                      <div className="absolute inset-5 rounded-full border-2 border-double border-[#C8A24A]/10 animate-[spin_60s_linear_infinite]"></div>
                      
                      {/* Middle Sun Dial symbol */}
                      <div className="relative w-16 h-16 rounded-full bg-amber-500/10 border border-[#C8A24A]/40 flex flex-col items-center justify-center animate-pulse shadow-[0_0_20px_rgba(200,162,74,0.15)] bg-[#03060a]">
                        <span className="text-2xl drop-shadow-[0_0_10px_rgba(200,162,74,0.5)] font-sans">🔮</span>
                        <span className="text-[7px] font-mono text-amber-400 font-black tracking-widest mt-0.5 animate-[spin_10s_linear_infinite]">COSMIC</span>
                      </div>
                      
                      {/* Floating Zodiac sign nodes distributed circularly */}
                      {ZODIAC_DATA.map((sign, idx) => {
                        const angle = (idx * 30 * Math.PI) / 180;
                        const radius = 64; // px distance from center
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        const isActive = selectedZodiacSign === sign.id;
                        
                        return (
                          <button
                            key={`wheel-node-${sign.id}`}
                            onClick={() => {
                              setSelectedZodiacSign(sign.id);
                              showToast(`Đã chuyển kết giới tầm nhìn sang cung ${sign.name}`, 'success');
                            }}
                            className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all duration-300 hover:scale-125 hover:z-20 cursor-pointer ${isActive ? 'bg-[#C8A24A] text-slate-950 font-bold border border-yellow-200/50 shadow-[0_0_15px_rgba(200,162,74,0.6)] scale-110 z-10' : 'bg-slate-950/90 hover:bg-[#C8A24A]/30 text-amber-200 border border-slate-800'}`}
                            style={{
                              transform: `translate(${x}px, ${y}px)`
                            }}
                            title={sign.name}
                          >
                            {sign.icon}
                          </button>
                        );
                      })}
                    </div>

                    {/* Detailed info card */}
                    <div className="flex-1 text-left space-y-3">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-[#C8A24A] text-[9px] font-extrabold uppercase tracking-widest leading-none">
                        ✦ THIÊN BÀN HOÀNG ĐẠO ✦
                      </div>
                      
                      <h3 className="text-lg font-serif text-white font-extrabold leading-snug">
                        Khảo Sát <span className="text-[#C8A24A]">Mệnh Võng Vũ Trụ</span> Tức Thời
                      </h3>
                      
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Nhấp chọn các bản mệnh chòm sao xung quanh thiên bàn để liên kết trực tiếp với hào quang chuyển vận của bạn hôm nay. Mỗi tinh tú đại diện cho một cánh cửa duyên số mở ra.
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {ZODIAC_DATA.slice(0, 6).map((sign) => (
                          <button
                            key={`btn-tag-${sign.id}`}
                            onClick={() => setSelectedZodiacSign(sign.id)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${selectedZodiacSign === sign.id ? 'bg-[#C8A24A]/25 border border-[#C8A24A] text-[#C8A24A]' : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'}`}
                          >
                            {sign.icon} {sign.name.split(' (')[0]}
                          </button>
                        ))}
                        <button 
                          onClick={() => {
                            const nextIndex = (ZODIAC_DATA.findIndex(s => s.id === selectedZodiacSign) + 1) % ZODIAC_DATA.length;
                            setSelectedZodiacSign(ZODIAC_DATA[nextIndex].id);
                          }}
                          className="px-2 py-1 rounded-lg text-[10px] font-bold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                        >
                          Xoay Mệnh ➔
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LUXURY COSMIC HERO */}
                <div className="text-center md:text-left space-y-5 pt-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8A24A]/20 bg-[#C8A24A]/5 text-[#C8A24A] text-[10px] font-semibold font-mono uppercase tracking-widest leading-none">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Nền Tảng Tiên Tri Kỹ Nghệ Tài Chính Chiêm Tinh Đẳng Cấp
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight leading-none leading-tight">
                    Khai Mở <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-yellow-600">Vận Mệnh</span> <br />Bằng Niềm Tin Vũ Trụ
                  </h2>
                  <p className="text-sm text-slate-350 max-w-xl font-sans leading-relaxed">
                    Được vận hành bởi Trí Tuệ Nhân Tạo Cao Cấp bậc nhất kết hợp với các môn chiêm tinh cổ xưa bậc nhất Việt Nam. Bảo đảm độ chuẩn xác, thấu hiểu tột độ tâm hồn bạn.
                  </p>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <a 
                      href="#pricing-section" 
                      className="px-7 py-3.5 font-serif rounded-xl text-xs font-bold bg-[#C8A24A] text-slate-950 shadow-2xl transition-all hover:scale-105 active:scale-95 duration-200 flex items-center gap-2 uppercase tracking-wide"
                    >
                      Bắt Đầu Giải Mã <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>

            </div>

            {/* TEASER FREE PREVIEW TRIAL */}
            <div className="max-w-2xl mx-auto rounded-2xl border border-slate-800/80 bg-[#090d16]/70 p-6 backdrop-blur-xl shadow-2xl relative">
              <div className="absolute -top-3.5 left-6 px-3 py-1 bg-indigo-950/80 border border-indigo-700/30 rounded-md text-[10px] font-bold text-indigo-300 uppercase tracking-widest font-mono">
                🔮 Quẻ Thử Nghiệm Gợi Mở (Guest Preview)
              </div>
              <h3 className="text-base font-serif font-bold text-amber-200 mt-2 mb-1.5">Tham Khảo Vận Năng Ngay Bây Giờ</h3>
              <p className="text-xs text-slate-400 mb-4">Gõ câu hỏi thắc mắc trong lòng hoặc chọn bốc ngẫu nhiên để nhà tiên tri gợi ý con đường sáng của các chòm sao.</p>
              
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={teaserInput}
                    onChange={(e) => setTeaserInput(e.target.value)}
                    placeholder="Hôm nay tình cảm của tôi sẽ chuyển biến thế nào?..." 
                    className="w-full bg-[#03060a] border border-slate-800 focus:border-yellow-500/60 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-yellow-500/20"
                  />
                  <button 
                    onClick={triggerVoiceSpeechInput}
                    className={`absolute right-3.5 top-2.5 p-1.5 rounded-lg transition-colors cursor-pointer ${isRecording ? 'text-red-400 animate-ping' : 'text-slate-400 hover:text-[#C8A24A]'}`}
                    title="Nói giọng nói tiếng Việt"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={handleTeaserPreview}
                  disabled={teaserLoading}
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-slate-100 font-medium text-sm transition-colors cursor-pointer flex items-center gap-2"
                >
                  {teaserLoading ? 'Đang giải mã...' : 'Khởi Quẻ'} 
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </button>
              </div>

              {teaserOutput && (
                <div className="mt-5 p-4 rounded-xl border border-yellow-500/10 bg-yellow-500/5 text-sm text-yellow-100 animate-fadeIn font-serif leading-relaxed">
                  <p className="font-bold text-xs text-[#C8A24A] uppercase tracking-wider mb-1">Mật ngữ từ tinh hà:</p>
                  "{teaserOutput}"
                  <div className="mt-3.5 pt-2 border-t border-yellow-500/10 text-right">
                    <a href="#pricing-section" className="text-xs font-semibold text-amber-400 underline hover:text-amber-300">Trả phí để đọc bản giải quẻ chi tiết trọn bộ & nghe thuyết minh giọng nói 🎙️</a>
                  </div>
                </div>
              )}
            </div>

            {/* LOCKED PRICING CARDS SECTION */}
            <div id="pricing-section" className="space-y-8 scroll-mt-20">
              <div className="text-center space-y-2">
                <h3 className="text-3xl font-serif font-bold text-slate-100">Bản Giá Hành Tế Thiên Thần</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">Cam kết bảo mật giao dịch ngân hàng tuyệt đối cấp Fintech - Mở khoá phiên giải quẻ sâu trọn vẹn.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* CARD 1: TAROT */}
                <div className="group bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between transition-all hover:bg-white/10 hover:border-[#C8A24A]/50 relative">
                  <div>
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                      <span className="text-2xl text-[#C8A24A]">🔮</span>
                    </div>
                    <h2 className="text-3xl font-serif italic text-white mb-2">Tarot Reading</h2>
                    <p className="text-sm text-white/50 leading-relaxed mb-6">Explore the unseen threads of fate through our AI-guided major arcana session with voice narration.</p>
                    <ul className="mt-6 space-y-3.5 text-xs text-white/40 font-sans">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-500/70 flex-shrink-0" /> Tùy biến bốc 3 lá bài theo cấu hình ý nguyện</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-500/70 flex-shrink-0" /> Phân tích tương quan Chiều xuôi & ngược của Tarot</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-500/70 flex-shrink-0" /> Độc quyền TTS Thuyết minh Giọng nói Huyền Ẩn</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-500/70 flex-shrink-0" /> Khóa vĩnh viễn, lưu quẻ chép tạng vĩnh hằng</li>
                    </ul>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="text-2xl font-mono text-[#C8A24A] mb-4">400,000 <span className="text-xs text-white/40">VND</span></div>
                    <button 
                      onClick={() => triggerServicePurchase('tarot')}
                      className="w-full bg-white/5 border border-white/20 py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-white transition-all hover:bg-white hover:text-black hover:border-transparent cursor-pointer"
                    >
                      Select Service
                    </button>
                  </div>
                </div>

                {/* CARD 2: ASTROLOGY */}
                <div className="bg-white/5 border border-[#C8A24A]/50 rounded-3xl p-8 flex flex-col justify-between relative shadow-[0_0_40px_rgba(200,162,74,0.1)]">
                  <div className="absolute top-4 right-4 bg-[#C8A24A] text-black text-[9px] px-2 py-1 font-bold rounded uppercase tracking-tighter">Most Requested</div>
                  <div>
                    <div className="w-12 h-12 bg-[#C8A24A]/20 rounded-2xl flex items-center justify-center mb-6">
                      <span className="text-2xl text-[#C8A24A]">🌌</span>
                    </div>
                    <h2 className="text-3xl font-serif italic text-white mb-2">Tử vi / Horoscope</h2>
                    <p className="text-sm text-white/50 leading-relaxed mb-6">A precision-calculated cosmic map of your destiny. Ancient Vietnamese wisdom powered by neural architecture.</p>
                    <ul className="mt-6 space-y-3.5 text-xs text-white/40 font-sans">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#C8A24A]/70 flex-shrink-0" /> Thiết lập chiêm tinh bản đồ hoàng đạo giờ sinh</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#C8A24A]/70 flex-shrink-0" /> Phân tích chuyển dịch chu kỳ các hành tinh chu hoàn</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#C8A24A]/70 flex-shrink-0" /> Giọng nói oai nghiêm Fenrir độc quyền TTS</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#C8A24A]/70 flex-shrink-0" /> Xuất tập tin lưu ký số mệnh để chiêm bái vĩnh viễn</li>
                    </ul>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="text-2xl font-mono text-[#C8A24A] mb-4">650,000 <span className="text-xs text-white/40">VND</span></div>
                    <button 
                      onClick={() => triggerServicePurchase('horoscope')}
                      className="w-full bg-[#C8A24A] py-4 rounded-xl text-xs uppercase tracking-widest font-bold text-black hover:bg-white hover:text-black transition-all cursor-pointer"
                    >
                      Active Selection
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2 pt-10">
                <h3 className="text-2xl font-serif font-bold text-slate-100 flex items-center justify-center gap-2">
                  <span>✨</span> Gói Đăng Ký Siêu AI Chiêm Tinh Vô Hạn <span>✨</span>
                </h3>
                <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                  Đăng ký nhận lực lượng linh cốt để mở khóa đàm thoại VÔ HẠN LƯỢT với toàn bộ 3 Đại sư tại Hành Tế Chiêm Tinh (Tarot AI, Astrology AI, Coach AI) không lo giới hạn lượt quẻ.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Gói Ngày */}
                <div className="bg-gradient-to-b from-[#1a0f0a]/90 to-[#090503]/95 border border-orange-500/25 rounded-3xl p-6 flex flex-col justify-between hover:border-orange-500/50 hover:scale-[1.01] transition-all relative shadow-[0_0_30px_rgba(239,68,68,0.02)]">
                  <div>
                    <div className="absolute top-4 right-4 bg-orange-950/40 border border-orange-500/25 text-orange-400 text-[8px] font-mono tracking-widest px-2 py-0.5 rounded uppercase font-bold">Daily</div>
                    <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-xl text-orange-400">🔥</span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-orange-200">Chiêm Tinh Nhật Linh</h3>
                    <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed font-sans">Mở cửa tịnh thất sấm truyền linh ứng. Tự do lục xem túc mệnh suốt 24 giờ liên tục.</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-orange-950/30">
                    <div className="text-lg font-mono text-orange-400 mb-3 font-bold">50,000 <span className="text-xs text-white/40">VND</span></div>
                    <button 
                      onClick={() => triggerServicePurchase('ai_daily')}
                      className="w-full bg-orange-950/30 border border-orange-500/30 py-3 rounded-xl text-xs uppercase tracking-widest font-bold text-orange-100 hover:bg-orange-500 hover:text-slate-950 transition-all cursor-pointer"
                    >
                      Kết Nối Thần Lực
                    </button>
                  </div>
                </div>

                {/* Gói Tuần */}
                <div className="bg-gradient-to-b from-[#09151c]/90 to-[#03080b]/95 border border-cyan-500/25 rounded-3xl p-6 flex flex-col justify-between hover:border-cyan-500/50 hover:scale-[1.01] transition-all relative shadow-[0_0_30px_rgba(6,182,212,0.02)]">
                  <div>
                    <div className="absolute top-4 right-4 bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-[8px] font-mono tracking-widest px-2 py-0.5 rounded uppercase font-bold">Linh Phù Hot</div>
                    <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-xl text-cyan-400">💫</span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-cyan-200">Chiêm Tinh Thất Tinh</h3>
                    <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed font-sans">Kết nối thần khí tâm linh siêu việt suốt 7 ngày đêm. Trọn niềm cát tài hỷ lạc.</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-cyan-950/30">
                    <div className="text-lg font-mono text-cyan-400 mb-3 font-bold">170,000 <span className="text-xs text-white/40">VND</span></div>
                    <button 
                      onClick={() => triggerServicePurchase('ai_weekly')}
                      className="w-full bg-cyan-950/30 border border-cyan-500/30 py-3 rounded-xl text-xs uppercase tracking-widest font-bold text-cyan-100 hover:bg-cyan-500 hover:text-[#03080b] transition-all cursor-pointer"
                    >
                      Khởi Hoạt Pháp Quyền
                    </button>
                  </div>
                </div>

                {/* Gói Tháng */}
                <div className="bg-gradient-to-b from-[#13091c]/90 to-[#07030b]/95 border border-purple-500/25 rounded-3xl p-6 flex flex-col justify-between hover:border-purple-500/50 hover:scale-[1.01] transition-all relative shadow-[0_0_30px_rgba(168,85,247,0.02)]">
                  <div>
                    <div className="absolute top-4 right-4 bg-purple-950/40 border border-purple-500/20 text-purple-400 text-[8px] font-mono tracking-widest px-2 py-0.5 rounded uppercase font-bold">Monthly</div>
                    <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-xl text-purple-400">🔮</span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-purple-200">Chiêm Tinh Nguyệt Tướng</h3>
                    <p className="text-xs text-slate-400 mt-2 mb-4 leading-relaxed font-sans">Cam kết mở rộng kết giới thần linh bền vững 30 ngày. Thông suốt vận đạo càn khôn.</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple-950/30">
                    <div className="text-lg font-mono text-purple-400 mb-3 font-bold">269,000 <span className="text-xs text-white/40">VND</span></div>
                    <button 
                      onClick={() => triggerServicePurchase('ai_monthly')}
                      className="w-full bg-purple-950/30 border border-purple-500/35 py-3 rounded-xl text-xs uppercase tracking-widest font-bold text-purple-100 hover:bg-purple-500 hover:text-[#07030b] transition-all cursor-pointer"
                    >
                      Đắc Đạo Thiên Không Phù
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* REGISTER PORTAL FOR CLIENTS */}
            {!currentUser && (
              <div id="auth-box" className="max-w-md mx-auto rounded-3xl border border-white/10 bg-[#0c0d16]/95 backdrop-blur-md p-8 shadow-3xl text-center relative scroll-mt-20 my-10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border border-yellow-500/25 bg-slate-950 text-xs font-bold text-[#C8A24A] uppercase tracking-widest shadow-xl">
                  ✨ Xác Thực Thành Viên
                </div>
                
                <h3 className="text-xl font-bold text-white mt-4 mb-2">
                  {authMode === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Tài Khoản'}
                </h3>
                <p className="text-xs text-white/60 mb-6 font-sans">
                  {authMode === 'login' 
                    ? 'Đăng nhập để xem lịch sử giải quẻ và quản lý tài khoản.' 
                    : 'Tạo tài khoản mới để lưu giữ trọn vẹn lịch sử tư vấn tâm linh.'}
                </p>

                {authError && (
                  <div className="bg-red-950/20 border border-red-500/30 text-red-200 text-xs rounded-xl py-2.5 px-3 mb-4 leading-relaxed font-sans text-left animate-pulse">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} className="space-y-4 text-left font-sans">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#e0e0e0]/70 mb-1.5">Địa chỉ Email</label>
                    <input 
                      type="email" 
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="ten_cua_ban@domain.com"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C8A24A]/60 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-[#e0e0e0]/70 mb-1.5">Mật khẩu</label>
                    <input 
                      type="password" 
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C8A24A]/60 transition-all"
                    />
                  </div>

                  {/* CAPTCHA MINIGAME */}
                  <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-center select-none shadow-inner">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">Xác thực bằng Minigame</span>
                      <button 
                        type="button"
                        onClick={() => {
                          setCaptchaValue(0);
                          setIsCaptchaVerified(false);
                          setTargetCaptchaValue(Math.floor(Math.random() * 30) + 55);
                        }}
                        className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                        title="Tải lại captcha"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <p className="text-[11px] text-slate-400 mb-3 text-left">
                      Trượt thanh để đưa hành tinh <span className="text-[#C8A24A] font-bold">✨</span> vào tâm quỹ đạo <span className="text-red-400 font-bold">🪐</span>
                    </p>

                    {/* CAPTCHA TRACK FRAME */}
                    <div className="relative h-12 w-full bg-slate-950 rounded-xl overflow-hidden border border-white/5 flex items-center shadow-black shadow-md">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#1e1b4b_0%,transparent_80%)]"></div>
                      
                      {/* Grid Lines */}
                      <div className="absolute inset-y-0 left-1/4 border-l border-white/5 border-dashed"></div>
                      <div className="absolute inset-y-0 left-2/4 border-l border-white/5 border-dashed"></div>
                      <div className="absolute inset-y-0 left-3/4 border-l border-white/5 border-dashed"></div>

                      {/* TARGET ZONE (Orbit) */}
                      <div 
                        className="absolute w-8 h-8 rounded-full border-2 border-dashed border-red-500/50 flex items-center justify-center text-xs animate-pulse bg-red-950/20"
                        style={{ left: `calc(${targetCaptchaValue}% - 16px)` }}
                      >
                        🪐
                      </div>

                      {/* DRAGGABLE PIECE */}
                      <div 
                        className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 border border-yellow-200 flex items-center justify-center text-sm shadow-[0_0_12px_rgba(250,204,21,0.5)] transition-all duration-75"
                        style={{ left: `calc(${captchaValue}% - 16px)` }}
                      >
                        ✨
                      </div>
                    </div>

                    {/* INPUT SLIDER */}
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={captchaValue}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setCaptchaValue(val);
                        if (Math.abs(val - targetCaptchaValue) <= 4) {
                          setIsCaptchaVerified(true);
                        } else {
                          setIsCaptchaVerified(false);
                        }
                      }}
                      className="w-full h-1 mt-4 rounded-lg appearance-none cursor-pointer accent-[#C8A24A] bg-white/10"
                    />

                    {/* STATUS MESSAGE */}
                    <div className="mt-2 text-[11px] font-medium min-h-[16px]">
                      {isCaptchaVerified ? (
                        <span className="text-green-400 flex items-center justify-center gap-1 animate-pulse">
                          ✓ Xác thực thành công! Hệ thống đã mở khóa.
                        </span>
                      ) : (
                        <span className="text-slate-400">
                          Độ lệch mảnh ghép: {Math.abs(captchaValue - targetCaptchaValue)}%
                        </span>
                      )}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-3.5 rounded-xl font-semibold text-slate-950 bg-amber-400 hover:bg-[#C8A24A] transition-all cursor-pointer shadow-xl mt-4 text-xs uppercase tracking-widest"
                  >
                    {authMode === 'login' ? 'Đăng Nhập Ngay' : 'Đăng Ký Tài Khoản'}
                  </button>
                </form>

                <div className="mt-5 pt-4 border-t border-white/5 text-xs text-slate-400">
                  {authMode === 'login' ? (
                    <span>Chưa có tài khoản? <button onClick={() => setAuthMode('register')} className="text-amber-400 hover:underline cursor-pointer">Đăng ký thành viên mới</button></span>
                  ) : (
                    <span>Đã có tài khoản thành viên? <button onClick={() => setAuthMode('login')} className="text-amber-400 hover:underline cursor-pointer">Đăng nhập tại đây</button></span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. CHALICE GATEWAY CHECKOUT SCREEN */}
        {currentView === 'checkout' && activePayment && (
          <div className="max-w-4xl mx-auto py-8 space-y-8 animate-fadeIn">
            {/* SPIRITUAL GILDED HEADER */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C8A24A]/30 bg-amber-950/20 text-[#C8A24A] text-xs font-mono font-bold uppercase tracking-wider">
                <span>✦</span> Đàn Tràng Kích Hoạt Pháp Bảo <span>✦</span>
              </div>
              <h2 className="text-3xl font-serif font-extrabold text-[#e0e0e0] tracking-tight">
                Cung Nghinh Quyên Góp Lễ Vật
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mx-auto">
                Mã vận số duy nhất: <span className="font-mono text-amber-400 font-bold">{activePayment.orderCode}</span>. Thời gian kết nối thần khí còn lại: <span className="text-red-400 font-mono font-bold">15:00 phút</span>.
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start">
              {/* BILL PAYMENT METHODS (LEFT - Column 5) */}
              <div className="md:col-span-5 space-y-4">
                <div className="rounded-2xl border border-slate-800/80 bg-[#090d16] p-5 space-y-4 shadow-[0_0_50px_rgba(200,162,74,0.01)]">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8A24A]">Chọn Kênh Dâng Lễ</h4>
                  
                  {/* USDT CRYPTO CARD CHOOSE */}
                  <div 
                    onClick={() => switchPaymentMethod('usdt')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${selectedPaymentMethod === 'usdt' ? 'border-[#C8A24A] bg-amber-950/10' : 'border-slate-800 hover:border-slate-700 bg-[#03060a]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center font-bold text-emerald-400 select-none shrink-0">
                        <span className="text-lg">₮</span>
                        <span className="text-[8px] font-black tracking-tighter uppercase -mt-1 text-emerald-300">USDT</span>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-200">USDT (Mạng TRC20)</h5>
                        <p className="text-[10px] text-slate-400">Tối ưu hóa phí ga, duyệt tức thì</p>
                      </div>
                    </div>
                    <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === 'usdt' ? 'border-[#C8A24A]' : 'border-slate-700'}`}>
                      {selectedPaymentMethod === 'usdt' && <div className="w-2 h-2 rounded-full bg-[#C8A24A]" />}
                    </div>
                  </div>

                  {/* TECHCOMBANK CARD CHOOSE */}
                  <div 
                    onClick={() => switchPaymentMethod('bank')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${selectedPaymentMethod === 'bank' ? 'border-[#C8A24A] bg-amber-950/10' : 'border-slate-800 hover:border-slate-700 bg-[#03060a]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm select-none shrink-0 p-1">
                        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 50 L50 15 L50 37.5 L27.5 50 L50 62.5 L50 85 Z" fill="#D71920" />
                          <path d="M85 50 L50 15 L50 37.5 L72.5 50 L50 62.5 L50 85 Z" fill="#D71920" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-200">Ngân hàng Techcombank</h5>
                        <p className="text-[10px] text-slate-400">Chuyển nhanh VietQR 24/7</p>
                      </div>
                    </div>
                    <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === 'bank' ? 'border-[#C8A24A]' : 'border-slate-700'}`}>
                      {selectedPaymentMethod === 'bank' && <div className="w-2 h-2 rounded-full bg-[#C8A24A]" />}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#C8A24A]/10 bg-gradient-to-b from-[#C8A24A]/5 to-transparent p-4 text-center">
                  <p className="text-[11px] text-[#C8A24A] leading-relaxed italic">
                    👁️ “Duyên khởi từ tâm, số mệnh vận hành tương thích. Khi lễ phẩm cúng dường được hoàn thành chuẩn xác, linh lực vạn cổ tự động khai mở sấm truyền.”
                  </p>
                </div>
              </div>

              {/* DYNAMIC QR CODE DISPLAY PANEL (RIGHT - Column 7) */}
              <div className="md:col-span-7">
                {selectedPaymentMethod === 'usdt' ? (
                  /* USDT CELESTIAL CRYPTO PANEL */
                  <div className="bg-[#090d16]/90 border border-[#C8A24A]/25 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(200,162,74,0.03)] space-y-6 animate-fadeIn">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C8A24A]">Cổng Nạp USDT Tâm Linh Thần Tốc</h4>
                    
                    <div className="bg-white p-4 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.05)] inline-block relative border-2 border-[#C8A24A]/50">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-emerald-600 font-mono tracking-widest leading-none mb-3">TETHER USDT (TRC20)</span>
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=059669&data=TYDx9Lp1hB54CksyK8gTr6E1HjVv7G23xP`}
                          alt="USDT TRC20 Spiritual Address" 
                          className="w-40 h-40 rounded-lg object-contain"
                        />
                      </div>
                      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#C8A24A] text-slate-950 text-[9px] font-mono font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                        Mạng TRON (TRC-20)
                      </div>
                    </div>

                    <div className="text-center space-y-2 mt-2">
                      <div className="text-emerald-400 font-serif font-bold text-lg">Hộ Vệ USDT Tối Thượng</div>
                      <p className="text-[10.5px] text-slate-400 max-w-sm leading-relaxed">
                        Hãy gửi linh lực đúng số lượng <span className="text-yellow-400 font-mono font-bold font-serif">{(activePayment.amount / 25000).toFixed(1)} USDT</span> vào địa chỉ bảo mật bên dưới.
                      </p>
                    </div>

                    <div className="space-y-3.5 w-full text-left py-2 font-sans text-xs border-t border-white/5">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-slate-400 text-[11px] uppercase tracking-wider">Địa Chỉ Ví (TRC20):</span>
                        <div className="flex items-center gap-1.5 bg-[#03060a]/90 px-3 py-1.5 rounded-lg border border-slate-800">
                          <span className="font-mono text-[11px] text-[#C8A24A] font-medium">TYDx9Lp1hB54...7G23xP</span>
                          <button 
                            onClick={() => handleCopyText('TYDx9Lp1hB54CksyK8gTr6E1HjVv7G23xP', 'Địa chỉ ví USDT')} 
                            className="p-1 rounded hover:bg-white/10"
                            title="Sao chép địa chỉ ví"
                          >
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-slate-400 text-[11px] uppercase tracking-wider">Số Lượng Lễ Vật:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-extrabold text-[#e0e0e0] text-sm">{(activePayment.amount / 25000).toFixed(1)} USDT</span>
                          <span className="text-[10px] text-slate-500 font-mono italic">(~ {activePayment.amount.toLocaleString('vi-VN')} VND)</span>
                          <button 
                            onClick={() => handleCopyText(String((activePayment.amount / 25000).toFixed(1)), 'Số lượng USDT')} 
                            className="p-1 rounded hover:bg-white/10"
                          >
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-slate-400 text-[11px] uppercase tracking-wider">Ký Tự Kích Vận (Memo/Ghi chú):</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-red-400 bg-red-950/20 px-2.5 py-1 rounded border border-red-500/20">{activePayment.orderCode}</span>
                          <button 
                            onClick={() => handleCopyText(activePayment.orderCode, 'Nội dung Memo')} 
                            className="p-1 rounded hover:bg-white/10"
                          >
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="text-[10px] text-yellow-500 max-w-sm leading-normal font-sans tracking-wide">
                      ⚠️ Kiểm tra kỹ định dạng mạng lưới TRC20 và số lượng để hệ thống kích hoạt tự động tức thì.
                    </p>

                    <div className="flex items-center gap-3 w-full pt-2">
                      <button 
                        onClick={checkPaymentStatus}
                        className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 rounded-xl text-xs uppercase tracking-widest font-bold font-mono hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                      >
                        Tôi Đã Chuyển USDT ✦ Xác Minh Pháp Bảo
                      </button>
                    </div>
                  </div>
                ) : (
                  /* TECHCOMBANK PAY GRAPH */
                  <div className="bg-[#090d16]/90 border border-[#C8A24A]/25 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(200,162,74,0.03)] space-y-6 animate-fadeIn">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C8A24A]">Cổng VietQR Ngân Hàng Kích Hoạt Tự Động</h4>

                    <div className="bg-white p-4 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.05)] inline-block border-2 border-[#C8A24A]/50">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-red-600 font-mono tracking-widest leading-none mb-3">TECHCOMBANK VIETQR</span>
                        <img 
                          src={`https://img.vietqr.io/image/970407-0978567205-compact2.png?amount=${activePayment.amount}&addInfo=${activePayment.orderCode}&accountName=LE%20HUY%20BAO`}
                          alt="Techcombank VietQR Lê Huy Bảo" 
                          className="w-40 h-40 rounded-lg object-contain"
                        />
                      </div>
                    </div>

                    <div className="text-center space-y-2 mt-2">
                      <div className="text-[#C8A24A] font-bold text-lg font-serif">Chuyển Khoản Đắc Lộc</div>
                      <p className="text-[10.5px] text-slate-400 max-w-sm leading-relaxed">
                        Chụp hoặc quét mã QR bằng ứng dụng ngân hàng thương mại để dâng lễ vật <span className="text-yellow-400 font-bold font-mono">{(activePayment.amount).toLocaleString('vi-VN')} VND</span> chuẩn xác.
                      </p>
                    </div>

                    <div className="space-y-3.5 w-full text-left py-2 font-sans text-xs border-t border-white/5">
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-slate-400 text-[11px] uppercase tracking-wider">Ngân hàng thụ nhận:</span>
                        <span className="font-bold text-slate-200">Techcombank</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-slate-400 text-[11px] uppercase tracking-wider">Số tài khoản linh căn:</span>
                        <div className="flex items-center gap-1.5 bg-[#03060a]/90 px-3 py-1.2 rounded-lg border border-slate-800">
                          <span className="font-mono font-bold text-[#C8A24A]">0978567205</span>
                          <button onClick={() => handleCopyText('0978567205', 'Số tài khoản')} className="p-1 rounded hover:bg-white/10" title="Sao chép số tài khoản"><Copy className="w-3.5 h-3.5 text-slate-400" /></button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-slate-400 text-[11px] uppercase tracking-wider">Danh tính đệ tử thụ giáo:</span>
                        <span className="font-bold text-slate-200">LÊ HUY BẢO</span>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-slate-400 text-[11px] uppercase tracking-wider">Lượng số vàng dâng hiến:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-extrabold text-slate-200">{(activePayment.amount).toLocaleString('vi-VN')} VND</span>
                          <button onClick={() => handleCopyText(String(activePayment.amount), 'Số tiền')} className="p-1 rounded hover:bg-white/10" title="Sao chép số tiền"><Copy className="w-3.5 h-3.5 text-slate-400" /></button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-slate-400 text-[11px] uppercase tracking-wider">Nội dung sấm truyền:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-extrabold text-red-400 bg-red-950/20 px-2.5 py-1 rounded border border-red-500/20">{activePayment.orderCode}</span>
                          <button onClick={() => handleCopyText(activePayment.orderCode, 'Nội dung chuyển khoản')} className="p-1 rounded hover:bg-white/10" title="Sao chép nội dung sấm truyền"><Copy className="w-3.5 h-3.5 text-slate-400" /></button>
                        </div>
                      </div>
                    </div>

                    <p className="text-[10px] text-yellow-500 max-w-sm leading-normal font-sans tracking-wide">
                      ⚠️ Phải ghi chính xác 100% Nội dung sấm truyền bên trên để hệ thống tự động tháo giải quẻ cho hữu duyên đệ tử.
                    </p>

                    <div className="flex items-center gap-3 w-full pt-2">
                      <button 
                        onClick={checkPaymentStatus}
                        className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 rounded-xl text-xs uppercase tracking-widest font-bold font-mono hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                      >
                        Tôi Đã Chuyển Khoản VietQR ✦ Xác Minh Pháp Bảo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}


        {/* 2.5 SPIRITUAL SUBSCRIPTIONS MANAGEMENT VIEW */}
        {currentView === 'subscriptions' && (
          <div className="max-w-4xl mx-auto py-8 space-y-10 animate-fadeIn">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/20 text-[#C8A24A] text-xs font-mono font-bold uppercase tracking-wider">
                <span>🪐</span> Tinh Bàn Linh Cát - Khai Nguyên Mệnh Số
              </div>
              <h2 className="text-3xl font-serif font-extrabold text-[#e0e0e0] tracking-tight">
                Quản Lý Gói Dịch Vụ Tâm Linh
              </h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">
                Thời vận tuần hoàn theo quỹ đạo. Đây là mật thất giám hộ, hiển thị đèn nến, thời hạn hộ vệ sinh thông suốt của thí chủ qua các phiên sấm truyền đắc lộc.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* TARGET 1: TAROT SUBSCRIBES */}
              <div className="rounded-2xl border border-slate-800/80 bg-[#090d16]/80 p-6 relative flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(200,162,74,0.02)] border-[#C8A24A]/20">
                {/* Spiritual aesthetic background seal */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-4 border-dashed border-[#C8A24A]/5 flex items-center justify-center animate-spin pointer-events-none" style={{ animationDuration: '30s' }}>
                  <div className="w-24 h-24 rounded-full border-2 border-dotted border-[#C8A24A]/5" />
                </div>

                <div className="z-10 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-[#C8A24A] uppercase font-bold">GÓI CHIÊU AN HƯỚNG DẪN</span>
                      <h3 className="text-xl font-serif font-black flex items-center gap-1.5">
                        🔮 Tarot AI Oracle
                      </h3>
                    </div>
                    <span className="text-xs bg-[#C8A24A]/10 text-[#C8A24A] border border-[#C8A24A]/30 font-bold px-2 py-0.5 rounded-lg">
                      1 Tiếng 30 Phút
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Khai mở sấm truyền 78 lá cổ, bốc bài luận giải cát hung niên vận, kết nối trường năng lượng của 3 tiên tri túc mệnh tối cao.
                  </p>

                  <div className="py-4 border-y border-white/5 space-y-4">
                    {/* CASE 1: ACTIVE */}
                    {tarotSubStatus?.unlocked && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-xs text-green-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span>MẬT THẤT ĐANG MỞ (ĐANG HOẠT ĐỘNG)</span>
                        </div>
                        
                        <div className="bg-[#03060a]/90 border border-green-500/20 rounded-xl p-4 text-center space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">Thần Khí Sấm Truyền Còn Lại</span>
                          <span className="text-lg font-mono font-bold text-green-400">{formatCountdown(tarotSubStatus.timeLeftMs)}</span>
                        </div>
                        
                        <div className="text-[11px] text-slate-400 flex justify-between font-mono">
                          <span>Mã vận mệnh:</span>
                          <span className="text-amber-400">{tarotSubStatus.payment?.orderCode}</span>
                        </div>
                      </div>
                    )}

                    {/* CASE 2: CAN RENEW (GLOWS POETICALLY) */}
                    {tarotSubStatus?.canRenew && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-xs text-yellow-500 font-bold">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
                          <span>LỆNH GIA HẠN ĐẶC CÁCH ĐANG MỞ</span>
                        </div>

                        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-center space-y-1">
                          <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono block">Thời gian gia hạn giảm giá còn lại</span>
                          <span className="text-lg font-mono font-bold text-yellow-500">{formatCountdown(tarotSubStatus.renewTimeLeftMs)}</span>
                        </div>

                        <div className="text-xs text-slate-300 font-sans leading-relaxed bg-yellow-950/10 p-3 rounded-lg border border-yellow-700/20 text-center">
                          🔮 Sấm truyền Tarot vừa mãn hạn. Đặc xá giảm giá <span className="text-amber-400 font-bold">150.000đ</span> khi gia hạn khẩn trương trong thời gian vàng!
                          <div className="text-[11px] text-slate-400 mt-1">
                            Giá gốc: <del className="text-slate-500">400.000đ</del> → <span className="font-bold text-green-400 text-sm">250.000đ</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CASE 3: EXPIRED OR NOT BOUGHT */}
                    {(!tarotSubStatus || (!tarotSubStatus.unlocked && !tarotSubStatus.canRenew)) && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                          <span className="w-2 h-2 rounded-full bg-slate-600" />
                          <span>CHƯA KÍCH HOẠT / ĐÃ TÀN NẾN</span>
                        </div>

                        <div className="bg-slate-950 p-4 rounded-xl text-center text-xs text-slate-500">
                          🪐 Định tinh Tarot cung mệnh đang chờ dâng hương khai sắc.
                        </div>

                        <div className="text-right text-xs">
                          Phí khai đàn: <span className="font-mono text-amber-400 font-bold text-sm">400.000đ</span> / 1 tiếng 30 phút
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 z-10 w-full mt-auto">
                  {tarotSubStatus?.unlocked ? (
                    <button 
                      onClick={() => {
                        setAiPersonaTab('tarot');
                        setReadingOutput('');
                        setCurrentView('oracles');
                      }}
                      className="w-full py-3.5 rounded-xl bg-green-950/30 border border-green-500/40 hover:bg-green-500 hover:text-[#03060a] transition-all font-serif text-xs font-bold uppercase tracking-wider text-green-400 cursor-pointer"
                    >
                      Tiến Vào Phiên Tarot 🕯️
                    </button>
                  ) : tarotSubStatus?.canRenew ? (
                    <button 
                      onClick={() => triggerServiceRenewal('tarot')}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:scale-[1.02] text-slate-950 transition-all font-serif text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    >
                      Gia Hạn Đặc Cách - Nhận Ưu Đãi Giảm 150K ⚜️
                    </button>
                  ) : (
                    <button 
                      onClick={() => triggerServicePurchase('tarot')}
                      className="w-full py-3.5 rounded-xl bg-[#C8A24A]/20 hover:bg-[#C8A24A]/30 border border-[#C8A24A]/40 text-[#C8A24A] hover:text-white transition-all font-serif text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Dâng Hương Kích Hoạt 🔮
                    </button>
                  )}
                </div>
              </div>


              {/* TARGET 2: HOROSCOPE SUBSCRIBES */}
              <div className="rounded-2xl border border-slate-800/80 bg-[#090d16]/80 p-6 relative flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.02)] border-violet-500/20">
                {/* Spiritual aesthetic background seal */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-4 border-dashed border-violet-500/5 flex items-center justify-center animate-spin pointer-events-none" style={{ animationDuration: '40s' }}>
                  <div className="w-24 h-24 rounded-full border-2 border-dotted border-violet-500/5" />
                </div>

                <div className="z-10 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase font-bold">GÓI CHIÊM TINH HỘ MỆNH</span>
                      <h3 className="text-xl font-serif font-black flex items-center gap-1.5">
                        🌌 Tử Vi Chiêm Tinh Matrix
                      </h3>
                    </div>
                    <span className="text-xs bg-violet-500/10 text-violet-300 border border-violet-500/30 font-bold px-2 py-0.5 rounded-lg">
                      3 Tiếng
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Lập thiên bàn Tử Vi trọn đời, an sao nhập hạn luận ngũ hành bát tự chính tông, dự đoán thăng trầm của các tinh cầu bản mệnh tinh vi.
                  </p>

                  <div className="py-4 border-y border-white/5 space-y-4">
                    {/* CASE 1: ACTIVE */}
                    {astroSubStatus?.unlocked && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-xs text-green-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span>MẬT THẤT ĐANG MỞ (ĐANG HOẠT ĐỘNG)</span>
                        </div>
                        
                        <div className="bg-[#03060a]/90 border border-green-500/20 rounded-xl p-4 text-center space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">Thần Khí Sấm Truyền Còn Lại</span>
                          <span className="text-lg font-mono font-bold text-green-400">{formatCountdown(astroSubStatus.timeLeftMs)}</span>
                        </div>
                        
                        <div className="text-[11px] text-slate-400 flex justify-between font-mono">
                          <span>Mã vận mệnh:</span>
                          <span className="text-violet-400">{astroSubStatus.payment?.orderCode}</span>
                        </div>
                      </div>
                    )}

                    {/* CASE 2: CAN RENEW (GLOWS POETICALLY) */}
                    {astroSubStatus?.canRenew && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-xs text-yellow-500 font-bold">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
                          <span>LỆNH GIA HẠN ĐẶC CÁCH ĐANG MỞ</span>
                        </div>

                        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-center space-y-1">
                          <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono block">Thời gian gia hạn giảm giá còn lại</span>
                          <span className="text-lg font-mono font-bold text-yellow-500">{formatCountdown(astroSubStatus.renewTimeLeftMs)}</span>
                        </div>

                        <div className="text-xs text-slate-300 font-sans leading-relaxed bg-yellow-950/10 p-3 rounded-lg border border-yellow-700/20 text-center">
                          🌌 Bản đồ sao Horoscope vừa mãn tuần hoàn. Đặc xá giảm giá <span className="text-amber-400 font-bold">150.000đ</span> khi gia hạn khẩn trương trong thời gian vàng!
                          <div className="text-[11px] text-slate-400 mt-1">
                            Giá gốc: <del className="text-slate-500">650.000đ</del> → <span className="font-bold text-green-400 text-sm">500.000đ</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CASE 3: EXPIRED OR NOT BOUGHT */}
                    {(!astroSubStatus || (!astroSubStatus.unlocked && !astroSubStatus.canRenew)) && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                          <span className="w-2 h-2 rounded-full bg-slate-600" />
                          <span>CHƯA KÍCH HOẠT / ĐÃ TÀN NẾN</span>
                        </div>

                        <div className="bg-slate-950 p-4 rounded-xl text-center text-xs text-slate-500">
                          🪐 Định tinh Tử Vi dải ngân hà đang chờ làm lễ an sao ban lộc.
                        </div>

                        <div className="text-right text-xs">
                          Phí làm lễ: <span className="font-mono text-violet-400 font-bold text-sm">650.000đ</span> / 3 tiếng
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 z-10 w-full mt-auto">
                  {astroSubStatus?.unlocked ? (
                    <button 
                      onClick={() => {
                        setAiPersonaTab('astrology');
                        setReadingOutput('');
                        setCurrentView('oracles');
                      }}
                      className="w-full py-3.5 rounded-xl bg-violet-950/30 border border-violet-500/40 hover:bg-violet-500 hover:text-[#03060a] transition-all font-serif text-xs font-bold uppercase tracking-wider text-violet-300 cursor-pointer"
                    >
                      Tiến Vào Phiên Tử Vi 🕯️
                    </button>
                  ) : astroSubStatus?.canRenew ? (
                    <button 
                      onClick={() => triggerServiceRenewal('horoscope')}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:scale-[1.02] text-slate-950 transition-all font-serif text-xs font-bold uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    >
                      Gia Hạn Đặc Cách - Nhận Ưu Đãi Giảm 150K ⚜️
                    </button>
                  ) : (
                    <button 
                      onClick={() => triggerServicePurchase('horoscope')}
                      className="w-full py-3.5 rounded-xl bg-violet-950/20 hover:bg-violet-950/30 border border-violet-500/40 text-violet-300 hover:text-white transition-all font-serif text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Dâng Hương Kích Hoạt 🌌
                    </button>
                  )}
                </div>
              </div>

              {/* TARGET 3: LOVE ORACLE SUBSCRIBES (boitinhyeu.vn concept) */}
              <div className="rounded-2xl border border-slate-800/80 bg-[#090d16]/80 p-6 relative flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.02)] border-pink-500/20">
                {/* Spiritual aesthetic background seal */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-4 border-dashed border-pink-500/5 flex items-center justify-center animate-spin pointer-events-none" style={{ animationDuration: '35s' }}>
                  <div className="w-24 h-24 rounded-full border-2 border-dotted border-pink-500/5" />
                </div>

                <div className="z-10 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase font-bold">KẾT KHỞI TƠ HỒNG</span>
                      <h3 className="text-xl font-serif font-black flex items-center gap-1.5 text-pink-300">
                        💖 Bói Tình Yêu & Ái Tình
                      </h3>
                    </div>
                    <span className="text-[10px] bg-pink-500/10 text-pink-300 border border-pink-500/30 font-bold px-2 py-0.5 rounded-lg">
                      Mỗi Lượt
                    </span>
                  </div>

                  <p className="text-xs text-slate-404 leading-relaxed font-sans">
                    Đối chiếu bát tự bản mệnh, thần phán trực giác từ boitinhyeu.vn nhằm vạch sách hướng đi thâm tình tháo dỡ mọi gút thắt tơ lòng luyến duyên.
                  </p>

                  <div className="py-4 border-y border-white/5 space-y-4">
                    {/* CASE 1: ACTIVE AVAILABLE RUNS */}
                    {loveSubStatus?.unlocked && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-xs text-pink-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                          <span>QUẺ SẦM TRUYỀN SẴN SÀNG MỞ</span>
                        </div>
                        
                        <div className="bg-[#03060a]/90 border border-pink-500/15 rounded-xl p-4 text-center space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">Số lượt sấm truyền khả dụng</span>
                          <span className="text-xs font-sans text-slate-300">
                            Đã kích khới: <strong className="text-pink-400 text-base">Hữu hiệu</strong>
                          </span>
                        </div>
                        
                        <div className="text-[11px] text-slate-400 flex justify-between font-mono">
                          <span>Phiên linh nghiệm:</span>
                          <span className="text-pink-400 uppercase">{loveSubStatus.payment?.orderCode || 'MYSTIC-LOVE'}</span>
                        </div>
                      </div>
                    )}

                    {/* CASE 2: NOT BOUGHT OR CONSUMED */}
                    {(!loveSubStatus || !loveSubStatus.unlocked) && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                          <span className="w-2 h-2 rounded-full bg-slate-600" />
                          <span>CHƯA KÍCH HOẠT / CẦN THẮP HƯƠNG</span>
                        </div>

                        <div className="bg-slate-950 p-4 rounded-xl text-center text-xs text-slate-500">
                          🪐 Bản mệnh tình trường đang chờ dâng kính nhang trần cầu hỷ lộc boitinhyeu.vn.
                        </div>

                        <div className="text-right text-xs">
                          Lệ phí dâng lễ: <span className="font-mono text-pink-300 font-bold text-sm">135.000đ</span> / 1 lượt quẻ
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 z-10 w-full mt-auto">
                  {loveSubStatus?.unlocked ? (
                    <button 
                      onClick={() => {
                        setAiPersonaTab('love');
                        setReadingOutput('');
                        setCurrentView('oracles');
                      }}
                      className="w-full py-3.5 rounded-xl bg-pink-950/30 border border-pink-500/40 hover:bg-pink-500 hover:text-[#03060a] transition-all font-serif text-xs font-bold uppercase tracking-wider text-pink-300 cursor-pointer"
                    >
                      Tiến Vào Quẻ Sấm Tình Yêu 🕯️
                    </button>
                  ) : (
                    <button 
                      onClick={() => triggerServicePurchase('love')}
                      className="w-full py-3.5 rounded-xl bg-pink-950/20 hover:bg-pink-1050/30 border border-pink-500/40 text-pink-300 hover:text-white transition-all font-serif text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Dâng Hương Kích Hoạt 💖
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* TARGET 3: SUPER AI GENERAL PACKS STATS */}
            <div className="rounded-2xl border border-slate-800/80 bg-[#090d16]/80 p-6 relative overflow-hidden shadow-[0_0_50px_rgba(200,162,74,0.02)] border-amber-500/20">
              <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider font-mono">
                    <span>✨</span> TÌNH TRẠNG KẾT NỐI SIÊU AI (HB AI & TIÊN TRI ĐẠI SẢNH)
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-100 flex items-center gap-1.5">
                    💫 Quyền Năng Sấm Truyền Vô Hạn
                  </h3>
                  <p className="text-xs text-slate-400 max-w-xl">
                    Sở hữu một trong các gói Chiêm Tinh Nhật Linh/Thất Tinh/Nguyệt Tướng để đàm thoại không giới hạn số lượt với toàn bộ 3 Đại Tiên Tri trong đại sảnh.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 items-center bg-[#03060a] border border-slate-800 p-4 rounded-xl shrink-0 w-full md:w-auto">
                  {/* Trial slot display */}
                  <div className="text-center px-4 border-r border-slate-800">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono">Quỹ dùng thử free</span>
                    <span className="text-base font-bold text-slate-200 mt-1 block">
                      {freeTurnsLeft > 0 ? `Còn ${freeTurnsLeft}/3 lượt` : 'Đã hết lượt miễn phí'}
                    </span>
                  </div>

                  {/* Sub pack status display */}
                  <div className="text-center px-4">
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono">Thời gian gói vô hạn</span>
                    {aiSubStatus?.unlocked ? (
                      <span className="text-base font-mono font-bold text-[#C8A24A] animate-pulse block mt-1">
                        Active: {formatCountdown(aiSubStatus.timeLeftMs)}
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-slate-500 mt-1 block font-sans">
                        Chưa đăng ký gói vô hạn
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Mini packages purchase links for high accessibility */}
              {!aiSubStatus?.unlocked && (
                <div className="mt-6 pt-6 border-t border-slate-800/80">
                  <span className="text-[10px] text-[#C8A24A] uppercase font-mono tracking-widest font-bold block mb-4 text-center">ĐĂNG KÝ GÓI ĐỂ MỞ KHÓA TRUY CẬP VÔ HẠN</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button 
                      onClick={() => triggerServicePurchase('ai_daily')}
                      className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-[#C8A24A] hover:text-black transition-all cursor-pointer text-xs font-bold text-center uppercase tracking-wider text-slate-250"
                    >
                      Nhật Linh (1 Ngày) - 50k
                    </button>
                    <button 
                      onClick={() => triggerServicePurchase('ai_weekly')}
                      className="px-4 py-3 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-[#C8A24A] hover:text-black transition-all cursor-pointer text-xs font-bold text-center uppercase tracking-wider text-amber-200"
                    >
                      Thất Tinh (7 Ngày) - 170k 🔥
                    </button>
                    <button 
                      onClick={() => triggerServicePurchase('ai_monthly')}
                      className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-[#C8A24A] hover:text-black transition-all cursor-pointer text-xs font-bold text-center uppercase tracking-wider text-slate-250"
                    >
                      Nguyệt Tướng (30 Ngày) - 269k
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Spiritual advisory block */}
            <p className="text-center text-[11px] text-slate-500 italic max-w-xl mx-auto leading-normal">
              🌙 “Càn khôn xoay chuyển, túc mạng tuần hoàn. Khi dâng đúng lễ và đi theo hướng cát của các tinh đẩu, cánh cửa tịnh thất tâm linh tự khắc trường tồn hộ trì thí chủ đắc may tránh họa.”
            </p>
          </div>
        )}

        {/* 3. UNLOCK RITUAL TRANSITION SCREEN */}
        {currentView === 'ritual' && (
          <div className="max-w-2xl mx-auto py-16 text-center space-y-12 animate-fadeIn">
            <div className="relative w-40 h-40 mx-auto">
              {/* Spinning cosmic celestial frame with pulse glows */}
              <div className="absolute inset-0 rounded-full border border-[#C8A24A]/30 animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute inset-2 rounded-full border border-violet-500/30 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#C8A24A]/25 animate-spin" style={{ animationDuration: '15s' }} />
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-amber-600/10 via-slate-950 to-indigo-900/10 flex items-center justify-center filter blur-xs" />
              
              {/* Spiritual Candle glow centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-10 rounded-full bg-orange-500 blur-md animate-pulse" />
                <div className="absolute w-2 h-6 rounded-full bg-yellow-300 blur-xs animate-ping" />
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest text-[#C8A24A] uppercase block">Connecting to cosmic intelligence...</span>
              <h2 className="text-3xl font-serif font-extrabold tracking-tight">Kính Lễ Hội Đồng Tiên Tri</h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Đèn nến dâng đầy, ngọn lửa tịnh hóa đã thắp sáng. Hệ thống đang đồng bộ hóa đường tinh tú, bầy quẻ Tarot bản mệnh và chu vận bản đồ sao Capicorn...
              </p>
            </div>

            <div className="max-w-xs mx-auto">
              <button 
                onClick={completeRitualToOracles}
                className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-[#C8A24A] text-slate-950 font-serif font-bold text-sm transition-all shadow-3xl hover:scale-105"
              >
                Tiến Bước Vào Phiên Giải Quẻ 🕯️
              </button>
            </div>
          </div>
        )}

        {/* 4. MULTI-AI READING INTERFACE */}
        {currentView === 'oracles' && (
          <div className="grid lg:grid-cols-12 gap-8 items-start py-4">
            
            {/* SIDEBAR ORACLE COPTICS (Column 3) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-2xl border border-slate-900 bg-[#060911]/90 p-4 space-y-5">
                <div className="p-2 border-b border-slate-900 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C8A24A]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">Đại Điện Tiên Tri</span>
                </div>

                <div className="space-y-2 font-sans text-xs">
                  {/* TAB 1: TAROT */}
                  <button 
                    onClick={() => {
                      setAiPersonaTab('tarot');
                      setReadingOutput('');
                    }}
                    className={`w-full p-3.5 rounded-xl font-medium border text-left flex items-center justify-between transition-colors ${aiPersonaTab === 'tarot' ? 'border-[#C8A24A]/40 bg-[#C8A24A]/5 text-[#C8A24A]' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span>🔮</span>
                      <div>
                        <h6>Tarot AI Oracle</h6>
                        <p className="text-[9px] text-slate-500">Mô hình giải quẻ sâu</p>
                      </div>
                    </div>
                    {unlockedTarot || currentUser?.role === 'admin' ? (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-950/40 text-green-400">UNVALUED</span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </button>

                  {/* TAB 2: ASTROLOGY */}
                  <button 
                    onClick={() => {
                      setAiPersonaTab('astrology');
                      setReadingOutput('');
                    }}
                    className={`w-full p-3.5 rounded-xl font-medium border text-left flex items-center justify-between transition-colors ${aiPersonaTab === 'astrology' ? 'border-violet-500/40 bg-violet-950/10 text-violet-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span>🌌</span>
                      <div>
                        <h6>Astrology & Tử Vi</h6>
                        <p className="text-[9px] text-slate-500">Toàn vẹn bản đồ sao</p>
                      </div>
                    </div>
                    {unlockedAstro || currentUser?.role === 'admin' ? (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-950/40 text-green-400">UNVALUED</span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </button>

                  {/* TAB 3: COACH COUNCIL */}
                  <button 
                    onClick={() => {
                      setAiPersonaTab('coach');
                      setReadingOutput('');
                    }}
                    className={`w-full p-3.5 rounded-xl font-medium border text-left flex items-center justify-between transition-colors ${aiPersonaTab === 'coach' ? 'border-indigo-500/40 bg-indigo-950/10 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span>🧿</span>
                      <div>
                        <h6>Oracle Council AI</h6>
                        <p className="text-[9px] text-slate-500">Hội đồng tiên tri dẫn lối</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-950/40 text-blue-400">FREE DIRECT</span>
                  </button>

                  {/* TAB 4: LOVE ORACLE */}
                  <button 
                    onClick={() => {
                      setAiPersonaTab('love');
                      setReadingOutput('');
                    }}
                    className={`w-full p-3.5 rounded-xl font-medium border text-left flex items-center justify-between transition-colors ${aiPersonaTab === 'love' ? 'border-pink-500/40 bg-pink-950/10 text-pink-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="animate-[pulse_1.5s_infinite]">💖</span>
                      <div>
                        <h6>Bói Tình Yêu & Duyên Khởi</h6>
                        <p className="text-[9px] text-pink-500/80">Sợi chỉ đỏ luyến ái - 135K</p>
                      </div>
                    </div>
                    {unlockedLove || currentUser?.role === 'admin' ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-green-950/40 text-green-400">ĐÃ MỞ KHÓA</span>
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* SAVED PORTALS */}
              <button 
                onClick={() => setCurrentView('landing')} 
                className="w-full py-3.5 rounded-xl border border-slate-900 bg-slate-950/40 hover:bg-slate-950 text-xs font-semibold hover:text-[#C8A24A] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-slate-400" /> Khởi Tạo Lại Câu Hỏi
              </button>
            </div>

            {/* CENTRAL WORKSPACE CONSOLE (Column 9) */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* ORACLE CHAT CARD INPUT */}
              <div className="rounded-2xl border border-slate-800 bg-[#090d16]/90 p-6 shadow-3xl space-y-6">
                
                {/* DYNAMIC INPUT VIEW BASED ON ACTIVE TAB */}
                {aiPersonaTab === 'tarot' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-serif font-bold text-amber-200">Trải Nghiệm Bốc Bài Thác Chiêm</h3>
                        <p className="text-xs text-slate-400">Vui lòng rũ bỏ muộn phiền, tập trung tâm thức vào quẻ cần hỏi và bốc ngẫu nhiên 3 lá bài bên dưới:</p>
                      </div>
                      <button 
                        onClick={resetTarotSelection}
                        className="text-xs font-semibold text-amber-400 hover:underline cursor-pointer"
                      >
                        Làm Mới Trận Pháp 🛡️
                      </button>
                    </div>

                    {/* TAROT INTERACTIVE PILES DISPLAY */}
                    <div className="flex flex-wrap items-center justify-center gap-3 py-2">
                      {TAROT_DECK.map((card, i) => {
                        const isSelected = tarotSelectedCards.includes(i);
                        return (
                          <div 
                            key={"tarot-card-" + i}
                            id={"tarot-card-item-" + i}
                            onClick={() => selectTarotCard(i)}
                            className={`w-[68px] h-[108px] sm:w-[84px] sm:h-[134px] rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer select-none relative overflow-hidden group ${isSelected ? 'border-[#C8A24A] shadow-[0_0_20px_rgba(200,162,74,0.5)] scale-95 bg-[#C8A24A]/10' : 'border-slate-800 bg-[#03060a] hover:border-[#C8A24A]/50 hover:scale-105'}`}
                          >
                            {/* Celestial star lines overlay on unselected card backs */}
                            {!isSelected && (
                              <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full border border-dashed border-[#C8A24A]/25 animate-[spin_30s_linear_infinite] flex items-center justify-center">
                                  <div className="w-6 h-6 rounded-full border border-double border-white/5 animate-[spin_20s_linear_infinite]"></div>
                                </div>
                              </div>
                            )}

                            {isSelected ? (
                              <div className="flex flex-col items-center justify-center gap-1.5 p-1 text-center animate-fadeIn">
                                <span className="text-2xl sm:text-3xl drop-shadow-[0_0_8px_rgba(200,162,74,0.4)] animate-bounce">{card.img}</span>
                                <span className="text-[7px] sm:text-[9.5px] font-extrabold text-amber-400 text-center uppercase tracking-tight font-sans truncate max-w-[62px] sm:max-w-[76px] px-0.5 leading-tight">{card.name.split(' (')[0]}</span>
                              </div>
                            ) : (
                              <span className="text-xl sm:text-2xl text-[#C8A24A]/85 font-serif group-hover:scale-110 group-hover:text-amber-300 transition-transform">✨</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-xs text-slate-400 font-mono flex gap-1 items-center bg-slate-950 p-3 rounded-lg border border-slate-900">
                      <span>Lá bài đã bốc ({tarotSelectedCards.length}/3):</span>
                      <span className="font-bold text-[#C8A24A]">
                        {tarotSelectedCards.length > 0 
                          ? tarotSelectedCards.map(idx => TAROT_DECK[idx].name).join(' ➔ ') 
                          : 'Chưa bốc bài... Hãy gõ quẻ bốc bất kỳ.'}
                      </span>
                    </div>
                  </div>
                )}

                {aiPersonaTab === 'astrology' && (
                  <div className="space-y-4 animate-fadeIn">
                    <h3 className="text-lg font-serif font-bold text-violet-400">Khởi Lập Hệ Sao Hoàng Đạo</h3>
                    <p className="text-xs text-slate-400">Nhập chính xác ngày giờ sinh của bản thân để hệ thống liên văn phòng tinh chỉnh thông số Tử Vi:</p>

                    <form className="grid sm:grid-cols-3 gap-4 font-sans text-xs">
                      <div>
                        <label className="block text-[11px] text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Ngày sinh của bản chủ</label>
                        <input 
                          type="date"
                          value={birthDetails.date}
                          onChange={(e) => setBirthDetails({ ...birthDetails, date: e.target.value })}
                          className="w-full bg-[#03060a] border border-slate-800 rounded-xl px-4 py-3 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Giờ sinh chi hằng</label>
                        <input 
                          type="time"
                          value={birthDetails.time}
                          onChange={(e) => setBirthDetails({ ...birthDetails, time: e.target.value })}
                          className="w-full bg-[#03060a] border border-slate-800 rounded-xl px-4 py-3 text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Nơi sinh (Tỉnh/Thành)</label>
                        <input 
                          type="text"
                          value={birthDetails.location}
                          onChange={(e) => setBirthDetails({ ...birthDetails, location: e.target.value })}
                          placeholder="Hồ Chí Minh"
                          className="w-full bg-[#03060a] border border-slate-800 rounded-xl px-4 py-3 text-slate-200"
                        />
                      </div>
                    </form>

                    <div className="flex items-center gap-2.5 p-3.5 rounded-xl border border-violet-500/20 bg-violet-950/20 text-xs text-violet-300 leading-relaxed font-sans mt-3">
                      <span className="text-base select-none">☄️</span>
                      <span>
                        <strong>Chú thích Sao chiếu mệnh:</strong> Các dòng vận tinh vi từ bản đồ sao tử vi cho thấy độ chính xác của quẻ này dao động từ <strong>50% đến 60%</strong>, tùy thuộc thêm vào tịnh phước cát duyên và tâm niệm thành kính của bản chủ.
                      </span>
                    </div>
                  </div>
                )}

                {aiPersonaTab === 'coach' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex flex-col md:flex-row gap-5 items-center bg-[#040812] p-5 rounded-2xl border border-indigo-500/20 shadow-lg relative overflow-hidden">
                      {/* Sacral spinning background glow */}
                      <div className="absolute -right-24 -bottom-24 w-52 h-52 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                      
                      {/* Mystical Spiritual Illustration/Image Placeholder */}
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-950 via-slate-900 to-[#C8A24A]/25 border border-indigo-400/30 flex items-center justify-center relative shrink-0 overflow-hidden shadow-2xl">
                        {/* Spinning astrological background */}
                        <div className="absolute inset-1 rounded-full border border-dashed border-indigo-400/20 animate-spin" style={{ animationDuration: '25s' }} />
                        <div className="absolute inset-3 rounded-full border border-dotted border-amber-400/15 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                        {/* Central Cosmic Eye of Providence / Spiritual Icon */}
                        <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] z-10 select-none">🧿</span>
                        <div className="absolute bottom-1 bg-indigo-950/80 px-2 py-0.5 rounded-full text-[8px] font-mono tracking-wider border border-indigo-500/30 text-indigo-300">COUNCIL</div>
                      </div>

                      <div className="text-left space-y-2 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-md sm:text-lg font-serif font-bold text-indigo-400 flex items-center gap-2">
                            <span>⚜️</span> Oracle Council AI (Trợ Lý Tịnh Thất)
                          </h3>
                          {/* Turn counters clearly displayed above/on the visual illustration as requested! */}
                          <div className="px-2.5 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-mono font-bold text-indigo-300 shadow-md">
                            Lượt đã dùng: <span className="text-amber-400 font-extrabold">{3 - freeTurnsLeft}</span>/3 quẻ
                          </div>
                        </div>
                        <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans">
                          Hội đồng gồm 3 đại sư Tiên tri kết hợp tinh hoa bói toán Tarot và vận trình Tử vi tinh vi để vạch lối thăng trầm cuộc sống, che chở tâm hồn cho thí chủ.
                        </p>
                        
                        {/* Interactive progress bar */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex justify-between text-[9.5px] font-mono text-slate-500">
                            <span>Vận khí kết nối dùng thử</span>
                            <span>{freeTurnsLeft > 0 ? `Còn lại ${freeTurnsLeft} lượt` : 'Đã hết cát duyên'}</span>
                          </div>
                          <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className="h-full bg-indigo-500 transition-all duration-500" 
                              style={{ width: `${(freeTurnsLeft / 3) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {aiPersonaTab === 'love' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="border border-pink-500/20 bg-pink-950/5 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl animate-[pulse_1.5s_infinite] select-none">💖</span>
                        <div>
                          <h3 className="text-md sm:text-lg font-serif font-bold text-pink-400">
                            Khai Kết Quẻ Sấm Truyền Ái Tình (Thượng Ngàn Đàn Lễ)
                          </h3>
                          <p className="text-xs text-slate-450">
                            Đối chiếu linh căn cung mệnh, bát tự ngũ hành để vạch chỉ tơ duyên hòa hợp thâm sâu của hai bản chủ:
                          </p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 font-sans text-xs pt-2">
                        {/* Partner 1 */}
                        <div className="space-y-3 bg-[#03060a]/90 p-4 rounded-xl border border-slate-800">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C8A24A] font-bold block">
                            👤 BẢN MỆNH THỨ NHẤT (THIÊN NAM / ĐỊA NỮ)
                          </span>
                          <div className="space-y-2">
                            <label className="block text-[11px] text-slate-400">Họ tên / Danh tự:</label>
                            <input 
                              type="text"
                              value={lovePartner1}
                              onChange={(e) => setLovePartner1(e.target.value)}
                              placeholder="Ví dụ: Lê Huy Bảo"
                              className="w-full bg-[#050912] border border-slate-850 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-pink-500/30 font-sans"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[11px] text-slate-400">Ngày sinh hồng trần:</label>
                            <input 
                              type="date"
                              value={loveDob1}
                              onChange={(e) => setLoveDob1(e.target.value)}
                              className="w-full bg-[#050912] border border-slate-850 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-sans"
                            />
                          </div>
                        </div>

                        {/* Partner 2 */}
                        <div className="space-y-3 bg-[#03060a]/90 p-4 rounded-xl border border-slate-800">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-pink-400 font-bold block">
                            👤 BẢN MỆNH THỨ HAI (DUYÊN HỮU TẤN TỚI)
                          </span>
                          <div className="space-y-2">
                            <label className="block text-[11px] text-slate-400">Họ tên / Danh tự:</label>
                            <input 
                              type="text"
                              value={lovePartner2}
                              onChange={(e) => setLovePartner2(e.target.value)}
                              placeholder="Ví dụ: Võ Thị Thu Uyên"
                              className="w-full bg-[#050912] border border-slate-850 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-pink-500/30 font-sans"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[11px] text-slate-400">Ngày sinh hồng trần:</label>
                            <input 
                              type="date"
                              value={loveDob2}
                              onChange={(e) => setLoveDob2(e.target.value)}
                              className="w-full bg-[#050912] border border-slate-850 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-sans"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Relationship Status Selector */}
                      <div className="space-y-2 font-sans text-xs bg-[#03060a]/90 p-4 rounded-xl border border-slate-800">
                        <label className="block text-[11px] text-slate-400 font-mono tracking-wide uppercase">
                          📍 TRẠNG THÁI HIỆN THỜI CỦA SỢI CHỈ TƠ HỒNG
                        </label>
                        <select 
                          value={loveStatus}
                          onChange={(e) => setLoveStatus(e.target.value)}
                          className="w-full bg-[#050912] border border-slate-800 focus:border-pink-500/50 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-sans"
                        >
                          <option value="dating">Đang Tìm Hiểu / Đang Hẹn hò nồng ấm</option>
                          <option value="married">Đã Thành Kính Kết Hôn / Gối đầu chung giường</option>
                          <option value="crush">Đơm hoa đơn phương / Yêu thầm trộm nhớ</option>
                          <option value="complicated">Mối quan hệ phức tạp / Trắc trở phong ba</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2.5 p-3.5 rounded-xl border border-pink-500/20 bg-pink-950/20 text-xs text-pink-300 leading-relaxed font-sans">
                        <span className="text-base select-none">❣</span>
                        <span>
                          <strong>Sấm ngôn bản lề:</strong> Trực kết nối với tổng đàn tơ hồng boitinhyeu.vn. Cầu chúc cho nhân duyên các bản chủ luôn được chở che, bình lặng vượt thác hồng trần cát cát lợi lợi.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PROMPT ACTION TEXT CONSOLE */}
                {!(aiPersonaTab === 'coach' && freeTurnsLeft <= 0 && !aiSubStatus?.unlocked) ? (
                  <div className="space-y-3 font-sans">
                    <label className="block text-[11px] text-slate-400 uppercase tracking-wider font-mono">Câu hỏi tịnh hóa hoặc Trải lòng</label>
                    <div className="relative">
                      <textarea 
                        rows={3}
                        value={oracleQuery}
                        onChange={(e) => setOracleQuery(e.target.value)}
                        placeholder="Hãy viết ra nỗi lòng để kết nối sâu sắc hơn với vũ trụ huyền diệu... (Ví dụ: Dự báo công danh thời gian tới thế nào?)"
                        className="w-full bg-[#03060a] border border-slate-800 focus:border-[#C8A24A]/60 rounded-xl p-4 text-xs text-slate-200 focus:outline-none placeholder:text-slate-600 leading-relaxed"
                      />
                      <button 
                        onClick={triggerVoiceSpeechInput}
                        className={`absolute right-3.5 bottom-3.5 p-2 rounded-xl border border-slate-900 transition-colors bg-[#03060a] cursor-pointer ${isRecording ? 'text-red-400 bg-red-950/20' : 'text-slate-400 hover:text-[#C8A24A]'}`}
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button 
                        onClick={handleGenerateAIReading}
                        disabled={readingLoading}
                        className="px-7 py-3.5 font-serif rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-[#C8A24A] disabled:opacity-40 transition-all flex items-center gap-2 cursor-pointer shadow-xl"
                      >
                        {readingLoading ? 'Đang Giải Ngữ Chòm Sao...' : 'Mở Quẻ Toàn Diện'}
                        <Sparkles className="w-4 h-4 text-slate-950" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-950/20 text-center space-y-4 animate-fadeIn">
                    <span className="text-4xl block animate-bounce">🕯️</span>
                    <h4 className="text-base font-serif font-bold text-amber-300 uppercase tracking-wider">Vận Khí Miễn Phí Đã Bản Tàn</h4>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto font-sans">
                      Hào quang kết duyên dùng thử từ <strong className="text-indigo-400">Hội đồng Tiên tri (Oracle Council AI)</strong> đã tạm khép sau khi thí chủ sử dụng hết 3 lượt giải quẻ miễn phí. 
                      Kính mong thí chủ hoan hỷ đăng ký dâng lễ một trong các gói linh diệu (Nhật Linh, Thất Tinh, hoặc Nguyệt Tướng) để tiếp nối vận khí thông hằng cát tường tài lộc dồi dào!
                    </p>
                    <div className="pt-2">
                      <button 
                        onClick={() => setCurrentView('subscriptions')}
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:scale-102 text-slate-950 text-xs font-bold font-serif uppercase tracking-wider transition-all shadow-xl hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
                      >
                        Dâng Lễ Kích Hoạt Vô Hạn Gói Siêu AI 🪐
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* MULTI_AI ANSWER DISPLAY AND VOICEOVER NARRATION */}
              {readingOutput && (
                <div className="rounded-2xl border border-[#C8A24A]/20 bg-[#090d16] p-6 shadow-3xl space-y-6 animate-fadeIn">
                  
                  {/* ORACLE HEADER DETAILS */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🔮</span>
                      <div>
                        <h4 className="font-serif font-bold text-amber-200">Bản Linh Thác Ký Độc Bản</h4>
                        <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Thành công từ mô hình chiêm tinh Google Gemini 3.5</p>
                      </div>
                    </div>

                    {/* DYNAMIC TTS CONVERT WITH SPECTROGRAMS */}
                    <div className="flex items-center gap-2">
                      {audioUrl ? (
                        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-900">
                          <button 
                            onClick={toggleAudioPlayback}
                            className="p-1.5 rounded-lg bg-yellow-500/10 text-[#C8A24A] hover:bg-yellow-500/20 transition-all cursor-pointer"
                          >
                            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          
                          {/* Simulated haptic audio visualizer spectrum block */}
                          <div className="flex items-center gap-0.5 h-4.5 w-16 px-1">
                            {Array.from({ length: 9 }).map((_, idx) => (
                              <div 
                                key={idx} 
                                className="w-1 bg-[#C8A24A] rounded-t-xs"
                                style={{
                                  height: isPlayingAudio ? `${20 + Math.random() * 80}%` : '15%',
                                  transition: 'height 0.15s ease-in-out'
                                }}
                              />
                            ))}
                          </div>
                          
                          <span className="text-[10px] font-mono tracking-widest text-[#C8A24A]">VOICE PLAYBACK</span>
                        </div>
                      ) : (
                        <button 
                          onClick={handleGenerateTTSAudio}
                          disabled={ttsLoading}
                          className="px-4 py-2.5 rounded-xl border border-[#C8A24A]/40 text-[#C8A24A] bg-[#C8A24A]/5 hover:bg-[#C8A24A]/10 disabled:opacity-40 text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer shadow-md"
                        >
                          <Volume2 className="w-4 h-4 animate-bounce" /> 
                          {ttsLoading ? 'Đang khởi dựng giọng nói...' : 'Nghe Thuyết Minh Giọng Tiên Tri 🎙️'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* SUBSTANTIAL PORTRAIT TEXT OUTPUT */}
                  <div className="prose prose-invert prose-yellow text-slate-200 font-serif text-sm leading-relaxed max-w-none space-y-4">
                    {readingOutput.split('\n\n').map((para, idx) => {
                      if (!para.trim()) return null;
                      return (
                        <p key={idx} className="indent-4 text-justify font-serif">
                          {para.replace(/[*#]/g, '')}
                        </p>
                      );
                    })}
                  </div>

                  {/* ACTIONS TO CLEAR OR DOWNLOAD */}
                  <div className="flex justify-end gap-3 border-t border-slate-900 pt-5">
                    <button 
                      onClick={() => handleCopyText(readingOutput, 'Toàn bộ nội dung lá số')}
                      className="px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" /> Sao Chép Bản Số
                    </button>
                    <button 
                      onClick={() => {
                        showToast('Mở trình PDF tải quẻ bản mệnh... Thảo mật thành công!', 'success');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#C8A24A] text-slate-950 font-semibold hover:bg-yellow-400 text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
                    >
                      Tải Tài Bản Ký PDF 📜
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

        {/* 5. ADMIN CONSOLE CONTROL CENTER */}
        {currentView === 'admin' && (
          <div className="space-y-8 py-4 animate-fadeIn font-sans">
            <h1 className="text-3xl font-serif font-bold text-red-400 flex items-center gap-2">
              <Cpu className="w-8 h-8 text-red-500 animate-spin" /> Bàn Quản Trị Hệ Thống Thu Phí SaaS (Trực tiếp)
            </h1>

            {/* DASHBOARD CHARTS/ANALYTICS COUNTER SLABS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-5 rounded-2xl border border-slate-800 bg-[#090d16] flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                  <TrendingUp className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block uppercase">Tổng doanh thu thực</span>
                  <span className="text-lg font-bold font-mono text-green-400">{(adminStats.totalRevenue || 0).toLocaleString('vi-VN')} VND</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-[#090d16] flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                  <Users className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block uppercase">Người dùng đăng ký</span>
                  <span className="text-lg font-bold font-mono text-blue-400">{adminStats.usersCount || 0} thành phần</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-[#090d16] flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#C8A24A]/10 text-[#C8A24A]">
                  <Compass className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block uppercase">Quẻ bốc Tarot thành công</span>
                  <span className="text-lg font-bold font-mono text-[#C8A24A]">{adminStats.tarotSales || 0} lượt</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-[#090d16] flex items-center gap-4">
                <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400">
                  <Moon className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block uppercase">Hóa đơn Tử Vi đã mua</span>
                  <span className="text-lg font-bold font-mono text-violet-400">{adminStats.horoscopeSales || 0} lượt</span>
                </div>
              </div>

            </div>

            {/* MAIN PORTAL ROW: BANK APPROVAL BOARD */}
            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* TRANSFERS BOARD LIST (Column 7) */}
              <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#090d16] p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider border-b border-slate-900 pb-3 flex items-center gap-1.5 text-[#C8A24A]">
                  🏦 Danh Sách Giao Dịch Chuyển Khoản Ngân Hàng TCB Chờ Phê Chuẩn
                </h3>
                
                {adminTransfers.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">Không có yêu cầu chuyển khoản ngân hàng chờ duyệt.</p>
                ) : (
                  <div className="divide-y divide-slate-900 text-xs">
                    {adminTransfers.map((t, idx) => (
                      <div key={idx} className="py-4 flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-200">{t.orderCode}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded ${t.status === 'success' ? 'bg-green-950/40 text-green-400' : 'bg-yellow-950/40 text-yellow-500'}`}>{t.status.toUpperCase()}</span>
                          </div>
                          <p className="text-[10px] text-slate-400">UserId: <span className="font-mono">{t.userId}</span></p>
                          <p className="text-[10px] text-slate-400">Khởi tạo: {new Date(t.createdAt).toLocaleTimeString()} - {new Date(t.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#C8A24A] text-sm">{(t.amount).toLocaleString('vi-VN')} VND</span>
                          {t.status === 'pending' && (
                            <div className="flex items-center gap-1.5">
                              <button 
                                onClick={() => handleApproveBankTransfer(t.orderCode, 'success')}
                                className="p-1 px-2 text-xs rounded bg-green-600 hover:bg-green-500 text-slate-950 font-bold transition-all cursor-pointer"
                                title="Đồng ý giải ngân khóa"
                              >
                                ✔
                              </button>
                              <button 
                                onClick={() => handleApproveBankTransfer(t.orderCode, 'failed')}
                                className="p-1 px-2 text-xs rounded bg-red-600 hover:bg-[#C8A24A] text-slate-100 font-bold transition-all cursor-pointer"
                                title="Từ chối hóa đơn sai lệch"
                              >
                                ✘
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* USER MANAGER BOARD (Column 5) */}
              <div className="lg:col-span-12 xl:col-span-5 rounded-2xl border border-slate-800 bg-[#090d16] p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider border-b border-slate-900 pb-3 text-red-400">
                  👤 Quản Lý Quyền Hạn Danh Sách Tài Khoản
                </h3>

                <div className="divide-y divide-slate-900 text-xs text-slate-300">
                  {adminUsers.map((u, i) => (
                    <div key={i} className="py-3 flex items-center justify-between">
                      <div className="space-y-0.5 max-w-[170px] truncate">
                        <p className="font-bold font-sans text-slate-200 truncate">{u.email}</p>
                        <p className="text-[9px] text-[#C8A24A] uppercase tracking-wider font-mono">Quyền: {u.role}</p>
                      </div>
                      <button 
                        onClick={() => handleChangeUserRole(u.id, u.role)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${u.role === 'admin' ? 'bg-red-950/30 border border-red-500/30 text-red-300' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'}`}
                      >
                        {u.role === 'admin' ? 'Hạ Quyền User' : 'Nâng Thượng Admin ✨'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* REAL_TIME SYSTEM TELEMETRYS/AI SESSION LOGS */}
            <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider border-b border-slate-900 pb-3 text-slate-300 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-indigo-400" /> Bản ghi Lịch sử Vấn đạo AI Thuyết Thác (Capicorn Audit Logs)
              </h3>
              
              {adminStats.logs?.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">Chưa ghi nhận hoạt động túc mạng tiên tri.</p>
              ) : (
                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 divide-y divide-slate-900 text-[11px] font-mono leading-relaxed">
                  {adminStats.logs?.map((l: any, i: number) => (
                    <div key={i} className="pt-2 text-slate-400">
                      <span className="text-[#C8A24A]">[{new Date(l.createdAt).toLocaleTimeString()}]</span> User: <span className="text-blue-400">{l.userId}</span> | Loại: <span className="text-indigo-400 font-bold uppercase">{l.type}</span> | Thắc mắc: <span className="text-slate-300">"{l.input}"</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* LUXE COSMIC SAAS FOOTER */}
      <footer className="bg-[#030509]/90 border-t border-slate-900 py-10 px-6 mt-16 font-sans text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500">
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-slate-400 text-sm">🌙 Mystic © 2026</h4>
            <p className="max-w-xs text-[11px] leading-relaxed">Bộ công cụ tâm linh tối ưu - Kén chọn giải quẻ Tarot và chuyển quỷ Tử Vi oai hùng của Đại tiên tri tối cao HB.</p>
          </div>
          
          <div className="flex gap-8 text-slate-400">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-[#C8A24A] font-mono tracking-widest uppercase">Trung tâm hỗ trợ</span>
              <a href="#" className="hover:text-slate-200">Điều khoản sử dụng</a>
              <a href="#" className="hover:text-slate-200">Chính sách giao nhận</a>
              <a href="#" className="hover:text-slate-200">Phản hoàn tiền quẻ</a>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-[#C8A24A] font-mono tracking-widest uppercase">Cổng thanh toán</span>
              <span className="text-[10px] text-slate-500">Mã hóa MoMo Direct IPN</span>
              <span className="text-[10px] text-slate-500">VietQR Napas 24/7 Autopay</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {token && (
        <div id="mobile-navigation-bar" className="md:hidden fixed bottom-5 left-4 right-4 z-40 bg-[#090d16]/95 border border-[#C8A24A]/30 backdrop-blur-2xl rounded-2xl h-16 shadow-[0_10px_35px_rgba(0,0,0,0.8)] px-2 flex items-center justify-around">
          <button 
            onClick={() => setCurrentView('landing')} 
            className={`flex flex-col items-center justify-center gap-1 flex-1 relative h-full transition-transform active:scale-95 cursor-pointer ${currentView === 'landing' ? 'text-[#C8A24A]' : 'text-slate-400'}`}
          >
            <Compass className="w-5 h-5 animate-pulse" />
            <span className="text-[9px] font-sans font-semibold tracking-wider">Trang Chủ</span>
            {currentView === 'landing' && <span className="absolute bottom-1 w-4 h-0.5 bg-[#C8A24A] rounded-full"></span>}
          </button>
          
          <button 
            onClick={() => {
              checkServiceUnlocks();
              setCurrentView('oracles');
            }} 
            className={`flex flex-col items-center justify-center gap-1 flex-1 relative h-full transition-transform active:scale-95 cursor-pointer ${currentView === 'oracles' ? 'text-[#C8A24A]' : 'text-slate-400'}`}
          >
            <Sparkles className="w-5 h-5 animate-[ping_3s_infinite]" />
            <span className="text-[9px] font-sans font-semibold tracking-wider">Chiêm Tinh</span>
            {currentView === 'oracles' && <span className="absolute bottom-1 w-4 h-0.5 bg-[#C8A24A] rounded-full"></span>}
          </button>

          <button 
            onClick={() => {
              checkServiceUnlocks();
              setCurrentView('subscriptions');
            }} 
            className={`flex flex-col items-center justify-center gap-1 flex-1 relative h-full transition-transform active:scale-95 cursor-pointer ${currentView === 'subscriptions' ? 'text-[#C8A24A]' : 'text-slate-400'}`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-[9px] font-sans font-semibold tracking-wider">Gói Thuê</span>
            {currentView === 'subscriptions' && <span className="absolute bottom-1 w-4 h-0.5 bg-[#C8A24A] rounded-full"></span>}
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* 🔮 SUPER GENERAL HB AI FLOATING CHAT WIDGET */}
      {/* ========================================================= */}
      <div id="hb-floating-ai-widget" className={`fixed ${token ? 'bottom-24' : 'bottom-6'} md:bottom-6 right-6 z-50 flex flex-col items-end font-sans`}>
        {/* Toggleable Chat Tray Box */}
        {isHbChatOpen && (
          <div className="w-[360px] max-w-[calc(100vw-32px)] h-[500px] rounded-3xl border border-[#C8A24A]/30 bg-[#090d16]/95 backdrop-blur-2xl shadow-[0_10px_50px_rgba(200,162,74,0.1)] flex flex-col overflow-hidden mb-4 animate-fadeIn">
            {/* Header section with brand and creators */}
            <div className="bg-[#03060a]/90 px-5 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C8A24A] via-slate-800 to-indigo-500 p-[1.5px] flex items-center justify-center shadow-[0_0_15px_rgba(200,162,74,0.3)] relative shrink-0 overflow-hidden animate-pulse">
                  <div className="w-full h-full bg-[#050912] rounded-full flex items-center justify-center text-[10px] font-serif font-black text-[#C8A24A]">
                    ☾ℋℬ☽
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#050912]"></div>
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-serif font-extrabold text-[#e0e0e0] flex items-center gap-1">
                    HB AI Superbot
                  </h4>
                  <p className="text-[10px] text-slate-400">Huấn luyện bởi HB</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setShowDonationInfo(true)}
                  title="Dâng Lễ Quyên Góp (Công Đức Trợ Duyên)"
                  className="px-2 py-1 gap-1 border border-amber-500/25 rounded-md hover:bg-white/10 text-amber-400 hover:text-amber-300 transition-colors flex items-center cursor-pointer mr-1.5"
                >
                  <span className="text-[10px] select-none">🙏</span>
                  <span className="text-[9px] font-sans font-extrabold uppercase tracking-wide">Trợ Duyên</span>
                </button>
                <button 
                  onClick={resetHbChat}
                  title="Tịnh hóa chuỗi đàm thoại"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => setIsHbChatOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Warning banner about no spiritual calculations */}
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-[10.5px] text-amber-300 leading-normal font-sans text-center shrink-0">
              ⚠️ Chỉ giải đáp dịch vụ & thông tin khoa học. KHÔNG bói toán/tarot tại đây.
            </div>

            {/* Chat Messages Log Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-white/5 pr-2">
              {hbMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed font-sans ${msg.role === 'user' ? 'bg-[#C8A24A] text-slate-950 font-medium rounded-tr-none' : 'bg-[#03060a] border border-slate-800 text-slate-200 rounded-tl-none text-left'}`}>
                    {msg.message}
                  </div>
                </div>
              ))}
              {hbLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#03060a] border border-slate-800 rounded-2xl p-3 flex items-center gap-1 text-slate-400 text-xs rounded-tl-none font-sans">
                    <span className="w-1.5 h-1.5 bg-[#C8A24A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#C8A24A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#C8A24A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="ml-1 text-[10px]">HB AI đang truyền tin...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Field container */}
            <form onSubmit={handleSendHbMessage} className="p-3 border-t border-white/10 bg-[#03060a]/90 flex gap-2 shrink-0">
              <input 
                type="text"
                value={hbInput}
                onChange={(e) => setHbInput(e.target.value)}
                placeholder="HB AI ơi, trang web nạp lễ bốc quẻ thế nào?..."
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-yellow-500/50 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-yellow-500/20 font-sans shadow-inner"
              />
              <button 
                type="submit"
                disabled={!hbInput.trim() || hbLoading}
                className="w-9 h-9 rounded-xl bg-[#C8A24A] hover:bg-white text-slate-950 hover:text-slate-950 transition-colors cursor-pointer flex items-center justify-center shrink-0 disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Floating Bubble Button Launcher */}
        <button 
          onClick={() => setIsHbChatOpen(!isHbChatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-105 transition-all flex items-center justify-center cursor-pointer relative group"
          title="HB AI Hỗ Trợ Tổng Thể"
        >
          {isHbChatOpen ? (
            <X className="w-6 h-6 text-slate-950" />
          ) : (
            <Wand2 className="w-6 h-6 text-slate-950 group-hover:rotate-12 transition-transform animate-pulse" />
          )}
          {/* Active online state indicator */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#050507] rounded-full animate-pulse"></span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 💮 MYSTICAL DONATION / PATRONAGE MODAL (TCB: 0978567205 - LE HUY BAO) */}
      {/* ========================================================= */}
      {showDonationInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            onClick={() => setShowDonationInfo(false)}
          />
          
          {/* Spiritual scroll container */}
          <div className="relative w-full max-w-md bg-[#090d16] border border-[#C8A24A]/40 rounded-3xl p-6 shadow-3xl text-center overflow-hidden animate-zoomIn">
            {/* Celestial stars decor */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-500 via-amber-400 to-indigo-500" />
            
            <button 
              onClick={() => setShowDonationInfo(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white cursor-pointer p-1 rounded-full hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="space-y-6 pt-2 font-sans">
              <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border border-[#C8A24A]/30 flex items-center justify-center text-3xl animate-pulse">
                🙏
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-[#C8A24A] uppercase font-bold block">ĐẠI ĐÀN TRỢ DUYÊN SÁNG LẬP</span>
                <h3 className="text-xl font-serif font-extrabold text-[#e0e0e0]">Dâng Lễ Kính Quyên Góp</h3>
                <p className="text-xs text-slate-400 leading-relaxed px-2">
                  "Hành thiện tích linh, bách điền phúc quả." Con đường gầy dựng hệ điện tiên tri chiêm tinh được đắp nối từ tình thương của các duyên chủ. Mọi trợ duyên đóng góp lòng thành của quý vị luôn được an sao tụ đức cát tường vạn sự.
                </p>
              </div>
              
              {/* Detailed Bank Account Box */}
              <div className="bg-[#03060a]/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-inner">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">PHÁP BẢN THỤ LỄ</span>
                  <div className="text-sm font-bold text-[#C8A24A] font-serif">NHÂN THẾ THỤ DIỆN</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-left border-t border-slate-900 pt-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Ngân Hàng Bản Địa</span>
                    <strong className="text-xs text-slate-200">Techcombank (TCB)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Số Tài Khoản Nhận Lễ</span>
                    <div className="flex items-center gap-1">
                      <strong className="text-xs text-amber-400 font-mono">0978567205</strong>
                      <button 
                        onClick={() => handleCopyText('0978567205', 'Số tài khoản Techcombank')} 
                        className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-[#C8A24A] transition-colors"
                        title="Sao chép số tài khoản"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-900 pt-3 text-left">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Danh Tính Chân Nhân</span>
                  <div className="flex items-center justify-between">
                    <strong className="text-xs text-slate-200 uppercase tracking-wide">LE HUY BAO</strong>
                    <button 
                      onClick={() => handleCopyText('LE HUY BAO', 'Tên thụ hưởng (LE HUY BAO)')} 
                      className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-[#C8A24A] transition-colors"
                      title="Sao chép tên"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-slate-500 text-[10px] italic leading-relaxed px-4">
                "Thủ tục thanh toán dâng hương sấm truyền vẫn diễn ra hoàn toàn tự động ở trang chính. Panel này tôn chỉ lưu dấu duyên hảo tâm trợ lực cho tác giả duy trì tiên tri."
              </div>

              <button 
                onClick={() => setShowDonationInfo(false)}
                className="w-full py-3 rounded-xl bg-[#C8A24A]/20 hover:bg-[#C8A24A]/30 border border-[#C8A24A]/40 text-[#C8A24A] text-xs font-bold uppercase tracking-wider hover:text-white transition-all cursor-pointer"
              >
                Nhận Khí Lành - Đóng Quyển Sách 🙏
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
