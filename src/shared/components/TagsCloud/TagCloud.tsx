import React, { FC } from 'react';
import { TagCloud } from 'react-tagcloud';
import { keyframes } from '@emotion/react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';
import RoutesApp from '../../../constants/routes';

const blinker = keyframes({ '50%': { opacity: 0 } });

const customRenderer = (tag: any, size: any, color: any) => (
  <Box
    key={tag.content}
    sx={{
      animation: `${blinker} 1s linear infinite`,
      display: 'inline-block',
      animationDelay: `${Math.random() * 2}s`,
      fontSize: `${size / 2}em`,
      border: `2px solid ${color}`,
      margin: '0.3rem',
      padding: '0.3rem',
      color,
    }}
  >
    {tag.content}
  </Box>
);

interface ITagCloudComponent {
  tags: any[];
  searchItemsByTag: (tag: string) => void;
}

const TagCloudComponent: FC<ITagCloudComponent> = ({
  tags,
  searchItemsByTag,
}) => {
  const navigate = useNavigate();

  function handleSearchItemsByTag(tag: string) {
    searchItemsByTag(tag);

    navigate(RoutesApp.Search);
  }
  return (
    <TagCloud
      tags={tags}
      minSize={1}
      maxSize={5}
      renderer={customRenderer}
      onClick={(tag: { content: string }) => {
        handleSearchItemsByTag(tag.content);
      }}
    />
  );
};

export default TagCloudComponent;
