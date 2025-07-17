import React from 'react';
import { Card, CardContent, Typography, Stack } from '@mui/material';

const competitions = [
  {
    id: 1,
    name: '2024 전국 아마추어 수영대회',
    date: '2024-08-15',
    location: '서울 올림픽 수영장',
    description: '전국 아마추어 수영인들이 참가하는 대회입니다.'
  },
  {
    id: 2,
    name: '2024 부산 마스터즈 오픈',
    date: '2024-09-10',
    location: '부산 사직 수영장',
    description: '부산 지역 마스터즈 수영대회.'
  },
  {
    id: 3,
    name: '2024 광주 시민 수영대회',
    date: '2024-10-05',
    location: '광주 남부 수영장',
    description: '광주 시민을 위한 오픈 대회.'
  }
];

const CompetitionPage: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" gutterBottom>수영 대회 정보 (목업)</Typography>
      {competitions.map(comp => (
        <Card key={comp.id}>
          <CardContent>
            <Typography variant="h6">{comp.name}</Typography>
            <Typography color="text.secondary">
              일정: {comp.date} | 장소: {comp.location}
            </Typography>
            <Typography variant="body2" mt={1}>{comp.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default CompetitionPage; 