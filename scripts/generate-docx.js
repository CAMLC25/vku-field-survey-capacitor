import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  WidthType,
  BorderStyle,
  ShadingType
} from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputPath = path.join(rootDir, 'TECHNICAL_REPORT.docx');

// Modern Corporate VKU Color Palette
const primaryColor = '0369A1'; // Deep VKU Cyan/Blue
const secondaryColor = '0284C7';
const darkTextColor = '1E293B';
const mutedTextColor = '64748B';
const lightBg = 'F1F5F9';
const cardBg = 'F8FAFC';
const calloutBg = 'F0F9FF';
const successColor = '15803D';

function makeHeading(title, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: level === HeadingLevel.HEADING_1 ? 24 : 20, // 12pt or 10pt
        color: primaryColor,
        font: 'Segoe UI'
      })
    ]
  });
}

function makeParagraph(runs, options = {}) {
  const children = runs.map((r) => {
    if (typeof r === 'string') {
      return new TextRun({ text: r, size: 19, color: darkTextColor, font: 'Segoe UI' });
    }
    return new TextRun({
      text: r.text,
      bold: r.bold || false,
      italics: r.italics || false,
      color: r.color || darkTextColor,
      size: r.size || 19,
      font: 'Segoe UI',
      ...r
    });
  });

  return new Paragraph({
    spacing: { before: options.before || 60, after: options.after || 60, line: 260 },
    alignment: options.alignment || AlignmentType.LEFT,
    children
  });
}

function makeBullet(runs) {
  const children = runs.map((r) => {
    if (typeof r === 'string') {
      return new TextRun({ text: r, size: 19, color: darkTextColor, font: 'Segoe UI' });
    }
    return new TextRun({
      text: r.text,
      bold: r.bold || false,
      color: r.color || darkTextColor,
      size: r.size || 19,
      font: 'Segoe UI',
      ...r
    });
  });

  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: 40, after: 40, line: 250 },
    children
  });
}

