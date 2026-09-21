import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>MINI-PROJECT SHORT TECHNICAL REPORT - VKU</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 12mm 12mm 12mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 8.6pt;
      line-height: 1.35;
      color: #1e293b;
      background: #ffffff;
    }
    .header-banner {
      border-bottom: 2.5px solid #0284c7;
      padding-bottom: 8px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .header-left h1 {
      font-size: 13pt;
      font-weight: 800;
      color: #0369a1;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .header-left h2 {
      font-size: 9.5pt;
      font-weight: 600;
      color: #334155;
      margin-top: 2px;
    }
    .header-right {
      text-align: right;
      font-size: 8pt;
      color: #64748b;
      line-height: 1.3;
    }
    .header-badge {
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 7.8pt;
      margin-bottom: 3px;
    }
    .section-title {
      font-size: 9.5pt;
      font-weight: 700;
      color: #0f172a;
      background: #f1f5f9;
      border-left: 4px solid #0284c7;
      padding: 3.5px 8px;
      margin-top: 9px;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.2px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      padding: 6px 9px;
      margin-bottom: 6px;
    }
    .card-title {
      font-size: 8.8pt;
      font-weight: 700;
      color: #0369a1;
      margin-bottom: 3px;
    }
    .deliverable-link {
      color: #0284c7;
      font-weight: 600;
      text-decoration: none;
    }
    table.checklist-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.8pt;
      margin-bottom: 8px;
    }
    table.checklist-table th {
      background: #0369a1;
      color: #ffffff;
      text-align: left;
      padding: 4px 6px;
      font-weight: 600;
    }
    table.checklist-table td {
      border: 1px solid #cbd5e1;
      padding: 3.5px 6px;
      vertical-align: top;
    }
    table.checklist-table tr:nth-child(even) td {
      background: #f8fafc;
    }
    .badge-status {
      display: inline-block;
      padding: 1px 5px;
      border-radius: 3px;
      font-weight: 700;
      font-size: 7.2pt;
      background: #dcfce7;
      color: #15803d;
      white-space: nowrap;
    }
    ul, ol {
      margin-left: 16px;
      margin-top: 3px;
      margin-bottom: 3px;
    }
    li {
      margin-bottom: 2px;
    }
    pre {
      background: #1e293b;
      color: #f8fafc;
      padding: 5px 8px;
      border-radius: 4px;
      font-family: Consolas, monospace;
      font-size: 7.2pt;
      line-height: 1.25;
      margin-top: 3px;
      margin-bottom: 5px;
      overflow-x: hidden;
    }
    .callout {
      border-left: 3.5px solid #0284c7;
      background: #f0f9ff;
      padding: 5px 8px;
      margin-top: 4px;
      margin-bottom: 6px;
      border-radius: 0 4px 4px 0;
    }
    .callout-title {
      font-weight: 700;
      color: #0369a1;
      font-size: 8.4pt;
      margin-bottom: 2px;
    }
    .avoid-break {
      page-break-inside: avoid;
    }
  </style>
