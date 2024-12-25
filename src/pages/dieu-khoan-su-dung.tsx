/* eslint-disable react/no-danger */
import Container from 'components/grid/Container';
import { renderMainLayout } from 'containers/layout/app/AppLayout';
import { PageWithLayout } from 'models/common.model';
import { InferGetStaticPropsType, NextPage } from 'next';
import React from 'react';

const TermsOfUse: PageWithLayout &
  NextPage<InferGetStaticPropsType<any>> = () => {
  const htmlContent = `<p style="margin-top: 20pt; margin-bottom: 6pt; text-align: center;"><strong><span style="font-size: 20pt; font-family: 'Times New Roman', serif;">ĐIỀU KHOẢN SỬ DỤNG</span></strong></p>
<p style="text-align: center; margin-top: 20pt; margin-bottom: 6pt; padding-left: 72px;">&nbsp;</p>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Bằng việc sử dụng c&aacute;c dịch vụ, tiện &iacute;ch tr&ecirc;n Ứng dụng Fun Studio, tổ chức, c&aacute; nh&acirc;n sử dụng chấp nhận v&agrave; cam kết thực hiện c&aacute;c điều khoản v&agrave; điều kiện sử dụng sau đ&acirc;y:&nbsp;</span></p>
<p style="text-align: center; margin-top: 0pt; margin-bottom: 3pt;">&nbsp;</p>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Tổ chức, c&aacute; nh&acirc;n sử dụng dịch vụ, tiện &iacute;ch tr&ecirc;n Ứng dụng Fun tự chịu tr&aacute;ch nhiệm trước ph&aacute;p luật:&nbsp;</span></p>
<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Về những th&ocirc;ng tin k&ecirc; khai, đăng k&yacute; t&agrave;i khoản tr&ecirc;n Ứng dụng Fun v&agrave; phải chịu tr&aacute;ch nhiệm về mọi hoạt động được thực hiện bằng t&agrave;i khoản của m&igrave;nh.</span></p>
  </li>
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Về việc giữ b&iacute; mật th&ocirc;ng tin t&agrave;i khoản, mật khẩu của m&igrave;nh, trường hợp mật khẩu bị mất hoặc bị đ&aacute;nh cắp hoặc ph&aacute;t hiện c&oacute; người sử dụng tr&aacute;i ph&eacute;p t&agrave;i khoản của m&igrave;nh, phải th&ocirc;ng b&aacute;o kịp thời cho Ch&uacute;ng t&ocirc;i.</span></p>
  </li>
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Về tất cả c&aacute;c nội dung do m&igrave;nh tạo, gửi, đăng k&yacute; khi sử dụng c&aacute;c dịch vụ, tiện &iacute;ch tr&ecirc;n Ứng dụng Fun.</span></p>
  </li>
</ul>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Tổ chức, c&aacute; nh&acirc;n sử dụng dịch vụ, tiện &iacute;ch tr&ecirc;n Ứng dụng Fun kh&ocirc;ng được thực hiện những h&agrave;nh vi sau:&nbsp;</span></p>
<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="line-height: 1.656; text-align: justify; background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Cản trở hoặc ngăn chặn tr&aacute;i ph&eacute;p qu&aacute; tr&igrave;nh truyền, gửi, nhận th&ocirc;ng điệp dữ liệu.</span></p>
  </li>
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="line-height: 1.656; text-align: justify; background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Thay đổi, giả mạo, sao ch&eacute;p tr&aacute;i ph&eacute;p một phần hoặc to&agrave;n bộ th&ocirc;ng điệp dữ liệu.</span></p>
  </li>
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="line-height: 1.656; text-align: justify; background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Tạo ra th&ocirc;ng điệp dữ liệu nhằm thực hiện c&aacute;c h&agrave;nh vi tr&aacute;i ph&aacute;p luật.</span></p>
  </li>
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="line-height: 1.656; text-align: justify; background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Tạo ra hoặc ph&aacute;t t&aacute;n chương tr&igrave;nh tin m&atilde; độc g&acirc;y hại, x&acirc;m nhập tr&aacute;i ph&eacute;p, can thiệp v&agrave;o c&aacute;c chức năng hoạt động của Ứng dụng hoặc c&oacute; h&agrave;nh vi kh&aacute;c nhằm ph&aacute; hoại hạ tầng c&ocirc;ng nghệ phục vụ cung cấp c&aacute;c dịch vụ, tiện &iacute;ch tr&ecirc;n Ứng dụng.</span></p>
  </li>
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="line-height: 1.656; text-align: justify; background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">Gian lận, chiếm đoạt hoặc sử dụng tr&aacute;i ph&aacute;p th&ocirc;ng tin c&aacute; nh&acirc;n của người kh&aacute;c.</span></p>
  </li>
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="line-height: 1.656; text-align: justify; background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">C&aacute;c h&agrave;nh vi kh&aacute;c theo quy định của ph&aacute;p luật.</span></p>
  </li>
</ul>
<p style="line-height: 1.656; text-align: justify; background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12pt; font-family: 'Times New Roman', serif;">Việc vi phạm Điều Khoản Dịch Vụ n&agrave;y c&oacute; thể dẫn tới một số h&agrave;nh động, bao gồm bất kỳ hoặc tất cả c&aacute;c h&agrave;nh động sau:</span></p>
<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
  <li style="font-size: 12pt; font-family: 'Times New Roman', serif;">
    <p style="line-height: 1.656; text-align: justify; background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12pt;">Giới hạn quyền sử dụng T&agrave;i Khoản;</span></p>
  </li>
  <li style="font-size: 12pt; font-family: 'Times New Roman', serif;">
    <p style="line-height: 1.656; text-align: justify; background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12pt;">Đ&igrave;nh chỉ v&agrave; chấm dứt T&agrave;i Khoản;</span></p>
  </li>
  <li style="font-size: 13pt; font-family: 'Times New Roman', serif;">
    <p style="line-height: 1.656; text-align: justify; background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 12pt;">C&aacute;c h&agrave;nh động hoặc biện ph&aacute;p chế t&agrave;i kh&aacute;c.</span><strong><span style="font-size: 10.5pt;">&nbsp;</span></strong></p>
  </li>
</ul>
<p style="line-height: 1.656; text-align: justify; background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: 'Times New Roman', serif;">Trong trường hợp sửa đổi nội dung, c&aacute;c điều khoản v&agrave; điều kiện sử dụng Ứng dụng, c&aacute;c nội dung sửa đổi sẽ được th&ocirc;ng b&aacute;o tr&ecirc;n Ứng dụng. Người sử dụng tiếp tục sử dụng v&agrave; thực hiện c&aacute;c y&ecirc;u cầu dịch vụ, tiện &iacute;ch tr&ecirc;n Ứng dụng c&oacute; nghĩa l&agrave; đ&atilde; chấp nhận c&aacute;c sửa đổi đ&oacute;.</span></p>`;

  return (
    <section className="policy-and-terms-section">
      <Container>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </Container>
    </section>
  );
};

TermsOfUse.renderLayout = renderMainLayout;

export default TermsOfUse;
