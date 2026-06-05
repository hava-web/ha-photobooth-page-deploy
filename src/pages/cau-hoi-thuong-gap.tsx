import React, { useState } from 'react';
import cx from 'classnames';
import Container from 'components/grid/Container';
import { PageSeo } from 'components/seo/PageSeo';
import { renderMainLayout } from 'containers/layout/app/AppLayout';
import { PageWithLayout } from 'models/common.model';
import { GetServerSideProps, InferGetStaticPropsType, NextPage } from 'next';
import { FAQPageJsonLd } from 'next-seo';
import { listFaq } from 'api/faq/faq.api';
import { FaqModel } from 'models/faq/faq.model';
import { map } from 'lodash';
import Typography from 'components/typography/Typography';
import { TYPOGRAPHY_VARIANTS } from 'components/typography/typography-utils';
import { AssetIcons } from 'assets/icons/AssetIcons';
import { includesId, isEqualVal } from 'helpers/string.helper';

type FAQProps = {
  listFaqs: FaqModel[];
};

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const FAQ: PageWithLayout & NextPage<InferGetStaticPropsType<any>> = ({
  listFaqs = [],
}: FAQProps) => {
  const [showQuestions, setShowQuestions] = useState<Array<FaqModel['id']>>([]);
  const faqJsonLdItems = listFaqs
    .filter((item) => item?.question && item?.answer)
    .map((item) => ({
      questionName: item.question,
      acceptedAnswerText: stripHtml(item.answer),
    }));

  const handleToggleShow = (id: FaqModel['id']) => () =>
    setShowQuestions((list) =>
      includesId(list, id)
        ? list.filter((i) => !isEqualVal(i, id))
        : [...list, id],
    );

  return (
    <>
      <PageSeo path="/cau-hoi-thuong-gap" />
      {!!faqJsonLdItems.length && <FAQPageJsonLd mainEntity={faqJsonLdItems} />}
      <section className="policy-and-terms-section p-[12.5rem]">
        <Container>
          <div>
            <Typography
              variant={TYPOGRAPHY_VARIANTS.SMALL}
              component="h1"
              className="faq-title"
            >
              CÂU HỎI THƯỜNG GẶP
            </Typography>
            <ul className="faq-list">
              {map(listFaqs, (item, ind) => (
                <li
                  key={item?.id || item?.question}
                  className={cx('faq-item', {
                    'is-show': includesId(showQuestions, item?.id),
                  })}
                >
                  <strong
                    className="faq-question-title"
                    onClick={handleToggleShow(item?.id)}
                  >
                    <Typography variant={TYPOGRAPHY_VARIANTS.SMALL}>
                      {ind + 1}. {item?.question}
                    </Typography>
                    <AssetIcons.ChevronDown className="arrow-icon" />
                  </strong>
                  <div className="faq-answer">
                    <Typography variant={TYPOGRAPHY_VARIANTS.SMALL}>
                      <div dangerouslySetInnerHTML={{ __html: item?.answer }} />
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const listFaqRes = await listFaq({ isActive: true });

    return {
      props: {
        listFaqs: listFaqRes?.data?.items || [],
        // downloadData: downloadResponse?.data || null,
        // uiTemplateData: uiTemplateResponse?.data || null,
      },
    };
  } catch (err) {
    return {
      props: {
        listFaqs: [],
        errorData: JSON.parse(JSON.stringify(err)),
      },
    };
  }
};

FAQ.renderLayout = renderMainLayout;

export default FAQ;
