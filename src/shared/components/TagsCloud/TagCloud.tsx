import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import Cloud from 'react-d3-cloud';
import RoutesApp from '../../../constants/routes';

interface TagCloudTag {
  content: string;
  value?: number;
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

  function handleSearchItemsByTag(tag: string) {
    searchItemsByTag(tag);
    navigate(RoutesApp.Search);
  }

  return (
    <Box
      sx={{
        minHeight: { xs: 320, md: 380 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        px: 2,
      }}
    >
      <Typography variant="h3" sx={{ alignSelf: 'flex-start', mb: 1 }}>
        Tags
      </Typography>
      <Cloud
        data={tags.map((tag) => ({ text: tag.content, value: tag.value || 1 }))}
        width={Math.max(280, Math.min(window.innerWidth - 32, 720))}
        height={320}
        font="inherit"
        fontWeight="bold"
        padding={4}
        rotate={() => 0}
        fontSize={(word) => Math.max(14, Math.min(42, word.value * 2 + 12))}
        fill={(_word: { text: string; value: number }, index: number) => [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ][index % 4]}
        onWordClick={(_, word) => handleSearchItemsByTag(word.text)}
      />
    </Box>
  );
};

export default TagCloudComponent;
