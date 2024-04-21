import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

const { Text, Title } = Typography;
const { Option } = Select;

//https://bit.ly/3SYUpeU
const demoImage = 'https://bit.ly/3SYUpeU';

function News(simplified) {
  const { data: cryptoNews, isLoading, isError } = useGetCryptoNewsQuery('Cryptocurrency', simplified ? 10 : 25);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching news</div>;



  return (
    <>
      <Row gutter={[24, 24]}>

        {cryptoNews.news.map((News, i) => (
          <Col xs={24} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={News.longURL} target="_blank" rel='noreference'>
                <div className="news-image-container">
                  <Title className='news-title' level={4}>
                    {News.title}
                  </Title>
                  <img src={News?.image?.thumbnail?.contentUrl || demoImage} alt="news" style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} />
                </div>
                <div className="">
                  <Text>{moment.unix(News.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}

      </Row>


    </>
  );
}

export default News

