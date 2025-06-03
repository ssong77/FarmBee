// src/pages/AdminAnalysisReportsPage.tsx

import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// ─── 더미 분석 리포트 데이터 ───
interface AnalysisReport {
  id: number;
  analysisDate: string;   // 분석일 (예: '2025-05-09')
  username: string;       // 사용자 이름
  email: string;          // 사용자 이메일
  farmName: string;       // 농장명
  region: string;         // 지역명
  analysisItem: string;   // 분석 항목 (예: '수분')
  status: '완료' | '실패' | '진행중';
  notes?: string;         // 비고 (선택)
}

const initialAnalysisReports: AnalysisReport[] = [
  {
    id: 1,
    analysisDate: '2025-05-09',
    username: '홍길동',
    email: 'hong@example.com',
    farmName: '옥천 농장',
    region: '충북 옥천군',
    analysisItem: '수분',
    status: '완료',
    notes: '외부인 통제 요청',
  },
  {
    id: 2,
    analysisDate: '2025-05-10',
    username: '아무개',
    email: 'amu@example.com',
    farmName: '가수원 사과',
    region: '충북 청주시',
    analysisItem: '질소',
    status: '실패',
    notes: '네트워크 오류',
  },
  {
    id: 3,
    analysisDate: '2025-05-11',
    username: '김철수',
    email: 'chulsu@example.com',
    farmName: '창원 포도밭',
    region: '경남 창원시',
    analysisItem: '병해',
    status: '진행중',
  },
  {
    id: 4,
    analysisDate: '2025-05-12',
    username: '박영희',
    email: 'younghee@example.com',
    farmName: '구미 사과원',
    region: '경북 구미시',
    analysisItem: '수분',
    status: '완료',
  },
];

export default function AdminAnalysisReportsPage() {
  const [reports, setReports] = useState<AnalysisReport[]>(initialAnalysisReports);

  // 검색어(사용자명 or 농장명) 상태
  const [searchText, setSearchText] = useState<string>('');
  // 필터: 분석일, 지역
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterRegion, setFilterRegion] = useState<string>('');

  // 상세 다이얼로그 상태
  const [openDetailId, setOpenDetailId] = useState<number | null>(null);

  // 필터 적용된 분석 리포트 목록
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchesName =
        r.username.includes(searchText.trim()) ||
        r.farmName.includes(searchText.trim());
      const matchesDate = filterDate === '' || r.analysisDate === filterDate;
      const matchesRegion = filterRegion === '' || r.region === filterRegion;
      return matchesName && matchesDate && matchesRegion;
    });
  }, [reports, searchText, filterDate, filterRegion]);

  // 상세 다이얼로그 열기/닫기
  const handleOpenDetail = (id: number) => {
    setOpenDetailId(id);
  };
  const handleCloseDetail = () => {
    setOpenDetailId(null);
  };

  // 삭제 로직
  const handleDelete = (id: number) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  // 재분석 로직 (예시: 상태를 '진행중'으로 변경)
  const handleReanalyze = (id: number) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: '진행중', notes: '재분석 중...' } : r
      )
    );
  };

  // 현재 다이얼로그에 렌더링될 리포트 정보
  const currentDetail =
    openDetailId !== null
      ? reports.find((r) => r.id === openDetailId) || null
      : null;

  // 고정된 지역 목록 (예시)
  const regionOptions = [
    '전체',
    '충북 옥천군',
    '충북 청주시',
    '경남 창원시',
    '경북 구미시',
  ];

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
        {/* 페이지 제목 */}
        <Typography variant="h5" gutterBottom>
          분석 리포트 관리
        </Typography>

        {/* 필터 바: 분석일 / 지역 / 검색어 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 3,
            flexWrap: 'wrap',
          }}
        >
          {/* 분석일 필터 */}
          <TextField
            size="small"
            type="date"
            variant="outlined"
            label="분석일"
            InputLabelProps={{ shrink: true }}
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />

          {/* 지역 선택 필터 */}
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>지역 선택</InputLabel>
            <Select
              value={filterRegion}
              label="지역 선택"
              onChange={(e) => setFilterRegion(e.target.value)}
            >
              {regionOptions.map((region) => (
                <MenuItem key={region} value={region === '전체' ? '' : region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 사용자명 or 농장명 검색 */}
          <TextField
            size="small"
            label="검색 (사용자 또는 농장)"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: 240 }}
          />
        </Box>

        {/* 분석 리포트 테이블 */}
        <Paper elevation={2}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    번호
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    분석일
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    사용자
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    농장명
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    지역
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    분석 항목
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    상태
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    관리
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      align="center"
                      sx={{ py: 4 }}
                    >
                      조회된 리포트가 없습니다.
                    </TableCell>
                  </TableRow>
                )}

                {filteredReports.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell align="center">{r.id}</TableCell>
                    <TableCell align="center">{r.analysisDate}</TableCell>
                    <TableCell>
                      {r.username} ({r.email})
                    </TableCell>
                    <TableCell>{r.farmName}</TableCell>
                    <TableCell>{r.region}</TableCell>
                    <TableCell>{r.analysisItem}</TableCell>
                    <TableCell align="center">{r.status}</TableCell>
                    <TableCell align="left">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleOpenDetail(r.id)}
                        sx={{ mr: 1 }}
                      >
                        상세
                      </Button>
                      <Button
                        size="small"
                        color="warning"
                        variant="outlined"
                        onClick={() => handleReanalyze(r.id)}
                        sx={{ mr: 1 }}
                      >
                        재분석
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => handleDelete(r.id)}
                      >
                        삭제
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* 상세 다이얼로그 */}
        <Dialog
          open={currentDetail !== null}
          onClose={handleCloseDetail}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>분석 리포트 상세 정보</DialogTitle>
          {currentDetail && (
            <DialogContent dividers>
              <Typography variant="body2" gutterBottom>
                <strong>사용자:</strong> {currentDetail.username} (
                {currentDetail.email})
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>농장명:</strong> {currentDetail.farmName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>지역:</strong> {currentDetail.region}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>분석일:</strong> {currentDetail.analysisDate}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>분석 항목:</strong> {currentDetail.analysisItem}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>상태:</strong> {currentDetail.status}
              </Typography>
              {currentDetail.notes && (
                <Typography variant="body2" gutterBottom>
                  <strong>비고:</strong> {currentDetail.notes}
                </Typography>
              )}
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleCloseDetail}>닫기</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