</head>
<body>

  <!-- Header Banner -->
  <div class="header-banner">
    <div class="header-left">
      <h1>MINI-PROJECT SHORT TECHNICAL REPORT</h1>
      <h2>Cross-Platform Mobile App Development — Vietnam-Korea University (VKU)</h2>
      <p style="font-size: 8pt; color: #64748b; margin-top: 2px;">
        <strong>Project:</strong> Mini-Project 1: Offline Data Collection (PWA & Capacitor Android) | <strong>Date:</strong> 21/09/2026
      </p>
    </div>
    <div class="header-right">
      <div class="header-badge">VKU 2025–2026</div>
      <div><strong>Sinh viên:</strong> Lê Cảm</div>
      <div><strong>Mã SV:</strong> 23IT022</div>
      <div><strong>Đóng góp:</strong> 100% Solo Contribution</div>
    </div>
  </div>

  <!-- SECTION 1 -->
  <div class="section-title">1. GENERAL INFORMATION & DELIVERABLE LINKS</div>
  <div class="grid-2">
    <div class="card">
      <div class="card-title">🌐 Hệ Thống Trực Tuyến (Production Deliverables)</div>
      <ul>
        <li><strong>Live Web App (Chính):</strong> <a class="deliverable-link" href="https://vku-field-survey-capacitor.pages.dev">https://vku-field-survey-capacitor.pages.dev</a></li>
        <li><strong>Live Web App (Mirror):</strong> <a class="deliverable-link" href="https://camle-vku-field-survey.pages.dev">https://camle-vku-field-survey.pages.dev</a></li>
        <li><strong>Edge Cloud Backend:</strong> <a class="deliverable-link" href="https://vku-field-survey-capacitor.lecam.workers.dev">https://vku-field-survey-capacitor.lecam.workers.dev</a></li>
      </ul>
    </div>
    <div class="card">
      <div class="card-title">💻 Mã Nguồn & Tệp Đóng Gói (Artifacts)</div>
      <ul>
        <li><strong>GitHub Repo:</strong> <a class="deliverable-link" href="https://github.com/CAMLC25/vku-field-survey-capacitor">https://github.com/CAMLC25/vku-field-survey-capacitor</a></li>
        <li><strong>Android APK:</strong> <code style="font-weight:700;">vku-field-survey-debug.apk</code> (7.4 MB, Gradle Android)</li>
        <li><strong>Thành viên:</strong> Lê Cảm (23IT022) — 100% Khối lượng dự án</li>
      </ul>
    </div>
  </div>

  <!-- SECTION 2 -->
  <div class="section-title">2. FEATURE IMPLEMENTATION CHECKLIST</div>
  <table class="checklist-table">
    <thead>
      <tr>
        <th style="width: 5%; text-align: center;">#</th>
        <th style="width: 25%;">Required Feature</th>
        <th style="width: 14%; text-align: center;">Status</th>
        <th style="width: 56%;">Implementation Details & Acceptance Level</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="text-align: center; font-weight: bold;">1</td>
        <td><strong>Responsive Mobile Viewport</strong></td>
        <td style="text-align: center;"><span class="badge-status">✅ Complete</span></td>
        <td>Giao diện Mobile-First, an toàn tai thỏ/notch qua safe-area insets. Thanh 3 tab chân trang tiện lợi. Hỗ trợ song ngữ tức thì (Tiếng Việt / English).</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: bold;">2</td>
        <td><strong>Local Offline Persistence</strong></td>
        <td style="text-align: center;"><span class="badge-status">✅ Complete</span></td>
        <td>Sử dụng Dexie.js (IndexedDB) quản lý 2 bảng <code>surveys</code> và <code>syncQueue</code>. Khởi động và ghi nhận 100% không cần mạng (&lt;30ms). Lưu ảnh nhị phân an toàn.</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: bold;">3</td>
        <td><strong>Automatic Background Sync</strong></td>
        <td style="text-align: center;"><span class="badge-status">✅ Complete</span></td>
        <td>Tích hợp Background Sync API (<code>sync-surveys</code>), <code>@capacitor/network</code> và sự kiện <code>online</code>. Đồng bộ tuần tự từng biên bản với độ trễ 300ms chống nghẽn.</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: bold;">4</td>
        <td><strong>Hardware: Camera (@capacitor/camera)</strong></td>
        <td style="text-align: center;"><span class="badge-status">✅ Complete</span></td>
        <td>Chụp ảnh & thư viện bản địa. Nén tự động HTML5 Canvas xuống 1280px (~180KB JPEG), giảm 90% dung lượng. Hỗ trợ Lightbox Modal phóng to ảnh.</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: bold;">5</td>
        <td><strong>Hardware: GPS (@capacitor/geolocation)</strong></td>
        <td style="text-align: center;"><span class="badge-status">✅ Complete</span></td>
        <td>Thu thập GPS vĩ độ/kinh độ chính xác, tự động ánh xạ ra địa chỉ chi tiết khuôn viên VKU (Khu V, K, A, B) và nút bấm 1-chạm mở trực tiếp Google Maps.</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: bold;">6</td>
        <td><strong>Hardware: Network Monitor</strong></td>
        <td style="text-align: center;"><span class="badge-status">✅ Complete</span></td>
        <td>Lắng nghe trạng thái phần cứng <code>@capacitor/network</code> kết hợp Active Ping Probe <code>/api/health</code> loại trừ hiện tượng báo mạng ảo (false-positive).</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: bold;">7</td>
        <td><strong>Local Notifications & Storage</strong></td>
        <td style="text-align: center;"><span class="badge-status">✅ Complete</span></td>
        <td>Tạo kênh Android <code>vku-survey-channel</code> rung/chuông khi lưu offline và đồng bộ xong. Sử dụng <code>@capacitor/preferences</code> bảo vệ phiên làm việc.</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: bold;">8</td>
        <td><strong>Idempotency & Safe Retries</strong></td>
        <td style="text-align: center;"><span class="badge-status">✅ Complete</span></td>
        <td>Mã UUIDv4 sinh tại máy khách làm khóa chính trên Cloudflare KV. Khi gửi lại (retry), máy chủ ghi đè an toàn (upsert), triệt tiêu nguy cơ nhân đôi dữ liệu.</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: bold;">9</td>
        <td><strong>Role-Based Access Control (RBAC)</strong></td>
        <td style="text-align: center;"><span class="badge-status">✅ Complete</span></td>
        <td>Cán bộ kiểm định chỉ quản lý bản ghi nháp của mình (<code>createdByEmail</code>). Admin toàn quyền giám sát toàn trường, quản lý cán bộ và xuất CSV UTF-8.</td>
      </tr>
      <tr>
        <td style="text-align: center; font-weight: bold;">10</td>
        <td><strong>Packaging Native Android APK</strong></td>
        <td style="text-align: center;"><span class="badge-status">✅ Complete</span></td>
        <td>Đóng gói Capacitor 7, cấu hình quyền <code>AndroidManifest.xml</code>. Biên dịch thành công file APK độc lập <code>vku-field-survey-debug.apk</code> (~7.4 MB) qua Gradle.</td>
      </tr>
    </tbody>
  </table>

  <!-- SECTION 3 -->
  <div class="section-title avoid-break">3. TECHNICAL ARCHITECTURE & PROJECT STRUCTURE</div>
  <div class="grid-2 avoid-break">
    <div class="card">
      <div class="card-title">3.1. Cấu Trúc Thư Mục Dự Án</div>
      <pre>vku-field-survey-capacitor/