function makeCallout(title, bodyLines) {
  const rows = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 100, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: calloutBg },
          margins: { top: 120, bottom: 120, left: 180, right: 180 },
          borders: {
            left: { style: BorderStyle.SINGLE, size: 24, color: secondaryColor },
            top: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE }
          },
          children: [
            new Paragraph({
              spacing: { before: 0, after: 60 },
              children: [
                new TextRun({
                  text: title,
                  bold: true,
                  size: 20,
                  color: primaryColor,
                  font: 'Segoe UI'
                })
              ]
            }),
            ...bodyLines.map(
              (line) =>
                new Paragraph({
                  spacing: { before: 40, after: 40, line: 240 },
                  children: [
                    new TextRun({
                      text: line,
                      size: 18,
                      color: darkTextColor,
                      font: 'Segoe UI'
                    })
                  ]
                })
            )
          ]
        })
      ]
    })
  ];

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows,
    margins: { top: 100, bottom: 100 }
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: 'Segoe UI',
          color: darkTextColor
        }
      }
    }
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 1080, // 0.75 in
            bottom: 1080,
            left: 1080,
            right: 1080
          }
        }
      },
      children: [
        // Title Banner matching Instructor Template
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 60 },
          children: [
            new TextRun({
              text: 'MINI-PROJECT SHORT TECHNICAL REPORT',
              bold: true,
              size: 28, // 14pt
              color: primaryColor,
              font: 'Segoe UI'
            })
          ]
        }),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.CLEAR, fill: lightBg },
                  margins: { top: 80, bottom: 80, left: 140, right: 140 },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 12, color: secondaryColor },
                    bottom: { style: BorderStyle.SINGLE, size: 12, color: secondaryColor },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE }
                  },
                  children: [
                    makeParagraph([
                      { text: 'Course: ', bold: true },
                      { text: 'Cross-Platform Mobile App Development (VKU)' }
                    ]),
                    makeParagraph([
                      { text: 'Mini-Project Title: ', bold: true },
                      { text: 'Mini-Project 1: Offline Data Collection with Hybrid Mobile Architecture (PWA & Capacitor Android)', color: primaryColor, bold: true }
                    ]),
                    makeParagraph([
                      { text: 'Team / Student Name: ', bold: true },
                      { text: 'Lê Cảm', bold: true, color: primaryColor },
                      { text: '  — Student ID: ' },
                      { text: '23IT022', bold: true }
                    ]),
                    makeParagraph([
                      { text: 'Submission Date: ', bold: true },
                      { text: '21/09/2026' }
                    ])
                  ]
                })
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 120, after: 0 }, children: [] }),

        // SECTION 1
        makeHeading('1. GENERAL INFORMATION & DELIVERABLE LINKS'),
        makeBullet([
          { text: 'Team Members: ', bold: true },
          { text: 'Lê Cảm — Student ID: 23IT022 — Role: Solo Developer (100% Contribution: System Architecture, PWA UI/UX, Dexie IndexedDB, Capacitor 7 Native Plugins, Cloudflare Edge API)' }
        ]),
        makeBullet([
          { text: '🔗 Live Demo URL (Primary): ', bold: true },
          { text: 'https://vku-field-survey-capacitor.pages.dev', color: primaryColor, bold: true }
        ]),
        makeBullet([
          { text: '🔗 Live Demo URL (Mirror): ', bold: true },
          { text: 'https://camle-vku-field-survey.pages.dev', color: primaryColor, bold: true }
        ]),
        makeBullet([
          { text: '☁️ Central Cloud Edge API: ', bold: true },
          { text: 'https://vku-field-survey-capacitor.lecam.workers.dev', color: primaryColor, bold: true }
        ]),
        makeBullet([
          { text: '💻 GitHub Repository: ', bold: true },
          { text: 'https://github.com/CAMLC25/vku-field-survey-capacitor', color: primaryColor, bold: true }
        ]),
        makeBullet([
          { text: '📦 Pre-built Android APK: ', bold: true },
          { text: 'vku-field-survey-debug.apk', bold: true },
          { text: ' (~7.4 MB — Biên dịch hoàn chỉnh từ Gradle Wrapper, hỗ trợ cài đặt trên Android 8.0 - 15)' }
        ]),

        // SECTION 2
        makeHeading('2. FEATURE IMPLEMENTATION CHECKLIST'),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            // Table Header
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  width: { size: 6, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.CLEAR, fill: primaryColor },
                  margins: { top: 80, bottom: 80, left: 60, right: 60 },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '#', bold: true, color: 'FFFFFF', size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 30, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.CLEAR, fill: primaryColor },
                  margins: { top: 80, bottom: 80, left: 60, right: 60 },
                  children: [new Paragraph({ children: [new TextRun({ text: 'Required Feature', bold: true, color: 'FFFFFF', size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 16, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.CLEAR, fill: primaryColor },
                  margins: { top: 80, bottom: 80, left: 60, right: 60 },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Status', bold: true, color: 'FFFFFF', size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 48, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.CLEAR, fill: primaryColor },
                  margins: { top: 80, bottom: 80, left: 60, right: 60 },
                  children: [new Paragraph({ children: [new TextRun({ text: 'Implementation Details & Acceptance Level', bold: true, color: 'FFFFFF', size: 18 })] })]
                })
              ]
            }),
            // Row 1
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '1', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Responsive Mobile Viewport', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Complete', bold: true, color: successColor, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Giao diện Mobile-First, tương thích notch/tai thỏ qua safe-area insets. Thanh điều hướng 3 tab chân trang. Chuyển đổi song ngữ tức thì (Tiếng Việt / English).', size: 18 })] })] })
              ]
            }),
            // Row 2
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '2', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Local Offline Persistence', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Complete', bold: true, color: successColor, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Sử dụng Dexie.js (IndexedDB) quản lý 2 bảng surveys và syncQueue. Khởi động và ghi nhận 100% không cần mạng (<30ms). Lưu ảnh binary Blob an toàn.', size: 18 })] })] })
              ]
            }),
            // Row 3
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '3', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Automatic Background Sync', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Complete', bold: true, color: successColor, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Tích hợp Background Sync API (sync-surveys) kết hợp @capacitor/network và sự kiện online. Đẩy tuần tự từng biên bản kèm độ trễ 300ms chống nghẽn mạng.', size: 18 })] })] })
              ]
            }),
            // Row 4
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '4', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Hardware: Native Camera', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Complete', bold: true, color: successColor, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Tích hợp @capacitor/camera chụp ảnh & chọn thư viện. Nén tự động qua HTML5 Canvas xuống 1280px (~180KB JPEG), tiết kiệm 90% bộ nhớ. Có Lightbox phóng to.', size: 18 })] })] })
              ]
            }),
            // Row 5
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '5', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Hardware: GPS Geolocation', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Complete', bold: true, color: successColor, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Tích hợp @capacitor/geolocation. Thu thập tọa độ GPS thực tế, ánh xạ ra địa chỉ khuôn viên VKU (Khu V, K, A, B) và nút bấm 1-chạm mở Google Maps.', size: 18 })] })] })
              ]
            }),
            // Row 6
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '6', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Hardware: Network Monitor', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Complete', bold: true, color: successColor, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Tích hợp @capacitor/network giám sát phần cứng mạng kết hợp Active Ping Probe /api/health loại bỏ hiện tượng báo mạng ảo (false-positive).', size: 18 })] })] })
              ]
            }),
            // Row 7
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '7', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Notifications & Storage', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Complete', bold: true, color: successColor, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Tích hợp @capacitor/local-notifications (kênh Android vku-survey-channel phát rung/chuông) và @capacitor/preferences (SharedPreferences) bảo vệ phiên làm việc.', size: 18 })] })] })
              ]
            }),
            // Row 8
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '8', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Idempotency & Safe Retry', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Complete', bold: true, color: successColor, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Client tạo mã UUIDv4 làm khóa chính duy nhất trên Cloudflare KV, bảo đảm thao tác idempotent an toàn, triệt tiêu nguy cơ nhân đôi dữ liệu khi bấm gửi lại.', size: 18 })] })] })
              ]
            }),
            // Row 9
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '9', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Role-Based Access Control', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Complete', bold: true, color: successColor, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Cán bộ khảo sát chỉ xem và xóa bản nháp của chính mình (createdByEmail). Admin toàn quyền giám sát dữ liệu toàn trường, quản trị người dùng và xuất CSV UTF-8.', size: 18 })] })] })
              ]
            }),
            // Row 10
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '10', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Packaging Native Android APK', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Complete', bold: true, color: successColor, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Đóng gói Capacitor 7, cấu hình AndroidManifest.xml và biên dịch thành công file APK vku-field-survey-debug.apk (~7.4 MB) qua Gradle Wrapper.', size: 18 })] })] })
              ]
            })
          ]
        }),

        // SECTION 3
        makeHeading('3. TECHNICAL ARCHITECTURE & PROJECT STRUCTURE'),
        makeParagraph([
          { text: '3.1. Cấu Trúc Thư Mục Dự Án (Directory Structure):', bold: true }
        ]),
        new Paragraph({
          children: [
            new TextRun({
              text: `vku-field-survey-capacitor/
├── android/                         # Dự án Native Android đóng gói Capacitor 7 (Gradle)
│   ├── app/src/main/AndroidManifest.xml  # Cấp quyền Camera, Location, Notifications
│   └── build/outputs/apk/debug/     # Tệp APK sau khi biên dịch
├── public/                          # Tài nguyên tĩnh PWA (Web App Manifest, Icons)
├── src/
│   ├── components/                  # SurveyForm, SurveyList, Header, NavigationBar
│   ├── config/                      # Cấu hình API endpoint Cloudflare backend
│   ├── db/                          # Dexie.js IndexedDB ('vku-field-survey') & syncQueue
│   ├── hooks/                       # React hooks quản lý kết nối, đồng bộ và ngôn ngữ
│   ├── pages/                       # HomePage, HistoryPage, AdminDashboardPage, LoginPage
│   ├── services/                    # Geolocation, Camera, Network, Notifications, Sync
│   ├── types/                       # TypeScript interfaces (Survey, User, LocationResult)
│   └── utils/                       # Location resolver (tọa độ & địa chỉ VKU), Image compression
├── worker.js                        # Cloudflare Edge Worker API & KV Namespace Storage
├── capacitor.config.ts              # Cấu hình Capacitor Native Runtime
├── TECHNICAL_REPORT.md              # Báo cáo kỹ thuật Markdown
├── TECHNICAL_REPORT.docx            # Báo cáo kỹ thuật bản Microsoft Word
├── TECHNICAL_REPORT.pdf             # Báo cáo kỹ thuật bản Adobe PDF
└── vku-field-survey-debug.apk       # Tệp cài đặt Android APK hoàn chỉnh (7.4 MB)`,
              font: 'Consolas',
              size: 16
            })
          ]
        }),

        makeParagraph([
          { text: '3.2. Luồng Quản Lý Trạng Thái (State Management Flow):', bold: true }
        ]),
        makeBullet([
          { text: 'Tầng Giao Diện (UI Layer): ', bold: true },
          { text: 'Sử dụng React 18 kết hợp Tailwind CSS. Tận dụng hook useLiveQuery từ Dexie để giao diện tự động cập nhật theo thời gian thực (reactive UI) mỗi khi dữ liệu trong IndexedDB thay đổi mà không cần tải lại trang.' }
        ]),
        makeBullet([
          { text: 'Tầng Lưu Trữ Ngoại Tuyến (Offline Storage Layer): ', bold: true },
          { text: 'Dexie IndexedDB đóng vai trò nguồn chân lý duy nhất (Single Source of Truth) tại thiết bị. Khi lập biên bản, dữ liệu lưu ngay vào bảng surveys với trạng thái PENDING_SYNC và khóa UUIDv4 nạp vào hàng đợi syncQueue.' }
        ]),
        makeBullet([
          { text: 'Tầng Đám Mây (Cloud Edge Layer): ', bold: true },
          { text: 'Cloudflare Workers tiếp nhận các gói tin POST qua REST API, lưu trữ phân tán trên Cloudflare KV. Hỗ trợ đồng bộ hai chiều (pullSurveysFromCloud) bảo toàn dữ liệu khi chuyển thiết bị.' }
        ]),

        makeParagraph([
          { text: '3.3. Chiến Lược Xử Lý Ngoại Lệ & Khả Năng Chịu Lỗi (Exception Handling):', bold: true }
        ]),
        makeBullet([
          { text: 'Khắc phục lỗi treo Service Worker: ', bold: true },
          { text: 'Bọc lệnh đăng ký Background Sync bằng Promise.race với Timeout 1.000ms, đảm bảo việc ghi nhận IndexedDB luôn hoàn tất tức thì (<30ms) ngay cả khi mất mạng sâu.' }
        ]),
        makeBullet([
          { text: 'Chống báo mạng ảo (Active Network Probing): ', bold: true },
          { text: 'Triển khai hàm checkServerHealth() gửi gói tin kiểm tra /api/health kèm timestamp chống cache, chỉ cho phép đồng bộ khi máy chủ thực sự phản hồi HTTP 200.' }
        ]),
        makeBullet([
          { text: 'Dự phòng định vị an toàn: ', bold: true },
          { text: 'Khi không có tín hiệu vệ tinh GPS, hàm resolveSurveyCoordinates() tự động ánh xạ vị trí chuẩn xác dựa trên mã tòa nhà (Khu V, K, A, B) kèm địa chỉ trường VKU để hồ sơ khảo sát luôn toàn vẹn.' }
        ]),

        // SECTION 4
        makeHeading('4. EMPIRICAL EVIDENCE & SCREENSHOTS'),
        makeParagraph([
          { text: '4.1. Minh Chứng 1: Màn Hình Khởi Động & Giám Sát Kết Nối Thời Gian Thực', bold: true }
        ]),
        makeParagraph([
          'Màn hình Tổng quan Điều hành (KPI Home) thống kê số lượng biên bản theo 4 khu tòa nhà VKU, tỷ lệ thiết bị đạt chuẩn và danh sách sự cố cần xử lý. Huy hiệu trạng thái mạng hiển thị động: TRỰC TUYẾN (ONLINE) màu xanh lá khi có mạng hoặc NGOẠI TUYẾN (OFFLINE) màu hổ phách khi mất mạng. (Sử dụng @capacitor/network, ActivePingProbe).'
        ]),
        makeParagraph([
          { text: '4.2. Minh Chứng 2: Form Lập Biên Bản Khảo Sát & Thẻ Định Vị GPS Hiện Trường', bold: true }
        ]),
        makeParagraph([
          'Giao diện cho phép chọn nhanh vị trí bằng 1 chạm: 4 Tòa nhà VKU, 5 Tầng và 10 Phòng học tiêu chuẩn. Thẻ GPS hiển thị trực tiếp tọa độ (15.97526° N, 108.25324° E ±25m) và địa chỉ hành chính cụ thể: "📍 Khu V, Trường ĐH CNTT&TT Việt - Hàn, 470 Trần Đại Nghĩa, Q. Ngũ Hành Sơn, TP. Đà Nẵng". (Sử dụng @capacitor/geolocation, Canvas Compressor).'
        ]),
        makeParagraph([
          { text: '4.3. Minh Chứng 3: Sổ Biên Bản Khảo Sát Ngoại Tuyến & Mở Vị Trí Google Maps', bold: true }
        ]),
        makeParagraph([
          'Danh sách biên bản gắn nhãn phân loại: ĐÃ GỬI MÁY CHỦ (Xanh), CHỜ GỬI (Hổ phách), LỖI GỬI (Đỏ). Mỗi thẻ biên bản hiển thị ảnh thumbnail tư liệu (48x48px), nhấn để phóng to toàn màn hình. Khối địa chỉ GPS hiển thị nút bấm "Mở Google Maps ↗" điều hướng thẳng tới vị trí khảo sát trên vệ tinh. (Sử dụng Dexie IndexedDB, Lightbox Modal).'
        ]),
        makeParagraph([
          { text: '4.4. Minh Chứng 4: Bảng Điều Hành Quản Trị Viên (Admin Center) & Xuất Báo Cáo CSV', bold: true }
        ]),
        makeParagraph([
          'Bảng quản trị trung tâm dành cho Ban Quản lý Cơ sở vật chất: Thống kê toàn diện sự cố cấp độ cao (Mức 1 & 2), thiết bị bảo trì (Mức 3) và vận hành tốt (Mức 4 & 5). Cột VỊ TRÍ hiển thị tên tòa nhà, phòng, địa chỉ chi tiết và liên kết bản đồ Google Maps. Hỗ trợ lọc, cấp tài khoản cán bộ mới và xuất báo cáo CSV UTF-8. (Sử dụng Cloudflare Workers KV REST API, CSV UTF-8 Generator).'
        ]),

        // SECTION 5
        makeHeading('5. TECHNICAL CHALLENGES & RESOLUTIONS'),
        makeCallout(
          '5.1. Thách Thức 1: Nghẽn Băng Thông & Nguy Cơ Trùng Lặp Bản Ghi Khi Đồng Bộ Hàng Loạt',
          [
            'Hiện tượng: Cán bộ khảo sát ghi nhận 15–20 biên bản trong khu vực mất mạng. Khi bước ra vùng có Wi-Fi, việc gửi đồng thời toàn bộ qua Promise.all() làm nghẽn socket mạng di động, gây lỗi timeout hàng loạt và nguy cơ tạo ra các bản ghi trùng lặp trên server khi bấm gửi lại.',
            'Giải pháp khắc phục:',
            '• Động cơ Đồng bộ Tuần tự (Sequential Sync Engine): Sử dụng vòng lặp for...of gửi từng biên bản một, kết hợp độ trễ 300ms (await delay(300)) giữa các lượt gửi để ổn định socket và cung cấp phản hồi trực quan trên thanh tiến trình.',
            '• Kiểm soát Bất biến (Idempotency Key): Sử dụng mã UUIDv4 sinh tại máy khách làm khóa chính trên Cloudflare KV. Khi nhận cùng một ID, máy chủ thực hiện thao tác upsert (cập nhật nếu đã có, tạo mới nếu chưa) và trả về mã HTTP 200, triệt tiêu hoàn toàn nguy cơ trùng lặp dữ liệu.'
          ]
        ),
        new Paragraph({ spacing: { before: 60, after: 60 }, children: [] }),
        makeCallout(
          '5.2. Thách Thức 2: Báo Mạng Ảo (False-Positive Online) & Bốc Hơi Bộ Nhớ Đệm Ảnh Trên iOS WebKit',
          [
            'Hiện tượng: Trình duyệt di động (đặc biệt là Safari WebKit trên iOS) thường báo navigator.onLine = true ngay cả khi chỉ mới kết nối vào cổng captive portal không có Internet, khiến yêu cầu tải lên thất bại và chuyển nhầm trạng thái thành FAILED. Ngoài ra, cơ chế dọn dẹp bộ nhớ của iOS có thể hủy các URL blob: tạm thời (Blob eviction), khiến ảnh hiện trường bị mất khi mở lại app.',
            'Giải pháp khắc phục:',
            '• Active Health Ping Probe: Xây dựng dịch vụ mạng kết hợp giữa sự kiện phần cứng của @capacitor/network với lệnh HTTP ping thực tế tới /api/health (timeout 3 giây). Chỉ khi máy chủ đám mây phản hồi thành công mới chuyển sang trạng thái trực tuyến.',
            '• Durable Base64 & Cloud Storage Hydration: Nén ảnh trực tiếp sang chuỗi Base64 Data URL bền vững khi lưu trữ trên IndexedDB và Cloudflare KV, giải quyết triệt để lỗi mất ảnh do thu hồi Blob của WebKit.'
          ]
        ),

        new Paragraph({ spacing: { before: 180, after: 60 }, children: [] }),
        makeParagraph(
          [
            { text: 'Đà Nẵng, Ngày 21 Tháng 09 Năm 2026\n', italics: true },
            { text: 'Sinh viên thực hiện: ', bold: true },
            { text: 'Lê Cảm (Mã SV: 23IT022)\n', bold: true, color: primaryColor },
            { text: 'Trường Đại học Công nghệ Thông tin & Truyền thông Việt - Hàn (VKU)', italics: true }
          ],
          { alignment: AlignmentType.RIGHT }
        )
      ]
    }
  ]
});

Packer.toBuffer(doc).then((buffer) => {
  try {
    fs.writeFileSync(outputPath, buffer);
    const stats = fs.statSync(outputPath);
    console.log(`Successfully generated ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    if (err.code === 'EBUSY') {
      console.warn(`[Notice] ${outputPath} is currently open in Microsoft Word.`);
      const backupPath = path.join(rootDir, 'TECHNICAL_REPORT_UPDATED.docx');
      fs.writeFileSync(backupPath, buffer);
      console.log(`Successfully written updated version to ${backupPath}`);
    } else {
      throw err;
    }
  }
});
