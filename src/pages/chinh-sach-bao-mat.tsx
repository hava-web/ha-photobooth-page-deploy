/* eslint-disable react/no-danger */
import Container from 'components/grid/Container';
import { renderMainLayout } from 'containers/layout/app/AppLayout';
import { PageWithLayout } from 'models/common.model';
import { InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';

const PrivacyPolicy: PageWithLayout &
  NextPage<InferGetStaticPropsType<any>> = () => {
  const htmlContent = `<p style="text-align: center; margin-top: 0pt; margin-bottom: 3pt;"><strong><span style="font-size: 20pt; font-family: 'Times New Roman', serif;">CH&Iacute;NH S&Aacute;CH BẢO MẬT</span></strong></p>
<h1 style="margin-top: 20pt; margin-bottom: 6pt;"><strong><span style="font-size: 14pt; font-family: 'Times New Roman', serif;">1. Giới thiệu</span></strong></h1>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Ch&iacute;nh s&aacute;ch bảo mật n&agrave;y (sau đ&acirc;y gọi tắt l&agrave; &ldquo;Ch&iacute;nh s&aacute;ch&rdquo;) được x&acirc;y dựng v&agrave; cập nhật bởi Fun Studio. (sau đ&acirc;y gọi tắt l&agrave; &ldquo;ch&uacute;ng t&ocirc;i&rdquo;, hay &ldquo;của ch&uacute;ng t&ocirc;i).</span></p>
<h1 style="color: #233477;">&nbsp;</h1>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Phạm vi &aacute;p dụng của Ch&iacute;nh s&aacute;ch l&agrave; tất cả c&aacute;c đối tượng sử dụng, đăng k&yacute; sử dụng (sau đ&acirc;y gọi tắt l&agrave; &ldquo;Người d&ugrave;ng&rdquo;), Ứng dụng Fun Studio (sau đ&acirc;y gọi tắt l&agrave; Ứng dụng).&nbsp;</span></p>
<h1 style="color: #233477;">&nbsp;</h1>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Ch&iacute;nh s&aacute;ch bảo mật được x&acirc;y dựng nhằm cho Người d&ugrave;ng biết được Ứng dụng c&oacute; thể thu thập, sử dụng, chia sẻ v&agrave; xử l&yacute; th&ocirc;ng tin c&aacute; nh&acirc;n m&agrave; Người d&ugrave;ng đ&atilde; cung cấp cho ch&uacute;ng t&ocirc;i như thế n&agrave;o. Ch&iacute;nh s&aacute;ch n&agrave;y được x&acirc;y dựng dựa tr&ecirc;n quy định ph&aacute;p luật Việt Nam li&ecirc;n quan đến bảo mật Dữ liệu c&aacute; nh&acirc;n. Bằng việc trao cho ch&uacute;ng t&ocirc;i th&ocirc;ng tin c&aacute; nh&acirc;n, sử dụng c&aacute;c dịch vụ tr&ecirc;n Ứng dụng nghĩa l&agrave; Người d&ugrave;ng đồng &yacute; th&ocirc;ng tin c&aacute; nh&acirc;n của Người d&ugrave;ng sẽ được thu thập, sử dụng như được n&ecirc;u trong Ch&iacute;nh s&aacute;ch n&agrave;y. Trường hợp Người d&ugrave;ng kh&ocirc;ng đồng &yacute; với Ch&iacute;nh s&aacute;ch n&agrave;y, Người d&ugrave;ng kh&ocirc;ng được sử dụng Ứng dụng.</span></p>
<h1 style="color: #233477;">&nbsp;</h1>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Ch&uacute;ng t&ocirc;i c&oacute; quyền được sửa đổi, bổ sung bất kỳ v&agrave; to&agrave;n bộ nội dung của Ch&iacute;nh s&aacute;ch n&agrave;y tại bất kỳ thời điểm n&agrave;o m&agrave; kh&ocirc;ng cần b&aacute;o trước hay cần c&oacute; sự đồng &yacute; trước của Người d&ugrave;ng.</span></p>
<h1 style="margin-top: 20pt; margin-bottom: 6pt;"><strong><span style="font-size: 14pt; font-family: 'Times New Roman', serif;">2. Thu thập Dữ liệu c&aacute; nh&acirc;n</span></strong></h1>
<p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Người d&ugrave;ng khi sử dụng Ứng dụng điện thoại của Fun Studio c&oacute; thể được y&ecirc;u cầu cung cấp Dữ liệu c&aacute; nh&acirc;n để sử dụng c&aacute;c dịch vụ v&agrave; tiện &iacute;ch được cung cấp bởi ứng dụng điện thoại của Fun Studio. Dữ liệu c&aacute; nh&acirc;n l&agrave; c&aacute;c th&ocirc;ng tin gắn liền với một con người cụ thể v&agrave; gi&uacute;p x&aacute;c định danh t&iacute;nh một con người cụ thể. Dữ liệu c&aacute; nh&acirc;n c&oacute; thể l&agrave;: Họ t&ecirc;n, ng&agrave;y th&aacute;ng năm sinh, địa chỉ li&ecirc;n lạc, nơi cư tr&uacute;, email, số điện thoại, số định danh c&aacute; nh&acirc;n, nghề nghiệp, &hellip; .Ch&uacute;ng t&ocirc;i sẽ/c&oacute; thể thu thập Dữ liệu c&aacute; nh&acirc;n của Người d&ugrave;ng khi Người d&ugrave;ng đăng k&yacute; v&agrave;/hoặc sử dụng c&aacute;c dịch vụ, tiện &iacute;ch tr&ecirc;n Ứng dụng.</span></p>
<h1 style="margin-top: 12pt; margin-bottom: 12pt;"><strong><span style="font-size: 14pt; font-family: 'Times New Roman', serif;">3. Mục đ&iacute;ch thu thập, sử dụng v&agrave; chia sẻ Dữ liệu c&aacute; nh&acirc;n</span></strong></h1>
<p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Ch&uacute;ng t&ocirc;i thu thập, lưu trữ v&agrave; xử l&yacute; Dữ liệu c&aacute; nh&acirc;n của người d&ugrave;ng v&agrave;/hoặc được người d&ugrave;ng cung cấp để phục vụ mục đ&iacute;ch sau:&nbsp;</span></p>
<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="margin-top: 12pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Để khởi tạo T&agrave;i khoản, định danh Người d&ugrave;ng, điểm danh, nhận voucher, &hellip; v&agrave; tiến h&agrave;nh sao lưu, kh&ocirc;i phục dữ liệu khi Người d&ugrave;ng đổi thiết bị; cung cấp c&aacute;c dịch vụ kh&aacute;c c&oacute; tr&ecirc;n Ứng dụng (V&iacute; dụ: Gửi đến người d&ugrave;ng c&aacute;c th&ocirc;ng tin về chương tr&igrave;nh khuyến mại, hoạt động, sự kiện đang v&agrave; sắp diễn ra, khảo s&aacute;t của Fun Studio qua h&igrave;nh thức email hoặc tin nhắn văn bản, th&ocirc;ng b&aacute;o tr&ecirc;n Ứng dụng.);</span></p>
  </li>
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Để đề xuất c&aacute;c nội dung c&aacute; nh&acirc;n h&oacute;a: Ch&uacute;ng t&ocirc;i sử dụng Dữ liệu c&aacute; nh&acirc;n của Người d&ugrave;ng để điều chỉnh v&agrave; cung cấp c&aacute;c nội dung c&aacute; nh&acirc;n h&oacute;a, ph&ugrave; hợp với nhu cầu v&agrave; mối quan t&acirc;m của Người d&ugrave;ng (v&iacute; dụ gửi th&ocirc;ng tin giảm gi&aacute;, voucher với Cửa h&agrave;ng ở khu vực Người d&ugrave;ng sinh sống.);</span></p>
  </li>
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Để nghi&ecirc;n cứu ph&aacute;t triển c&aacute;c t&iacute;nh năng, dịch vụ mới, cũng như để duy tr&igrave; cải thiện c&aacute;c t&iacute;nh năng, dịch vụ khả dụng.</span></p>
  </li>
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="margin-top: 0pt; margin-bottom: 12pt;"><span style="font-size: 13pt;">Ngo&agrave;i ra, ch&uacute;ng t&ocirc;i c&oacute; thể sẽ cần xử l&yacute; Dữ liệu c&aacute; nh&acirc;n của kh&aacute;ch h&agrave;ng theo quy định của ph&aacute;p luật v&agrave; y&ecirc;u cầu của c&aacute;c cơ quan nh&agrave; nước c&oacute; thẩm quyền.</span></p>
  </li>
</ul>
<p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Người d&ugrave;ng cần cam kết rằng Dữ liệu c&aacute; nh&acirc;n cung cấp cho ch&uacute;ng t&ocirc;i l&agrave; đ&uacute;ng, ch&iacute;nh x&aacute;c v&agrave; đầy đủ với những nội dung tại thời điểm được y&ecirc;u cầu. Những sai lệch về th&ocirc;ng tin c&oacute; thể sẽ ảnh hưởng tới quyền lợi của bạn v&agrave; ch&uacute;ng t&ocirc;i sẽ kh&ocirc;ng chịu tr&aacute;ch nhiệm trong những trường hợp đ&oacute;.</span></p>
<h2 style="margin-top: 12pt; margin-bottom: 12pt;"><strong><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">4. Bảo mật th&ocirc;ng tin</span></strong></h2>
<p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Dữ liệu c&aacute; nh&acirc;n của người d&ugrave;ng sẽ được xử l&yacute; v&agrave; lưu trữ kể từ thời điểm ch&uacute;ng t&ocirc;i nhận được cho đến khi c&oacute; y&ecirc;u cầu x&oacute;a bỏ hoặc r&uacute;t lại sự đồng &yacute; bởi người d&ugrave;ng hoặc theo quy định ph&aacute;p luật. Dữ liệu c&aacute; nh&acirc;n của người d&ugrave;ng sẽ được bảo mật tr&ecirc;n m&aacute;y chủ thuộc quyền quản l&yacute; của Fun Studio. Mọi Dữ liệu c&aacute; nh&acirc;n m&agrave; ch&uacute;ng t&ocirc;i thu thập sẽ giữ b&iacute; mật v&agrave; chỉ được ph&eacute;p sử dụng li&ecirc;n quan đến c&aacute;c mục đ&iacute;ch được chỉ định tại mục 3 tr&ecirc;n đ&acirc;y.</span></p>
<p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Dữ liệu c&aacute; nh&acirc;n sẽ kh&ocirc;ng được chia sẻ, b&aacute;n hoặc trao đổi cho b&ecirc;n thứ ba m&agrave; kh&ocirc;ng c&oacute; sự đồng &yacute; của người d&ugrave;ng, trừ trường hợp tu&acirc;n thủ ph&aacute;p luật.</span></p>
<p style="margin-top: 12pt; margin-bottom: 12pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Mặc d&ugrave; ch&uacute;ng t&ocirc;i đ&atilde; c&oacute; c&ocirc;ng nghệ cập nhật v&agrave; thủ tục nội bộ để giữ cho c&aacute;c Dữ liệu c&aacute; nh&acirc;n của Người d&ugrave;ng an to&agrave;n khỏi những kẻ x&acirc;m nhập, nhưng kh&ocirc;ng c&oacute; đảm bảo rằng c&aacute;c c&ocirc;ng nghệ hoặc thủ tục như vậy c&oacute; thể loại bỏ tất cả c&aacute;c rủi ro về trộm cắp, mất m&aacute;t hoặc sử dụng sai. Ch&uacute;ng t&ocirc;i sử dụng phương ph&aacute;p hợp l&yacute; để ngăn chặn truy cập tr&aacute;i ph&eacute;p, để duy tr&igrave; độ ch&iacute;nh x&aacute;c của dữ liệu v&agrave; để đảm bảo sử dụng đ&uacute;ng th&ocirc;ng tin ch&uacute;ng t&ocirc;i lưu trữ.</span></p>
<h1 style="margin-top: 12pt; margin-bottom: 12pt;"><strong><span style="font-size: 14pt; font-family: 'Times New Roman', serif;">5. Th&ocirc;ng tin li&ecirc;n hệ&nbsp;</span></strong></h1>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Nếu Người d&ugrave;ng c&oacute; thắc mắc về Ch&iacute;nh s&aacute;ch n&agrave;y, h&atilde;y li&ecirc;n hệ với ch&uacute;ng t&ocirc;i theo th&ocirc;ng tin sau:&nbsp;</span></p>
<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Địa chỉ: Số 37 ng&otilde; 381 Nguyễn Khang, phường Dịch Vọng, quận Cầu Giấy, H&agrave; Nội.</span></p>
  </li>
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Hotline: 0902969386</span></p>
  </li>
</ul>`;

  return (
    <section className="policy-and-terms-section p-20">
      <Container>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </Container>
    </section>
  );
};

PrivacyPolicy.renderLayout = renderMainLayout;

export default PrivacyPolicy;
