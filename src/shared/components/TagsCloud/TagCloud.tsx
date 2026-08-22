import React, { FC } from 'react';
import WordCloud from 'react-d3-cloud';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import RoutesApp from '../../../constants/routes';

interface TagCloudTag {
  content: string;
  value?: number;
}

interface CloudWord {
  text: string;
  value: number;
}

interface ITagCloudComponent {
  tags: TagCloudTag[];
  searchItemsByTag: (tag: string) => void;
}

const TagCloudComponent: FC<ITagCloudComponent> = ({
  tags,
  searchItemsByTag,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  function handleSearchItemsByTag(tag: string) {
    searchItemsByTag(tag);

    navigate(RoutesApp.Search);
  }

  const words = tags.map((tag) => ({
    text: tag.content,
    value: tag.value || 1,
  }));

  return (
    <Box sx={{ width: '100%', minHeight: 300, overflow: 'hidden' }}>
      <WordCloud
        data={words}
        width={isSmallScreen ? 320 : 650}
        height={isSmallScreen ? 260 : 300}
        font="inherit"
        fontWeight="600"
        fontSize={(word: CloudWord) => Math.min(42, 16 + word.value * 2)}
        rotate={(word: CloudWord) => (word.text.length > 8 ? 0 : (word.value % 2) * 12 - 6)}
        padding={8}
        fill={() => (theme.palette.mode === 'dark'
          ? theme.palette.secondary.light
          : theme.palette.primary.dark)}
        onWordClick={(_event, word) => handleSearchItemsByTag(word.text)}
      />
    </Box>
  );
};

export default TagCloudComponent;
