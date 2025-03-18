import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, IconButton, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import RoutesApp from '../../constants/routes';
import { useLanguage } from '../../context/LanguageContext';

const slides = [
  { title: 'Books', description: 'Keep the stories you want to return to.' },
  { title: 'Memories', description: 'Turn meaningful moments into a collection.' },
  { title: 'Artworks', description: 'Curate the pieces that inspire you.' },
];

type CollectionSlide = { title: string; description: string; image?: string };

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [collectionSlides, setCollectionSlides] = useState<CollectionSlide[]>(slides);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('project-collections') || '[]') as CollectionSlide[];
      if (stored.length) setCollectionSlides(stored);
    } catch {
      setCollectionSlides(slides);
    }
  }, []);

  function moveSlide(direction: number) {
    setActiveSlide((current) => (current + direction + collectionSlides.length) % collectionSlides.length);
  }

  return (
    <Stack spacing={4} sx={{ py: { xs: 2, md: 5 } }}>
      <Box>
        <Typography variant="overline" color="secondary">{language.common.appName}</Typography>
        <Typography variant="h2" sx={{ fontWeight: 800, maxWidth: 720 }}>{language.common.carouselTitle}</Typography>
      </Box>
      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', transform: `translateX(-${activeSlide * 100}%)`, transition: 'transform 350ms ease' }}>
          {collectionSlides.map((slide) => (
            <Card key={slide.title} sx={{ minWidth: '100%', minHeight: 280, display: 'flex', alignItems: 'end', borderRadius: 0 }}>
              <CardContent sx={{ p: { xs: 3, md: 6 } }}>
                {slide.image && <Box component="img" src={slide.image} alt="" sx={{ width: 180, height: 90, objectFit: 'cover', mb: 2 }} />}
                <Typography variant="h3" sx={{ fontWeight: 700 }}>{slide.title}</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>{slide.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <IconButton aria-label="Previous collection" onClick={() => moveSlide(-1)} sx={{ position: 'absolute', left: 12, top: '50%', bgcolor: 'background.paper' }}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton aria-label="Next collection" onClick={() => moveSlide(1)} sx={{ position: 'absolute', right: 12, top: '50%', bgcolor: 'background.paper' }}>
          <ArrowForwardIcon />
        </IconButton>
        <Stack direction="row" spacing={1} sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>
          {collectionSlides.map((slide, index) => (
            <Box key={slide.title} component="button" aria-label={`Go to slide ${index + 1}`} onClick={() => setActiveSlide(index)} sx={{ width: 9, height: 9, p: 0, border: 0, borderRadius: '50%', bgcolor: index === activeSlide ? 'secondary.main' : 'grey.400', cursor: 'pointer' }} />
          ))}
        </Stack>
      </Box>
      <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={() => navigate(RoutesApp.CollectionsLink)} sx={{ alignSelf: 'flex-start' }}>
        {language.common.collections}
      </Button>
    </Stack>
  );
};