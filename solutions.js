import React, { useEffect, useState } from 'react';

function Card({ title, text, target, linkTitle, href, rel, onClick, linkClassName }) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__text">{text}</div>
      <a
        className={`default-link card__link ${linkClassName}`}
        target={target}
        rel={rel}
        href={href}
        onClick={() => onClick(href)}
      >
        {linkTitle}
      </a>
    </div>
  );
}

export default function Page() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const response = await fetch('https://my-json-server.typicode.com/savayer/demo/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();

        const newData = jsonData.map((item) => ({
          id: item.id,
          title: item.title.en,
          linkTitle: item.link_title,
          href: item.link,
          text: item.body.en.substr(0, 50) + '...',
        }));

        setCards(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCardsData();
  }, []);

  function analyticsTrackClick(url) {
    // Sending clicked link URL to analytics
    console.log('Clicked link:', url);
  }

  return (
    <div>
      {cards.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          linkTitle={item.linkTitle}
          href={item.href}
          text={item.text}
          linkClassName={item.id === 1 ? 'card__link--red' : ''}
          target={item.id === 1 ? '_blank' : ''}
          onClick={analyticsTrackClick}
        />
      ))}
    </div>
  );
}