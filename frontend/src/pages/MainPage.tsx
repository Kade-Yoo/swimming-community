import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

const MainPage: React.FC = () => {
  return (
    <Stack spacing={3} alignItems="center">
      <Typography variant="h4" component="h1" gutterBottom>
        아마추어 수영 커뮤니티 메인
      </Typography>
      <Typography color="text.secondary">
        대회 정보, 인기 게시글, 최신 기록, 공지사항 등을 한눈에 볼 수 있습니다.
      </Typography>
      <Card sx={{ minWidth: 320, maxWidth: 480 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            예시 대회 정보
          </Typography>
          <Typography variant="body2" color="text.secondary">
            2024 전국 아마추어 수영대회<br />
            일시: 2024-08-15<br />
            장소: 서울 올림픽 수영장
          </Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            대회 상세보기
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default MainPage; 