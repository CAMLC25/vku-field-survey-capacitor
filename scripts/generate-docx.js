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
const warningColor = 'B45309';

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

function makeCodeBlock(codeText) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.CLEAR, fill: '1E293B' }, // Dark slate
            margins: { top: 100, bottom: 100, left: 140, right: 140 },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE }
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: codeText,
                    color: '38BDF8', // Cyan font
                    size: 16,
                    font: 'Consolas'
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
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
        // Title Banner
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 60 },
          children: [
            new TextRun({
              text: 'BÁO CÁO KỸ THUẬT TIỂU LUẬN 1 (MINI-PROJECT 1)',
              bold: true,
              size: 28, // 14pt
              color: primaryColor,
              font: 'Segoe UI'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 40 },
          children: [
            new TextRun({
              text: 'Học phần: Phát triển Ứng dụng Di động Đa nền tảng (Cross-Platform Mobile App Development)',
              bold: true,
              size: 21,
              color: darkTextColor,
              font: 'Segoe UI'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 120 },
          children: [
            new TextRun({
              text: 'Đề tài: Hệ Thống Số Hóa Khảo Sát & Kiểm Định Hiện Trường Cơ Sở Vật Chất (VKU Field Survey)',
              bold: true,
              size: 20,
              color: secondaryColor,
              font: 'Segoe UI'
            })
          ]
        }),

        // Author meta table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.CLEAR, fill: lightBg },
                  margins: { top: 100, bottom: 100, left: 140, right: 140 },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 12, color: secondaryColor },
                    bottom: { style: BorderStyle.SINGLE, size: 12, color: secondaryColor },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE }
                  },
                  children: [
                    makeParagraph(
                      [
                        { text: 'Sinh viên thực hiện: ', bold: true },
                        { text: 'Lê Cảm', bold: true, color: primaryColor },
                        { text: '  |  ' },
                        { text: 'Mã số sinh viên: ', bold: true },
                        { text: '23IT022', bold: true },
                        { text: '  |  ' },
                        { text: 'Đóng góp: ', bold: true },
                        { text: '100% Solo Contribution', bold: true, color: successColor }
                      ],
                      { alignment: AlignmentType.CENTER }
                    ),
                    makeParagraph(
                      [
                        { text: 'Đơn vị đào tạo: ' },
                        { text: 'Trường Đại học Công nghệ Thông tin & Truyền thông Việt - Hàn (VKU)' },
                        { text: '  |  ' },
                        { text: 'Thời gian: ' },
                        { text: 'Năm học 2025 – 2026' }
                      ],
                      { alignment: AlignmentType.CENTER }
                    )
                  ]
                })
              ]
            })
          ]
        }),

        new Paragraph({ spacing: { before: 120, after: 0 }, children: [] }),

        // SECTION 1
        makeHeading('CHUYÊN ĐỀ 1: MÔ HÌNH LAI (THE HYBRID MODEL: WEBVIEW + NATIVE BRIDGE)'),
        makeParagraph([
          { text: '1.1. Bản Chất của Mô Hình Ứng Dụng Di Động Lai (Hybrid Mobile App):', bold: true }
        ]),
        makeParagraph([
          'Mô hình ứng dụng lai kết hợp giữa tính linh hoạt, tốc độ phát triển của công nghệ Web tiêu chuẩn (HTML5, CSS3, JavaScript/TypeScript, React 18) với năng lực truy cập sâu vào phần cứng thiết bị của hệ điều hành di động bản địa (Android Java/Kotlin SDK).'
        ]),
        makeBullet([
          { text: 'Thành phần WebView: ', bold: true },
          { text: 'Hoạt động như một trình duyệt web nhúng toàn màn hình (Chromeless WebView), chịu trách nhiệm thông dịch DOM, dựng giao diện người dùng và thực thi JavaScript Engine (V8 trên Android).' }
        ]),
        makeBullet([
          { text: 'Thành phần Native Bridge: ', bold: true },
          { text: 'Đóng vai trò là cầu nối giao tiếp hai chiều (Bi-directional IPC Channel), phá vỡ ranh giới "Hộp cát" (Security Sandbox) của trình duyệt để gọi các hàm hệ điều hành gốc khi ứng dụng yêu cầu quyền chụp ảnh, định vị GPS, rung chuông thông báo hay đọc trạng thái mạng.' }
        ]),
        makeBullet([
          { text: 'Tỷ lệ chia sẻ mã nguồn (Code Sharing): ', bold: true },
          { text: 'Đạt từ 95% đến 100% mã nguồn dùng chung giữa Web PWA, Android Native và iOS, giúp tiết kiệm chi phí bảo trì và rút ngắn thời gian đưa sản phẩm ra thị trường.' }
        ]),

        // SECTION 2
        makeHeading('CHUYÊN ĐỀ 2: NGUYÊN NHÂN CAPACITOR THAY THẾ APACHE CORDOVA / PHONEGAP'),
        makeParagraph([
          'Apache Cordova (PhoneGap) từng thống trị ngành phát triển di động lai từ năm 2009. Tuy nhiên, sự xuất hiện của Capacitor vào năm 2018 bởi Ionic Team đã giải quyết triệt để 4 hạn chế trí mạng của Cordova:'
        ]),
        makeBullet([
          { text: '1. Triết lý "Code As Asset" thay vì "Black-Box": ', bold: true },
          { text: 'Trong Cordova, thư mục platforms/ bị ghi đè tự động mỗi khi build. Với Capacitor, thư mục android/ là mã nguồn Native chuẩn mực, mở trực tiếp bằng Android Studio và hoàn toàn không bị ghi đè.' }
        ]),
        makeBullet([
          { text: '2. Xóa bỏ cấu hình XML phức tạp: ', bold: true },
          { text: 'Capacitor thay thế config.xml bằng tệp capacitor.config.ts (TypeScript/JSON), hỗ trợ cấu hình type-safe và tuân thủ các quy chuẩn Gradle hiện đại.' }
        ]),
        makeBullet([
          { text: '3. Loại bỏ sự phụ thuộc vào sự kiện deviceready: ', bold: true },
          { text: 'Capacitor tiêm Native Bridge vào WebView trước khi mã nguồn JavaScript ứng dụng khởi chạy, cho phép gọi hàm native ngay từ dòng code đầu tiên mà không lo lỗi undefined.' }
        ]),
        makeBullet([
          { text: '4. Chuẩn hóa NPM & Khả năng Web Fallback: ', bold: true },
          { text: 'Tất cả plugin Capacitor đều là các gói npm tiêu chuẩn hỗ trợ TypeScript. Khi chạy trên trình duyệt Web, plugin tự động kích hoạt Web Fallback mà không làm sập ứng dụng.' }
        ]),

        // SECTION 3
        makeHeading('CHUYÊN ĐỀ 3: KIẾN TRÚC RUNTIME CAPACITOR & GIAO TIẾP LIÊN TIẾN TRÌNH (IPC)'),
        makeParagraph([
          'Kiến trúc runtime của Capacitor được thiết kế nhằm tối ưu hóa độ trễ giao tiếp giữa luồng thực thi JavaScript trong WebView và luồng xử lý Native trên hệ điều hành:'
        ]),
        makeBullet([
          { text: 'Chiều JS sang Native (JS-to-Native): ', bold: true },
          { text: 'Khi ứng dụng gọi hàm Camera.getPhoto(), Capacitor tuần tự hóa tham số thành chuỗi JSON và gửi qua ranh giới tiến trình thông qua cơ chế prompt() interceptor hoặc @JavascriptInterface trong Android WebView.' }
        ]),
        makeBullet([
          { text: 'Chiều Native sang JS (Native-to-JS): ', bold: true },
          { text: 'Sau khi Android Intent hoàn thành việc chụp ảnh hoặc thu nhận tọa độ GPS, Android Bridge gọi hàm evaluateJavascript("window.Capacitor.fromNative(...)") để giải quyết (resolve) Promise tương ứng trong môi trường React.' }
        ]),

        // SECTION 4
        makeHeading('CHUYÊN ĐỀ 4: TRUY CẬP PHẦN CỨNG THIẾT BỊ (@capacitor/camera, @capacitor/geolocation, @capacitor/network)'),
        makeParagraph([
          'Dự án tích hợp đầy đủ 3 thư viện phần cứng chính thức của Capacitor phục vụ công tác kiểm định hiện trường:'
        ]),
        makeBullet([
          { text: '1. @capacitor/camera (Chụp & Quản Lý Hình Ảnh Hiện Trường): ', bold: true },
          { text: 'Cho phép chụp ảnh camera độ phân giải cao hoặc chọn ảnh từ thư viện thiết bị. Ứng dụng tích hợp thuật toán nén ảnh tự động qua HTML5 Canvas xuống kích thước chuẩn 1280px (~180KB JPEG), giảm 90% dung lượng bộ nhớ. Đi kèm cửa sổ Lightbox Modal xem phóng to toàn màn hình.' }
        ]),
        makeBullet([
          { text: '2. @capacitor/geolocation (Tọa Độ & Địa Chỉ GPS Hiện Trường): ', bold: true },
          { text: 'Thu thập tọa độ vĩ độ, kinh độ và bán kính sai số thực tế. Tự động ánh xạ ra địa chỉ chi tiết cơ sở khuôn viên VKU (ví dụ: "Khu V, Trường ĐH CNTT&TT Việt - Hàn, 470 Trần Đại Nghĩa, Q. Ngũ Hành Sơn, Đà Nẵng") và tích hợp nút bấm 1-chạm mở thẳng vị trí trên Google Maps.' }
        ]),
        makeBullet([
          { text: '3. @capacitor/network (Giám Sát Trạng Thái Mạng Phần Cứng): ', bold: true },
          { text: 'Theo dõi trực tiếp phần cứng mạng (Wi-Fi, 4G/5G, Không có kết nối). Kết hợp cơ chế Active Network Probe gửi gói tin kiểm tra /api/health loại bỏ hiện tượng mạng ảo và tự động kích hoạt luồng đồng bộ tuần tự khi có kết nối trở lại.' }
        ]),

        // SECTION 5
        makeHeading('CHUYÊN ĐỀ 5: THÔNG BÁO CỤC BỘ & LƯU TRỮ CẤU HÌNH AN TOÀN'),
        makeBullet([
          { text: '1. @capacitor/local-notifications (Thông Báo Bản Địa): ', bold: true },
          { text: 'Tạo kênh thông báo chuyên biệt trên Android (vku-survey-channel). Kích hoạt rung và chuông âm thanh khi cán bộ lưu biên bản ngoại tuyến thành công hoặc khi hệ thống hoàn tất đồng bộ các biên bản tồn đọng lên đám mây.' }
        ]),
        makeBullet([
          { text: '2. @capacitor/preferences (Lưu Trữ Cấu Hình An Toàn): ', bold: true },
          { text: 'Thay thế an toàn cho localStorage thông qua SharedPreferences trên Android. Đảm bảo phiên làm việc của cán bộ (vku_inspector_profile), tùy chọn ngôn ngữ (vku_lang) không bị hệ điều hành xóa khi dọn dẹp bộ nhớ đệm trình duyệt.' }
        ]),

        // SECTION 6
        makeHeading('CHUYÊN ĐỀ 6: QUY TRÌNH ĐÓNG GÓI PWA THÀNH TỆP CÀI ĐẶT ANDROID APK'),
        makeParagraph([
          'Quy trình đóng gói từ mã nguồn TypeScript sang tệp cài đặt Android APK độc lập được thực hiện qua các bước chuẩn hóa:'
        ]),
        makeBullet([
          { text: 'Bước 1: ', bold: true },
          { text: 'Biên dịch gói ứng dụng Web PWA tối ưu qua lệnh: npm run build' }
        ]),
        makeBullet([
          { text: 'Bước 2: ', bold: true },
          { text: 'Đồng bộ mã nguồn và liên kết 5 plugin vào Android: npx cap copy android && npx cap sync android' }
        ]),
        makeBullet([
          { text: 'Bước 3: ', bold: true },
          { text: 'Cấu hình quyền phần cứng trong AndroidManifest.xml (Camera, Fine Location, Post Notifications, Network State).' }
        ]),
        makeBullet([
          { text: 'Bước 4: ', bold: true },
          { text: 'Biên dịch qua Gradle Wrapper: ./gradlew assembleDebug. Tệp APK hoàn chỉnh được xuất ra tại thư mục gốc: vku-field-survey-debug.apk (~7.4 MB).' }
        ]),

        // SECTION 7
        makeHeading('CHUYÊN ĐỀ 7: TỔNG KẾT & BẢNG KIỂM TRA BÀN GIAO MINI-PROJECT 1 (SUBMISSION CHECKLIST)'),
        makeParagraph([
          'Toàn bộ sản phẩm bàn giao của Mini-Project 1 đã được triển khai công khai và kiểm thử nghiêm ngặt:'
        ]),

        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            // Header
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  width: { size: 8, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.CLEAR, fill: primaryColor },
                  margins: { top: 80, bottom: 80, left: 60, right: 60 },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'STT', bold: true, color: 'FFFFFF', size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 30, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.CLEAR, fill: primaryColor },
                  margins: { top: 80, bottom: 80, left: 60, right: 60 },
                  children: [new Paragraph({ children: [new TextRun({ text: 'Hạng Mục Bàn Giao', bold: true, color: 'FFFFFF', size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 47, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.CLEAR, fill: primaryColor },
                  margins: { top: 80, bottom: 80, left: 60, right: 60 },
                  children: [new Paragraph({ children: [new TextRun({ text: 'Đường Dẫn / Chi Tiết Minh Chứng', bold: true, color: 'FFFFFF', size: 18 })] })]
                }),
                new TableCell({
                  width: { size: 15, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.CLEAR, fill: primaryColor },
                  margins: { top: 80, bottom: 80, left: 60, right: 60 },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Trạng Thái', bold: true, color: 'FFFFFF', size: 18 })] })]
                })
              ]
            }),
            // Row 1
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '1', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Bản Demo Trực Tiếp (Live Web PWA)', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [
                  new Paragraph({ children: [new TextRun({ text: '• Chính: https://vku-field-survey-capacitor.pages.dev\n• Dự phòng: https://camle-vku-field-survey.pages.dev', size: 17, color: primaryColor, bold: true })] })
                ] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Đã Duyệt', bold: true, color: successColor, size: 18 })] })] })
              ]
            }),
            // Row 2
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '2', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Máy Chủ Đám Mây (Cloudflare Edge API)', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [
                  new Paragraph({ children: [new TextRun({ text: 'https://vku-field-survey-capacitor.lecam.workers.dev', size: 17, color: primaryColor, bold: true })] })
                ] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Đã Duyệt', bold: true, color: successColor, size: 18 })] })] })
              ]
            }),
            // Row 3
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '3', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Kho Mã Nguồn (GitHub Repository)', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [
                  new Paragraph({ children: [new TextRun({ text: 'https://github.com/CAMLC25/vku-field-survey-capacitor', size: 17, color: primaryColor, bold: true })] })
                ] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Đã Duyệt', bold: true, color: successColor, size: 18 })] })] })
              ]
            }),
            // Row 4
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '4', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Tệp Cài Đặt Android APK', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [
                  new Paragraph({ children: [new TextRun({ text: 'vku-field-survey-debug.apk (7.4 MB — Biên dịch Gradle)', size: 17, bold: true })] })
                ] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Đã Duyệt', bold: true, color: successColor, size: 18 })] })] })
              ]
            }),
            // Row 5
            new TableRow({
              children: [
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '5', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ children: [new TextRun({ text: 'Báo Cáo Kỹ Thuật Đa Định Dạng', bold: true, size: 18 })] })] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [
                  new Paragraph({ children: [new TextRun({ text: '• Microsoft Word: TECHNICAL_REPORT.docx\n• Adobe PDF: TECHNICAL_REPORT.pdf\n• GitHub Markdown: TECHNICAL_REPORT.md', size: 17 })] })
                ] }),
                new TableCell({ margins: { top: 60, bottom: 60, left: 60, right: 60 }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '✅ Đã Duyệt', bold: true, color: successColor, size: 18 })] })] })
              ]
            })
          ]
        }),

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
  fs.writeFileSync(outputPath, buffer);
  const stats = fs.statSync(outputPath);
  console.log(`Successfully generated ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
});
