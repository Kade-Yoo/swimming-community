import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, Typography, Stack, CircularProgress } from '@mui/material';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('데이터 불러오기 실패');
  return res.json();
};

const CommunityPage: React.FC = () => {
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <Stack alignItems="center" mt={6}><CircularProgress /></Stack>;
  if (error) return <Typography color="error">게시글을 불러올 수 없습니다.</Typography>;

  return (
    <Stack spacing={2}>
      <Typography variant="h5" gutterBottom>커뮤니티 게시판 (샘플)</Typography>
      {data?.slice(0, 10).map(post => (
        <Card key={post.id}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              작성자: User {post.userId}
            </Typography>
            <Typography variant="body1">{post.body.slice(0, 60)}...</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default CommunityPage; 