├── android/            # Dự án Android Native (Gradle)
├── public/             # Web App Manifest, Icons
├── src/
│   ├── components/     # SurveyForm, SurveyList, Header
│   ├── db/             # Dexie.js ('vku-field-survey')
│   ├── pages/          # Home, History, Admin, Auth
│   ├── services/       # Geo, Camera, Network, Sync
│   └── utils/          # Location resolver, Image
├── worker.js           # Cloudflare Edge Worker & KV
├── capacitor.config.ts # Capacitor Runtime Config
└── vku-field-survey-debug.apk # APK hoàn chỉnh</pre>
    </div>
    <div class="card">
      <div class="card-title">3.2. Quản Lý Trạng Thái & Xử Lý Ngoại Lệ</div>
      <ul>
        <li><strong>State Management:</strong> React 18 hooks kết hợp Dexie <code>useLiveQuery</code> giúp UI tự động phản ứng cập nhật theo thời gian thực mỗi khi IndexedDB thay đổi dữ liệu.</li>
        <li><strong>Chống treo Service Worker:</strong> Bọc lệnh đăng ký Background Sync bằng <code>Promise.race</code> với timeout 1.000ms, tách rời hoàn toàn tác vụ ghi IndexedDB (&lt;30ms).</li>
        <li><strong>Chống báo mạng ảo:</strong> Hàm <code>checkServerHealth()</code> gửi HTTP GET kiểm tra <code>/api/health</code> kèm timestamp chống cache, bảo đảm chỉ đồng bộ khi có kết nối thật.</li>
        <li><strong>Dự phòng GPS:</strong> Khi mất sóng GPS vệ tinh, tự động ánh xạ tọa độ chuẩn xác theo mã tòa nhà (Khu V, K, A, B) và địa chỉ VKU.</li>
      </ul>
    </div>
  </div>

  <!-- SECTION 4 -->
  <div class="section-title avoid-break">4. EMPIRICAL EVIDENCE & SCREENSHOTS</div>
  <div class="grid-2 avoid-break">
    <div class="card">
      <div class="card-title">4.1. Màn Hình Khởi Động & Giám Sát Mạng</div>
      <p style="font-size: 8pt;">
        Dashboard tổng quan KPI 4 khu giảng đường VKU. Huy hiệu mạng tự động chuyển đổi giữa <strong>TRỰC TUYẾN (ONLINE)</strong> xanh lá và <strong>NGOẠI TUYẾN (OFFLINE)</strong> hổ phách qua <code>@capacitor/network</code> và Active Ping.
      </p>
    </div>
    <div class="card">
      <div class="card-title">4.2. Form Khảo Sát & Thẻ Định Vị GPS</div>
      <p style="font-size: 8pt;">
        Bộ chọn vị trí nhanh 1-chạm (4 Tòa nhà, 5 Tầng, 10 Phòng). Thẻ GPS hiển thị kinh/vĩ độ (15.97526° N, 108.25324° E ±25m) và địa chỉ cơ sở khuôn viên VKU: <em>📍 Khu V, 470 Trần Đại Nghĩa, Đà Nẵng</em>.
      </p>
    </div>
    <div class="card">
      <div class="card-title">4.3. Sổ Biên Bản & Nút Mở Google Maps</div>
      <p style="font-size: 8pt;">
        Danh sách hồ sơ phân loại rõ ràng (ĐÃ GỬI, CHỜ GỬI, LỖI GỬI). Mỗi biên bản có thumbnail ảnh thu nhỏ (48x48px), nhấn để phóng to toàn màn hình. Nút <strong>Mở Google Maps ↗</strong> dẫn thẳng tới vị trí khảo sát trên vệ tinh.
      </p>
    </div>
    <div class="card">
      <div class="card-title">4.4. Bảng Điều Hành Quản Trị (Admin Center)</div>
      <p style="font-size: 8pt;">
        Bảng quản trị trung tâm dành cho Ban Cơ sở vật chất: Thống kê sự cố mức 1 đến 5, cột VỊ TRÍ hiển thị tên phòng, địa chỉ chi tiết và tọa độ Google Maps. Cung cấp bộ lọc, cấp quyền và xuất báo cáo CSV UTF-8.
      </p>
    </div>
  </div>

  <!-- SECTION 5 -->
  <div class="section-title avoid-break">5. TECHNICAL CHALLENGES & RESOLUTIONS</div>
  <div class="callout avoid-break">
    <div class="callout-title">5.1. Thách Thức 1: Nghẽn Băng Thông & Nguy Cơ Trùng Lặp Bản Ghi Khi Đồng Bộ Hàng Loạt</div>
    <p style="font-size: 8pt;">
      <strong>Hiện tượng:</strong> Cán bộ ghi nhận 15–20 biên bản ngoại tuyến. Khi có mạng trở lại, việc gửi đồng thời qua <code>Promise.all()</code> làm nghẽn socket di động gây timeout và sinh bản ghi trùng lặp khi bấm gửi lại.<br/>
      <strong>Giải pháp:</strong> Xây dựng <em>Sequential Sync Engine</em> duyệt tuần tự từng biên bản kèm độ trễ 300ms (<code>await delay(300)</code>). Sử dụng mã UUIDv4 sinh tại máy khách làm khóa chính trên Cloudflare KV, thực hiện thao tác upsert an toàn triệt tiêu hoàn toàn nguy cơ trùng lặp.
    </p>
  </div>
  <div class="callout avoid-break" style="margin-top: 5px;">
    <div class="callout-title">5.2. Thách Thức 2: Báo Mạng Ảo (False-Positive) & Bốc Hơi Bộ Nhớ Đệm Ảnh Trên iOS WebKit</div>
    <p style="font-size: 8pt;">
      <strong>Hiện tượng:</strong> Safari WebKit trên iOS thường báo <code>navigator.onLine = true</code> khi kết nối Wi-Fi không có Internet. Ngoài ra, cơ chế dọn dẹp bộ nhớ của iOS tự động hủy các URL <code>blob:</code> tạm thời, làm mất ảnh tư liệu.<br/>
      <strong>Giải pháp:</strong> Xây dựng <em>Active Health Ping Probe</em> gửi request tới <code>/api/health</code> (timeout 3s). Nén và lưu trữ ảnh trực tiếp dưới dạng chuỗi Base64 Data URL bền vững trên IndexedDB và Cloudflare KV, loại bỏ hoàn toàn hiện tượng mất ảnh.
    </p>
  </div>

  <div style="text-align: right; font-size: 8pt; color: #64748b; margin-top: 10px;">
    <em>Đà Nẵng, Ngày 21 Tháng 09 Năm 2026</em><br/>
    <strong>Sinh viên thực hiện:</strong> <span style="color: #0369a1; font-weight: bold;">Lê Cảm (Mã SV: 23IT022)</span><br/>
    <em>Trường Đại học Công nghệ Thông tin & Truyền thông Việt - Hàn (VKU)</em>
  </div>

</body>
</html>`;

const tempHtmlPath = path.join(rootDir, 'scripts', 'report-temp.html');
const outputPdfPath = path.join(rootDir, 'TECHNICAL_REPORT.pdf');

fs.writeFileSync(tempHtmlPath, htmlContent, 'utf-8');
console.log('HTML template written to:', tempHtmlPath);

// Find Chrome or Edge executable
const possiblePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

let browserPath = possiblePaths.find((p) => fs.existsSync(p));
if (!browserPath) {
  console.error('Neither Chrome nor Edge was found at standard locations.');
  process.exit(1);
}

console.log('Using browser:', browserPath);

const fileUri = 'file:///' + tempHtmlPath.replace(/\\/g, '/');
const cmd = `"${browserPath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputPdfPath}" "${fileUri}"`;

console.log('Running conversion command...');
try {
  execSync(cmd, { stdio: 'inherit' });
  const stats = fs.statSync(outputPdfPath);
  console.log(`Successfully generated TECHNICAL_REPORT.pdf (${(stats.size / 1024).toFixed(1)} KB)`);
  // Clean temp file
  fs.unlinkSync(tempHtmlPath);
} catch (err) {
  console.error('Error generating PDF:', err);
  process.exit(1);
}
