    // src/pages/AdminReservationsPage.tsx

    import  { useState, useMemo } from 'react';
    import {
    Box,
    Container,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
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

    interface Reservation {
    id: number;
    joinDate: string;    // 사용자 가입일 (예: '2025-01-11')
    username: string;    // 사용자 이름
    email: string;       // 사용자 이메일
    farmName: string;    // 농장명
    date: string;        // 예약 일자 (예: '2025-05-09')
    time: string;        // 예약 시간 (예: '10:00 - 11:30')
    tasks: string[];     // 작업 항목 목록
    status: '예정' | '완료' | '취소';
    notes?: string;      // 비고 (선택)
    }

    const initialReservations: Reservation[] = [
    {
        id: 1,
        joinDate: '2025-01-11',
        username: '홍길동',
        email: 'hong@example.com',
        farmName: '가수원 사과',
        date: '2025-05-09',
        time: '10:00 - 11:30',
        tasks: ['병해 감지', '수분 측정'],
        status: '예정',
        notes: '외부인 통제 요청',
    },
    {
        id: 2,
        joinDate: '2025-01-26',
        username: '아무개',
        email: 'amu@example.com',
        farmName: '옥천 농장',
        date: '2025-05-10',
        time: '14:00 - 15:00',
        tasks: ['작물 상태'],
        status: '완료',
    },
    {
        id: 3,
        joinDate: '2025-02-05',
        username: '김철수',
        email: 'chulsu@example.com',
        farmName: '청주 밭',
        date: '2025-05-11',
        time: '09:00 - 10:00',
        tasks: ['토양 수분 측정'],
        status: '취소',
        notes: '비로 인한 취소',
    },
    {
        id: 4,
        joinDate: '2025-03-18',
        username: '박영희',
        email: 'younghee@example.com',
        farmName: '창원 포도밭',
        date: '2025-05-12',
        time: '13:30 - 14:30',
        tasks: ['작물 상태', '병해 감지'],
        status: '예정',
    },
    {
        id: 5,
        joinDate: '2025-04-02',
        username: '이민호',
        email: 'minho@example.com',
        farmName: '구미 사과원',
        date: '2025-05-13',
        time: '11:00 - 12:30',
        tasks: ['수분 측정'],
        status: '완료',
    },
    ];

    export default function AdminReservationsPage() {
    const [reservations, setReservations] =
        useState<Reservation[]>(initialReservations);

    // 검색어와 날짜 필터 상태
    const [searchText, setSearchText] = useState<string>('');
    const [filterDate, setFilterDate] = useState<string>('');

    // 상세 다이얼로그 상태
    const [openDetailId, setOpenDetailId] = useState<number | null>(null);

    // 필터 적용된 예약 목록
    const filteredList = useMemo(() => {
        return reservations.filter((r) => {
        const matchName = r.username.includes(searchText.trim());
        const matchDate =
            filterDate === '' || r.date === filterDate;
        return matchName && matchDate;
        });
    }, [reservations, searchText, filterDate]);

    // 상세 다이얼로그 열기/닫기
    const handleOpenDetail = (id: number) => {
        setOpenDetailId(id);
    };
    const handleCloseDetail = () => {
        setOpenDetailId(null);
    };

    // 삭제 로직
    const handleDelete = (id: number) => {
        setReservations((prev) => prev.filter((r) => r.id !== id));
    };

    // 현재 다이얼로그에 렌더링될 예약 정보
    const currentDetail =
        openDetailId !== null
        ? reservations.find((r) => r.id === openDetailId) || null
        : null;

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
            {/* 페이지 제목 */}
            <Typography variant="h5" gutterBottom>
            전체 예약 관리
            </Typography>

            {/* 검색 / 날짜 필터 */}
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 3,
                flexWrap: 'wrap',
            }}
            >
            {/* 사용자명 검색 */}
            <TextField
                size="small"
                label="사용자명 검색"
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

            {/* 예약일 필터 */}
            <TextField
                size="small"
                type="date"
                variant="outlined"
                label="예약일"
                InputLabelProps={{ shrink: true }}
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
            />
            </Box>

            {/* 예약 목록 테이블 */}
            <Paper elevation={2}>
            <TableContainer>
                <Table size="small">
                <TableHead>
                    <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                        번호
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                        가입일
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                        사용자
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                        농장명
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                        시간
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>
                        작업 항목
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                        상태
                    </TableCell>
                    <TableCell align="left" sx={{ pr:0, px:5, fontWeight: 'bold' }}>
                        관리
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredList.length === 0 && (
                    <TableRow>
                        <TableCell
                        colSpan={8}
                        align="center"
                        sx={{ py: 4 }}
                        >
                        조회된 예약이 없습니다.
                        </TableCell>
                    </TableRow>
                    )}

                    {filteredList.map((r) => (
                    <TableRow key={r.id}>
                        <TableCell align="center">{r.id}</TableCell>
                        <TableCell align="center">{r.joinDate}</TableCell>
                        <TableCell>{r.username}</TableCell>
                        <TableCell>{r.farmName}</TableCell>
                        <TableCell align="center">{r.time}</TableCell>
                        <TableCell>{r.tasks.join(', ')}</TableCell>
                        <TableCell align="center">{r.status}</TableCell>
                        <TableCell align="left" sx={{ pr:0, px:5 }}>
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
            <DialogTitle>예약 상세 정보</DialogTitle>
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
                    <strong>예약일:</strong> {currentDetail.date}{' '}
                    <strong>시간:</strong> {currentDetail.time}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    <strong>작업 항목:</strong>{' '}
                    {currentDetail.tasks.join(', ')}
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
